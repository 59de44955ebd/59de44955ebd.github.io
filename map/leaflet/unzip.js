// Derrived from https://blog.elantha.com/unzip-js-browser
(function (window) {

// export
window.getZipFileHeaders = function(buffer) {
	const endOfCentralDirectoryValues = _getEndOfCentralDirectoryValues(buffer);
	if (!endOfCentralDirectoryValues)
		throw new Error("end of central directory not found");
	const centralDirectoryFileHeaders = _getCentralDirectoryFileHeaders(
		buffer,
		endOfCentralDirectoryValues
	);
  	return centralDirectoryFileHeaders;
}

// export
window.unzipFile = function(buffer, { fileHeaderOffset }) {
	const fh = new DataView(buffer, fileHeaderOffset);
	if (fh.getUint32(FH_OFFSET_SIGNATURE, true) !== FH_SIGNATURE)
		throw new Error("unexpected file header signature");
	const compressedDataStart = FH_FIXED_SIZE +
		fh.getUint16(FH_OFFSET_FILENAME_SIZE, true) +
		fh.getUint16(FH_OFFSET_EXTRA_FIELD_SIZE, true);
	const compressedSize = fh.getUint32(FH_OFFSET_COMPRESSED_SIZE, true);
	const compressedData = _getData(fh, compressedDataStart, compressedSize);
	switch (fh.getUint16(FH_OFFSET_COMPRESSION_METHOD, true)) {
		case COMPRESSION_NONE:
			return compressedData;
		case COMPRESSION_DEFLATE:
			return _deflate(compressedData);
		default:
			throw new Error("compression method not supported");
	}
}

// Helpers

function _getEndOfCentralDirectoryValues(buffer) {
	const firstPossibleOffset = buffer.byteLength - EOCD_FIXED_SIZE;
	for (let eocdOffset = firstPossibleOffset; eocdOffset > 0; eocdOffset--) {
		const eocd = new DataView(buffer, eocdOffset);
		if (eocd.getUint32(EOCD_OFFSET_SIGNATURE, true) !== EOCD_SIGNATURE)
			continue;
		const recordSize = EOCD_FIXED_SIZE + eocd.getUint16(EOCD_OFFSET_COMMENT_SIZE, true);
		if (recordSize !== eocd.byteLength)
			continue;
		return {
			numRecords: eocd.getUint16(EOCD_OFFSET_NUM_RECORDS, true),
			centralDirectoryStart: eocd.getUint32(EOCD_OFFSET_CD_START, true)
		};
	}
}

function _getCentralDirectoryFileHeaders(
	buffer,
	{ centralDirectoryStart, numRecords }
) {
	let cdfhOffset = centralDirectoryStart;
	const res = [];
	for (let record = 0; record < numRecords; record++) {
		const cdfh = new DataView(buffer, cdfhOffset);
		if (cdfh.getUint32(CDFH_OFFSET_SIGNATURE, true) !== CDFH_SIGNATURE)
			throw new Error("unexpected central directory file header signature");
		res.push({
			fileHeaderOffset: cdfh.getUint32(CDFH_OFFSET_FILE_HEADER, true),
			filename: _decodeText(cdfh, CDFH_FIXED_SIZE, CDFH_OFFSET_FILENAME_SIZE),
			uncompressedSize: cdfh.getUint32(CDFH_OFFSET_UNCOMPRESSED_SIZE, true)
		});
		const headerSize = CDFH_FIXED_SIZE +
			cdfh.getUint16(CDFH_OFFSET_FILENAME_SIZE, true) +
			cdfh.getUint16(CDFH_OFFSET_EXTRA_FIELD_SIZE, true) +
			cdfh.getUint16(CDFH_OFFSET_COMMENT_SIZE, true);
		cdfhOffset += headerSize;
	}
	return res;
}

function _getData(dataView, offset, size) {
	const start = dataView.byteOffset + offset;
	return dataView.buffer.slice(start, start + size);
}

function _decodeText(dataView, offset, sizeOffset) {
	const size = dataView.getUint16(sizeOffset, true);
	const data = _getData(dataView, offset, size);
	return new TextDecoder("ascii").decode(data);
}

function _deflate(data) {
	const decodedStream = new Blob([data])
		.stream()
		.pipeThrough(new DecompressionStream("deflate-raw"));
	return new Response(decodedStream).arrayBuffer();
}

// Constants

const COMPRESSION_NONE = 0;
const COMPRESSION_DEFLATE = 8;

const FH_SIGNATURE = 0x04034b50;
const FH_OFFSET_SIGNATURE = 0;
const FH_OFFSET_COMPRESSION_METHOD = 8;
const FH_OFFSET_COMPRESSED_SIZE = 18;
const FH_OFFSET_FILENAME_SIZE = 26;
const FH_OFFSET_EXTRA_FIELD_SIZE = 28;
const FH_FIXED_SIZE = 30;

const CDFH_SIGNATURE = 0x02014b50;
const CDFH_OFFSET_SIGNATURE = 0;
const CDFH_OFFSET_UNCOMPRESSED_SIZE = 24;
const CDFH_OFFSET_FILENAME_SIZE = 28;
const CDFH_OFFSET_EXTRA_FIELD_SIZE = 30;
const CDFH_OFFSET_COMMENT_SIZE = 32;
const CDFH_OFFSET_FILE_HEADER = 42;
const CDFH_FIXED_SIZE = 46;

const EOCD_SIGNATURE = 0x06054b50;
const EOCD_OFFSET_SIGNATURE = 0;
const EOCD_OFFSET_NUM_RECORDS = 10;
const EOCD_OFFSET_CD_START = 16;
const EOCD_OFFSET_COMMENT_SIZE = 20;
const EOCD_FIXED_SIZE = 22;

})(window);

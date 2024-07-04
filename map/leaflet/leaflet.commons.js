/* Plots Wikimedia Commons Photos on a Leaflet Map
*
* Prerequisites:
*	https://github.com/turban/Leaflet.Photo/
*	https://github.com/Leaflet/Leaflet.markercluster/
**/

(function(){

if (L.MarkerClusterGroup && L.Photo.Cluster) {

	// MD5 stuff
	const hs = [...Array(16)].map((_, i) => i.toString(16));
	const hex2s = (hs.join("") + hs.reverse().join("")).match(/../g);
	const H = new Uint32Array(Uint8Array.from(hex2s, v => parseInt(v, 16)).buffer);
	const K = Uint32Array.from(
	    Array(64), (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * (2 ** 32)));
	const S = [[7, 12, 17, 22], [5, 9, 14, 20], [4, 11, 16, 23], [6, 10, 15, 21]];
	const F = [
	    (b, c, d) => ((b & c) | ((~b >>> 0) & d)) >>> 0,
	    (b, c, d) => ((d & b) | ((~d >>> 0) & c)) >>> 0,
	    (b, c, d) => (b ^ c ^ d) >>> 0,
	    (b, c, d) => (c ^ (b | (~d >>> 0))) >>> 0,
	];
	const J = [
	    i => i,
	    i => (5 * i + 1) % 16,
	    i => (3 * i + 5) % 16,
	    i => (7 * i) % 16,
	];
	const rotl = function(v, n) {
	    return ((v << n) | (v >>> (32 - n))) >>> 0;
	};

	L.CommonsPhotos = L.Photo.Cluster.extend({

		RE_SPACE: new RegExp(' ', 'g'),
		SUPPORTED_FILE_TYPES: ['jpg', 'jpeg', 'png'],

		options: {

			//MarkerClusterGroup options, NOTE: PLEASE dont make maxClusterRadius than 60 as loads lots of thumbnails!
			maxClusterRadius: 80,

			showCoverageOnHover: true,

			spiderfyDistanceMultiplier: 2,

			autoZoomOnAdd: false,

			// normally will load more images as pan/zoom the map. but in particular might want to disable this if lloading all images on initial load (eg when using 'geo')
			autoLoadOnMove: true,

			minZoom: 13,
			maxZoom: 19, //was: 21

			maxImages: 60,

			thumbSize: 100,
			imageSize: 640,

			updateMinPixelDistance: 60,

			closePopupOnClick: true,
		},

		initialize: function (options) {
			L.setOptions(this, options);
			L.Photo.Cluster.prototype.initialize.call(this);

			//simple associative array to avoid adding the same thumbnail to photo data
			// note we just keep adding data to photoLayer as zoom, we dont remove the out of view data (no point!)
			this._done = [];

			this.on('click',  (evt) => {
				let img;
				const popup = L.popup({
					//content: L.Util.template('<img src="{url}" onload="console.log(this);"><p>{title}</p>', evt.layer.photo),
					content: () => {
						const div = document.createElement('div');
						img = document.createElement('img');
						img.src = evt.layer.photo.url;
						div.appendChild(img);
						const p = document.createElement('p');
						p.innerText = evt.layer.photo.title;
						div.appendChild(p);
						if (this.options.closePopupOnClick)
							div.style.cursor = 'pointer';
						return div;
					},
			 	   	className: 'leaflet-popup-photo',
					minWidth: this.options.imageSize - 1,
					closeButton: false,
				});

				evt.layer.bindPopup(popup).openPopup();

				img.onload = () => {
//					console.log('LOADED', img);
					popup._adjustPan();
				};
				if (this.options.closePopupOnClick)
					popup._container.onclick = () => popup.close();
			});

			//is the a fetch in progress?
			this._running = false;

			//these are for zoomin optimization (if prev zoom had all markers then no need to load them again for zooming in)
			this._prevZoom = -1;
			this._shownall = false;
			this._prevPoint = null;
			this._totalImages = null;

			//console.log(this._md5_hex('Hello World'));
		},

		onAdd: function (map) {
			L.Photo.Cluster.prototype.onAdd.call(this, map);
			this._map = map;

			if (this.options.autoLoadOnMove)
			{
				map.on('moveend', this._requestData, this);
			}
			this._requestData();
		},

		/**
			Remove the 'moveend' event listener and clear all the markers.
			@private
		*/
		onRemove: function (map) {
			L.Photo.Cluster.prototype.onRemove.call(this,map);
			if (this.options.autoLoadOnMove)
				map.off('moveend', this._requestData, this);
			this.clear();
			this._done = []; //need to clear these so the layer will work if/when re-added
			this._shownall = false;
			this._prevPoint = null;
		},

		/**
			Send a query request for JSONP data.
			@private
		*/
		_requestData: function () {
			const zoom = this._map.getZoom();
			if (zoom < this.options.minZoom)
				return;

			const p = this._map.getPixelBounds().min;
			if (this._prevPoint && zoom == this._prevZoom)
			{
				if (p.distanceTo(this._prevPoint) < this.options.updateMinPixelDistance)
				{
//					console.log('NOPE');
					return false;
				}
			}
			this._prevPoint = p;

			if (this._running)
			{
				this._running = false;
				this._controller.abort();
			}

			if (this._shownall == false || this._map.getZoom() <= this._prevZoom)
			{
				const bounds = this._map.getBounds();
				const gsbbox = bounds.getNorth() + '|' +  bounds.getWest() + '|' + bounds.getSouth() + '|' + bounds.getEast();
				this._running = true;
				this._controller = new AbortController();
				fetch(`https://commons.wikimedia.org/w/api.php?format=json&action=query&list=geosearch&gsprimary=all&gsnamespace=6&gslimit=${this.options.maxImages}&gsbbox=${gsbbox}&origin=*`,
				{
					signal: this._controller.signal,
				})
				.then(res => res.json())
				.then(data => {
					this._running = false;
					//console.log("Loading " + data.query.geosearch.length + " images");
					this._addRows(data.query.geosearch);
					this._shownall = true;
				})
				.catch(function(err) {
	                //console.error(` Err: ${err}`);
	                this._running = false;
	            });
			}
			this._prevZoom = zoom;
		},

		///////////////////////////////////////////////

		_addRows: function(rows) {
			const newRows = [];
			let file, md5, c1, c2;
			for (let row of rows)
			{
				if (!this.SUPPORTED_FILE_TYPES.includes(row.title.split('.').pop().toLowerCase()))
					continue;

				if (!this._done[row.pageid])
				{
					file = this._replaceSpaces(row.title.substr(5));
					md5 = this._md5_hex(file);
					//console.log('md5', md5);
					row.thumbnail = `https://upload.wikimedia.org/wikipedia/commons/thumb/${md5.charAt(0)}/${md5}/${file}/${this.options.thumbSize}px-${file}`;
					row.url = `https://upload.wikimedia.org/wikipedia/commons/thumb/${md5.charAt(0)}/${md5}/${file}/${this.options.imageSize}px-${file}`;

					//row.link = '';//this.options.domain+"/photo/"+row.id;
					newRows.push(row);
					this._done[row.pageid] = 1;

					//just add the location	to the dots	layer
					if (this._masklayer)
					{
						this._layerData.push([row.lat, row.lon]);
					}
				}
			}

			//add the new photos
			this.add(newRows);
		},

		_replaceSpaces: function(str) {
			return str.replace(this.RE_SPACE, '_');
		},

		// returns first 2 chars of md5 hex string
		_md5_hex: function (str) {
			const u8a = (new TextEncoder()).encode(str);
		    const total = Math.ceil((u8a.length + 9) / 64) * 64;
		    const chunks = new Uint8Array(total);
		    chunks.set(u8a);
		    chunks.fill(0, u8a.length);
		    chunks[u8a.length] = 0x80;
		    const lenbuf = new Uint32Array(chunks.buffer, total - 8);
		    const low = u8a.length % (1 << 29);
		    const high = (u8a.length - low) / (1 << 29);
		    lenbuf[0] = low << 3;
		    lenbuf[1] = high;
		    const hash = H.slice();
		    for (let offs = 0; offs < total; offs += 64)
		    {
		        const w = new Uint32Array(chunks.buffer, offs, 16);
		        let [a, b, c, d] = hash;
		        for (let s = 0; s < 4; s++)
		        {
		            for (let i = s * 16, end = i + 16; i < end; i++)
		            {
		                const t = a + F[s](b, c, d) + K[i] + w[J[s](i)];
		                const na = (b + rotl(t >>> 0, S[s][i % 4])) >>> 0;
		                [a, b, c, d] = [d, na, b, c];
		            }
		        }
		        hash[0] += a; hash[1] += b; hash[2] += c; hash[3] += d;
		    }
			return [...new Uint8Array(hash.buffer, 0, 1)][0].toString(16).padStart(2, '0');
		},

	});

	L.commonsPhotos = function (options) {
		return new L.CommonsPhotos(options);
	};
}

})();

'use strict';

const BING_KEY = 'AqRX_rx3tLFIIRmRsW8ZY2iJfj84IxUPzesU36Fr-y8JROPionQJN82GwuP71SJ7';
const MAPBOX_KEY = 'pk.eyJ1IjoidnNsNDIiLCJhIjoiY2xha3o1ZmZ0MDA4ZDN2bXMzcnIweWhhcCJ9.IU5zt8kMIRsIhfKJWpgbgg';
const MAPTILER_KEY = 'ppaPBnSs4o1IOGtXW8oI';
const THUNDERFOREST_KEY = 'c6644d4c8d6f4bd18067c449f978a779';

//######################################
// road maps
//######################################
const road_maps = {

    'Bing Roadmap': new L.BingLayer(BING_KEY, {
        imagerySet: 'RoadOnDemand'
    }),

    'CycleOSM': L.tileLayer(
    	'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    	{
	        subdomains:['a', 'b', 'c'],
	        //maxZoom: 19,
	        maxNativeZoom: 19,
	        maxZoom: 20,
	        attribution: 'Map © <a href="https://www.cyclosm.org/">CycleOSM</a>, Data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    }
    ),

    'Google Roadmap': L.tileLayer(
        'http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
        {
	        subdomains:['mt0', 'mt1', 'mt2', 'mt3'],
	        maxZoom: 20,
	        attribution: '© Google', // DUMMY
	    }
    ),

    'IGN Topo France': L.tileLayer(
		'https://data.geopf.fr/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}',
        {
	        //maxZoom: 16,
	        maxNativeZoom: 16,
	        maxZoom: 20,
	        attribution:  'Données cartographiques Â© <a href="https://www.ign.fr/">IGN</a>',
	    }
    ),

	'IGN Topo Spain': L.tileLayer(
		'https://ign.es/wmts/mapa-raster?layer=MTN&style=default&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&&TileMatrix={z}&TileCol={x}&TileRow={y}',
		{
	        maxNativeZoom: 18,
	        maxZoom: 20,
	        //minNativeZoom: 15,
	    }
	),

    'Landscape': L.tileLayer(
    	'https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=' + THUNDERFOREST_KEY, {
        subdomains:['a', 'b', 'c'],
        //maxZoom: 19,
        maxNativeZoom: 19,
        maxZoom: 20,
        attribution: 'Maps © <a href="https://www.thunderforest.com/">Thunderforest</a>, Data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }),

    'MapQuest Roadmap': L.tileLayer(
        'https://{s}.tiles.mapquest.com/render/latest/vivid/{z}/{x}/{y}/256/png', {
	        subdomains:['a','b','c'],
	        maxZoom: 21,
	        attribution: '© 2022 MapQuest | <a href="https://hello.mapquest.com/terms-of-use">Terms</a>'
	    }
    ),

    'ÖPNVKarte': L.tileLayer(
    	'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
    	{
	        //maxZoom: 19,
	        maxNativeZoom: 19,
	        maxZoom: 20,
	        attribution:  'Map © <a href="https://memomaps.de/">MeMoMaps</a>, Data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    }
    ),

	'OpenCycleMap': L.tileLayer(
	    'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=' + THUNDERFOREST_KEY,
	    {
		    subdomains:['a', 'b', 'c'],
	        //maxZoom: 19, ???
	        maxNativeZoom: 19,
	        maxZoom: 20,
	        attribution: 'Maps © <a href="https://www.thunderforest.com/">Thunderforest</a>, Data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    }
    ),

    'OpenStreetMap': L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
	        subdomains:['a', 'b', 'c'],
	        maxNativeZoom: 19,
	        maxZoom: 20, // https://wiki.openstreetmap.org/wiki/Zoom_levels
	        attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	    }
    ),

    'OpenTopoMap': L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        {
	        subdomains:['a', 'b', 'c'],
	        //maxZoom: 16,
	        maxNativeZoom: 16,
	        maxZoom: 20,
	        attribution: 'Kartendaten: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: © <a href="https://opentopomap.org/">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
	    }
    ),

    'Outdoors': L.tileLayer(
    	'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=' + THUNDERFOREST_KEY,
    	{
	        subdomains:['a', 'b', 'c'],
	        //maxZoom: 19, ???
	        maxNativeZoom: 19,
	        maxZoom: 20,
	        attribution: 'Maps © <a href="https://www.thunderforest.com/">Thunderforest</a>, Data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    }
    ),

//    'Yandex Roadmap': L.yandex({ type: 'map' }),

};

//######################################
// satellite footage
//######################################
const sat_maps = {

    'Bing': new L.BingLayer(BING_KEY,
	    {
	        imagerySet: 'Aerial',
	        maxZoom: 20,
	    }
    ),

    'Bing (labels)': new L.BingLayer(BING_KEY,
	    {
	        imagerySet: 'AerialWithLabels',
	        maxZoom: 20,
	    }
    ),

    'Google': L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
	        maxZoom: 20,
	        subdomains:['mt0', 'mt1', 'mt2', 'mt3'],
	        attribution: '© Google', // DUMMY
	    }
    ),

    'Google (labels)': L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        {
	        maxZoom: 20,
	        subdomains:['mt0', 'mt1', 'mt2', 'mt3'],
	        attribution: '© Google', // DUMMY
	    }
    ),

    'Mapbox': L.tileLayer(
        'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=' + MAPBOX_KEY,
        {
	        maxZoom: 20,
	        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
	        //logo: 'mapbox-logo-white.png', //TODO
	    }
    ),

    'Mapbox (labels)': L.tileLayer(
        'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=' + MAPBOX_KEY,
        {
	        maxZoom: 20,
	        tileSize: 512,
	        zoomOffset: -1,
	        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
	        //logo: 'mapbox-logo-white.png', //TODO
	    }
    ),

    'MapQuest': L.tileLayer(
        'https://{s}.tiles.mapquest.com/render/latest/satellite/{z}/{x}/{y}/256/jpeg',
        {
	        subdomains:['a', 'b', 'c'],
	        maxZoom: 20,
	        attribution: '© 2022 MapQuest | <a href="https://hello.mapquest.com/terms-of-use">Terms</a>',
	    }
    ),

    'MapTiler': L.tileLayer(
        'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=' + MAPTILER_KEY,
        {
	        maxZoom: 21,
	        attribution: '© <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
	    }
    ),

//    'Yandex': L.yandex({
//    	type: 'satellite',
////    	maxNativeZoom: 18,
////    	maxZoom: 20,
//    }),
//
//    'Yandex (labels)': L.yandex({
//    	type: 'hybrid',
////    	maxNativeZoom: 18,
////    	maxZoom: 20,
//    }),
};

const base_maps = {...road_maps, ...sat_maps};

//######################################
// overlays
//######################################
const overlay_maps = {

    'Commons': L.commonsPhotos(),

    'Cycling': L.tileLayer(
        'https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png',
        {
	        maxNativeZoom: 16,
	        maxZoom: 20,
	    }
    ),

    'Google Streets': L.tileLayer(
        'http://{s}.google.com/vt/lyrs=m,h&x={x}&y={y}&z={z}',
        {
	        subdomains:['mt0', 'mt1', 'mt2', 'mt3'],
	        maxZoom: 20,
	    }
    ),

	'Google Streetview': L.gridLayer.googleMutant({
		type: null,
		styles: [],
		minZoom: 13,
	})
	.on('add', (evt) => evt.target._map._container.classList.toggle('streetview', true))
	.on('remove', (evt) => evt.target._map._container.classList.toggle('streetview', false)),

    'Hiking': L.tileLayer(
        'https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png',
        {
	        maxNativeZoom: 16, // 18
	        maxZoom: 20,
	    }
    ),

    'OpenSeaMap': L.tileLayer(
    	'https://t1.openseamap.org/seamark/{z}/{x}/{y}.png',
    	{
	        maxNativeZoom: 16,
	        maxZoom: 20,
	    }
    ),

};

overlay_maps['Google Streetview'].addGoogleLayer('StreetViewCoverageLayer');


let base = 'OpenStreetMap', overlay = '';
let zoom, lat, lng;

if (window.location.hash.startsWith('#map='))
{
    try
    {
        const parts = window.location.hash.substr(5).split('/');
        zoom = parseInt(parts[0]);
        lat = parseFloat(parts[1]);
        lng = parseFloat(parts[2]);
        if (parts.length > 3)
        {
            const m = decodeURIComponent(parts[3]);
            if (base_maps[m])
                base = m;
        }
        if (parts.length > 4)
        {
            const m = decodeURIComponent(parts[4]);
            if (overlay_maps[m])
                overlay = m;
        }
    }
    catch(e){}
}

if (!lng)
{
    // Berlin
    zoom = 12;
    lat = 52.51350476109457;
    lng = 13.409671783447267;
}

window.location.hash = `map=${zoom}/${lat}/${lng}/${base}/${overlay}`;

const map = L.map('map', {
	editable: true,
//    minZoom: 0,
    layers: [base_maps[base]],
    fullscreenControl: {position: 'topright'}, // https://github.com/Leaflet/Leaflet.fullscreen
    wheelPxPerZoomLevel: 240,
})
.on('click', function(evt) {
	if (overlay == 'Google Streetview')
	{
		const u = `https://maps.google.com/maps?q=&layer=c&cbll=${evt.latlng.lat},${evt.latlng.lng}&cbp=11,0,0,0,0`;
		window.open(u, 'streetview');
	}
})
.setView([lat, lng], zoom);

L.control.layers(base_maps, overlay_maps, {position: 'topleft'}).addTo(map);

L.control.scale().addTo(map);

L.control.measure({position: 'topleft'}).addTo(map);

map.addControl( new L.Control.Search({
	url: 'https://nominatim.openstreetmap.org/search?format=json&accept-language=de-DE&q={s}',
	jsonpParam: 'json_callback',
	propertyName: 'display_name',
	propertyLoc: ['lat','lon'],
	markerLocation: true,
	autoType: false,
	autoCollapse: true,
	minLength: 2,
	zoom:10,
}) );

L.control.locate({
	follow: true,
}).addTo(map);

if (overlay)
    overlay_maps[overlay].addTo(map);

// only if HTML5 FileReader is supported, add elevation and filelayer plugins
if (window.FileReader)
{
	// FileLayer
	const style = {color: '#ee0033', opacity: 0.6, weight: 3, clickable: false};
	L.Control.FileLayerLoad.LABEL = 'gpx';
	var fileL = L.Control.fileLayerLoad({
	    fileSizeLimit: 1024 * 1024 * 10,
		fitBounds: true,
		layerOptions: {
			style: style,
			//onEachFeature: el.addData.bind(el),
			pointToLayer: function (data, latlng) {
				return L.circleMarker(latlng, {style: style});
			}
		},
	}).addTo(map);

	fileL.loader.on('data:loaded', function (e){
		layersControl.addOverlay(e.layer, e.filename);
	});
}

function _mapChanged()
{
    const p = map.getCenter()
    window.location.hash = `map=${map.getZoom()}/${p.lat}/${p.lng}/${base}/${overlay}`;
	if (window.OnMapChanged)
    	window.OnMapChanged(map.getZoom(), p.lat, p.lng, base, overlay);
}

map.on('moveend', function(evt) {
	_mapChanged();
});

map.on('baselayerchange', function(evt) {
    base = evt.name;
    _mapChanged();
});

map.on('overlayadd', function(evt) {
    overlay = evt.name;
    _mapChanged();
});

map.on('overlayremove', function(evt) {
    overlay = '';
    _mapChanged();
});

_mapChanged();

// add separator after sat maps
document.querySelector('.leaflet-control-layers-base label:nth-child(1)').classList.add('heading-road');
document.querySelector(`.leaflet-control-layers-base label:nth-child(${Object.keys(road_maps).length + 1})`).classList.add('heading-sat');

// allow toggling overlay with space key
let last_overlay = null, space_toggled = false, rect = null;

function deg_to_rad(deg) {
	return deg * Math.PI / 180;
}

document.body.addEventListener("keydown", (evt) => {
	if ((overlay || last_overlay) && evt.keyCode == 32)
	{
		space_toggled = !space_toggled;
		if (space_toggled)
		{
			last_overlay = overlay_maps[overlay];
			overlay_maps[overlay].remove();
		}
		else
			last_overlay.addTo(map);
	}

	// g => open google sat in new tab (for streetview)
	if (evt.keyCode == 71)
	{
    	const p = map.getCenter()
    	window.open(`https://www.google.com/maps/@${p.lat},${p.lng},220m/data=!3m1!1e3`);
	}
});

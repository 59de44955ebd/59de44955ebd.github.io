'use strict';

const MAPBOX_KEY = 'pk.eyJ1IjoidnNsNDIiLCJhIjoiY2xha3o1ZmZ0MDA4ZDN2bXMzcnIweWhhcCJ9.IU5zt8kMIRsIhfKJWpgbgg';
const MAPTILER_KEY = 'ppaPBnSs4o1IOGtXW8oI';
const THUNDERFOREST_KEY = 'c6644d4c8d6f4bd18067c449f978a779';

//######################################
// road maps
//######################################
const road_maps = {

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
};

//######################################
// satellite footage
//######################################
const sat_maps = {

    'ArcGIS': L.tileLayer(
    	'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
	        maxZoom: 20,
	        attribution: '© Esri'
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
		//minZoom: 13,
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

let base = 'OpenStreetMap', overlays = [], overlays_start = null;
let zoom, lat, lng;

//######################################
// Trails
//######################################
const sidepanel_hiking = document.querySelector('.sidepanel-hiking');
const ul_hiking = sidepanel_hiking.querySelector('ul');

const sidepanel_cycling = document.querySelector('.sidepanel-cycling');
const ul_cycling = sidepanel_cycling.querySelector('ul');

let has_hiking = false;
let has_cycling = false;

//######################################
// Streetview
//######################################
const div_streetview = document.querySelector('.streetview-container');
const iframe_streetview = div_streetview.querySelector('iframe');
const div_resizer = div_streetview.querySelector('.resizer');
const div_streetview_close = document.querySelector('.streetview-close');

let streetview_loaded = false;
let sv_lat, sv_lng, sv_heading=0, sv_pitch=0, sv_zoom=1;

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
        if (parts.length > 4 && parts[4])
        {
            const m = decodeURIComponent(parts[4]);
            overlays_start = m.split('|');
        }
        if (parts.length > 5 && parts[5])
        {
            [sv_lat, sv_lng, sv_heading, sv_pitch, sv_zoom] = parts[5].split('|').map(parseFloat);
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

if (!window.location.hash.startsWith('#place='))
	window.location.hash = `map=${zoom}/${lat}/${lng}/${base}/${overlays.join('|')}`;

const marker_streetview = new L.Marker([lat, lng], {
	icon: new L.Icon.Default({'iconUrl': 'marker-icon-black.png'}),
    contextmenu: false,
});

let control_routing;
let marker_from, marker_to;

const map = L.map('map', {
	editable: true,
    layers: [base_maps[base]],
    wheelPxPerZoomLevel: 240,
	contextmenu: true,
	contextmenuItems: [
	{
	    text: 'Center map here',
	    callback: (e) => map.panTo(e.latlng),
	},
	'-',
	{
	    text: 'Route from here',
	    callback: function (e) {
	    	if (marker_from)
	    	{
	    		marker_from.remove();
	    		marker_from = null;
	    	}
	    	if (marker_to)
	    	{
				control_routing.setWaypoints([
					e.latlng,
					marker_to._latlng
				])
				.addTo(map);
				control_routing._container.firstChild.onclick = function(e){
					control_routing.remove();
				}
				marker_to.remove();
				marker_to = null;
	    	}
	    	else
	    	{
	    		control_routing.remove();
				marker_from = new L.Marker(e.latlng, {
					icon: new L.Icon.Default,
					draggable: true,
			        contextmenu: true,
			        contextmenuInheritItems: false,
			        contextmenuItems: [{
			            text: 'Remove',
			            callback: (e) => {
			            	e.relatedTarget.remove();
			            	marker_from = null;
			            },
			        }],
				}).addTo(map);
			}
		}
	},
	{
	    text: 'Route to here',
	    callback: function (e) {
	    	if (marker_to)
	    	{
	    		marker_to.remove();
	    		marker_to = null;
	    	}
	    	if (marker_from)
	    	{
				control_routing.setWaypoints([
					marker_from._latlng,
					e.latlng
				])
				.addTo(map);
				control_routing._container.firstChild.onclick = function(e){
					control_routing.remove();
				}
				marker_from.remove();
				marker_from = null;
	    	}
	    	else
	    	{
	    		control_routing.remove();
				marker_to = new L.Marker(e.latlng, {
					icon: new L.Icon.Default,
					draggable: true,
			        contextmenu: true,
			        contextmenuInheritItems: false,
			        contextmenuItems: [{
			            text: 'Remove',
			            callback: (e) => {
			            	e.relatedTarget.remove();
			            	marker_to = null;
			            },
			        }],
				}).addTo(map);
			}
		}
	},
	'-',
	{
	    text: 'Reload Page',
	    callback: () => {location.reload();},
	},
	]
})
.on('click', function(evt) {
	if (overlays.includes('Google Streetview'))
	{
		iframe_streetview.contentWindow.gotoLatLng(evt.latlng.lat, evt.latlng.lng);
		marker_streetview.setLatLng(evt.latlng);
	}
})

const control_layers = L.control.layers(base_maps, overlay_maps, {position: 'topleft'}).addTo(map);

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

control_routing = L.Routing.control({
	collapsible: true,
	routeWhileDragging: true,
	reverseWaypoints: true,
	showAlternatives: true,
	altLineOptions: {
		styles: [
			{color: 'black', opacity: 0.15, weight: 9},
			{color: 'white', opacity: 0.8, weight: 6},
			{color: 'blue', opacity: 0.5, weight: 2}
		]
	},
	router: L.Routing.mapbox(MAPBOX_KEY, {
		profile: 'mapbox/driving', // driving cycling walking
		language: 'de',
	}),
});

const filelayer_style = {
    color: 'red',
    opacity: 1.0,
    fillOpacity: 1.0,
    weight: 2,
    clickable: true
};

const control_elevation = L.control.elevation({
	position:"bottomright",
	theme: "red-theme",
	collapsed: true,
	margins: {
    	top: 10,
    	right: 25,
    	bottom: 25,
    	left: 50
	},
	detached: false,
})
.addTo(map);

const control_filelayer = L.Control.fileLayerLoad({
    fitBounds: true,
    layerOptions: {
        style: filelayer_style,
        onEachFeature: control_elevation.addData.bind(control_elevation),
        pointToLayer: function (data, latlng) {
            return L.circleMarker(
                latlng,
                { style: filelayer_style }
            );
        }
    }
})
.addTo(map);

/**
 * Truncates value based on number of decimals
 *
 * @param {number} num - The input value.
 * @param {number} len - The number of decimals.
 * @return {number} The truncated vale.
 */
function round_prec(num, len) {
    return Math.round(num * (Math.pow(10, len))) / (Math.pow(10, len));
}

/**
 * Calculates overall length of a MultiLineString
 *
 * @param {Object} layer - The MultiLineString layer.
 * @return {number} The length im meters.
 */
function get_path_length(layer)
{
    const latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs();
    if (latlngs.length < 2)
    	return 0;
	let len = 0;
    for (var i = 0; i < latlngs.length - 1; i++)
    {
        len += latlngs[i].distanceTo(latlngs[i + 1]);
    }
    return len;
}

let current_file_layer;

control_filelayer.loader.on('data:loading', function (e) {
	if (current_file_layer)
	{
		current_file_layer.remove();
		control_elevation.clear();
		control_elevation.show(false);
	}
});

control_filelayer.loader.on('data:loaded', function (e) {
	current_file_layer = e.layer;
	if (control_elevation._maxElevation != 0)
		control_elevation.show(true);
    e.layer.bindPopup((layer) => {
    	let html = `<b>${e.filename}</b><br>`;
    	if (layer._latlngs)
    	{
			html += `<br><b>Points</b>: ${layer._latlngs.length}`;
			html += `<br><b>Length</b>: ${round_prec(get_path_length(layer)/1000, 2)} km`;
    	}
    	return html;
    });
});

function _mapchanged()
{
    const p = map.getCenter();
    window.location.hash = `map=${map.getZoom()}/${p.lat}/${p.lng}/${base}/${overlays.join('|')}`;
	if (window.OnMapChanged)
    	window.OnMapChanged(map.getZoom(), p.lat, p.lng, base, overlays.join('|'));
}

map.on('moveend', function(evt) {
	if (has_hiking)
		update_trails('hiking');
	if (has_cycling)
		update_trails('cycling');
	_mapchanged();
});

map.on('baselayerchange', function(evt) {
    base = evt.name;
    _mapchanged();
});

map.on('overlayadd', function(evt) {
	if (evt.name in overlay_maps)
    	overlays.push(evt.name);
	if (evt.name == 'Hiking')
	{
		has_hiking = true;
		sidepanel_hiking.style.right = has_cycling ? '240px' : '10px';
		sidepanel_hiking.style.display = 'block'; //'flex';
		update_trails('hiking');
	}
	else if (evt.name == 'Cycling')
	{
		has_cycling = true;
		sidepanel_cycling.style.right = has_hiking ? '240px' : '10px';
		sidepanel_cycling.style.display = 'block'; //'flex';
		update_trails('cycling');
	}
	else if (evt.name == 'Google Streetview')
	{
		div_streetview.style.display = 'block';
		marker_streetview.addTo(map);
		map.invalidateSize();
		const latlng = map.getCenter();
		marker_streetview.setLatLng(latlng);
		if (!streetview_loaded)
		{
			iframe_streetview.src = 'streetview.htm';
			streetview_loaded = true;
			iframe_streetview.onload = () => iframe_streetview.contentWindow.gotoLatLng(
				sv_lat ? sv_lat : latlng.lat,
				sv_lng ? sv_lng : latlng.lng,
				{heading: sv_heading, pitch: sv_pitch, zoom: sv_zoom}
			);
		}
		else
			iframe_streetview.contentWindow.gotoLatLng(latlng.lat, latlng.lng);
		div_streetview_close.style.display = 'block';
	}
    _mapchanged();
});

map.on('overlayremove', function(evt) {
	if (evt.name in overlay_maps)
		overlays.splice(overlays.indexOf(evt.name), 1);
	if (evt.name == 'Hiking')
	{
		has_hiking = false;
		sidepanel_hiking.style.display = 'none';
		ul_hiking.innerHTML = '';
		if (has_cycling)
			sidepanel_cycling.style.right = '10px';
	}
	else if (evt.name == 'Cycling')
	{
		has_cycling = false;
		sidepanel_cycling.style.display = 'none';
		ul_cycling.innerHTML = '';
		if (has_hiking)
			sidepanel_hiking.style.right = '10px';
	}
	else if (evt.name == 'Google Streetview')
	{
		div_streetview.style.display = 'none';
		marker_streetview.remove();
		div_streetview_close.style.display = 'none';
		map.invalidateSize();
	}
    _mapchanged();
});

if (overlays_start)
{
	for (let overlay of overlays_start)
		if (overlay in overlay_maps)
    		overlay_maps[overlay].addTo(map);
}

function get_bbox()
{
	const bounds = map.getBounds();
	return [
		...Object.values(L.CRS.EPSG3857.project(bounds._southWest)),
		...Object.values(L.CRS.EPSG3857.project(bounds._northEast))
	].join(',');
}

function update_trails(flavor)
{
	const bbox = get_bbox();
	fetch(`https://${flavor}.waymarkedtrails.org/api/v1/list/by_area?limit=50&bbox=${bbox}`)
	.then(res => res.json())
	.then(res => {
		let html = '';
		for (const row of res.results)
		{
			if (!row.name)
				continue;
			html += `<li data-id="${row['id']}" class="route-title" title="${row.name}">
				<img alt="route symbol" src="https://${flavor}.waymarkedtrails.org/api/v1/symbols/id/${row['symbol_id']}.svg">
				<span>${row.name}</span>
			</li>`;
		}
		if (flavor == 'hiking')
			ul_hiking.innerHTML = html;
		else
			ul_cycling.innerHTML = html;
	});
}

function on_mousemove(event)
{
	div_streetview.style.height = `${event.clientY}px`;
}

function on_mouseup(event)
{
	iframe_streetview.style.display = 'block';
	div_streetview.style.backgroundColor = 'unset';
	document.removeEventListener('mousemove', on_mousemove);
	document.removeEventListener('mouseup', on_mouseup);
	map.invalidateSize();
}

div_resizer.addEventListener('mousedown', (event) => {
	div_streetview.style.backgroundColor = '#333';
	iframe_streetview.style.display = 'none';
	document.addEventListener('mousemove', on_mousemove);
	document.addEventListener('mouseup', on_mouseup);
});

div_streetview_close.addEventListener('click', () => {
	overlay_maps['Google Streetview'].remove();
});

function updateStreetviewMarker(pos)
{
	marker_streetview.setLatLng([pos.lat(), pos.lng()]);
}

function updateStreetviewMarkerHash(pos, pov)
{
	const p = map.getCenter();
	window.location.hash = `map=${map.getZoom()}/${p.lat}/${p.lng}/${base}/${overlays.join('|')}/${[pos.lat(), pos.lng(), pov.heading, pov.pitch, pov.zoom].join('|')}`;
}

function gotoPlace(place)
{
	fetch(`https://nominatim.openstreetmap.org/search?format=json&accept-language=de-DE&q=${place}`)
	.then(res => res.json())
	.then(res => {
		if (res.length)
		{
			map.setView([res[0].lat, res[0].lon], 14);
			// add separator after sat maps
			document.querySelector('.leaflet-control-layers-base label:nth-child(1)').classList.add('heading-road');
			document.querySelector(`.leaflet-control-layers-base label:nth-child(${Object.keys(road_maps).length + 1})`).classList.add('heading-sat');
			new L.Marker([res[0].lat, res[0].lon], {
				icon: new L.Icon.Default,
		        contextmenu: true,
		        contextmenuInheritItems: false,
		        contextmenuItems: [{
		            text: 'Remove',
		            callback: (e) => {
		            	e.relatedTarget.remove();
		            },
		        }],
			})
			.addTo(map);
		}
	});
}

const iframe_wmt = document.querySelector('iframe.wmt');
const btn_wmt = document.querySelector('button.wmt');
btn_wmt.onclick = () => {
	iframe_wmt.style.display = 'none';
	btn_wmt.style.display = 'none';
	iframe_wmt.src = 'about:blank';
};

function show_trails_frame(e, trail) {
	e.preventDefault();
	const trail_flavor = trail.parentNode.dataset.flavor;
	const url = `https://${trail_flavor}.waymarkedtrails.org/#route?id=${trail.dataset.id}&type=relation`;
	iframe_wmt.src = url;
	iframe_wmt.style.display = 'block';
	btn_wmt.style.display = 'block';
}

for (let ul of [ul_hiking, ul_cycling])
{
	ul.addEventListener('click', (e) => {
		e.preventDefault();
		let el = e.target;
		while (el.tagName != 'LI')
			el = el.parentNode;
		show_trails_frame(e, el);
	});
}

const dark_css = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');

function force_theme(is_dark)
{
	//document.documentElement.setAttribute("data-theme", "dark");
	document.querySelector('meta[name=color-scheme]').content = is_dark ? 'dark' : 'light';
	dark_css.media = is_dark ? 'all' : 'not all';
}

function reset_theme()
{
	//document.documentElement.setAttribute("data-theme", "dark");
	document.querySelector('meta[name=color-scheme]').content = 'light dark';
	dark_css.media = '(prefers-color-scheme: dark)';
}

if (window.location.hash.startsWith('#place='))
{
	const place = window.location.hash.substr(7);
	gotoPlace(place);
}
else
{
	map.setView([lat, lng], zoom);
	// add separator after sat maps
	document.querySelector('.leaflet-control-layers-base label:nth-child(1)').classList.add('heading-road');
	document.querySelector(`.leaflet-control-layers-base label:nth-child(${Object.keys(road_maps).length + 1})`).classList.add('heading-sat');

	_mapchanged();
}

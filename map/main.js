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

let has_hiking = false;
let has_cycling = false;

let streetview_loaded = false;

const sidepanel = document.querySelector('.sidepanel');
const div_hiking = sidepanel.querySelector('.sidepanel-content .hiking');
const ul_hiking = div_hiking.querySelector('ul');
const div_cycling = sidepanel.querySelector('.sidepanel-content .cycling');
const ul_cycling = div_cycling.querySelector('ul');

const div_streetview = document.querySelector('#streetview');
const iframe_streetview = document.querySelector('#streetview iframe');
const div_resizer = document.querySelector('#resizer');

const div_streetview_close = document.querySelector('#streetview-close');

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
	icon: new L.Icon.Default({'iconUrl': 'marker-icon-pink.png'}),
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
	router: L.Routing.mapbox('pk.eyJ1IjoidnNsNDIiLCJhIjoiY2xha3o1ZmZ0MDA4ZDN2bXMzcnIweWhhcCJ9.IU5zt8kMIRsIhfKJWpgbgg', {
		profile: 'mapbox/driving', // driving cycling walking
		language: 'de',
	}),
});
	
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
	_mapChanged();
});

map.on('baselayerchange', function(evt) {
    base = evt.name;
    _mapChanged();
});

map.on('overlayadd', function(evt) {
    overlays.push(evt.name);

	if (evt.name == 'Hiking')
	{
		has_hiking = true;
		div_hiking.style.display = 'block';
		update_trails('hiking');
	}
	else if (evt.name == 'Cycling')
	{
		has_cycling = true;
		div_cycling.style.display = 'block';
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
			iframe_streetview.onload = () => iframe_streetview.contentWindow.gotoLatLng(latlng.lat, latlng.lng);
		}
		else
			iframe_streetview.contentWindow.gotoLatLng(latlng.lat, latlng.lng);
		div_streetview_close.style.display = 'block';
	}
	if (has_hiking || has_cycling)
		sidepanel.style.display = 'flex';
	
    _mapChanged();
});

map.on('overlayremove', function(evt) {
	overlays.splice(overlays.indexOf(evt.name), 1);
	
	if (evt.name == 'Hiking')
	{
		has_hiking = false;
		div_hiking.style.display = 'none';
		ul_hiking.innerHTML = '';
	}
	else if (evt.name == 'Cycling')
	{
		has_cycling = false;
		div_cycling.style.display = 'none';
		ul_cycling.innerHTML = '';
	}
	else if (evt.name == 'Google Streetview')
	{
		div_streetview.style.display = 'none';
		marker_streetview.remove();
		div_streetview_close.style.display = 'none';
		map.invalidateSize();
	}
	if (!has_hiking && !has_cycling)
		sidepanel.style.display = 'none';

    _mapChanged();
});

if (overlays_start)
{
	for (let overlay of overlays_start)
    	overlay_maps[overlay].addTo(map);
}

// add separator after sat maps
document.querySelector('.leaflet-control-layers-base label:nth-child(1)').classList.add('heading-road');
document.querySelector(`.leaflet-control-layers-base label:nth-child(${Object.keys(road_maps).length + 1})`).classList.add('heading-sat');

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
	fetch(`https://${flavor}.waymarkedtrails.org/api/v1/list/by_area?limit=25&bbox=${bbox}`)
	.then(res => res.json())
	.then(res => {
		let html = '';
		for (const row of res.results)
		{
			if (!row.name)
				continue;
			html += `<li>
				<button type="button">
					<div class="route-symbol">
						<img alt="route symbol" src="https://${flavor}.waymarkedtrails.org/api/v1/symbols/id/${row['symbol_id']}.svg">
					</div>
					<div class="main-info">
						<div class="title-line">
							<div class="route-title" title="${row.name}">${row.name}</div>
							<div class="route-ref">${row.ref ? row.ref : ''}</div>
						</div>
					</div>
				</button>
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

function gotoPlace(place)
{
	fetch(`https://nominatim.openstreetmap.org/search?format=json&accept-language=de-DE&q=${place}`)
	.then(res => res.json())
	.then(res => {
		if (res.length)
		{			
			map.setView([res[0].lat, res[0].lon], 12);
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

if (window.location.hash.startsWith('#place='))
{
	const place = window.location.hash.substr(7);
	gotoPlace(place);
}
else
{
	map.setView([lat, lng], zoom);
	_mapChanged();
}
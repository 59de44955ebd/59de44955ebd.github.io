let _el_ = document.createElement("link");
_el_.type = "text/css";
_el_.rel = "stylesheet";
_el_.href = "https://59de44955ebd.github.io/opentopo-routes/routes.css";
document.head.appendChild(_el_);

_el_ = document.createElement("div");
_el_.classList = 'sidepanel';
_el_.innerHTML = `<div class="sidepanel-content">
	<div class="sidepanel-page hiking">
		<h3><span>Wanderrouten</span></h3>
		<ul></ul>
	</div>
	<div class="sidepanel-page cycling">
		<h3><span>Radrouten</span></h3>
		<ul></ul>
	</div>
</div>`;
document.body.appendChild(_el_);

let has_hiking = false;
let has_cycling = false;

const sidepanel = document.querySelector('.sidepanel');
const div_hiking = sidepanel.querySelector('.sidepanel-content .hiking');
const ul_hiking = div_hiking.querySelector('ul');
const div_cycling = sidepanel.querySelector('.sidepanel-content .cycling');
const ul_cycling = div_cycling.querySelector('ul');

function get_bbox()
{
	const bbox = map.getBounds();	
	return [
		...Object.values(L.CRS.EPSG3857.project(bbox._southWest)),
		...Object.values(L.CRS.EPSG3857.project(bbox._northEast))
	].join(',');
}

function update_trails(flavor)
{
	var bbox = get_bbox();
	fetch(`https://${flavor}.waymarkedtrails.org/api/v1/list/by_area?limit=20&bbox=${bbox}`)
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

map.on('overlayadd', function(e) {
	if(e.layer == lonviaHiking)
	{
		has_hiking = true;
		div_hiking.style.display = 'block';
		update_trails('hiking');
	}
	else if(e.layer == lonviaCycling)
	{
		has_cycling = true;
		div_cycling.style.display = 'block';
		update_trails('cycling');
	}
	sidepanel.style.display = 'flex';
});

map.on('overlayremove', function(e) {
	if(e.layer == lonviaHiking)
	{
		has_hiking = false;
		div_hiking.style.display = 'none';
		ul_hiking.innerHTML = '';
	}
	else if(e.layer == lonviaCycling)
	{
		has_cycling = false;
		div_cycling.style.display = 'none';
		ul_cycling.innerHTML = '';
	}
	if (!has_hiking && !has_cycling)
		sidepanel.style.display = 'none';
});

map.on('moveend', function(e) {
	if (has_hiking)
		update_trails('hiking');
	if (has_cycling)
		update_trails('cycling');
});

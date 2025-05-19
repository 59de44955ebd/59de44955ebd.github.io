
document.write(`<div class="sidepanel">
	<div class="sidepanel-content">
		<div class="sidepanel-page hiking">
			<h3><span>Wanderrouten</span></h3>
			<ul></ul>
		</div>
		<div class="sidepanel-page cycling">
			<h3><span>Radrouten</span></h3>
			<ul></ul>
		</div>
	</div>
</div>`);


let has_hiking = false;
let has_cycling = false;

const sidepanel = document.querySelector('.sidepanel');

const div_hiking = document.querySelector('.sidepanel-content .hiking');
const div_cycling = document.querySelector('.sidepanel-content .cycling');

function get_bbox()
{
	const bbox = map.getBounds();
	return [
		...proj4('EPSG:4326', 'EPSG:3857').forward([bbox._southWest.lng, bbox._southWest.lat]),
		...proj4('EPSG:4326', 'EPSG:3857').forward([bbox._northEast.lng, bbox._northEast.lat])
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
		document.querySelector(`.sidepanel-content .${flavor} ul`).innerHTML = html;
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
	}
	else if(e.layer == lonviaCycling)
	{
		has_cycling = false;
		div_cycling.style.display = 'none';
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


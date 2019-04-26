
const options = {
	center: [53.6944,17.5569],
	zoom: 13
}

let markers = [];

const map = L.map('map', options);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'OSM'})
.addTo(map);

const myFunction = (e) => {
	const coord = e.latlng.toString().split(',');
	const brokenLat = coord[0].split('(');
	const brokenLng = coord[1].split(')');

	const fixedLat = brokenLat[1];
	const fixedLng = brokenLng[0];

	const marker = L.marker([fixedLat,fixedLng],{draggable: true}).addTo(map);
	markers.push(marker);

	const tbody = document.querySelector('tbody');
	const trc = document.createElement('tr');
	let trcNumber = markers.length;
	trc.setAttribute('id',marker._leaflet_id);
	const thRow = document.createElement('th');
	thRow.setAttribute('scope', 'row');
	thRow.classList.add('number');
	thRow.setAttribute('id',marker._leaflet_id);
	thRow.textContent = trcNumber;
	tbody.appendChild(trc);
	trc.appendChild(thRow);
	const tdNorth = document.createElement('td');
	tdNorth.classList.add('north');
	tdNorth.setAttribute('id',marker._leaflet_id);
	tdNorth.textContent = marker._latlng.lat;
	trc.appendChild(tdNorth);
	const tdEast = document.createElement('td');
	tdEast.classList.add('east');
	tdEast.textContent = marker._latlng.lng;
	trc.appendChild(tdEast);
	const deleteBtn = document.createElement('button');
	deleteBtn.setAttribute('id', marker._leaflet_id);
	deleteBtn.setAttribute('class','btn btn-warning');
	deleteBtn.textContent = "Delete";

	deleteBtn.addEventListener('click', function(){
		deleteBtn.parentNode.remove();
		markers.forEach(marker => {
			if(marker._leaflet_id == deleteBtn.id) { 
				map.removeLayer(marker)

			}
		})
	})
	
	trc.appendChild(deleteBtn);

	marker.on('dragend', function(){
		tdNorth.textContent = marker._latlng.lat;

		tdEast.textContent = marker._latlng.lng;

	})	
}

map.addEventListener('click', myFunction)






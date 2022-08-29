document.getElementById('loading-spinner').style.display = 'none';

let loadPhones = (search, dataList) => {
	document.getElementById('loading-spinner').style.display = 'block';

	let url = ` https://openapi.programming-hero.com/api/phones?search=${search}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => displayPhones(data.data, dataList));
};

let searchPhones = (dataList) => {
	let inputField = document.getElementById('phone-field');
	let text = inputField.value;
	loadPhones(text, dataList);
};

loadPhones('iphone');

let displayPhones = (phones, dataList) => {
	document.getElementById('loading-spinner').style.display = 'none';

	let phoneContainer = document.getElementById('phone-container');
	phoneContainer.innerHTML = '';

	// Error validation
	let errorMessage = document.getElementById('error-message');
	if (phones.length === 0) {
		errorMessage.classList.remove('d-none');
	} else {
		errorMessage.classList.add('d-none');
	}

	// display 10 phones

	let showAll = document.getElementById('show-all');
	if (dataList && phones.length > 10) {
		phones = phones.slice(0, 10);
		showAll.classList.remove('d-none');
	} else {
		showAll.classList.add('d-none');
	}

	// display all phones
	phones.forEach((phone) => {
		let div = document.createElement('div');
		div.classList.add('col');
		div.innerHTML = `
            <div onclick="loadPhoneDetails('${phone.slug}')" class="card h-100">
					<img src="${phone.image}"  class="mx-auto d-block my-3" />
					<div class="card-body">
                        <h5 class="card-text">
						    Brand - ${phone.brand} 
						</h5>
						<h2 class="card-title text-danger fw-bolder">${phone.phone_name}</h2>
						<button type="button" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
											See Details
  						</button>
					</div>
		    </div>
        `;
		phoneContainer.appendChild(div);
	});
};

document.getElementById('show-all-btn').addEventListener('click', function () {
	searchPhones();
});

document.getElementById('phone-field').addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		searchPhones(10);
	}
});

let loadPhoneDetails = (phoneId) => {
	let url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => displayPhoneDetails(data.data));
};

let displayPhoneDetails = (phones) => {
	let phoneDetails = document.getElementById('phone-details');
	let modalTitles = document.getElementById('modalTitle');
	modalTitles.innerText = `${phones.name}`;
	phoneDetails.innerHTML = `
	<h5>Release Date : ${phones.releaseDate}</h5>
	`;
};

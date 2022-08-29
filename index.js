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
						
					</div>
		    </div>
        `;
		phoneContainer.appendChild(div);
	});
};

document.getElementById('show-all-btn').addEventListener('click', function () {
	searchPhones();
});

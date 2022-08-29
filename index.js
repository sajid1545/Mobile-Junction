document.getElementById('no-found-message').style.display = 'none';
document.getElementById('loading-spinner').style.display = 'none';

let loadPhones = (search) => {
	document.getElementById('loading-spinner').style.display = 'block';

	let url = ` https://openapi.programming-hero.com/api/phones?search=${search}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => displayPhones(data.data));
};

let searchPhones = () => {
	let inputField = document.getElementById('phone-field');
	let text = inputField.value;
	loadPhones(text);
};

loadPhones('iphone');

let displayPhones = (phones) => {
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

let loadPhoneDetails = (phoneId) => {
	let url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => displayPhonesDetails(data.data));
};

let displayPhonesDetails = (phones) => {
	let detailsContainer = document.getElementById('phone-details-container');
	detailsContainer.classList.add('card');

	detailsContainer.innerHTML = `
	                <img src="${phones.image}" class="mx-auto d-block my-3" >
	                <div class="card-body">
	                    <h5 class="card-text">
						    Brand - ${phones.brand}
						</h5>
	                    <h2 class="card-title text-danger fw-bolder">${phones.name}</h1>
						<p class="text-primary fw-bolder fs-4">Specifications : </p>
						<ul>
						<li class="list-unstyled text-dark fw-bold">${phones.mainFeatures.chipSet}</li>
						<li class="list-unstyled text-dark fw-bold">${phones.mainFeatures.displaySize}</li>
						<li class="list-unstyled text-dark fw-bold">${phones.mainFeatures.memory}</li>
						<li class="list-unstyled text-dark fw-bold">${phones.mainFeatures.storage}</li>
						<li class="list-unstyled text-dark fw-bold">${
							phones.others ? phones.others.GPS : 'No other features'
						}</li>
						<li class="list-unstyled text-dark fw-bold">${
							phones.others ? phones.others.USB : 'No other features'
						}</li>
						
						<li class="list-unstyled text-dark fw-bold">${
							phones.others ? phones.others.WLAN : 'No other features'
						}</li>
						</ul>

					</div>

	`;
	console.log(phones);
};

/*
 * TO DO: 
 * -> Breyta dagsettningum 
 *  ----> 11. Decembet 1986 --> 1986-12-11 
 *  Skráð
 *  Seinast breytt 
 *  Rennur út
 */
// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

document.addEventListener('DOMContentLoaded', function() {
	const domains = document.querySelector('.domains');

  	program.init(domains);
});

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
	let domains;

	// Fall til að breyta dagsettningum 
	function formatDate(date) {
		// 11. December 1986 --> 1986-12-11
		var newDate = new		

		//if (month.length < 2) month = '0' + month;
		//if (day.length < 2) day = '0' + day;

		return newDate;
	}

	// Fall til að birta gögn
	function displayWebsites(domainsList) {
		if(domainsList.length === 0) {
			displayError('Lén er ekki skráð');
			return;
		}

		const [{ domain, registered, lastChange, expires, registrantname, email, address, country }] = domainsList;
		const dl = document.createElement('dl');

		// Breyta dagsettningum 
		

		// Lén
		const domainElement = document.createElement('dt');
		domainElement.appendChild(document.createTextNode('Lén'));
		dl.appendChild(domainElement);

		const domainValueElement = document.createElement('dd');
		domainValueElement.appendChild(document.createTextNode(domain));
		dl.appendChild(domainValueElement);

		// Skráð
		const registeredElement = document.createElement('dt');
		registeredElement.appendChild(document.createTextNode("Skráð"));
		dl.appendChild(registeredElement);

		const registeredValueElement = document.createElement('dd');
		registeredValueElement.appendChild(document.createTextNode(formatDate(registered)));
		dl.appendChild(registeredValueElement);

		// Seinasta breyting
		const lastChangeElement = document.createElement('dt');
		lastChangeElement.appendChild(document.createTextNode('Seinasta breyting'));
		dl.appendChild(lastChangeElement);

		const lastChangeValueElement = document.createElement('dd');
		lastChangeValueElement.appendChild(document.createTextNode(lastChange));
		dl.appendChild(lastChangeValueElement);

		// Rennur út
		const expiresElement = document.createElement('dt');
		expiresElement.appendChild(document.createTextNode('Rennur út'));
		dl.appendChild(expiresElement);
		
		const expiresValueElement = document.createElement('dd');
		expiresValueElement.appendChild(document.createTextNode(expires));
		dl.appendChild(expiresValueElement);

		// Skráningaraðili
		if(registrantname !== null && registrantname !== '') {
	                const registrantnameElement = document.createElement('dt');
        	        registrantnameElement.appendChild(document.createTextNode('Skráningaraðili'));
                	dl.appendChild(registrantnameElement);

                	const registrantnameValueElement = document.createElement('dd');
                	registrantnameValueElement.appendChild(document.createTextNode(registrantname));
                	dl.appendChild(registrantnameValueElement);
		}

		// Netfang
		if(email !== null && email !== '') {
			const emailElement = document.createElement('dt');
			emailElement.appendChild(document.createTextNode('Netfang'));
			dl.appendChild(emailElement);

			const emailValueElement = document.createElement('dd');
			emailValueElement.appendChild(document.createTextNode(email));
			dl.appendChild(emailValueElement);
		}

		// Heimilisfang
		if(address !== null && address !== '') {
			const addressElement = document.createElement('dt');
			addressElement.appendChild(document.createTextNode('Heimilisfang'));
			dl.appendChild(addressElement);

			const addressValueElement = document.createElement('dd');
			addressValueElement.appendChild(document.createTextNode(address));
			dl.appendChild(addressValueElement);
		}

		// Land
		if(country !== null && address !== '') {
			const countryElement = document.createElement('dt');
			countryElement.appendChild(document.createTextNode('Land'));
			dl.appendChild(countryElement);
		
			const countryValueElement = document.createElement('dd');
			countryValueElement.appendChild(document.createTextNode(country));
			dl.appendChild(countryValueElement);
		}

		const container = domains.querySelector('.results');

		while(container.firstChild) {
			container.removeChild(container.firstChild);
		}

		container.appendChild(dl);
	}

	// Villur
	function displayError(error) {
		const container = domains.querySelector('.results');
		
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		container.appendChild(document.createTextNode(error));
	}


	// Sækja gögn
	function fetchData(domain) {
		fetch(`${API_URL}${domain}`)
		.then((response) => {
			if(response.ok) {
				return response.json();
			}

			throw new Error('Villa við að sækja gögn');
		})
		.then((data) => {
			displayWebsites(data.results);
		})
		.catch((error) => {
			displayError('Villa við að sækja gögn');
			console.error(error);
		})
	}

	function onSubmit(e) {
		e.preventDefault();
		const input = e.target.querySelector('input');

		if(input.value === '') {
			displayError('Leit verður að vera strengur');
		} else {
			fetchData(input.value);	
		}
	}


	function init(_domains) {
		domains = _domains;
		const form = domains.querySelector('form');
		form.addEventListener('submit', onSubmit);
  	}

  return {
    init,
  };
})();

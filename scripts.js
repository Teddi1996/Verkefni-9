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

	function displayWebsites(domainsList) {
		if(domainsList.length === 0) {
			displayError('Lén er ekki skráð');
			return;
		}

		const [{ domain, registered, lastChange, expires }] = domainsList;
		const dl = document.createElement('dl');

		// Lén
		const domainElement = document.createElement('dt');
		domainElement.appendChild(document.createTextNode('Lén'));
		dl.appendChild(domainElement);

		const domainValueElement = document.createElement('dd');
		domainElement.appendChild(document.createTextNode(domain));
		dl.appendChild(domainValueElement);


		// Skráð
		const registeredElement = document.createElement('dt');
		registeredElement.appendChild(document.createTextNode("Skráð"));
		dl.appendChild(registeredElement);

		const registeredValueElement = document.createElement('dd');
		registeredValueElement.appendChild(document.createTextNode(registered));
		dl.appendChild(registeredValueElement);

		// Seinasta breyting
		const lastChangeElement = document.createElement('dt');
		lastChangeElement.appendChild(document.createTextNode('Seinasta breyting'));
		dl.appendChild(lastChangeElement);

		const lastChangeValueElement = document.createElement('dd');
		lastChangeElement.appendChild(document.createTextNode(lastChange));
		dl.appendChild(lastChangeValueElement);


		// Rennur út
		const expiresElement = document.createElement('dd');
		expiresElement.appendChild(document.createTextNode('Rennur út'));
		dl.appendChild(expiresElement);
		
		const expiresValueElement = document.createElement('dt');
		expiresValueElement.appendChild(document.createTextNode(expires));
		dl.appendChild(expiresValueElement);


		const container = domains.querySelector('.results');

		while(container.firstChild) {
			container.removeChild(container.firstChild);
		}

		container.appendChild(dl);
	}

	//* on error */
	function displayError(error) {
		const container = domains.querySelector('.results');
		
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		container.appendChild(document.createTextNode(error));
	}


	//* fetch data
	function fetchData(domain) {
		fetch(`${API_URL}${domain}`)
		.then((response) => {
			if(response.ok) {
				return response.json();
			}

			throw new Error('Villa kom upp');
		})
		.then((data) => {
			displayWebsites(data.results);
		})
		.catch((error) => {
			displayError('villa');
			console.error(error);
		})
	}

	function onSubmit(e) {
		e.preventDefault();
		const input = e.target.querySelector('input');

		// To Do
		// Höndla tómastreng

		if(input === "") {
			displayError('Leit verður að vera strengur');
		}

		fetchData(input.value);
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

const getData = async () => {
	const response = await fetch(
		`https://openexchangerates.org/api/latest.json?app_id=${API_KEY}` // API used is Open Exchange Rates
	);
	const data = await response.json();
	chrome.storage.sync.set({ currency: data.rates.CAD });
	updatePrices(data.rates.CAD);
};
const getAllText = () => {
	let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	let node;
	let nodes = [];

	while ((node = walker.nextNode())) {
		nodes.push(node);
	}
	return nodes;
};
const commaErase = () => {
	// For Celsius - gets rid of commas for the conversion
	getAllText().forEach((node) => {
		const { nodeValue } = node;
		const newValue = nodeValue.replace(/(?<=\d),(?=\d)/g, "");
		if (newValue !== nodeValue) {
			node.nodeValue = newValue;
		}
	});
};
const updatePrices = (data) => {
	commaErase();
	getAllText().forEach((node) => {
		const { nodeValue } = node;
		const newValue = nodeValue.replace(
			/\$[0-9.,]+/gm,
			parseFloat(nodeValue.replace("$", "") * data)
		);
		if (newValue !== nodeValue) {
			node.nodeValue = "$" + parseFloat(newValue).toFixed(2);
		}
	});
};
getData();

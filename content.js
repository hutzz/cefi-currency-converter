const getData = async () => {
	const response = await fetch(
		`https://openexchangerates.org/api/latest.json?app_id=1ac5070366b5421996b168b115f43f25` // API used is Open Exchange Rates
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
			/\$[\d.,]+/gm,
			parseFloat(nodeValue.replace("$", "") * data)
		);
		if (newValue !== nodeValue) {
			node.nodeValue = "$" + parseFloat(newValue).toFixed(2);
		}
	});
};
getData();

chrome.storage.sync.get(["currency"], (result) => {
	const getAllText = () => {
		let walker = document.createTreeWalker(
			document.body,
			NodeFilter.SHOW_TEXT
		);
		let node;
		let nodes = [];
		while ((node = walker.nextNode())) {
			nodes.push(node);
		}
		return nodes;
	};
	getAllText().forEach((node) => {
		const { nodeValue } = node;
		const newValue = nodeValue.replace(
			/\$[0-9.,]+/gm,
			parseFloat(nodeValue.replace("$", "") / result.currency)
		);
		if (newValue !== nodeValue) {
			node.nodeValue = "$" + parseFloat(newValue).toFixed(2);
		}
	});
});

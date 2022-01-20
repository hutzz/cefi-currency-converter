let clicked = false;
document.getElementById("reload").addEventListener(
	"click",
	() => {
		chrome.runtime.reload();
	},
	{ once: true }
);
document.getElementById("revert").addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});
	if (clicked === true) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["revert.js"],
		});
	}
	clicked = false;
});
document.getElementById("cad").addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	clicked = true;
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ["content.js"],
	});
});
document.getElementById("cad").addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	clicked = true;
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ["content.js"],
	});
});
document.getElementById("help").addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	const help = () => {
		alert(
			`CAD: Convert on-page currencies to Canadian dollars
			\n\nRevert: Convert back to USD
			\n\nReset: Reloads the extension; each button can only be pressed once, so after using both buttons the extension will need to be reset.
			\nWARNING: resetting the extension and clicking CAD again after it has already taken effect WILL once again perform the conversion on the CAD amount`
		);
	};
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: help,
	});
});

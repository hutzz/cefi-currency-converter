let clicked = false;
document.getElementById("reset").addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});
	if (clicked === true) {
		await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["revert.js"],
		});
		chrome.runtime.reload();
	}
});
document.getElementById("cad").addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	clicked = true;
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ["content.js"],
	});
});

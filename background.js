chrome.runtime.onInstalled.addListener(async () => {
    console.log("Extension Installed")
  });

  chrome.action.onClicked.addListener(async function (tab) {

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ['scripts/copy-script.js']
      },
      () => { console.log("Executed Script") });
  
  });
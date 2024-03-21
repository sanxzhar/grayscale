import "./App.css";

function App() {
  
  const onClick = async () => {
    chrome.storage.local.set({grayscaleEnabled: true}, function() {
      console.log('Grayscale is enabled.');
    });
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        document.body.style.setProperty(
          "-webkit-filter",
          "grayscale(1)",
          "important"
        );
      },
    });
  };

  const remove = async () => {
    chrome.storage.local.set({grayscaleEnabled: false}, function() {
      console.log('Grayscale is enabled.');
    });
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        document.body.style.setProperty(
          "-webkit-filter",
          "grayscale(0)",
          "important"
        );
      },
    });
  };

  return (
    <div>
      <button onClick={onClick}>Click</button>
      <button onClick={remove}>Remove</button>
    </div>
  );
}

export default App;

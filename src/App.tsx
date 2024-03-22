import { useEffect, useState } from "react";
import monitorImage from "./assets/monitor.png";

//TODO: ADD AUTOMATIC RELOAD OF WINDOWS WHEN FILTER STATUS CHANGED
//TODO: REFACTOR REMOVE, APPLY FUNCTIONS

function App() {
  const [isFilterApplied, setFilterApplied] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get(["grayscaleEnabled"], function (result) {
      if (result.grayscaleEnabled) {
        setFilterApplied(true);
      } else {
        setFilterApplied(false);
      }
    });
  }, []);

  const remove = async () => {
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

  const apply = async () => {
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

  const buttonClick = async () => {
    if (isFilterApplied) {
      remove();
      chrome.storage.local.set({ grayscaleEnabled: false }, function () {
        setFilterApplied(false);
      });
    } else {
      apply();
      chrome.storage.local.set({ grayscaleEnabled: true }, function () {
        setFilterApplied(true);
      });
    }
  };

  const linkClick = (url: string) => {
    chrome.tabs.create({ url: url });
  };

  return (
    <div className="w-[282px] bg-[#F0F0F0] p-4 font-Azeret font-bold text-xs flex flex-col gap-4 items-start relative">
      <h1>Grayscale | MVP</h1>

      <button
        onClick={buttonClick}
        className={`${
          isFilterApplied
            ? "bg-[#F0F0F0] border-[1px] border-[#232528]"
            : "bg-[#232528] text-[#F0F0F0]"
        } text-[#232528] rounded-lg w-[110px] h-[38px] flex justify-center items-center`}
      >
        {isFilterApplied ? "DEACTIVATE" : "ACTIVATE"}
      </button>

      <p className="!font-medium !text-[6px] text-[#787878]">
        created by{" "}
        <a
          className="underline decoration-1	underline-offset-1 hover:cursor-pointer"
          onClick={() => linkClick("https://github.com/sanxzhar")}
        >
          sanxzhar
        </a>
      </p>
      <img
        src={monitorImage}
        height={190}
        width={110}
        className={`absolute right-0 top-5 ${isFilterApplied && "grayscale"}`}
      />
    </div>
  );
}

export default App;

/* global chrome */

function applyGrayscale() {
  document.body.style.filter = "grayscale(100%)";
}

function removeGrayscale() {
  document.body.style.filter = "";
}

function checkAndApplyGrayscale() {
  chrome.storage.local.get(["grayscaleEnabled"], function (result) {
    if (result.grayscaleEnabled) {
      applyGrayscale();
    } else {
      removeGrayscale();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkAndApplyGrayscale);
} else {
  checkAndApplyGrayscale();
}

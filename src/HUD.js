import React from "react";
import ReactDOM from "react-dom";

let clicks = new Map();

document.addEventListener(
  "click",
  event => {
    if (event.target.classList.contains("__X")) {
      let key = event.target.dataset.trackingKey;
      clicks.set(key, (clicks.get(key) || 0) + 1);
    }
  },
  true
);

window.addEventListener("load", event => {
  let elements = new Set();
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.id = "hud";
  canvas.style.position = "fixed";
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerHeight;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  window.addEventListener("scroll", () => {
    // TODO: debounce
    paint(ctx, elements);
  });

  observe((added, removed) => {
    removed.forEach(el => elements.delete(el));
    added.forEach(el => elements.add(el));
    paint(ctx, elements);
  });
  document.querySelectorAll(".__X").forEach(el => elements.add(el));
  paint(ctx, elements);
});

function paint(ctx, elements) {
  ctx.clearRect(0, 0, 100000, 100000);

  elements.forEach(el => {
    let box = el.getBoundingClientRect();
    let { left, top, width, height } = box;
    let n = clicks.get(el.dataset.trackingKey) || 0;
    let hsl = `hsl(${Math.max(250 - n * 10, 0)},100%,50%)`;
    ctx.strokeStyle = hsl;
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, width, height);
    let fontSize = 10;
    ctx.font = `${fontSize}px`;
    ctx.fillStyle = "blue";
    ctx.fillText("" + n, left + width + 2, top + fontSize);
  });
}

function observe(cb) {
  let added = new Set();
  let removed = new Set();
  let mo = new MutationObserver((records, self) => {
    for (let i = 0; i < records.length; ++i) {
      let an = records[i].addedNodes;
      for (let j = 0; j < an.length; ++j) {
        if (an[j].nodeType === Node.ELEMENT_NODE) {
          let all = an[j].querySelectorAll(".__X");
          all.forEach(el => added.add(el));
        }
      }
      let rn = records[i].removedNodes;
      for (let j = 0; j < rn.length; ++j) {
        if (rn[j].nodeType === Node.ELEMENT_NODE) {
          let all = rn[j].querySelectorAll(".__X");
          all.forEach(el => removed.add(el));
        }
      }
    }

    cb(added, removed);
  });
  mo.observe(document.body, { subtree: true, childList: true });
}

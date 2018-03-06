import React from "react";
import ReactDOM from "react-dom";

window.addEventListener("load", event => {
  console.log(document.readyState);
  let elements = []; // TODO(ET): should be a set
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.id = "__HUD";
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

  observe(el => elements.push(el), () => paint(ctx, elements));
  document.querySelectorAll(".__X").forEach(el => elements.push(el));
  paint(ctx, elements);
});

function paint(ctx, elements) {
  ctx.clearRect(0, 0, 100000, 100000);
  for (let i = 0; i < elements.length; ++i) {
    let box = elements[i].getBoundingClientRect();
    let { left, top, width, height } = box;
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, width, height);
  }
}

function observe(cb, afterAll) {
  let elements = [];
  let mo = new MutationObserver((records, self) => {
    console.log("MutationObserver", records);
    for (let i = 0; i < records.length; ++i) {
      let an = records[i].addedNodes;
      if (an.length) {
        for (let j = 0; j < an.length; ++j) {
          if (an[j].nodeType === Node.ELEMENT_NODE) {
            let all = an[j].querySelectorAll(".__X");
            all.forEach(cb);
          }
        }
      }
    }

    afterAll();
  });
  mo.observe(document.body, { subtree: true, childList: true });
}


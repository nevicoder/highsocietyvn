const texts = [
  "LSD",
  "Ayahuasca",
  "Ketamine",
  "Salvia",
  "DXM",
  "MDMA",
  "Shroom",
  "2C-B",
  "amphetamine",
  "meditation",
  "IT",
];

let categoriesCloud = TagCloud(".tagcloud__container", texts, {
  // radius in px
  radius: 400,

  // animation speed
  // slow, normal, fast
  maxSpeed: "fast",
  initSpeed: "fast",

  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 135,

  // interact with cursor move on mouse out
  keep: true,
});

let rootEl = document.querySelector(".tagcloud__container");
rootEl.addEventListener("click", function clickEventHandler(e) {
  if (e.target.className === "tagcloud--item") {
    window.location.href = `/category?q=${e.target.innerText.toLowerCase()}`;
  }
});

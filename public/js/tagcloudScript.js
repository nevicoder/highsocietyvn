
const texts = [
  "LSD",
  "Ayahuasca",
  "Ketamine",
  "Salvia",
  "DXM",
  "MDMA",
  "Shroom",
  "2C-B",
];

let categoriesCloud = TagCloud(".tagcloud__container", texts, {
    // radius in px
    radius: 250,
  
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
const lsdBtn = document.querySelector(".tryptamine__btn--lsd");
const shroomBtn = document.querySelector(".tryptamine__btn--shroom");
const inputs = document.querySelectorAll(".sidebar__tryptamine input");
const preDosage = document.querySelector(".tryptamine__pre-dosage");
const desireDosage = document.querySelector(".tryptamine__desire-dosage");
const days = document.querySelector(".tryptamine__days");
const result = document.querySelector(".tryptamine__result-text");
const btns = document.querySelectorAll(".tryptamine__btn-group btn");
const unit = document.querySelector(".tryptamine__result-unit")

function changeSubstance(sub) {
  if (sub === "lsd") {
    console.log("lsd");
    lsdBtn.classList.add("tryptamine__btn--active");
    shroomBtn.classList.remove("tryptamine__btn--active");
    preDosage.setAttribute("placeholder", "Liều dùng gần nhất(ug)");
    desireDosage.setAttribute("placeholder", "Liều dùng mong muốn(ug)");
    unit.innerText = "ug"
  }
  if (sub === "shroom") {
    console.log("shroom");
    shroomBtn.classList.add("tryptamine__btn--active");
    lsdBtn.classList.remove("tryptamine__btn--active");
    preDosage.setAttribute("placeholder", "Liều dùng gần nhất(g)");
    desireDosage.setAttribute("placeholder", "Liều dùng mong muốn(g)");
    unit.innerText = "g"

  }
}
function calculate() {
  let dosage = 0;
  if (
    preDosage.value &&
    desireDosage.value &&
    days.value &&
    !isNaN(preDosage.value) &&
    !isNaN(preDosage.value) &&
    !isNaN(days.value)
  ) {
    dosage =
      (preDosage.value / 100) *
        280.059565 *
        Math.pow(days.value, -0.412565956) +
      (desireDosage.value - preDosage.value);
    dosage < desireDosage.value
      ? (dosage = Number(desireDosage.value))
      : dosage;

    result.innerText = Math.round(dosage)
  }
}
shroomBtn.addEventListener("click", () => changeSubstance("shroom"));
lsdBtn.addEventListener("click", () => changeSubstance("lsd"));

for (let input of inputs) {
  input.addEventListener("input", calculate);
}

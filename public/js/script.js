// jshint esversion:9

const conceptInput = document.querySelector(".concept");
const amountInput = document.querySelector(".amount");
const addBTN = document.querySelector(".add-btn");
const smallAmount = document.querySelector("#small-amount");
const smallConcept = document.querySelector("#small-concept");



addBTN.addEventListener("click", function(e) {
  if(conceptInput.value === "" || amountInput.value === "") {
    e.preventDefault();
    if(conceptInput.value === "") {
      smallConcept.classList.remove("hide");
    }
    if(amountInput.value === "") {
      smallAmount.classList.remove("hide");
    }
  }
});

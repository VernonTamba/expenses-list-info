// Note: Diagram half full --> >= $500 & Diagram full >= $1,000
let formState = false;
const formContainer = document.querySelector(".container__form");
const formNew = document.querySelector(".container__form--new");
const formInputs = document.querySelector(".container__form--inputs");

const toggleForm = () => {
  // Display add new button
  if (formState) {
    formContainer.classList.add("newForm");
    formInputs.classList.add("hide");
    formNew.classList.remove("hide");
    formState = false;
  }
  //  Display form
  else {
    formContainer.classList.remove("newForm");
    formInputs.classList.remove("hide");
    formNew.classList.add("hide");
    formState = true;
  }
};

// toggleForm();

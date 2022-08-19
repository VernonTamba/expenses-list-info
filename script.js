// Form global elements
let formState = false;
const formContainer = document.querySelector(".container__form");
const formNew = document.querySelector(".container__form--new");
const formInputs = document.querySelector(".container__form--inputs");

// Button global elements
const submitButton = document.querySelector("#submitButton");

// Input global elements
const inputs = document.querySelectorAll("input");
const titleInput = document.querySelector("#title");
const amountInput = document.querySelector("#amount");
const dateInput = document.querySelector("#date");
const selectedYearInput = document.querySelector("select");

// Expenses global list elements
const mainExpensesList = document.querySelector(".main__expensesList");
const noExpensesList = document.querySelector(".main__expensesList--none");

// An array for storing the expenses list
let expensesData = [];

// Keep track of the form status and the expenses list status
const trackingExpensesList = () => {
  if (expensesData.length > 0) {
    mainExpensesList.classList.remove("hide");
    noExpensesList.style.display = "none";
    createExpensesList();
  } else {
    mainExpensesList.classList.add("hide");
    noExpensesList.style.display = "flex";
  }
};
// Check after the window loads up (cont.)
window.addEventListener("load", () => {
  trackingExpensesList();
});

// Toggle the form for new button and the actual form
const toggleForm = () => {
  // Display add new button
  if (formState) {
    formContainer.classList.add("newForm");
    formInputs.classList.add("hide");
    formNew.classList.remove("hide");
    formState = false;
  }
  // Display form
  else {
    formContainer.classList.remove("newForm");
    formInputs.classList.remove("hide");
    formNew.classList.add("hide");
    clearInputFields();
    formState = true;
  }
};

// Remove input fields
const clearInputFields = () => {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
};

// Store the filled input fields
const storeInputValues = () => {
  // Validation: Checking if all input fields are already filled or not
  // For future modifications and upgrades, add validation for incorrect type of input fields (e.g., amount must be a number)
  if (
    inputs[0].value === "" ||
    inputs[1].value === "" ||
    inputs[2].value === ""
  ) {
    alert("Please fill out all the required input fields");
    return;
  }
  // If everything is filled, then store the input values
  else {
    expensesData.push({
      title: titleInput.value,
      amount: amountInput.value,
      date: dateInput.value,
    });

    formState = true;
    toggleForm();
  }

  trackingExpensesList();
};

// Adding new Expenses List elements
const createExpensesList = () => {
  if (expensesData.length === 0) {
    expensesData.map((expenseData) => {
      addingExpensesListElements(expenseData);
    });
  } else {
    expensesData.slice(-1).map((expenseData) => {
      addingExpensesListElements(expenseData);
    });
  }
};

// The simple "Logic" behind the adding of the new Expenses List elements
const addingExpensesListElements = (expenseData) => {
  const expenseListItem = document.createElement("div");
  expenseListItem.classList.add("main__expensesList--item");
  const expenseListItemDate = document.createElement("div");
  expenseListItemDate.classList.add("expensesList--itemDate");

  // Adding date to the expense list item
  const dateElement_month = document.createElement("p");
  const date = new Date(
    expenseData.date.substring(0, 4),
    expenseData.date.substring(5, 7) - 1,
    expenseData.date.substring(8)
  ); // 2020-08-18
  const month = date.toLocaleString("default", { month: "long" });
  const dateText_month = document.createTextNode(month);
  dateElement_month.appendChild(dateText_month);
  const dateElement_year = document.createElement("p");
  const dateText_year = document.createTextNode(
    expenseData.date.substring(0, 4)
  );
  dateElement_year.appendChild(dateText_year);
  const dateElement_day = document.createElement("p");
  const dateText_day = document.createTextNode(expenseData.date.substring(8));
  dateElement_day.appendChild(dateText_day);

  expenseListItemDate.appendChild(dateElement_month);
  expenseListItemDate.appendChild(dateElement_year);
  expenseListItemDate.appendChild(dateElement_day);

  expenseListItem.appendChild(expenseListItemDate);

  // Adding title and amount to the expense list item (after date)
  const titleElement = document.createElement("h3");
  const titleText = document.createTextNode(expenseData.title);
  titleElement.appendChild(titleText);
  const amountElement = document.createElement("p");
  const amountText = document.createTextNode("$" + expenseData.amount);
  amountElement.appendChild(amountText);

  expenseListItem.appendChild(titleElement);
  expenseListItem.appendChild(amountElement);

  // Add all elements to the main div
  const expensesListContainer = document.querySelector(".main__expensesList");
  expensesListContainer.appendChild(expenseListItem);
};

// Show list of expenses according to its respective year ("filter" by year)
// Filter out the expense list after the selected year input is clicked
selectedYearInput.addEventListener("change", () => {
  mainExpensesList.textContent = "";

  setMonthlyExpensesDiagram(selectedYearInput.value);

  expensesData
    .filter(
      (expense) => expense.date.substring(0, 4) === selectedYearInput.value
    )
    .map((filteredExpensesData) => {
      addingExpensesListElements(filteredExpensesData);
    });
});

submitButton.addEventListener("click", () => {
  if (selectedYearInput.value === "0") {
    return;
  }

  mainExpensesList.textContent = "";

  setMonthlyExpensesDiagram(selectedYearInput.value);

  expensesData
    .filter(
      (expense) => expense.date.substring(0, 4) === selectedYearInput.value
    )
    .map((filteredExpensesData) => {
      addingExpensesListElements(filteredExpensesData);
    });
});

// Set the expenses diagram monthly expenses amount
const setMonthlyExpensesDiagram = (selectedYearInput) => {
  const allDiagramCapsule = document.querySelectorAll(".diagram__capsule");

  let filteredExpensesData = expensesData.filter(
    (expense) => expense.date.substring(0, 4) === selectedYearInput
  );

  // Check whether there are any monthly expenses for the specific year
  if (filteredExpensesData.length === 0) {
    allDiagramCapsule.forEach((diagramCapsule) => {
      diagramCapsule.style.setProperty("--capsuleAfter", "0px");
      mainExpensesList.classList.add("hide");
      noExpensesList.style.display = "flex";
    });
  } else {
    allDiagramCapsule.forEach((diagramCapsule) => {
      diagramCapsule.style.setProperty("--capsuleAfter", "0px");
      mainExpensesList.classList.add("hide");
      noExpensesList.style.display = "flex";
    });
    mainExpensesList.classList.remove("hide");
    noExpensesList.style.display = "none";
    let amount_jan = 0;
    let amount_feb = 0;
    let amount_mar = 0;
    let amount_apr = 0;
    let amount_may = 0;
    let amount_jun = 0;
    let amount_jul = 0;
    let amount_aug = 0;
    let amount_sep = 0;
    let amount_oct = 0;
    let amount_nov = 0;
    let amount_dec = 0;
    // Sum up the expenses list amount for its respective months and change the look of the diagram
    filteredExpensesData.forEach((filteredExpenseData) => {
      switch (filteredExpenseData.date.substring(5, 7)) {
        case "01":
          amount_jan += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_jan, 0);
          break;
        case "02":
          amount_feb += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_feb, 1);
          break;
        case "03":
          amount_mar += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_mar, 2);
          break;
        case "04":
          amount_apr += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_apr, 3);
          break;
        case "05":
          amount_may += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_may, 4);
          break;
        case "06":
          amount_jun += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_jun, 5);
          break;
        case "07":
          amount_jul += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_jul, 6);
          break;
        case "08":
          amount_aug += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_aug, 7);
          break;
        case "09":
          amount_sep += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_sep, 8);
          break;
        case "10":
          amount_oct += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_oct, 9);
          break;
        case "11":
          amount_nov += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_nov, 10);
          break;
        case "12":
          amount_dec += parseInt(filteredExpenseData.amount);
          changeDiagramCapsule(amount_dec, 11);
          break;
        default:
          break;
      }
    });
  }
};

// Change the look of the diagram capsule measurement (blue background) depending upon the amount of expenses
const changeDiagramCapsule = (amount, capsuleNumber) => {
  const allDiagramCapsule = document.querySelectorAll(".diagram__capsule");

  if (amount >= 900) {
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfter",
      "90px"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopLeft",
      "1rem"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopRight",
      "1rem"
    );
  } else if (amount >= 700) {
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfter",
      "70px"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopLeft",
      "0rem"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopRight",
      "0rem"
    );
  } else if (amount >= 500) {
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfter",
      "50px"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopLeft",
      "0rem"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopRight",
      "0rem"
    );
  } else if (amount >= 300) {
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfter",
      "30px"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopLeft",
      "0rem"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopRight",
      "0rem"
    );
  } else if (amount >= 100) {
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfter",
      "10px"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopLeft",
      "0rem"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopRight",
      "0rem"
    );
  } else if (amount >= 50) {
    allDiagramCapsule[capsuleNumber].style.setProperty("--capsuleAfter", "5px");
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopLeft",
      "0rem"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopRight",
      "0rem"
    );
  } else {
    allDiagramCapsule[capsuleNumber].style.setProperty("--capsuleAfter", "0px");
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopLeft",
      "0rem"
    );
    allDiagramCapsule[capsuleNumber].style.setProperty(
      "--capsuleAfterRadiusTopRight",
      "0rem"
    );
  }
};

// Note: There are still flaws. And the codes surely are unlcean and messy. So much to be fixed and improved on in the future.

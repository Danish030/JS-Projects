const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const countryCode = "^(1\\s?)?";
const areaCode = "(\\([0-9]{3}\\)|[0-9]{3})";
const spacesDashes = "[\\s\\-]?";
const phoneNumber = "[0-9]{3}[\\s\\-]?[0-9]{4}$";
const phoneRegex = new RegExp(
  `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
);

function checkValidNumber(input) {
  if (input === "") {
    alert("Please provide a phone number");
    return;
  }

  if (phoneRegex.test(input)) {
    resultsDiv.textContent = `Valid US number: ${input}`;
  } else {
    resultsDiv.textContent = `Invalid US number: ${input}`;
  }
}

checkBtn.addEventListener("click", () => {
  checkValidNumber(userInput.value.trim());
});

clearBtn.addEventListener("click", () => {
  resultsDiv.textContent = "";
});

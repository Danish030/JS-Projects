let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const changeDue = document.getElementById("change-due");
const input = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeContainer = document.querySelector(".show-change");
const showPrice = document.getElementById("price");

// show price
showPrice.innerHTML = `<p class="showPrice">💰 Price: $${price.toFixed(2)}</p>`;
// show available change
let change = "";
for (let i = 0; i < cid.length; i++) {
  change += `<div class="change-item">
    <span>${cid[i][0]}</span>
    <span>$${cid[i][1].toFixed(2)}</span>
  </div>`;
}
changeContainer.innerHTML = change;

// show alerts
// ... (your existing code)

// show alerts
function claculateChange() {
  const cashIncents = Math.round(Number(input.value) * 100);
  const priceInCents = Math.round(price * 100);
  // Denominations in cents (10000 = $100, 2000 = $20, etc.)
  const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  let changeDueInCents = cashIncents - priceInCents;

  let cidInCents = cid.map(([name, amount]) => [
    name,
    Math.round(amount * 100),
  ]);

  const totalCid = cidInCents.reduce((sum, [name, amount]) => sum + amount, 0);

  // We reverse `cid` to go from largest to smallest denominations, which is correct for greedy change algorithms.
  const reverseCid = [...cid].reverse().map(([denominationName, amount]) => {
    return [denominationName, Math.round(amount * 100)];
  });

  // Clear previous messages and ensure "Status: " is there if you intend to use it.
  // This line should ideally be at the beginning of the function or handled carefully.
  // For now, let's just make sure it's not constantly appending.
  changeDue.innerText = ""; // Clear content before adding new status/change

  if (cashIncents < priceInCents) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashIncents === priceInCents) {
    document.getElementById("change-due").innerText =
      "No change due - customer paid with exact cash";
    return;
  }

  if (totalCid < changeDueInCents) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS"; // Assign directly, don't +=
    return;
  }

  // To store the change denominations that will be given
  let dispensedChange = [];

  for (let i = 0; i < reverseCid.length; i++) {
    const [denominationName, availableAmountInCents] = reverseCid[i];
    const denominationValue = denominations[i]; // Value of the current denomination (e.g., 10000 for "ONE HUNDRED")

    let amountToDispense = 0;

    // As long as we need change, have enough of this denomination, and it fits into the remaining change due
    while (
      changeDueInCents >= denominationValue &&
      availableAmountInCents > amountToDispense
    ) {
      amountToDispense += denominationValue;
      changeDueInCents -= denominationValue;
    }

    // If we dispensed any amount of this denomination, add it to our list
    if (amountToDispense > 0) {
      dispensedChange.push([denominationName, amountToDispense / 100]); // Convert back to dollars
      // You'll also need to update the `cid` (cash in drawer) here in a real application
      // For this example, we're just calculating and displaying.
    }
  }

  // Check if we were able to give exact change
  if (changeDueInCents > 0) {
    // This means we couldn't give exact change with the available denominations
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else if (totalCid === cashIncents - priceInCents) {
    // If total CID equals change due, and we dispensed it all
    changeDue.innerHTML = "<strong>Status: CLOSED</strong>";
    dispensedChange.forEach(([name, amount]) => {
      changeDue.innerHTML += `<p><span>${name}:</span> <span>$${amount.toFixed(
        2
      )}</span></p>`;
    });
  } else {
    // If we successfully dispensed all the change due
    changeDue.innerHTML = "<strong>Status: OPEN</strong>";
    dispensedChange.forEach(([name, amount]) => {
      changeDue.innerHTML += `<p><span>${name}:</span> <span>$${amount.toFixed(
        2
      )}</span></p>`;
    });
  }
}

purchaseBtn.addEventListener("click", claculateChange);

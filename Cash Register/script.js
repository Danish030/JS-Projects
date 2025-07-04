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
showPrice.innerHTML = `<p class="showPrice">Price: $${price}</p>`;
// show available change
let change = "";
for (let i = 0; i < cid.length; i++) {
  change += `<p class="change-item">${cid[i][0]}: ${cid[i][1]}</p>`;
}
changeContainer.innerHTML = change;

// show alerts
purchaseBtn.addEventListener("click", function () {
 const cashIncents = Math.round(Number(input.value) * 100);
  const priceInCents = Math.round(price * 100);
  if (cashIncents < priceInCents) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashIncents === priceInCents) {
    document.getElementById("change-due").innerText =
      "No change due - customer paid with exact cash";
    return;
  }

  //calculate change due
  let changeDueInCents = cashIncents - priceInCents;
  const reverseCid = [...cid].reverse()
  console.log(reverseCid);
})

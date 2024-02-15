let cashDrawerDisplay = document.querySelectorAll(
  ".cash-drawer-display p span"
);
let billAmonunt = document.querySelector("#bill-amonunt");
let cashAmonunt = document.querySelector("#cash-amonunt");
let purchase = document.querySelector("#purchase");
let priceScreen = document.querySelector(".price-screen");
let changeDueMsg = document.querySelector("#change-due ");
let changeDue = document.querySelectorAll("#change-due  p span");
let statusMsg = document.querySelector("#status");
let cashInDrawer = [
  [2000, 1],
  [500, 2],
  [100, 3],
  [50, 1],
  [20, 1],
  [10, 1],
  [5, 1],
  [1, 5],
];
console.log(changeDue);

changeDueMsg.style.display = "none";
dispalyCashDrawer();
function dispalyCashDrawer() {
  for (i = 0; i < cashInDrawer.length; i++) {
    cashDrawerDisplay[i].innerText = cashInDrawer[i][1];
  }
}
purchase.addEventListener("click", () => {
  let billAmt = billAmonunt.value;
  let cashAmt = cashAmonunt.value;
  // console.log(cashAmt);
  if (billAmt == "") {
    alert("Please enter the Bill Amount .");
  } else if (billAmt <= 0) {
    alert("Bill Amount should be greater than 0");
  } else if (cashAmt == "") {
    alert(" Please enter the Cash Amount .");
  } else if (cashAmt < billAmt) {
    alert(" Cash Amount should be greater or equal to Bill Amount. ");
  } else if (cashAmt == billAmt) {
    statusMsg.innerHTML = "<strong>Status: OPEN </strong>";
    changeDueMsg.style.display = "none";
    priceScreen.innerText = `Total : ${billAmt}`;
  } else if (cashAmt > billAmt) {
    priceScreen.innerText = `Total : ${billAmt}`;
    let changeInReturn = cashAmt - billAmt;
    displayStatus(changeInReturn);
  }
});

const displayStatus = (changeInReturn) => {
  let cashIndraw = totalCashInDrawer();
  console.log(totalCashInDrawer());
  if (changeInReturn > cashIndraw) {
    statusMsg.innerHTML = "<strong>Status: INSUFFICIENT_FUNDS</strong>";
    console.log(changeInReturn);
    changeDueMsg.style.display = "none";

    console.log(changeInReturn > cashIndraw);
  } else if (changeInReturn == cashIndraw) {
    console.log("closed");
    console.log(changeInReturn);
    statusMsg.innerHTML = "<strong>Status: CLOSED </strong>";
    changeDueMsg.style.display = "none";
    displayChangeReturn(changeInReturn);
    dispalyCashDrawer();
  } else if (isCIRmultipalOfAnyNotes(changeInReturn)) {
    debugger;
    console.log("inside ");
    displayChangeReturn(changeInReturn);
    statusMsg.innerHTML = "<strong>Status: OPEN </strong>";
    // dispalyCashDrawer();
    changeDueMsg.style.display = "block";
  } else {
    statusMsg.innerHTML = "<strong>Status: INSUFFICIENT_FUNDS</strong>";
    changeDueMsg.style.display = "none";
  }
};

const displayChangeReturn = (changeInReturn) => {
  for (a of cashInDrawer) {
    console.log(a);
  }
  for (let i = 0; i < cashInDrawer.length; i++) {
    let ai0 = cashInDrawer[i][0],
      ai1 = cashInDrawer[i][1];
    let Ai1 = ai0 * ai1;
    let NoOfNotes = 0;
    console.log(changeInReturn);

    if (changeInReturn >= Ai1 && ai1 != 0) {
      cashInDrawer[i][1] = 0;
      changeInReturn = changeInReturn - Ai1;
      changeDue[i].innerText = ai1;
    } else if (changeInReturn >= ai0 && changeInReturn < Ai1 && ai1 != 0) {
      debugger;
      NoOfNotes = Math.floor(changeInReturn / ai0);
      console.log("no of notes of ", ai0, " is ", NoOfNotes);
      cashInDrawer[i][1] = ai1 - NoOfNotes;
      console.log(ai1, NoOfNotes);
      console.log(cashInDrawer[i][1]);
      changeInReturn = changeInReturn - ai0 * NoOfNotes;
      console.log("cir", changeInReturn);
      changeDue[i].innerText = NoOfNotes;
      // console.log(changeDue[i].innerText);
      debugger;
      console.log("change return", changeInReturn);
      console.log(ai0, cashInDrawer[i][1]);
    } else {
      changeDue[i].innerText = 0;
    }
  }
  // console.log(changeInReturn);
  // if (changeInReturn == 0) {
  //   statusMsg.innerHTML = "<strong>Status: OPEN </strong>";
  //   changeDueMsg.style.display = "block";
  // } else {
  //   statusMsg.innerHTML = "<strong>Status: INSUFFICIENT_FUNDS</strong>";
  //   changeDueMsg.style.display = "none";
  //   debugger;
  // }

  dispalyCashDrawer();
};

const totalCashInDrawer = () => {
  let totalCashID = 0;
  // let arr = arr.concat(cashInDrawer);
  for (i = 0; i < cashInDrawer.length; i++) {
    totalCashID += cashInDrawer[i][0] * cashInDrawer[i][1];
  }
  return totalCashID;
};
const isCIRmultipalOfAnyNotes = (changeInReturn) => {
  let total = 0;
  console.log(changeInReturn);
  let arr = [];
  arr = JSON.parse(JSON.stringify(cashInDrawer));
  for (let i = 0; i < arr.length; i++) {
    for (j = 0; j <= 1; j++) console.log(arr[i][j]);
  }

  for (let i = 0; i < arr.length; i++) {
    let ai0 = arr[i][0],
      ai1 = arr[i][1],
      NoOfNotes = 0;
    let Ai1 = ai0 * ai1;

    if (changeInReturn >= Ai1 && ai1 != 0) {
      arr[i][1] = 0;
      changeInReturn = changeInReturn - Ai1;
      console.log(ai1);
    } else if (changeInReturn >= ai0 && changeInReturn < Ai1 && ai1 != 0) {
      NoOfNotes = Math.floor(changeInReturn / ai0);
      console.log(ai1);
      console.log("no of notes of ", ai0, " is ", NoOfNotes);
      arr[i][1] = ai1 - NoOfNotes;
      changeInReturn = changeInReturn - ai0 * NoOfNotes;
      total += ai0 * NoOfNotes;
      // console.log("cir", changeInReturn);
      // changeDue[i].innerText = NoOfNotes;

      // console.log("change return", changeInReturn);
      // console.log(ai0, cashInDrawer[i][1]);
    }
  }
  if (changeInReturn == 0) {
    return true;
  } else {
    return false;
  }
};

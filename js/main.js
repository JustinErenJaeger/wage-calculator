// GETS ALL OF THE INPUT FIELDS
const startWage = document.getElementById("startWage"),
  percentageInc = document.getElementById("percentageInc"),
  moneyInc = document.getElementById("moneyInc"),
  newAmount = document.getElementById("newAmount"),
  inflation = document.getElementById("inflation"),
  realWageInc = document.getElementById("realWageInc"),
  upKeepWage = document.getElementById("upKeepWage"),
  upKeepInc = document.getElementById("upKeepInc"),
  impFactorPerc = document.getElementById("impFactorPerc"),
  impFactorMoney = document.getElementById("impFactorMoney"),
  actualIncMoney = document.getElementById("actualIncMoney"),
  actualIncPerc = document.getElementById("actualIncPerc"),
  info_btns = document.querySelectorAll(".fas");

// FETCHING API

// API LINK GOES HERE

// LISTENS TO A CHANGE IN THE INPUT FIELD

startWage.addEventListener("change", function (e) {
  if (e.target.value < 0) e.target.value = 0;

  setMoneyVal();
  setPercentVal();
  setValues();
});

// LISTENS TO A CHANGE IN THE INPUT FIELD
percentageInc.addEventListener("change", function (e) {
  if (e.target.value < 0) e.target.value = 0;

  setMoneyVal();
});

// LISTENS TO A CHANGE IN THE INPUT FIELD
moneyInc.addEventListener("change", function (e) {
  if (e.target.value < 0) e.target.value = 0;

  setPercentVal();
});

// SETS THE INCREASED MONEY VALUE
function setMoneyVal() {
  const value = startWage.value * (percentageInc.value / 100);

  if (value - Math.floor(value) !== 0) {
    moneyInc.value = Number(value.toFixed(2));
  } else {
    moneyInc.value = value;
  }

  setValues();
}

// SETS THE INCREASED PERCENTAGE VALUE
function setPercentVal() {
  const value = ((moneyInc.value / startWage.value) * 100) / 1;

  if (value - Math.floor(value) !== 0) {
    percentageInc.value = Number(value.toFixed(2));
    console.log(percentageInc.value);
  } else {
    percentageInc.value = value;
  }

  setValues();
}

// SETS AMOUNTS FOR AUTO POPULATING FIELDS
let i = 2;
function setValues() {
  inflationVal = 4.9;
  inflation.innerHTML = `${inflationVal}%`; //TEMPORARY UNTIL API IS FOUND
  const value = inflationVal - percentageInc.value;
  let displayVal = function () {
    let currentValue = parseInt(startWage.value) + parseFloat(moneyInc.value);
    console.log(currentValue);

    let num = (i += 2);
    console.log(num);

    if (num < currentValue) {
      newAmount.innerHTML = num;
    } else {
      newAmount.innerHTML = currentValue;
    }
  };
  setInterval(displayVal, 1);
  newAmount.innerHTML = `R ${
    parseInt(startWage.value) + parseFloat(moneyInc.value)
  }`;

  if (value - Math.floor(value) !== 0) {
    realWageInc.innerHTML = `${Number(value.toFixed(2))}%`;
  } else {
    realWageInc.innerHTML = `${parseFloat(value)}%`;
  }

  upKeepWage.innerHTML = `R ${
    parseFloat((inflationVal / 100) * startWage.value) +
    parseInt(startWage.value)
  }`;
  upKeepInc.innerHTML = `${inflationVal}%`;

  const impFacPer = parseFloat(inflationVal) + parseInt(5);
  impFactorPerc.innerHTML = `${impFacPer}%`;
  impFactorMoney.innerHTML = `R ${
    parseFloat((impFacPer / 100) * startWage.value) +
    parseFloat(startWage.value)
  }`;
  actualIncMoney.innerHTML = `R ${
    parseFloat((5 / 100) * startWage.value) +
    parseFloat((inflationVal / 100) * startWage.value - moneyInc.value)
  }`;
  const actualIncRoundedOff = parseFloat(
    inflationVal + 5 - percentageInc.value
  );
  actualIncPerc.innerHTML = `${
    actualIncRoundedOff - Math.floor(actualIncRoundedOff) !== 0
      ? Number(actualIncRoundedOff.toFixed(2))
      : actualIncRoundedOff
  }%`;
}

// THIS IS THE CODE FOR THE INFO BUTTONS
const box_ids = [
  "box-1",
  "box-2",
  "box-3",
  "box-4",
  "box-5",
  "box-6",
  "box-7",
  "box-8",
  "box-9",
  "box-10",
  "box-11",
  "box-12",
];

for (let info_btn_id = 0; info_btn_id < info_btns.length; info_btn_id++) {
  const info_btn = info_btns.item(info_btn_id);

  info_btn.addEventListener("click", (event) => {
    if (
      document
        .getElementById(info_btn.dataset.for)
        .classList.contains("open") === true
    ) {
      document.getElementById(info_btn.dataset.for).classList.remove("open");
    } else {
      box_ids.forEach((box_id) => {
        document.getElementById(box_id).classList.remove("open");
      });
      document.getElementById(info_btn.dataset.for).classList.add("open");
    }
  });
}

// GETS ALL OF THE INPUT FIELDS
const startWage = document.getElementById("startWage"),
  percentageInc = document.getElementById("percentageInc"),
  moneyInc = document.getElementById("moneyInc"),
  newAmount = document.getElementById("newAmount"),
  inflation = document.getElementById("inflation"),
  impFactorPerc = document.getElementById("impFactorPerc"),
  display2 = document.querySelector(".display-2"),
  display3 = document.querySelector(".display-3"),
  emptyFieldIndcator = document.querySelectorAll(".empty-field-indicator"),
  floatingLabel = document.querySelectorAll(".floating-label"),
  info_btns = document.querySelectorAll(".fas"),
  calcValues = document.querySelectorAll(".calc-values"),
  neededPer = document.getElementById("neededPer");

// FETCHING API

// API LINK GOES HERE

// LISTENS TO A CHANGE IN THE INPUT FIELD
startWage.addEventListener("change", function (e) {
  e.target.value <= 0
    ? (e.target.value = 0)
    : (e.target.value, (display2.style.height = "12rem"));

  startWage.value > 0
    ? floatingLabel[0].classList.add("active-label")
    : floatingLabel[0].classList.remove("active-label");

  setPercentVal();
  setMoneyVal();
  setValues();
  gaugeCalc();
});

// LISTENS TO A CHANGE IN THE INPUT FIELD
percentageInc.addEventListener("change", function (e) {
  setMoneyVal();
  gaugeCalc();
});

// LISTENS TO A CHANGE IN THE INPUT FIELD
moneyInc.addEventListener("change", function (e) {
  setPercentVal();
  gaugeCalc();
});

impFactorPerc.addEventListener("change", function (e) {
  e.target.value > 0
    ? (e.target.value, (display3.style.height = "4rem"))
    : (e.target.value = 0);

  setValues();
});

// SETS THE INCREASED PERCENTAGE VALUE
function setPercentVal() {
  const value = ((moneyInc.value / startWage.value) * 100) / 1;
  console.log(value);

  if (value - Math.floor(value) !== 0) {
    percentageInc.value = Number(value.toFixed(2));
    console.log(percentageInc.value);
  } else {
    percentageInc.value = value === 0 ? "" : value;
  }

  percentageInc.value > 0
    ? ((emptyFieldIndcator[1].style.padding = "0rem"),
      floatingLabel[1].classList.add("active-label"))
    : ((emptyFieldIndcator[1].style.padding = "0.4rem"),
      floatingLabel[1].classList.remove("active-label"));

  moneyInc.value > 0
    ? floatingLabel[2].classList.add("active-label")
    : floatingLabel[2].classList.remove("active-label");

  setMoneyVal();
  setValues();
}

// SETS THE INCREASED MONEY VALUE
function setMoneyVal() {
  const value = startWage.value * (percentageInc.value / 100);
  console.log(value);

  if (value - Math.floor(value) !== 0) {
    moneyInc.value = Number(value.toFixed(2));
  } else {
    moneyInc.value = value === 0 ? "" : value;
  }

  moneyInc.value > 0
    ? ((emptyFieldIndcator[2].style.padding = "0rem"),
      floatingLabel[2].classList.add("active-label"))
    : ((emptyFieldIndcator[2].style.padding = "0.4rem"),
      floatingLabel[2].classList.remove("active-label"));

  percentageInc.value > 0
    ? floatingLabel[1].classList.add("active-label")
    : floatingLabel[1].classList.remove("active-label");

  setValues();
}

// SETS AMOUNTS FOR AUTO POPULATING FIELDS
function setValues() {
  calcValues.forEach((calcValue) => {
    calcValue.style.color = "#5f5f5f";
  });
  inflation.innerHTML = `${4.9}%`; //4.9 TEMPORARY UNTIL API IS FOUND

  newAmount.innerHTML = `R ${
    moneyInc.value === ""
      ? parseInt(startWage.value)
      : parseInt(startWage.value) + parseFloat(moneyInc.value)
  }`;

  neededPer.innerHTML = `${parseFloat(4.9) + parseFloat(impFactorPerc.value)}%`;
}

function setIndicators(indicator) {
  emptyFieldIndcator[indicator].style.padding = "0rem";
}

// THIS IS THE CODE FOR THE INFO BUTTONS
const box_ids = ["box-1", "box-2", "box-3", "box-4", "box-5", "box-6", "box-7"];

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

// THIS IS THE CODE FOR THE GAUGE
let wageVal = null;
let breakEvenVal = null;
let overBreakVal = null;
let gaugeValues = null;

function gaugeCalc() {
  wageVal = startWage.value;
  breakEvenVal = parseFloat((4.9 / 100) * wageVal) + parseInt(wageVal);
  overBreakVal = breakEvenVal * 2;
  gaugeValues = [
    {
      strokeStyle: "rgb(192 100 21)",
      min: 0,
      max:
        parseFloat((4.9 / 100) * wageVal) +
        parseInt(wageVal) -
        parseFloat((4.9 / 100) * wageVal),
      height: 1.2,
    },
    {
      strokeStyle: "rgb(224 134 56)",
      min:
        parseFloat((4.9 / 100) * wageVal) +
        parseInt(wageVal) -
        parseFloat((4.9 / 100) * wageVal),
      height: 1.2,
      max:
        parseFloat((4.9 / 100) * wageVal) +
        parseInt(wageVal) +
        parseFloat((4.9 / 100) * wageVal),
      height: 1.2,
      height: 1.2,
    },
    {
      strokeStyle: "rgb(241 171 111)",
      min:
        parseFloat((4.9 / 100) * wageVal) +
        parseInt(wageVal) +
        parseFloat((4.9 / 100) * wageVal),
      max: overBreakVal,
      height: 1.2,
    },
  ];
  setGaugeValues(breakEvenVal, overBreakVal, gaugeValues);
}

function setGaugeValues(breakEven, overbreak, gaugeVal) {
  var target = document.getElementById("wage-gauge");
  var opts = {
    angle: 0,
    lineWidth: 0.3,
    radiusScale: 1,
    pointer: {
      length: 0.56,
      strokeWidth: 0.04,
      color: "#000000",
    },
    limitMax: false,
    limitMin: false,
    colorStart: "#6F6EA0",
    colorStop: "#C0C0DB",
    strokeColor: "#EEEEEE",
    generateGradient: true,
    highDpiSupport: true,
    staticLabels: {
      font: "12px Arial",
      labels:
        overBreakVal === null
          ? [1200, 1800]
          : [
              parseFloat(breakEven) - parseFloat(breakEven) / 2,
              breakEven,
              parseFloat(breakEven) + parseFloat(breakEven) / 2,
            ],
      color: "#000000",
      fractionDigits: 0,
    },
    staticZones:
      gaugeValues === null
        ? [
            {
              strokeStyle: "rgb(192 100 21)",
              min: 0,
              max: 1400,
              height: 1.2,
            },
            {
              strokeStyle: "rgb(224 134 56)",
              min: 1400,
              max: 1600,
              height: 1.2,
            },
            {
              strokeStyle: "rgb(241 171 111)",
              min: 1600,
              max: 3000,
              height: 1.2,
            },
          ]
        : gaugeVal,
  };
  var gauge = new Gauge(target).setOptions(opts);
  // gauge.setTextField(document.getElementById("textValue"));
  gauge.maxValue = overBreakVal === null ? 3000 : overbreak;
  gauge.setMinValue(0);
  gauge.animationSpeed = 30;
  gauge.set(parseInt(startWage.value) + parseFloat(moneyInc.value));
}

window.onload = setGaugeValues;

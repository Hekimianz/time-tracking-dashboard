const cards = Array.from(document.querySelectorAll(".timeCard"));
const btns = Array.from(document.querySelectorAll(".filterBtn"));

const dailyData = {};
const weeklyData = {};
const monthlyData = {};
const fetchData = async () => {
  const response = await fetch("./data.json");
  if (!response.ok) {
    console.error("Could not fetch data!");
  }
  const data = await response.json();

  data.forEach((elem) => {
    dailyData[elem.title] = elem.timeframes.daily;
    weeklyData[elem.title] = elem.timeframes.weekly;
    monthlyData[elem.title] = elem.timeframes.monthly;
  });
  renderData(dailyData);
};

const renderData = (obj) => {
  let previousText = "";
  if (obj === dailyData) {
    previousText = "Yesterday -";
    changeActiveFilter("Daily");
  } else if (obj === weeklyData) {
    previousText = "Last Week -";
    changeActiveFilter("Weekly");
  } else if (obj === monthlyData) {
    previousText = "Last Month -";
    changeActiveFilter("Monthly");
  }
  cards.forEach((card) => {
    const time = card.querySelector(".time");
    const previousTime = card.querySelector(".previousTime");
    const category = card.querySelector(".category__title").innerText;
    time.innerText = obj[category].current + "hrs";
    previousTime.innerText = `${previousText} ${obj[category].previous}hrs`;
  });
};

const changeActiveFilter = (filter) => {
  btns.forEach((btn) => {
    btn.classList.remove("activeBtn");
    btn.innerText === filter ? btn.classList.add("activeBtn") : null;
  });
};

fetchData();

btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    changeActiveFilter(btn.innerText);
    if (btn.innerText === "Daily") {
      renderData(dailyData);
    } else if (btn.innerText === "Weekly") {
      renderData(weeklyData);
    } else if (btn.innerText === "Monthly") {
      renderData(monthlyData);
    }
  })
);

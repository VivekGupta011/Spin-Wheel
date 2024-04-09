const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "white" },
  { minDegree: 31, maxDegree: 90, value: "black" },
  { minDegree: 91, maxDegree: 150, value: "green" },
  { minDegree: 151, maxDegree: 210, value: "blue" },
  { minDegree: 211, maxDegree: 270, value: "red" },
  { minDegree: 271, maxDegree: 330, value: "yellow" },
  { minDegree: 331, maxDegree: 360, value: "white" },
];

const data = [16, 16, 16, 16, 16, 16];

const pieColors = [
  "#ffffff",
  "#000000",
  "#008000",
  "#0000ff",
  "#ff0000",
  "#ffff00",
];

const colorDescriptions = {
  white: "The walls of the room were painted a crisp white, creating a sense of cleanliness and brightness.",
  black: "The darkness enveloped the room, with shadows lurking in every corner.",
  green: "The lush greenery outside the window brought a feeling of serenity and tranquility.",
  blue: "The sky outside was a vibrant blue, dotted with fluffy white clouds.",
  red: "The warmth of the red curtains added a touch of coziness to the room.",
  yellow: "The soft yellow glow of the lamp filled the room with a sense of warmth and comfort."
};

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["white", "black", "green", "blue", "red", "yellow"],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const valueGenerator = (colorValue) => {
  const description = colorDescriptions[colorValue];
  if (description) {
    finalValue.innerHTML = `<p>Description for ${colorValue}: ${description}</p>`;
    spinBtn.disabled = false;
  } else {
    finalValue.innerHTML = `<p>No description available for ${colorValue}.</p>`;
  }
};

let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(myChart.data.labels[myChart.data.datasets[0].data.indexOf(16)]);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

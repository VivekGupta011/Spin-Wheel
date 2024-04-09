const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 25, value: "white" },
  { minDegree: 26, maxDegree: 60, value: "black" },
  { minDegree: 61, maxDegree: 105, value: "green" },
  { minDegree: 106, maxDegree: 160, value: "blue" },
  { minDegree: 161, maxDegree: 215, value: "red" },
  { minDegree: 216, maxDegree: 270, value: "yellow" },
  { minDegree: 271, maxDegree: 305, value: "orange" },
  { minDegree: 306, maxDegree: 340, value: "purple" },
  { minDegree: 341, maxDegree: 360, value: "pink" },
];

const data = [16, 16, 16, 16, 16, 16, 16, 16, 16]; // Adjusted for the additional colors

const pieColors = [
  "#f0f0f0",
  "#000000",
  "#008000",
  "#0000ff",
  "#ff0000",
  "#ffff00",
  "#ffa500",
  "#800080",
  "#ffc0cb",
];


const colorDescriptions = {
  white: "The walls of the room were painted a crisp, creating a sense of cleanliness and brightness.",
  black: "The darkness enveloped the room, with shadows lurking in every corner.",
  green: "The lush greenery outside the window brought a feeling of serenity and tranquility.",
  blue: "The sky outside was a vibrant blue, dotted with fluffy white clouds.",
  red: "The warmth of the curtains added a touch of coziness to the room.",
  yellow: "The soft glow of the lamp filled the room with a sense of warmth and comfort.",
  orange: "The orange hues of the sunset painted the sky with warmth and vitality.",
  purple: "The regal curtains draped elegantly across the windows.",
  pink: "The delicate flowers bloomed in the garden, filling the air with a sweet fragrance.",
};

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["white", "black", "green", "blue", "red", "yellow", "orange", "purple", "pink"],
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
    finalValue.innerHTML = `<p>Description: ${description}</p>`;
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
  let randomDegree = Math.floor(Math.random() * (359 - 0 + 1) + 0); // Adjusted to match new degree range
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      const resultColor = rotationValues.find(
        ({ minDegree, maxDegree }) =>
          myChart.options.rotation >= minDegree && myChart.options.rotation <= maxDegree
      ).value;
      // Update the h1 element with the current color name
      // document.querySelector('h1').textContent = resultColor;
      valueGenerator(resultColor);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
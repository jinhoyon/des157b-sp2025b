async function makePieCharts() {
  // Get the data from data.json
  const data = await getData();

  Object.keys(data).forEach((day, index) => {
    const category = Object.keys(data[day]);
    const time = Object.values(data[day]);

    // Chart legend text color
    if (index % 2 == 0) {
      // if even, make legend text color white
      makeChart(day, category, time, "#EBEBF5");
    } else {
      // make legend text color black
      makeChart(day, category, time, "#3C3C43");
    }

  });
}

async function getData() {

  // Fetch data from data.json
  const myTime = await fetch("./data/data.json");

  // Parse response object body as JSON
  const data = await myTime.json();

  return data;
}

function makeChart(day, category, time, legendTextColor) {
  const canvasId = `${day}`;

  new Chart(canvasId, {
    type: "pie",
    data: {
      labels: category,
      datasets: [
        {
          backgroundColor: ["#002855", "#B3A369"],
          data: time,
          borderWidth: 0,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: legendTextColor
          },
        },
      },
    },
  });
}

makePieCharts();
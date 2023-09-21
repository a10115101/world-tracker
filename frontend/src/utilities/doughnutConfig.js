export const doughnutDatasetSetting = (doughnutData) => {
  return {
    labels: doughnutData.map((data) => data._id),
    datasets: [
      {
        label: "Users Visited",
        data: doughnutData.map((data) => data.num),
        backgroundColor: [
          "#fab1a0",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#a29bfe",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
};

export const doughnutLegendSetting = () => {
  return {
    plugins: {
      tooltip: {
        titleFont: {
          size: 20,
        },
        bodyFont: {
          size: 20,
        },
      },
      legend: {
        display: true,
        responsive: true,
        position: "top",
        labels: {
          boxWidth: 16,
          padding: 16,
          font: {
            size: 16,
          },
        },
        align: "center",
      },
    },
  };
};

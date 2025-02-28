// src/MyChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registriere die notwendigen Chart.js-Komponenten
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MyChart = () => {
  const data = {
    labels: ['Januar', 'Februar', 'März', 'April', 'Mai'],
    datasets: [
      {
        label: 'Beispiel-Daten',
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mein Linien-Diagramm',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MyChart;

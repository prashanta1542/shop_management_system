import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {Chart as chartjs} from "chart.js/auto";

export default function BarChart({chartData}) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Orders',
      },
    },
  };
    return(
        <div>
          <Bar data={chartData} options={options} />
        </div>
    )
}
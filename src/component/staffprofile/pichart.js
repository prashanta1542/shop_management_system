import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {Chart as chartjs} from "chart.js/auto";

export default function PieChart({chartData}) {
    const options = {
        animation: {
            duration: 2000, // animation duration in milliseconds
            easing: 'easeInOutQuad', // animation easing function
          },
        plugins: {
            title: {
              display: true,
              text: 'Order State',
            },
          },
          elements: {
            arc: {
              borderRadius: 10,
            },
          },
      };
    return(
        <div>
          <Line data={chartData} options={options}  />
        </div>
    )
}
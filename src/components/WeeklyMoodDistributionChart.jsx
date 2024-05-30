import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = import.meta.env.VITE_API_URL;

const WeeklyMoodDistributionChart = () => {
  const [weeklyMoodData, setWeeklyMoodData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/weekly-distribution`);
        if (!response.ok) {
          throw new Error("Failed to fetch weekly mood distribution data");
        }
        const data = await response.json();

        const labels = data.map((item) => item._id);
        const counts = data.map((item) => item.count);

        setWeeklyMoodData({
          labels,
          datasets: [
            {
              label: "Weekly Mood Count",
              data: counts,
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching weekly mood distribution data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="chart-container"
      style={{ boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.5)` }}
    >
      <h3 className="weeklyMood" style={{ color: "black", marginTop: `50px` }}>
        Weekly Mood Distribution
      </h3>
      <Line data={weeklyMoodData} />
    </div>
  );
};

export default WeeklyMoodDistributionChart;

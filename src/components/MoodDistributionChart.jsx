import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = import.meta.env.VITE_API_URL;

const MoodDistributionChart = () => {
  const [moodData, setMoodData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        const response = await fetch(`${API_URL}/api/distribution`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("Failed to fetch mood distribution data");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.length === 0) {
          console.log("No mood data found for this user.");
        }

        const labels = data.map((item) => item._id);
        const counts = data.map((item) => item.count);

        setMoodData({
          labels,
          datasets: [
            {
              label: "Mood Count",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching mood distribution data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="chart-container"
      style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)" }}
    >
      <h3 style={{ color: "black", marginTop: "50px" }}>Overall Mood</h3>
      <Bar data={moodData} />
    </div>
  );
};

export default MoodDistributionChart;

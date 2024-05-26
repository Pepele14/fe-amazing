import Footer from "../components/Footer";
import Header from "../components/Header";
import MoodSelector from "../components/MoodSelector";

function HomePage() {
  const handleMoodSelection = (mood) => {
    fetch("/api/moods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server responded with an error");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Mood stored:", data);
      })
      .catch((error) => {
        console.error("Error storing mood:", error);
      });
  };

  return (
    <div>
      <Header />
      <MoodSelector onSelectMood={handleMoodSelection} />
      <Footer />
    </div>
  );
}

export default HomePage;

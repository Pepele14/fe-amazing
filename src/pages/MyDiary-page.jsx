import Diary from "../components/Diary";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DiaryBacheca from "../components/DiaryBacheca";

function MyDiary() {
  return (
    <div>
      <Header />
      <div className="my-diary-page">
        <h1 style={{ textAlign: `center` }}>
          <span style={{ color: "rgb(254, 193, 1)" }}>My Diary</span> notes
        </h1>
        <DiaryBacheca />
      </div>
      <Diary />
      <Footer />
    </div>
  );
}

export default MyDiary;

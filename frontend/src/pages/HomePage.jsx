import "../styles/HomePage.css";
import LeftSideBar from "../components/LeftSideBar";
import TopBar from "../components/TopBar";

export default function HomePage() {
  return (
    <main className="homePage" aria-label="home page">
      <TopBar />
      <div className="dispay-container">
        <LeftSideBar />
      </div>
    </main>
  );
}

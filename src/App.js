import "./App.css";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Education from "./Components/Education";
import Navbar from "./Components/Navbar";
import "./Assets/Style.scss";
import { useEffect } from "react";
import Home from "./Components/Home";
import loadingsvg from "./Assets/developer.svg";
import { useSelector, useDispatch } from "react-redux";
import "aos/dist/aos.css";
import Aos from "aos";

function App() {
  const portfoliodata = useSelector((state) => state.details);
  const dispatch = useDispatch();
  useEffect(() => {
    Aos.init({ duration: 1500 });
    dispatch({ type: "DETAILS_FETCH_REQUESTED" });
  }, []);
  if (portfoliodata === "Error")
    return <div className="app-error">Unable to Fetch details</div>;
  if (!portfoliodata)
    return <img src={loadingsvg} alt="Loading Logo" className="loadingsvg" />;
  if (portfoliodata)
    return (
      <div className="App">
        <Navbar navbar={portfoliodata.basics.profiles} />
        <div className="sub-App">
          <Home home={portfoliodata.basics} />
          <About about={portfoliodata} />
          <Education education={portfoliodata.education} />
          <Contact />
        </div>
      </div>
    );
}

export default App;

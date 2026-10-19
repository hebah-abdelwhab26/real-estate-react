import AllCompo from "./components/AllCompo";
import Banner from "./Home/Banner";
import Contact from "./Home/Contact";
import ContactContenr from "./Home/ContactContenr";
import Featured from "./Home/Featured";
import Footer from "./Home/Footer";
import FunFacts from "./Home/FunFacts";
import Properties from "./Home/Properties";
import SectionBest from "./Home/SectionBest";
import VideoContent from "./Home/VideoContent";
import VideoSection from "./Home/VideoSection";

function App() {

 return (
    <div>
     <AllCompo/>
     <Banner/>
     <Featured/>
     <VideoSection/>
     <VideoContent/>
     <FunFacts/>
     <SectionBest/>
     <Properties/>
     <Contact/>
     <ContactContenr/>
     <Footer/>
    </div>
  );
}

export default App;

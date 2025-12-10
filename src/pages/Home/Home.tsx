import MapComponent from "@/components/custom/Map";
import Navbar from "@/components/custom/Navbar";

const Home = () => {
  
  return (
     <div className="h-screen flex flex-col overflow-hidden">
      <Navbar/>
      <div className="flex-1">
        <MapComponent/>
      </div>
    </div>
  )
};

export default Home;

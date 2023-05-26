import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./routes/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Boom from "./components/Store";
import RootLayout from "./MainService/RootLayout";
import Medialibrary from "./MainService/Pages/MediaLibrary";
import Gallery from "./MainService/Pages/Gallery";
import Processing from "./MainService/Pages/Processing";
import TableRow from "./MainService/Pages/TableRow";

export default function App() {
  const [count, setCount] = useState(0);

  // useEffect(()=>{
  //   console.log("change")
  // }, [count])
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/service/medialibrary" element={<Medialibrary />} />
          <Route path="/service/gallery" element={<Gallery />} />
          <Route path="/service/processing" element={<Processing/>}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

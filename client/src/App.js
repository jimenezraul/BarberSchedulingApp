import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Prices from "./pages/Prices";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Router>
      <div className='min-h-screen flex flex-col justify-between'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/prices' element={<Prices />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Prices from "./pages/Prices";

function App() {
  return (
    <Router>
      <div className='min-h-screen flex flex-col justify-between'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/prices' element={<Prices />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

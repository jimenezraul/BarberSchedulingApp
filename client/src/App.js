import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookNow from "./pages/BookNow";
import Prices from "./pages/Prices";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <div className='min-h-screen flex flex-col justify-between'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/booknow' element={<BookNow />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/prices' element={<Prices />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home.jsx';
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:userId" element={<Home />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;

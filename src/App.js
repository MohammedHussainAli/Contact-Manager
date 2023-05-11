import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Contacts from "./components/contact/contact";
import Charts from "./components/charts/charts";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4 main-content">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import Explore from "./components/Explore";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/user/*" element={<Profile />} />
          <Route path="/search" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
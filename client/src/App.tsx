import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import FollowersFollowing from "./components/FollowersFollowing";
import Explore from "./components/Explore";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/followersfollowing" element={<FollowersFollowing />} />
          <Route path="/search" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
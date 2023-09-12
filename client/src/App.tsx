import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <div className="container">
      <Routes>
          <Route path="/about"
          element={<About/>}
          />
          < Route path="/" element={<Home/>}
          />
          <Route path="/login"
          element={<Login/>}
          />
          <Route path="/signup"
          element={<Signup/>}
          />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;

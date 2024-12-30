import './App.css';
import CreateMeet from './components/createMeet';
import AllMeets from './components/AllMeetings/allMeets';
import SignUp from './components/SignUP/signUp';
import Login from './components/Login/login';
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-meet" element={<CreateMeet />} />
        <Route path="/all-meets" element={<AllMeets />} />
      </Routes>
    </Router>
  );
}

export default App;

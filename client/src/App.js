import "./App.css"
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom"
import AlertNotification from "./shared/AlertNotification";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/Register" element={<Register/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
      </Router>
      <AlertNotification/>
    </>
  );
}

export default App;

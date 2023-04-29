import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import DogsInfo from "./DogsInfo";
import Home from "./Home";


function App() {
  return (
    <div className="App">
     
        <BrowserRouter>
        <Routes>
          <Route  path="/" element={<DogsInfo/>}/>
          <Route  path="/location" element={<Home/>}/>
        </Routes>
        </BrowserRouter>
          
      
       
       
     
    </div>
  );
}

export default App;

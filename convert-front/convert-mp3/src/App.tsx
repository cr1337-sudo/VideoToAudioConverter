import "./App.css";
import PersistentDrawerLeft from "./component/SideBar/SideBar";
import InputVideo from "./component/BoxVideo/InputVideo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoList from "./component/VideoList/VideoList";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import RequireAuth from "./component/RequiredAuth/RequiredAuth";
import Cookies from "js-cookie";

function App() {
  
  const onFileChange = (file: File | null) => {
    console.log(file);
  };
  
  const token = Cookies.get("Token")

  return (
    <BrowserRouter>
      <PersistentDrawerLeft />
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/" element={<Login showCreateAccountLink={true} InputButton={false}/>}/>
          <Route element={<RequireAuth Token={token}/>}>
          <Route path="/home" element={<InputVideo onFileChange={(file) => onFileChange(file)} />}/>
          <Route path="/videos" element={<VideoList />} />
          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;

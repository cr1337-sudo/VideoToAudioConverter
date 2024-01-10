import "./App.css";
import PersistentDrawerLeft from "./component/SideBar/SideBar";
import InputVideo from "./component/BoxVideo/InputVideo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoList from "./component/VideoList/VideoList";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";

function App() {
  const onFileChange = (files: File[]) => {
    console.log(files);
  };

  return (
    <BrowserRouter>
      <PersistentDrawerLeft />
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/" element={<Login showCreateAccountLink={true} InputButton={false}/>}/>
          <Route path="/home" element={<InputVideo onFileChange={(files) => onFileChange(files)} />}/>
          <Route path="/videos" element={<VideoList />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import PersistentDrawerLeft from "./component/SideBar/SideBar";
import InputVideo from "./component/BoxVideo/InputVideo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoList from "./component/VideoList/VideoList";

function App() {
  const onFileChange = (files: File[]) => {
    console.log(files);
  };

  return (
    <BrowserRouter>
      <PersistentDrawerLeft />
        <Routes>
          <Route path="/" element={<InputVideo onFileChange={(files) => onFileChange(files)} />}/>
          <Route path="/videos" element={<VideoList />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;

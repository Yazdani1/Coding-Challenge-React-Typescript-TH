import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UploadImage from "./page/UploadImage";
import Thumbnail from "./page/Thumbnail";
import CreateThumbnail from "./page/CreateThumbnail";

const App = () => {
  return (
 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Thumbnail />} />
            <Route path="/upload-image" element={<UploadImage />} />
            <Route path="/create-thumbnail" element={<CreateThumbnail />} />

          </Routes>
        </BrowserRouter>
   
  );
};

export default App;

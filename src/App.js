import React from "react";

import "./App.css";
import Dropzone from "./dropzone/Dropzone";
import DropzoneComponent from "./mycomponents/DropZoneComponent";

function App() {
  return (
    <div>
      <p className="title">React Drag and Drop Image Upload</p>
      <div className="content">
        <Dropzone />
        <DropzoneComponent />
      </div>
    </div>
  );
}

export default App;

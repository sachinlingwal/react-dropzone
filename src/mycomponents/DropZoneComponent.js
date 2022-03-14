import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./DropZoneComponent.module.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "0em 1em",
  gap: "1rem",
  borderWidth: 2,
  borderRadius: 6,
  borderColor: "#58A7FF",
  borderStyle: "dashed",
  backgroundColor: "#F8FAFF",
  color: "#BCCEFA",
  fontSize: "0.9em",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "10em",
  // marginLeft: "2.5em",
  // width: "55em",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
  backgroundColor: "#ff1744",
};

function DropzoneComponent(props) {
  // const { setUploadFeatureAvatar, organizationId } = props;
  const [files, setFiles] = useState([]);

  const [myImage, setMyImage] = useState();
  console.log(myImage);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    //!sent upload image to parent file
    // setUploadFeatureAvatar(acceptedFiles);
    setMyImage(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: "image/jpeg, image/png",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <>
      <span key={file.name}>
        <img src={file.preview} alt={file.name} width="90px" height="50px" />
        <p>{file.name}</p>
      </span>
    </>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <div style={{ marginTop: "0.8em" }}>
      <section {...getRootProps({ style })}>
        <aside style={{ width: "8em" }}>
          {
            thumbs

            // ? (
            //   thumbs
            // ) : (
            //   <img src={organizationId[0].preview} alt="phodto" width="90" />
            // )
          }
        </aside>
        <input {...getInputProps()} />
        <p>Drag and drop or Upload a file</p>
        <div className={classes.select} onClick={open}>
          Choose Files
        </div>
      </section>
    </div>
  );
}

export default DropzoneComponent;

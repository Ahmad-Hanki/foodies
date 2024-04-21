"use client";

import { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";
import Image from "next/image";

function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();
  const handleClickImage = () => {
    imageInput.current.click();
  };

  function handleImageChanger(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader(); //1

    fileReader.onload = () => {
        setPickedImage(fileReader.result); // no await so 3
      };

    fileReader.readAsDataURL(file); //2 

    console.log(pickedImage);
  
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name} className="">
        {label}
      </label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage ? (
            <p>No Image Picked Yet</p>
          ) : (
            <Image src={pickedImage} alt="image selected by user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpej"
          name={name}
          ref={imageInput}
          onChange={handleImageChanger}
          //   multiple
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleClickImage}
        >
          PICK AN IMAGE
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;

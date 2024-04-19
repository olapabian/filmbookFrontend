import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import "./addPhoto.scss";

interface AddPhotoProps {
  onClose: () => void;
  onAddImage: (image: Blob) => void; // Dodaj nowy prop onAddImage
}

const AddPhoto: React.FC<AddPhotoProps> = ({ onClose, onAddImage }) => {
  const handleAddPhotoClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      console.log("Dodano zdjęcie:", selectedFile);
      onAddImage(selectedFile); // Przekaż wybrany obrazek do komponentu nadrzędnego
      onClose(); // Zamknij komponent AddPhoto po dodaniu zdjęcia
    } else {
      alert("Wybierz plik przed dodaniem zdjęcia.");
    }
  };

  return (
    <>
      <div className="overlay-signup-add-photo"></div>
      <div className="signup-add-photo">
        <div className="signup-container-add-photo">
          <div className="signup-top-add-photo">
            <div className="signup-header-add-photo">
              <h1>Dodaj zdjęcie</h1>
            </div>
            <div className="close-icon-div-add-photo" onClick={onClose}>
              <FaWindowClose className="close-icon-add-photo" />
            </div>
          </div>
          <div className="signup-separator-add-photo"></div>
          <div className="add-photo-section">
            <input type="file" accept="image/*" id="fileInput" />
            <button onClick={handleAddPhotoClick}>Dodaj zdjęcie</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPhoto;

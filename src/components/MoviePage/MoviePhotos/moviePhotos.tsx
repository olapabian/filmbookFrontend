import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./moviePhotos.scss";
import {
  getMoviePhotosIdsByMovieId,
  getMoviePhotosByPhotoId,
  MoviePosterResponse,
} from "../../../Helpers/movie_helper"; // Zastąp "axiosFile" odpowiednią nazwą pliku

const MoviePhotos: React.FC = () => {
  const { movieId } = useParams<{ movieId?: string }>();
  const [photoIds, setPhotoIds] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]); // Change to string[] for image URLs

  useEffect(() => {
    if (movieId) {
      fetchPhotoIds();
    }
  }, [movieId]);

  useEffect(() => {
    if (photoIds.length > 0) {
      fetchPhotos();
    }
  }, [photoIds]);

  const fetchPhotoIds = async () => {
    try {
      if (movieId) {
        const response = await getMoviePhotosIdsByMovieId(movieId);
        setPhotoIds(response.data);
      }
    } catch (error) {
      console.error("Error fetching photo IDs:", error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const photoDataPromises = photoIds.map(async (photoId) => {
        const response = await getMoviePhotosByPhotoId(photoId);
        // Assuming the response contains a URL to the image
        return URL.createObjectURL(response.data); // Create URL for blob data
      });
      const photoData = await Promise.all(photoDataPromises);
      setPhotos(photoData);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <div className="movie-photos-container">
      <div className="photos-grid">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            className="photo"
            alt={`Photo ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviePhotos;

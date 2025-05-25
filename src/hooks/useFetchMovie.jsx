import { useContext, useRef, useState } from "react";
import { PopupContext } from "../SharedContext";
import axios from "axios";

export const useFetchMovie = (onClick, movieId) => {
  const { allMovies, setAllMovies } = useContext(PopupContext);
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [release, setRelease] = useState("");
  const [category1, setCategory1] = useState("top-rating");
  const [category2, setCategory2] = useState("film-trending");
  const [premium, setPremium] = useState(false);
  const [age_rating, setAgeRating] = useState("13+");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState([]);
  const [caster, setCaster] = useState("");
  const [cast, setCast] = useState([]);
  const [filmmake, setFilmmake] = useState("");
  const [filmmaker, setFilmmaker] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const modalRef = useRef(null);
  const [filesImage, setFilesImage] = useState(null);
  const apiKey = import.meta.env.VITE_APIKEY_IMGBB;
  console.log(allMovies)
  const genreOptions = [
    "Aksi",
    "Anak Anak",
    "Anime",
    "Britannia",
    "Drama",
    "Fantasi Ilmiah dan Fantasi",
    "Kejahatan",
    "KDrama",
    "Komedi",
    "Petualangan",
    "Perang",
    "Romantis",
    "Sains dan Alam",
    "Thriller",
  ];
  const handleAddCaster = (e) => {
    e.preventDefault();
    if (caster.trim() === "" || cast.includes(caster)) return;
    if (cast.length === 7) {
      alert("Maximal 7 Caster");
      return;
    }
    setCast((prevCaster) => [...prevCaster, caster]);
    setCaster("");
  };

  const handleAddFilmmaker = (e) => {
    e.preventDefault();
    if (filmmake.trim() === "" || filmmaker.includes(filmmake)) return;
    if (filmmaker.length === 5) {
      alert("Maximal 5 Filmmaker");
      return;
    }
    setFilmmaker((prevFilmmaker) => [...prevFilmmaker, filmmake]);
    setFilmmake("");
  };

  const handleGenreChange = (genre) => {
    setGenre((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre);
      }
      if (prev.length < 3) {
        return [...prev, genre];
      }
      return prev;
    });
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    if (genre.length < 1) {
      alert("Pick at least 1 genre");
      return;
    }
    if (cast.length < 1) {
      alert("Add at least 1 caster");
      return;
    }
    if (filmmaker.length < 1) {
      alert("Add at least 1 filmmaker");
      return;
    }
    setIsCreate(true);

    try {
      let imageUrlToUse = imageUrl;
      if (filesImage) {
        const formDataImage = new FormData();
        formDataImage.append("image", filesImage);
        const uploadResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formDataImage
        );
        imageUrlToUse = uploadResponse.data.data.url;
        setImageUrl(imageUrlToUse);
      }
      const movieData = {
        imageUrl: imageUrlToUse,
        title,
        genre,
        duration,
        description,
        cast,
        filmmaker,
        release,
        category1,
        category2,
        premium,
        age_rating,
      };
      setAllMovies((prevMovies) => [...prevMovies, movieData]);
      setTimeout(() => {
        setIsCreate(false);
        onClick();
        resetForm();
      }, 1000);
    } catch (error) {
      setIsCreate(false);
      console.error("Error:", error);
    }
    function resetForm() {
      setImageUrl("");
      setTitle("");
      setDuration("");
      setRelease("");
      setCategory1("series-chill");
      setCategory2("film-trending");
      setPremium(false);
      setAgeRating("13+");
      setDescription("");
      setGenre([]);
      setCaster("");
      setCast([]);
      setFilmmake("");
      setFilmmaker([]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    setFilesImage(file);
  };

  const handleChangeMovie = async (e) => {
    e.preventDefault();
    if (genre.length < 1) {
      alert("Pick a genre minimal 1");
      return;
    }
    if (cast.length < 1 && genre.length > 0) {
      alert("Add a caster minimal 1");
      return;
    }
    if (filmmaker.length < 1 && cast.length > 0) {
      alert("Add a filmmaker minimal 1");
      return;
    }
    setIsCreate(true);

    try {
      let imageUrlToUse = imageUrl;
      if (filesImage) {
        const formDataImage = new FormData();
        formDataImage.append("image", filesImage);
        const uploadResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formDataImage
        );
        imageUrlToUse = uploadResponse.data.data.url;
        setImageUrl(imageUrlToUse);
      }
      const formData = {
        imageUrl: imageUrlToUse,
        title,
        genre,
        duration,
        description,
        cast,
        filmmaker,
        release,
        category1,
        category2,
        premium,
        age_rating,
      };
      setAllMovies((prevMovies) =>
        prevMovies.map((movie) => {
          if (movie.id === movieId) {
            return formData;
          }
          return movie;
        })
      );
      setTimeout(() => {
        setIsCreate(false);
        onClick();
      }, 1000);
    } catch (error) {
      setIsCreate(false);
      console.log(error);
    }
  };

  return {
    handleChangeMovie,
    handleCreateMovie,
    allMovies,
    setAllMovies,
    preview,
    imageUrl,
    setImageUrl,
    title,
    setTitle,
    duration,
    setDuration,
    release,
    setRelease,
    category1,
    category2,
    setCategory1,
    setCategory2,
    premium,
    setPremium,
    age_rating,
    setAgeRating,
    description,
    setDescription,
    genre,
    setGenre,
    isCreate,
    setIsCreate,
    modalRef,
    filesImage,
    setPreview,
    apiKey,
    genreOptions,
    caster,
    setCast,
    setCaster,
    setFilmmake,
    setFilmmaker,
    cast,
    filmmake,
    filmmaker,
    handleAddCaster,
    handleAddFilmmaker,
    handleGenreChange,
    handleImageChange,
  };
};

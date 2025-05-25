import { useContext, useEffect, useRef, useState } from "react";
import { SelectSection } from "./SelectSection";
import { InputFields } from "./InputFields";
import { useFetchMovie } from "../hooks/useFetchMovie";

export const ChangeMovieData = ({ movieId, onClick }) => {
  const {
    preview,
    imageUrl,
    setImageUrl,
    title,
    caster,
    setCast,
    setCaster,
    setFilmmake,
    setFilmmaker,
    setPreview,
    cast,
    filmmake,
    filmmaker,
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
    genreOptions,
    handleAddCaster,
    handleAddFilmmaker,
    handleGenreChange,
    handleImageChange,
    handleChangeMovie,
  } = useFetchMovie(onClick, movieId);

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await axiosInstance(`/movie/${movieId}`);
        setTitle(response.data.title || "");
        setDuration(response.data.duration || "");
        setRelease(response.data.release || "");
        setCategory1(response.data.category1 || "series-chill");
        setCategory2(response.data.category2 || "film-trending");
        setPremium(response.data.premium || true);
        setAgeRating(response.data.age_rating || "13+");
        setDescription(response.data.description || "");
        setGenre(response.data.genre || []);
        setCast(response.data.cast || []);
        setFilmmaker(response.data.filmmaker || []);
        setImageUrl(response.data.imageUrl || null);
        setPreview(response.data.imageUrl || "");
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  }, []);

  const getImagePath = () => {
    if (preview && preview.startsWith('blob:')) {
      return preview;
    }
    if (imageUrl?.includes("i.ibb.co")) {
      const result = imageUrl.replace("i.ibb.co", "i.ibb.co.com");
      return result;
    } else if (imageUrl?.length < 15) {
      return `/imgpotrait/${imageUrl}`;
    }
  };

  const MobileStyles = () => (
    <style>{`
      @media (max-width: 768px) {
        .change-movie-container {
          padding: 1rem !important;
          overflow-y: auto !important;
        }
        
        .change-movie-form {
          flex-direction: column !important;
          gap: 2rem !important;
        }
        
        .change-movie-column {
          margin-left: 0 !important;
          width: 100% !important;
        }
        
        .change-movie-image-upload {
          margin: 0 auto !important;
          width: 100% !important;
        }
        
        .change-movie-image-preview {
          width: 40% !important;
          height: auto !important;
          aspect-ratio: 2/3 !important;
          margin: auto;
        }
        
        .change-movie-genre-container {
          width: 100% !important;
          height: auto !important;
          max-height: 150px !important;
        }
        
        .change-movie-textarea {
          width: 100% !important;
        }
        
        .change-movie-submit-btn {
          width: 100% !important;
        }
        
        .change-movie-close-btn {
          top: 10px !important;
          right: 10px !important;
          padding: 0.5rem !important;
        }
      }
    `}</style>
  );

  if (isCreate) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-purple-900 to-blue-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
          <p className="text-lg text-blue-100 mb-6">
            Movie updated successfully! 🎬
          </p>
          <div className="animate-pulse">
            <p className="text-sm text-blue-200">Redirecting shortly...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <MobileStyles />
      <form onSubmit={handleChangeMovie} className="flex change-movie-form">
        {/* column 1 */}
        <div className="grid h-50 gap-3 change-movie-column change-movie-image-upload">
          <h4 className="text-md">Upload image film</h4>
          <div className="flex flex-col mb-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="w-35 h-50 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center change-movie-image-preview">
                {preview ? (
                  <img
                    src={getImagePath()}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-300">+ Upload Image</span>
                )}
              </div>
            </label>
            {imageUrl && <p className="text-xs mt-2 text-gray-300"></p>}
          </div>
        </div>

        {/* column 2 */}
        <div className="ml-12 change-movie-column">
          <InputFields
            title={title}
            year={release}
            duration={duration}
            setTitle={setTitle}
            setYear={setRelease}
            setDuration={setDuration}
          />
          <SelectSection
            category1="Chill Series Movie"
            category1value="chill-series"
            category2="Top Rating Movie"
            category2value="top-rating"
            title="Film Category 1"
            value={category1}
            onChange={(e) => {
              category1 === "top-rating" ? setPremium(true) : setPremium(false);
              setCategory1(e.target.value);
            }}
          />
          <SelectSection
            category1="Trending Movie"
            category1value="film-trending"
            category2="New Release Movie"
            category2value="new-release"
            title="Film Category 2"
            value={category2}
            onChange={(e) => setCategory2(e.target.value)}
          />
        </div>

        {/* column 3 */}
        <div className="space-y-4 w-55 ml-10 change-movie-column -mt-8 md:mt-0">
          <SelectSection
            category1="13+"
            category1value="13+"
            category2="17+"
            category2value="17+"
            category3="21+"
            category3value="21+"
            title="Age Rating"
            value={age_rating}
            onChange={(e) => setAgeRating(e.target.value)}
          />
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-300 mb-2">
              Genre (Max 3)
            </span>
            <div className="flex flex-wrap w-11/10 h-38 gap-2 overflow-y-auto scrollbar-hide snap-y snap-mandatory change-movie-genre-container">
              {genreOptions.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGenreChange(g)}
                  className={`px-3 py-1 snap-start text-sm rounded-full border transition-colors ${
                    genre.includes(g)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {genre.length > 0 && (
              <div className="mt-2 -mb-4 text-xs text-gray-400">
                Selected: {genre.join(", ")}
              </div>
            )}
          </div>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-gray-300 mb-1">
              Add Description
            </span>
            <textarea
              required
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-60 px-4 py-2 h-23 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all change-movie-textarea"
              placeholder="Add description here..."
            />
          </label>
        </div>

        {/* column 4 */}
        <div className="ml-6 change-movie-column -mt-8 md:mt-0">
          <label>
            <span className="block text-sm font-medium text-gray-300 mb-1">
              Caster
            </span>
            <div className="flex gap-1">
              <input
                value={caster}
                onChange={(e) => setCaster(e.target.value)}
                type="text"
                className="w-7/10 px-4 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all "
                placeholder="Add caster..."
              />
              <button
                onClick={handleAddCaster}
                className="w-3/10 px-4 py-2 cursor-pointer bg-blue-600 hover hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Add
              </button>
            </div>
            {cast.length > 0 && (
              <span className="text-xs font-medium text-gray-300 ml-4">
                Casters : {cast.join(",")}
              </span>
            )}
          </label>
          <label>
            <span className="block text-sm font-medium text-gray-300 mb-1">
              Filmmaker
            </span>
            <div className="flex gap-1">
              <input
                value={filmmake}
                onChange={(e) => setFilmmake(e.target.value)}
                type="text"
                className="w-7/10 px-4 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all "
                placeholder="Add filmmaker..."
              />
              <button
                onClick={handleAddFilmmaker}
                className="w-3/10 px-4 py-2 cursor-pointer bg-blue-600 hover hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Add
              </button>
            </div>
            {filmmaker.length > 0 && (
              <span className="text-xs font-medium text-gray-300 ml-4">
                Filmmaker : {filmmaker.join(",")}
              </span>
            )}
          </label>
          <label className="flex items-center mt-3 w-45 justify-between">
            <span className="text-sm mr-5 font-medium text-gray-300">
              Premium Content
            </span>
            <div
              className={`relative inline-block w-12 h-6 rounded-full transition-all duration-300 ${
                premium ? "bg-blue-600" : "bg-gray-600"
              }`}
            >
              <input
                type="checkbox"
                checked={premium}
                onChange={() => {
                  premium
                    ? setCategory1("top-rating")
                    : setCategory1("chill-series");
                  setPremium(!premium);
                }}
                className="absolute opacity-0 w-0 h-0"
              />
              <span
                className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                  premium ? "transform translate-x-6" : ""
                }`}
              ></span>
            </div>
          </label>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="px-12 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 h-12 change-movie-submit-btn"
            >
              Update Movie
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

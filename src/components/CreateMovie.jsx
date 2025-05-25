import { SelectSection } from "./SelectSection";
import { InputFields } from "./InputFields";
import { useFetchMovie } from "../hooks/useFetchMovie";

export const CreateMovie = ({ onClick }) => {
  const {
    preview,
    imageUrl,
    title,
    caster,
    modalRef,
    setCaster,
    setFilmmake,
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
    isCreate,
    genreOptions,
    handleAddCaster,
    handleAddFilmmaker,
    handleGenreChange,
    handleImageChange,
    handleCreateMovie,
  } = useFetchMovie(onClick);

  const mobileStyles = `
    @media (max-width: 768px) {
      .create-movie-container {
        padding: 1rem !important;
        height: auto !important;
        min-height: 100vh !important;
        overflow-y: auto !important;
      }
      
      .create-movie-modal {
        padding: 1.5rem !important;
        width: 100% !important;
        height: auto !important;
      }
      
      .create-movie-form {
        flex-direction: column !important;
        gap: 2rem !important;
      }
      
      .create-movie-column {
        margin-left: 0 !important;
        width: 100% !important;
      }
      
      .create-movie-close-btn {
        top: 10px !important;
        right: 10px !important;
        padding: 4px 12px !important;

      }
      
      .create-movie-image-upload {
        margin: 0 auto !important;
      }
      
      .create-movie-genre-buttons {
        justify-content: center !important;
      }
      
      .create-movie-submit-btn {
        width: 100% !important;
        margin-top: 1rem !important;
      }
    }
  `;

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
            Movie created successfully! 🎬
          </p>
          <div className="animate-pulse">
            <p className="text-sm text-blue-200">Redirecting shortly....</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{mobileStyles}</style>
      <div className="w-full h-screen transition-all top-0 p-9 px-20 bg-black absolute create-movie-container">
        <div
          ref={modalRef}
          className="w-full h-full relative py-10 px-20 z-10 rounded-lg bg-gray-500 text-white create-movie-modal"
        >
          <h2 className="text-center text-2xl font-[600] mb-6">Create Movie</h2>
          <button
            onClick={onClick}
            className="absolute create-movie-close-btn z-20 top-5 cursor-pointer rounded-full md:p-2 md:px-4 bg-blue-600 right-5 shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 text-gray-100 text-md font-medium"
          >
            X
          </button>
          <form onSubmit={handleCreateMovie} className="flex create-movie-form">
            {/* column 1 */}
            <div className="grid h-50 gap-3 create-movie-image-upload">
              <h4 className="text-md">Upload image film</h4>
              <div className="flex flex-col mb-4 ">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-300">+ Upload Image</span>
                    )}
                  </div>
                </label>
                {imageUrl && (
                  <p className="text-xs mt-2 text-gray-300 truncate">
                    Image uploaded successfully
                  </p>
                )}
              </div>
            </div>

            {/* column 2 */}
            <div className=" ml-12 create-movie-column">
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
                  category1 === "top-rating"
                    ? setPremium(true)
                    : setPremium(false);
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
            <div className="space-y-4 w-55 ml-10 create-movie-column -mt-8 md:mt-0">
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
                  className="w-full px-4 py-2 h-23 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Add description here..."
                />
              </label>
            </div>

            {/* column 4 */}
            <div className="ml-6 create-movie-column -mt-8 md:mt-0">
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
                  className="px-12 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 h-12"
                >
                  Create Movie
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

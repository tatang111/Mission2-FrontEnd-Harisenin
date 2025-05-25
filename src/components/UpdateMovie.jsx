import { useContext, useEffect, useRef, useState } from "react";
import { PopupContext } from "../SharedContext";
import { MovieToUpdate } from "./MovieToUpdate";
import { ChangeMovieData } from "./ChangeMovieData";

export const UpdateMovie = ({ onClick }) => {
  const { allMovies } = useContext(PopupContext);
  const [movies, setMovies] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [movieId, setMovieId] = useState(0);
  const [movieTitle, setMovieTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    try {
      setLoading(true);
      const filtered = allMovies.filter(
        (movie) => movie?.id < 33 || movie?.id > 65
      );
      setMovies(filtered);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [allMovies]);

  const handleUpdate = (movieId, movieTitle) => {
    setShowPopup(true);
    setMovieId(movieId);
    setMovieTitle(movieTitle);
  };

  const handleUpdateMovie = () => {
    setShowPopup(false);
    setModalUpdate(true);
  };

  if (loading) return <p className="text-white p-4">Loading...</p>;

  return (
    <>
      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .update-movie-container {
            padding: 1rem !important;
            height: auto !important;
            min-height: 100vh !important;
          }
          
          .update-movie-modal {
            padding: 1.5rem !important;
            width: 100% !important;
            height: auto !important;
          }
          
          .update-movie-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          
          .update-movie-close-btn {
            top: 10px !important;
            right: 10px !important;
            padding: 4px 12px !important;
          }
          
          .update-movie-confirm-popup {
            width: 90% !important;
            max-width: 100% !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>

      <div className={`w-full transition-all ${modalUpdate ? "pt-7" : "pt-9"} top-0 p-9 px-4 md:px-20 bg-black absolute update-movie-container`}>
        <div
          ref={modalRef}
          className={`w-full h-full relative ${
            modalUpdate ? "py-7" : "py-10"
          } px-4 md:px-20 z-10 rounded-lg bg-gray-500 text-white update-movie-modal`}
        >
          <button
            onClick={onClick}
            className="absolute z-20 top-5 cursor-pointer rounded-full p-2 px-4 bg-blue-600 right-5 shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 text-gray-100 text-md font-medium update-movie-close-btn"
          >
            X
          </button>
          
          <h2 className="text-center text-2xl font-[600] mb-6">Update Movie</h2>
          
          {modalUpdate ? (
            <ChangeMovieData movieId={movieId} onClick={onClick} />
          ) : (
            <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 update-movie-grid">
              {movies.map((movie) => (
                <MovieToUpdate
                  key={movie.id}
                  movie={movie}
                  onClick={handleUpdate}
                />
              ))}
            </main>
          )}
          
          {showPopup && (
            <section className="fixed inset-0 flex justify-center items-center z-50 bg-black/70">
              <div className="bg-gray-700 p-7 w-full max-w-md mx-4 rounded-xl flex flex-col gap-5 update-movie-confirm-popup">
                <h3 className="text-xl font-bold">Update {movieTitle}?</h3>
                <h4 className="text-md">Are you sure you want to update this movie?</h4>
                <div className="mt-6 flex gap-2 justify-end">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-gray-500 hover:bg-gray-600 cursor-pointer px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateMovie}
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer px-4 py-2 rounded-md"
                  >
                    Update
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};
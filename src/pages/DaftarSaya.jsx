import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { NewEpisode } from "../components/NewEpisode";
import { PotraitCard } from "../components/PotraitCard";
import { TopTen } from "../components/TopTen";
import { PopupContext } from "../SharedContext";
import { PopupDetailFilm } from "../components/PopupDetailFilm";

export const DaftarSaya = () => {
  const { detailClickingFilm, setDetailClickingFilm, allMovies} =
    useContext(PopupContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      const getMovie = allMovies
        .filter((movie) => movie.id > 10 && movie.id < 25)
        .map((movie) => ({ ...movie, premium: false }));
      setMovies(getMovie);
    } catch (error) {
      console.log(error);
    }
  }, [allMovies]);

  return (
    <div>
      <div
        className={`bg-black text-white ${
          detailClickingFilm ? "brightness-35" : ""
        } `}
      >
        <Navbar />
        <main className="md:px-20 ml-4 my-[20px] md:my-[50px] flex flex-col gap-8">
          <h1 className="text-3xl font-[600]">Daftar Saya</h1>
          <div className="grid grid-cols-3 md:grid-cols-5 -ml-2 pr-2 gap-x-1 gap-y-5 md:gap-5">
            {movies.map((movie) => (
              <PotraitCard key={movie.id} movie={movie} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
      {detailClickingFilm && (
        <div className="absolute z-50 top-[100px] md:top-[100px]  left-1/2 -translate-x-1/2 flex  md:items-center justify-center">
          <PopupDetailFilm onClose={() => setDetailClickingFilm(false)} />
        </div>
      )}
    </div>
  );
};
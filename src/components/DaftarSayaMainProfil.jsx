import { Link } from "react-router-dom";
import { PotraitCard } from "./PotraitCard";
import { TopTen } from "./TopTen";
import { useContext, useEffect, useState } from "react";
import { PopupContext } from "../SharedContext";

export const DaftarSayaMainProfil = () => {
  const { allMovies } = useContext(PopupContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      const getMovie = allMovies
        .filter((movie) => movie.id > 10 && movie.id < 16)
        .map((movie) => ({ ...movie, premium: false }));
      setMovies(getMovie);
    } catch (error) {
      console.log(error);
    }
  }, [allMovies]);

  return (
    <section className="md:px-20 px-5 flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <span className="text-3xl font-[600]">Daftar Saya</span>
        <Link to="/daftarsaya" className="cursor-pointer hover:underline">
          Lihat Semua
        </Link>
      </div>
      <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
        {movies.map((movie) => (
          <PotraitCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

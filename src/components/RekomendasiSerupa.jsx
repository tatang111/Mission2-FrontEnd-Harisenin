import { useContext, useEffect, useState } from "react";
import { PotraitCard } from "./PotraitCard";
import { PopupContext } from "../SharedContext";

export const RekomendasiSerupa = () => {
  const { allMovies } = useContext(PopupContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      const getMovie = allMovies.filter(
        (movie) => movie.id < 4
      );
      setMovies(getMovie);
    } catch (error) {
      console.log(error);
    }
  }, [allMovies]);

  return (
    <div className="text-white px-4 md:px-20 gap-6 md:gap-8 grid">
      <h1 className="text-3xl font-[600]">Rekomendasi Serupa</h1>
      <div className="flex gap-1 -ml-3 md:gap-5 ">
        {movies.length === 0 ? (
          <p>Loading...</p>
        ) : (
          movies?.map((movie) => <PotraitCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

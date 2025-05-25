import { ArrowScrollX } from "./ArrowScrollX";
import { PotraitCard } from "./PotraitCard";
import { useContext, useEffect, useRef, useState } from "react";
import { PopupContext } from "../SharedContext";

export const SeriesPersembahan = () => {
  const { allMovies } = useContext(PopupContext);
  const [movies, setMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    try {
      const getMovie = allMovies
        .filter(
          (movie) => movie.premium === true && (movie.id < 33 || movie.id > 65)
        )
        .map((movie) => ({ ...movie, top_ten: false }));
      setMovies(getMovie);
    } catch (error) {
      console.log(error);
    }
  }, [allMovies]);

  return (
    <div className="top-film flex flex-col gap-4 md:gap-8 relative">
      <h1 className="text-2xl md:text-5xl font-[600]">
        Series Persembahan Chill
      </h1>
      <div className="relative">
        <ArrowScrollX containerRef={scrollContainerRef} />
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {movies.map((movie) => (
            <PotraitCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

import { ArrowScrollXContinue } from "./ArrowScrollXContinue";
import { LandscapeCardFilm } from "./LandscapeCardFilm";
import { useContext, useEffect, useRef, useState } from "react";
import { PopupContext } from "../SharedContext";

export const ContinueFilmCard = () => {
  const { allMovies } = useContext(PopupContext);
  const [movies, setMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    try {
      const getMovie = allMovies
        .filter((movie) => movie?.id > 50 && movie?.id < 65)
        .map((movie) => ({ ...movie, new_episode: false }));
      setMovies(getMovie);
    } catch (error) {
      console.log(error);
    }
  }, [allMovies]);

  return (
    <div className="continueWatch flex flex-col gap-4 md:gap-8 relative">
      <h1 className="text-2xl md:text-5xl  font-[600]">
        Melanjutkan Nonton Film
      </h1>
      <div className="relative ">
        <ArrowScrollXContinue
          containerRef={scrollContainerRef}
          width="1215px"
        />
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {movies.map((movie) => (
            <LandscapeCardFilm key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

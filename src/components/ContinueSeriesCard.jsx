import { useContext, useEffect, useRef, useState } from "react";
import { ArrowScrollXContinue } from "./ArrowScrollXContinue";
import { LandscapeCardSeries } from "./LandscapeCardSeries";
import { PopupContext } from "../SharedContext";

export const ContinueSeriesCard = () => {
  const { allMovies } = useContext(PopupContext);
  const [movies, setMovies] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    try {
      const getMovie = allMovies.filter(
        (movie) => (movie?.id > 32 && movie?.id < 49)
      );
      setMovies(getMovie);
    } catch (error) {
      console.log(error);
    }
  }, [allMovies]);

  return (
    <div className="continueWatch flex flex-col gap-4 md:gap-8 relative">
      <h1 className="text-2xl md:text-5xl  font-[600]">
        Melanjutkan Nonton Series
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
            <LandscapeCardSeries key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

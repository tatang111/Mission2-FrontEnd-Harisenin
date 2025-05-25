import {
  faStar,
  faPlay,
  faCheck,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PopupContext } from "../SharedContext";
import { useNavigate } from "react-router-dom";

export const LandscapeCardFilm = ({ movie }) => {
  const { setDetailClickingFilm } = useContext(PopupContext);
  const navigate = useNavigate()

  const handleClickDetail = () => {
    setDetailClickingFilm(true);
    const theMovie = {
      release: movie.release,
      title: movie.title,
      src: `/imglandscape/${movie.imageUrl}`,
      genre: movie.genre,
      duration: movie.duration,
      description: movie.description,
      rating: movie.age_rating,
      filmMaker: movie.filmmaker,
      cast: movie.cast,
      age_rating: movie.age_rating,
    };
    localStorage.setItem("movie", JSON.stringify(theMovie));
  };

  const handleMobileClick = () => {
    if (window.innerWidth < 768) {
      setDetailClickingFilm(true);
      const theMovie = {
        release: movie.release,
        title: movie.title,
        src: `/imglandscape/${movie.imageUrl}`,
        genre: movie.genre,
        duration: movie.duration,
        description: movie.description,
        rating: movie.age_rating,
        filmMaker: movie.filmmaker,
        cast: movie.cast,
        age_rating: movie.age_rating,
      };
      localStorage.setItem("movie", JSON.stringify(theMovie));
    }
  };

  const handleWatchSeries = () => {
    navigate("/watchfilm");
  };

  return (
    <section
      onClick={handleMobileClick}
      className="flex-shrink-0 w-[300px] h-[160px] md:w-47/200 md:h-[170px] relative group"
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg transition-all duration-300 group-hover:z-20">
        <div className="object-cover h-40 md:w-full rounded-lg">
          <img
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            src={`/imglandscape/${movie?.imageUrl}`}
            alt=""
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent">
          <div className="flex absolute bottom-0 justify-between w-full p-3 group-hover:opacity-0 transition-opacity duration-300">
            <h1 className="font-[700] text-md">{movie?.title}</h1>
            <span className="pt-1 text-md font-[700]">
              <FontAwesomeIcon icon={faStar} className="text-white" />
              {movie?.rating} / 5
            </span>
          </div>
        </div>

        <div className="absolute hidden md:flex flex-col inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
          <div className="flex-grow"></div>
          <div className="mb-2">
            <div className="flex justify-between items-center gap-2 mb-2">
              <div className="flex gap-2">
                <button
                  onClick={handleWatchSeries}
                  title="Play"
                  className="bg-white cursor-pointer text-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-sm ml-[2px]" />
                </button>
                <button className="text-white cursor-pointer w-8 h-8 border-2 flex items-center justify-center rounded-full border-gray-400 hover:border-white transition-colors">
                  <FontAwesomeIcon icon={faCheck} className="text-sm" />
                </button>
              </div>
              <button
                onClick={handleClickDetail}
                title="Selengkapnya"
                className="text-white cursor-pointer w-8 h-8 border-2 flex items-center justify-center rounded-full border-gray-400 hover:border-white transition-colors"
              >
                <FontAwesomeIcon icon={faAngleDown} className="text-sm" />
              </button>
            </div>

            {/* Hover Event */}
            <div className="flex gap-2 text-gray-300 mb-1">
              <span className="text-md rounded-full px-2 py-[2px] border-gray-300 bg-[#CDF1FF4D]">
                {movie?.age_rating}
              </span>
              <span className="items-center flex">{movie?.duration}m</span>
            </div>

            <div className="text-white text-sm font-semibold line-clamp-1 text-ellipsis overflow-hidden">
              {movie?.genre[0]} • {movie?.genre[1]} {movie?.genre[2] ? "•" : ""}{" "}
              {movie?.genre[2]}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-2 left-2 right-2 text-white text-sm font-medium group-hover:opacity-0 transition-opacity duration-300">
        {/* {info} */}
      </div>
    </section>
  );
};

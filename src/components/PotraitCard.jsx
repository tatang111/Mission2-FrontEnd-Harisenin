import {
  faAngleDown,
  faAnglesDown,
  faArrowDown,
  faCheck,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PopupContext } from "../SharedContext";
import { TopTen } from "./TopTen";
import { NewEpisode } from "./NewEpisode";
import { Premium } from "./Premium";
import { useNavigate } from "react-router-dom";

export const PotraitCard = ({ movie }) => {
  const { setDetailClickingSeries, setDetailClickingFilm } =
    useContext(PopupContext);
    const navigate = useNavigate()

    const getImagePath = () => {
      if (movie?.imageUrl?.includes("i.ibb.co")) {
        const result = movie.imageUrl.replace("i.ibb.co", "i.ibb.co.com");
        return result;
      } else if (movie?.imageUrl?.length < 15) {
        return `/imgpotrait/${movie.imageUrl}`;
      }
    };

  const handleClickDetail = () => {
    const theMovie = {
      release: movie.release,
      title: movie.title,
      src: movie.imageUrl,
      genre: movie.genre,
      duration: movie.duration,
      description: movie.description,
      rating: movie.age_rating,
      filmMaker: movie.filmmaker,
      cast: movie.cast,
    };
    localStorage.setItem("movie", JSON.stringify(theMovie));
    if (window.location.hash.includes("/series")) {
      setDetailClickingSeries(true);
    } else {
      setDetailClickingFilm(true);
    }
    setTimeout(() => {
      const popup = document.querySelector(".popup-container");
      if (popup) {
        popup.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleMobileClick = () => {
    if (window.innerWidth < 768) {
      const theMovie = {
        release: movie.release,
        title: movie.title,
        src: movie.imageUrl,
        genre: movie.genre,
        duration: movie.duration,
        description: movie.description,
        rating: movie.age_rating,
        filmMaker: movie.filmmaker,
        cast: movie.cast,
      };
      localStorage.setItem("movie", JSON.stringify(theMovie));
      if (window.location.hash.includes("/series")) {
        setDetailClickingSeries(true);
      } else {
        setDetailClickingFilm(true);
      }
    }
  };

  const handleWatch = () => {
    if (window.location.hash.includes("/series")) {
      navigate("/watchseries")
    } else {
      navigate("/watchfilm")
    }
  };

  return (
    <section
      onClick={handleMobileClick}
      className="flex-shrink-0 w-[115px] h-[175px] md:w-[200px] md:h-[300px] relative group"
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg transition-all duration-300 group-hover:z-20">
        <div className="relative w-full h-full overflow-hidden">
          <img
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            src={getImagePath()}
            alt=""
            loading="lazy"
          />
        </div>

        {/* Event Hover */}
        <div className="absolute hidden md:flex flex-col inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
          <div className="flex-grow"></div>
          <div className="mb-2">
            <div className="flex justify-between items-center gap-2 mb-2">
              <div className="flex gap-2">
                <button
                  onClick={handleWatch}
                  className="bg-white cursor-pointer text-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-sm ml-[2px]" />
                </button>
                <button className="text-white cursor-pointer w-8 h-8 border-2 flex items-center justify-center rounded-full  border-gray-400 hover:border-white transition-colors">
                  <FontAwesomeIcon icon={faCheck} className="text-sm" />
                </button>
              </div>
              <button
                onClick={handleClickDetail}
                className="text-white cursor-pointer w-8 h-8 border-2 flex items-center justify-center rounded-full  border-gray-400 hover:border-white transition-colors"
              >
                <FontAwesomeIcon icon={faAngleDown} className="text-sm" />
              </button>
            </div>

            <div className="flex gap-2 text-gray-300 mb-1">
              <span className="text-md rounded-full px-2 py-[2px] border-gray-300 bg-[#CDF1FF4D] ">
                {movie?.age_rating}
              </span>
              <span className="items-center flex">{movie?.duration}m</span>
            </div>

            <div className="text-white text-sm font-semibold line-clamp-1 text-ellipsis overflow-hidden ">
              {movie?.genre[0]} • {movie?.genre[1]} {movie?.genre[2] ? "•" : ""}{" "}
              {movie?.genre[2]}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-2 left-2 right-2 text-white text-sm font-medium group-hover:opacity-0 transition-opacity duration-300">
        {movie?.top_ten ? <TopTen /> : ""}
      </div>
      <div className="absolute top-2 left-2 right-2 text-white text-sm font-medium group-hover:opacity-0 transition-opacity duration-300">
        {movie?.new_episode && <NewEpisode />}
      </div>
      <div className="absolute top-2 left-2 right-2 text-white text-sm font-medium group-hover:opacity-0 transition-opacity duration-300">
        {movie?.premium && <Premium />}
      </div>
    </section>
  );
};

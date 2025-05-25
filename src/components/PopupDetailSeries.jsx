import { faPlus, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { PopupEpisode } from "./PopupEpisode";
import { PopupEpisodes } from "./PopupEpisodes";
import { useNavigate } from "react-router-dom";

export const PopupDetailSeries = ({ onClose }) => {
  const [theMovie, setTheMovie] = useState(() => {
    const saved = localStorage.getItem("movie");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    function handleClickOutside() {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const getImagePath = () => {
    if (theMovie?.src?.includes("i.ibb.co")) {
      const result = theMovie.src.replace("i.ibb.co", "i.ibb.co.com");
      return result;
    } else if (theMovie?.src?.length < 15) {
      return `/imgpotrait/${theMovie.src}`;
    }
    return theMovie.src;
  };

  const handleClickMulai = () => {
    navigate("/watchseries")
  }

  if (loading) return <p>loading...</p>;

  return (
    <article
      ref={popupRef}
      className="bg-black relative w-[953px] max-w-[85vw]  flex flex-col gap-10 rounded-lg shadow-2xl"
    >
      <header className="relative w-full h-[554px] object-cover ">
        <img className="w-full h-full object-cover" src={getImagePath()} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent "></div>
        <div className="w-full flex flex-col gap-6 text-white absolute bottom-0 md:bottom-20 md:px-20 px-5">
          <h2 className="text-3xl font-[600]">{theMovie.title}</h2>
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <button onClick={handleClickMulai} className="px-6 py-2 bg-blue-700 hover:bg-blue-500 rounded-full cursor-pointer">
                Mulai
              </button>
              <button className="border-2 border-gray-300 text-gray-300 hover:border-white hover:text-white cursor-pointer rounded-full w-10 h-10 flex items-center justify-center ">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <button className="text-gray-300 border-gray-300 hover:text-white hover:border-white cursor-pointer border-2 rounded-full w-10 h-10">
              <FontAwesomeIcon icon={faVolumeXmark} />
            </button>
          </div>
        </div>
      </header>
      <section className="text-white bg-black gap-2 md:px-20 pl-2 md:py-6 md:flex w-full">
        <div className=" md:w-1/2 pl-4 md:pl-0">
          <div className=" flex gap-4 text-gray-300 items-center">
            <h1>{theMovie?.release}</h1>
            <h1>{theMovie.duration}m</h1>
            <button className="border-1 rounded-full w-10 h-10 text-lg">
              {theMovie?.age_rating ? theMovie?.age_rating : theMovie?.rating}
            </button>
          </div>
          <p className="pr-10">
            {theMovie.description}
          </p>
        </div>
        <div className="md:w-1/2 pl-4  pt-2 pr-2">
          <div className="grid grid-cols-[auto_1fr] gap-x-2">
            {" "}
            <h1 className="text-gray-300 whitespace-nowrap">
              Cast <span className="ml-[70px]">: </span>
            </h1>
            <p className="text-white">
            {theMovie.cast.join(", ")}
            </p>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-2">
            {" "}
            <h1 className="text-gray-300 whitespace-nowrap">
              Genre <span className="ml-[58px]">: </span>
            </h1>
            <p className="text-white"> {theMovie.genre.join(", ")}</p>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-2">
            {" "}
            <h1 className="text-gray-300 whitespace-nowrap">
              Pembuat Film <span className="ml-1">: </span>
            </h1>
            <p className="text-white"> {theMovie.filmMaker.join(", ")}</p>
          </div>
        </div>
      </section>
      <PopupEpisodes />
    </article>
  );
};

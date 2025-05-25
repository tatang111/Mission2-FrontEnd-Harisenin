import {
  faAngleDown,
  faArrowRightFromBracket,
  faFilm,
  faPenToSquare,
  faStar,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShowGenreMobile } from "./ShowGenreMobile";
import { useNavbar } from "../hooks/useNavbar";

export const Navbar = ({ genre }) => {
  const {
    location,
    showPofile,
    handleKeluar,
    handleShowProfile,
    handleUbahPremium,
  } = useNavbar();

  return (
    <nav className="navbar w-full bg-black text-white md:h-18 px-2 md:px-14 py-4  items-center justify-between flex">
      <section className="left-nav flex md:gap-8 items-center justify-center gap-2">
        <div className="flex items-center gap-1 md:text-3xl -mb-1 md:mb-0 text-xl font-[600]">
          <i className="fa-solid fa-film text-2xl mb-2 md:mb-1">
            <FontAwesomeIcon icon={faFilm} />{" "}
          </i>
          <p className="mb-1">Chill</p>
        </div>
        <Link
          to="/series"
          className={`md:flex items-center ${
            location.pathname === "/series" ? "text-[var(--accent-gold)]" : ""
          } hover:text-[var(--accent-gold)]`}
        >
          Series
        </Link>
        <Link
          to="/film"
          className={`md:flex items-center ${
            location.pathname === "/film" ? "text-[var(--accent-gold)]" : ""
          } hover:text-[var(--accent-gold)]`}
        >
          Film
        </Link>
        <Link
          to="/daftarsaya"
          className={`md:flex items-center line-clamp-1 ${
            location.pathname === "/daftarsaya"
              ? "text-[var(--accent-gold)]"
              : ""
          } hover:text-[var(--accent-gold)]`}
        >
          Daftar Saya
        </Link>
        <Link
          to="/edit"
          className={`hidden md:flex items-center ${
            location.pathname === "/edit"
              ? "text-[var(--accent-gold)]"
              : ""
          } hover:text-[var(--accent-gold)]`}
        >
          Edit
        </Link>
        {genre && <ShowGenreMobile />}
      </section>
      <section className="right-nav relative  flex gap-4">
        <div onClick={handleShowProfile} className="group relative flex gap-2">
          <div className="rounded-full  w-8 h-8 md:mt-[6px]">
            <img src="/profil.png" alt="" />
          </div>
          <div className="flex items-center ">
            <i className="fa-solid fa-angle-down text-xl cursor-pointer text-[var(--text-color)]">
              <FontAwesomeIcon icon={faAngleDown} />
            </i>
          </div>
          <div
            className={`absolute ${
              showPofile ? "flex" : "hidden"
            } bg-[#181A1C] py-2 px-2 flex-col rounded w-36 -left-22 md:-left-20 top-9 transition-transform ease duration-300 z-10 group-hover:flex`}
          >
            <Link
              to="/profil"
              className=" pl-[2px] py-1 hover:text-blue-700 cursor-pointer"
            >
              <i className="fa-solid fa-user">
                <FontAwesomeIcon icon={faUser} />{" "}
              </i>
              <span className="ml-1">Profil Saya</span>{" "}
            </Link>
            <button
              onClick={handleUbahPremium}
              className="pl-[2px] cursor-pointer py-2 hover:text-blue-700 bluestar"
            >
              <i className="-ml-[2px] fa-solid fa-star text-white">
                <FontAwesomeIcon icon={faStar} />{" "}
              </i>
              <span className="ml-0">Ubah Premium</span>
            </button>
            <Link
              to="/edit"
              className="pl-[2px] md:hidden py-1 mb-2 hover:text-blue-700 cursor-pointer"
            >
              <i className="fa-solid fa-user">
                <FontAwesomeIcon icon={faPenToSquare} />{" "}
              </i>
              <span className="ml-1">Edit Movie</span>{" "}
            </Link>
            <button
              onClick={handleKeluar}
              className="-ml-14 cursor-pointer pb-2 hover:text-blue-700"
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-1">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </i>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </section>
    </nav>
  )
}

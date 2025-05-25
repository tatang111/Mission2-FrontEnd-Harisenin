import { useEffect, useState } from "react";
import { CreateMovie } from "../components/CreateMovie";
import { DeleteMovie } from "../components/DeleteMovie";
import { UpdateMovie } from "../components/UpdateMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Edit = () => {
  const [events, setEvents] = useState("");
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : false;
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const passwordAdmin = import.meta.env.VITE_PASS_ADMIN;

  const buttonClass =
    "px-6 py-3 md:px-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 text-white focus:ring-blue-400 h-12 cursor-pointer text-sm md:text-base";

  const handleClick = (e) => {
    setEvents("");
  };

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === passwordAdmin) {
      setAdmin(true);
    } else {
      setError("Invalid password");
    }
    setPassword("");
  };

  if (admin === false) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <Link
            to="/series"
            className="border p-2 px-3 cursor-default hover:from-purple-500 hover:to-blue-500 rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
          >
            <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
          </Link>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="grid gap-2 text-sm font-medium text-gray-300 mb-2">
                Password (hariseninbootcamp)
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>
            </div>
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      <div className="bg-gradient-to-r from-purple-900 to-blue-800 p-4 md:p-6 text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            Welcome Admin 👋
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-sm md:text-base text-blue-100 font-medium">
              Manage your movie database with ease
            </p>
            <button
              onClick={() => setAdmin(false)}
              className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors"
            >
              Logout
            </button>
            <Link
              to="/series"
              className="text-sm cursor-default bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition-colors"
            >
              MainPage
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8">
          <button
            className={`${buttonClass} w-full md:w-auto`}
            onClick={() => setEvents("create")}
          >
            Create Movie
          </button>
          <button
            className={`${buttonClass} w-full md:w-auto`}
            onClick={() => setEvents("update")}
          >
            Update Movie
          </button>
          <button
            className={`${buttonClass} w-full md:w-auto`}
            onClick={() => setEvents("delete")}
          >
            Delete Movie
          </button>
        </div>
      </div>
      {events === "create" && <CreateMovie onClick={handleClick} />}
      {events === "update" && <UpdateMovie onClick={handleClick} />}
      {events === "delete" && <DeleteMovie onClick={handleClick} />}
    </div>
  );
};

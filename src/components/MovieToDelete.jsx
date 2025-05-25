export const MovieToDelete = ({ movie, onClick }) => {
  const getImagePath = () => {
    if (movie?.imageUrl?.includes("i.ibb.co")) {
      const result = movie.imageUrl.replace("i.ibb.co", "i.ibb.co.com");
      return result;
    } else if (movie?.imageUrl?.length < 15) {
      return `/imgpotrait/${movie.imageUrl}`;
    }
    return movie.imageUrl;
  };

  return (
    <section className="w-37 relative items-center flex flex-col gap-3">
      <p className="text-sm -mb-2 font-medium line-clamp-1">
        {movie?.title || "Untitled Movie"}
      </p>
      <img
        src={getImagePath()}
        alt={movie?.title || "Movie poster"}
        className="w-full h-auto object-cover rounded-lg"
      />
      <button
        onClick={() => onClick(movie?.id, movie?.title)}
        className="px-5 py-2 cursor-pointer text-sm bg-red-600 hover:bg-red-500 transition-all duration-200 hover:scale-105 text-white rounded-full"
      >
        Delete
      </button>
    </section>
  );
};

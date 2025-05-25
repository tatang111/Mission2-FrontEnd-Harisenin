export const MovieToUpdate = ({ movie, onClick }) => {
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
      <p className="text-sm -mb-2 font-medium line-clamp-1">{movie.title}</p>
      <img src={getImagePath()} alt="" className="" />
      <button
        onClick={() => onClick(movie.id, movie.title)}
        className="px-5 py-2 cursor-pointer text-sm bg-blue-600 hover:bg-blue-500 transition-all duration-200 hover:scale-105 text-white rounded-full"
      >
        Update
      </button>
    </section>
  );
};

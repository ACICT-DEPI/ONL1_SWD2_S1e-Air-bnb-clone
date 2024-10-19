const Search = ({ setSearch, search }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full sm:w-[80%] md:w-[60%] flex flex-col items-center">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl mb-2 font-bold text-primary">
          Welcome to Your Home Away From Home!
        </h1>
      </div>
      <form className="w-full md:w-[60%] relative" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="type anywhere you want"
            className="w-full pl-12 pr-4 py-2 rounded-full border-4 border-gray-300 focus:outline-none focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;

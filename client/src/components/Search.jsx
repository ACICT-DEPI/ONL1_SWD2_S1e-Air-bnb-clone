const Search = ({ setSearch, search }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="col-span-full" onSubmit={handleSubmit}>
      <div className="w-[80%] md:w-[60%] relative">
        <input
          type="text"
          placeholder="type anywhere you went"
          className="w-full pl-12 pr-4 py-2 rounded-full border-4 border-gray-300 focus:outline-none focus:border-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-primary rounded-2xl px-4 py-2 text-white  absolute right-0 bottom-1.5 ">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;

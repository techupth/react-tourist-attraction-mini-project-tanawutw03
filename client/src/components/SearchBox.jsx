import React, { useState } from "react";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle search logic here (e.g., fetch data)
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <fieldset>
        ค้นหาที่เที่ยว
        <label htmlFor="search-input"></label>
        <input
          type="text"
          id="search-input"
          value={searchTerm}
          onChange={handleChange}
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="bg-gray-200 p-4 rounded-lg w-full mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
      </fieldset>
    </form>
  );
}

export default SearchBox;

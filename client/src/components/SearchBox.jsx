import React, { useState, useEffect } from "react";
import axios from "axios";
import _debounce from "lodash/debounce";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async (searchTerm = "") => {
    try {
      const url = `http://localhost:4001/trips?keywords=${searchTerm}`;
      const response = await axios.get(url);
      setSearchResults(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Debounce the fetchData function to trigger it after a delay
  const debouncedFetchData = _debounce(fetchData, 300);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedFetchData(value); // Trigger the debounced fetchData with the updated search term
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Search results:", searchResults);
  }, [searchResults]);

  return (
    <>
      <div className="flex justify-center items-start">
        <form className="flex flex-col w-3/6">
          <label htmlFor="search-input">ค้นหาที่เที่ยว</label>
          <input
            type="text"
            id="search-input"
            value={searchTerm}
            onChange={handleChange}
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            className="border-solid border-b-2 p-4 rounded-lg w-full mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center m-5"
          />
        </form>
      </div>
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.eid}>
                <h3>Title: {result.title}</h3>
                <p>Description: {result.description}</p>
                {/* Render other properties */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">ไม่พบข้อมูล</p>
        )}
      </div>
    </>
  );
}

export default SearchBox;

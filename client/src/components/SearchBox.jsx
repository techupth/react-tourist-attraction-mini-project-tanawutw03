import React, { useState, useEffect } from "react";
import axios from "axios";
import _debounce from "lodash/debounce";
import ReadMore from "./ReadMore";
import PlaceTitle from "./PlaceTitle";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async (searchTerm = "") => {
    try {
      const url = `http://localhost:4001/trips?keywords=${searchTerm}`;
      const response = await axios.get(url);
      setSearchResults(response.data.data);
      // console.log(response.data.data);
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

  // useEffect(() => {
  //   console.log("Search results:", searchResults);
  // }, [searchResults]);

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
      <div className="m-5">
        {searchResults.length > 0 ? (
          <>
            {searchResults.map((result) => (
              <div key={result.eid} className="flex mb-4">
                <div className="mr-4">
                  <img
                    src={result.photos[0]}
                    alt={result.title}
                    className="rounded-lg w-64 h-64 min-w-64 min-h-64 object-cover"
                  />
                </div>
                <div className="">
                  <h1 className="font-bold text-2xl">
                    <PlaceTitle title={result.title} url={result.url} />
                  </h1>
                  <p className="text-gray-500 line-clamp-1">
                    {result.description}
                  </p>
                  <ReadMore url={result.url} />
                  <div className="flex gap-2 mb-2">
                    {result.tags.length > 0 && <p className="">หมวด</p>}
                    {result.tags.map((tag, index) => (
                      <span key={index}>
                        {index !== result.tags.length - 1 ? (
                          <span className="p-1 underline">{tag} </span>
                        ) : (
                          <>
                            <span className="p-1">และ</span>
                            <span className="p-1 underline">{tag}</span>
                          </>
                        )}
                      </span>
                    ))}
                  </div>{" "}
                  <div className="flex gap-5">
                    {result.photos.slice(1).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`${result.title} - ${index + 1}`}
                        className="w-32 rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center">ไม่พบข้อมูล</p>
        )}
      </div>
    </>
  );
}

export default SearchBox;

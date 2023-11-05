import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={searchHandler}>
    <div className="input-group-append">
      <div className="input-group">
        <input 
          type="text"
          id="search_field"
          className="form-control px-8 py-2 border bg-white text-sm border-black font-medium transition hover:bg-black"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        
          <button id="search_btn" className="block border  border-black rounded-md bg-white px-2 py-1.5 transition ">
            
            <img src="./images/magnifying-glass.gif" className='h-5 w-5'/>
            
          </button>
        </div>
      </div>
     
    </form>
  );
}

export default Search;

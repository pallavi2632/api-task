// SearchBar.js
import React, { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import "./search.css";

const SearchBar = ({ onSearch }) => {
  const [searchParams] = useSearchParams();
  const sortParams = searchParams.get("sort") || "";
  const limitParams = searchParams.get("limit") || "";
  const categoryParams = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(data);
      } catch (error) {
        toast.error("Something went wrong when get products");
      }
    }
    getProducts();
  }, []);

  return (
    <div className="search-wrapper">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input"
          onKeyUp={handleKeyPress}
        />
        <button
          onClick={() => onSearch(searchQuery)}
          type="button"
          className="button"
        >
          <HiMagnifyingGlass onClick={handleKeyPress} className="button-search"/>
        </button>
      </div>
      <DropdownMenu
        label={"All Categories"}
        itemsMenu={categories}
        searchKey={"category"}
        currentValue={categoryParams}
      />
      <DropdownMenu
        label={"Sort"}
        itemsMenu={["asc", "desc"]}
        searchKey={"sort"}
        currentValue={sortParams}
      />
      <DropdownMenu
        label={"Limit"}
        itemsMenu={["5", "10", "20", "30"]}
        searchKey={"limit"}
        currentValue={limitParams}
      />
    </div>
  );
};

export default SearchBar;

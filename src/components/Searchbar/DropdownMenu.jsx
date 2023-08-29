// DropdownMenu.js
import React from "react";
import { useSearchParams } from "react-router-dom";

const DropdownMenu = ({ label, itemsMenu, searchKey, currentValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParams = searchParams.get("sort") || "";
  const categoryParams = searchParams.get("category") || "";
  const limitParams = searchParams.get("limit") || "";

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (!value) {
      searchParams.delete(searchKey);
      setSearchParams(searchParams);
      return;
    }

    let query = {};

    if (categoryParams) query.category = categoryParams;
    if (limitParams) query.limit = limitParams;
    if (sortParams) query.sort = sortParams;

    if (value) query[searchKey] = value;

    setSearchParams(query);
  };

  return (
    <div className="dropdown-menu-wrapper">
      <select value={currentValue} onChange={handleCategoryChange}>
        <option value="">{label}</option>
        {itemsMenu.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;

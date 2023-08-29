import React, { useEffect, useState } from "react";
import ProductsTable from "./components/ProductsTable";
import axios from "axios";
import SearchBar from "./components/Searchbar";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import "./App.css"; // Import your CSS file

const App = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");

  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const handleSearch = (query) => {
    if (query.length === 0) {
      return setFilteredProducts(null);
    }
    const newProducts = [...products];
    const filteredItems = newProducts.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filteredItems);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const { data } = await axios.delete(
        `https://fakestoreapi.com/products/${productId}`
      );

      console.log("DELETED", data);

      if (!filteredProducts) {
        setProducts((prev) => prev.filter((item) => item.id !== productId));
      } else {
        setFilteredProducts((prev) =>
          prev.filter((item) => item.id !== productId)
        );
      }

      toast.success("DELETED", {
        iconTheme: {
          primary: "#793fdf",
          secondary: "#fff",
        },
      });
    } catch (error) {
      toast.error("Something went wrong when delete product");
    }
  };

  useEffect(() => {
    async function getProducts() {
      try {
        // prettier-ignore
        const link = `https://fakestoreapi.com/products${
          category ? `/category/${category}` : "" }${
          sort ? `?sort=${sort}` : "" }${
          limit ? `${sort ? "&" : "?"}limit=${limit}` : ""}`;

        const { data } = await axios.get(link);

        console.log(link);
        setProducts(data);
      } catch (error) {
        toast.error("Something went wrong when get products");
      }
    }
    getProducts();
  }, [category, limit, sort]);

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            background: "#fff",
            color: "#793fdf",
          },
          success: { duration: 2000 },
        }}
      />
      <div className="App">
        <h1 className="title-app">Product Management</h1>
        <SearchBar onSearch={handleSearch} />

        {products && !filteredProducts ? (
          <ProductsTable
            products={products}
            onDeleteClick={handleDeleteProduct}
          />
        ) : filteredProducts ? (
          <ProductsTable
            products={filteredProducts}
            onDeleteClick={handleDeleteProduct}
          />
        ) : (
          <div className="skeleton-wrapper">
            {[...Array(25)].map((_, index) => (
              <div key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;

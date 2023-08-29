// ProductTable.js
import React, { useState } from "react";
import "./products-table.css";
import { AiFillEye } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import ProductPopup from "../ProductPopup";
import UpdatePopup from "../UpdatePopup";

const ProductTable = ({ products, onDeleteClick }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const toggleView = () => setIsOpenView(!isOpenView);

  const toggleUpdate = () => setIsOpenUpdate(!isOpenUpdate);

  const handleViewClick = (productId) => {
    toggleView();
    setSelectedProductId(productId);
  };

  const handleUpdateClick = (productId) => {
    toggleUpdate();
    setSelectedProductId(productId);
  };

  return (
    <>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Product Title</th>
              <th className="table-price">Product Price</th>
              <th className="table-description">Product Description</th>
              <th className="table-category">Product Category</th>
              <th>Action</th>
            </tr>
          </thead>
          {products.length === 0 ? (
            <td className="not-found">Not Found</td>
          ) : (
            <tbody style={{ width: "100%" }}>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td className="table-price">{product.price}</td>
                  <td className="table-description">{product.description}</td>
                  <td className="table-category">{product.category}</td>
                  <td>
                    <div className="actions">
                      <button
                        onClick={() => handleViewClick(product.id)}
                        title="View"
                      >
                        <span className="sr-only">View</span>
                        <AiFillEye className="action-icon" />
                      </button>
                      <button
                        onClick={() => handleUpdateClick(product.id)}
                        title="Update"
                      >
                        <span className="sr-only">Update</span>
                        <AiTwotoneEdit className="action-icon" />
                      </button>
                      <button
                        onClick={() => onDeleteClick(product.id)}
                        title="Delete"
                      >
                        <span className="sr-only">Delete</span>
                        <AiFillDelete className="action-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {/* popup */}
      <ProductPopup
        isOpen={isOpenView}
        toggle={toggleView}
        productId={selectedProductId}
      />
      <UpdatePopup
        isOpen={isOpenUpdate}
        toggle={toggleUpdate}
        productId={selectedProductId}
      />
    </>
  );
};

export default ProductTable;

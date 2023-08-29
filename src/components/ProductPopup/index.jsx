import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./product-popup.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { BiSolidCategory } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { MdPeople } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Index = ({ isOpen, toggle, productId }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={toggle}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Content productId={productId} />

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <span className="sr-only">close</span>
              <AiOutlineCloseCircle />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Content = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProduct(data);
    }
    getProduct();
  }, [productId]);

  return product ? (
    <>
      <div className="product-wrapper">
        <div className="image-wrapper">
          <img src={product?.image} alt="product" />
        </div>
        <Dialog.Title className="DialogTitle">
          {product?.title || "Title Unknown"}
        </Dialog.Title>
        <div>$ {product?.price || "Price Unknown"}</div>
        <Dialog.Description className="DialogDescription">
          {product?.description || "Description Unknown"}
        </Dialog.Description>

        <div className="category-rating-wrapper">
          <div className="category">
            <span>Category : </span>
            <span>{product?.category || "category Unknown"}</span>
            <BiSolidCategory className="popup-icon" />
          </div>
          <div className="rate">
            <span>Rating : </span>
            <span>{product?.rating?.rate || "rate Unknown"}</span>
            <AiFillStar className="popup-icon" />
          </div>
          <div className="count">
            <span>Base on : </span>
            <span>{product?.rating?.count || "count Unknown"}</span>
            <MdPeople className="popup-icon" />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 25,
          justifyContent: "flex-end",
        }}
      >
        <Dialog.Close asChild>
          <button className="Button">Close</button>
        </Dialog.Close>
      </div>
    </>
  ) : (
    <div className="loader-wrapper">
      <AiOutlineLoading3Quarters className="product-loader" />
      <span>Loading...</span>
    </div>
  );
};

export default Index;

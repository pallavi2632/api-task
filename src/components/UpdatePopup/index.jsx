import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./update-popup.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-hot-toast";

const UpdatePopup = ({ isOpen, toggle, productId }) => {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={toggle}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <Content productId={productId} toggle={toggle} />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

const Content = ({ productId, toggle }) => {
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

  const onChange1 = (params) => {
    setProduct((prev) => ({ ...prev, ...params }));
  };

  const onChange2 = (params) => {
    setProduct((prev) => ({ ...prev, rating: { ...params } }));
  };

  const handleUpdateProduct = async () => {
    try {
      const { data } = await axios.put(
        `https://fakestoreapi.com/products/${productId}`,
        product
      );

      console.log("UPDATED", data);

      toast.success("UPDATED", {
        iconTheme: {
          primary: "#793fdf",
          secondary: "#fff",
        },
      });
      toggle();
    } catch (error) {
      toast.error("Something went wrong when update product");
    }
  };

  return product ? (
    <>
      <AlertDialog.Title className="AlertDialogTitle">
        Update Product
      </AlertDialog.Title>
      <div className="wrapper">
        <label htmlFor="title">
          <span>Title</span>
          <span>:</span>
          <input
            onChange={(e) => onChange1({ title: e.target.value })}
            id="title"
            name="title"
            type="text"
            value={product.title}
            required
          />
        </label>
        <label htmlFor="price">
          <span>Price</span>
          <span>:</span>
          <input
            onChange={(e) => onChange1({ price: e.target.value })}
            id="price"
            name="price"
            type="number"
            value={product.price}
            required
          />
        </label>
        <label htmlFor="description">
          <span>Description</span>
          <span>:</span>
          <textarea
            onChange={(e) => onChange1({ description: e.target.value })}
            id="description"
            name="description"
            type="text"
            value={product.description}
            required
          />
        </label>
        <label htmlFor="category">
          <span>Category</span>
          <span>:</span>
          <input
            onChange={(e) => onChange1({ category: e.target.value })}
            id="category"
            name="category"
            type="text"
            value={product.category}
            required
          />
        </label>
        <label htmlFor="image">
          <span>Image</span>
          <span>:</span>
          <input
            onChange={(e) => onChange1({ image: e.target.value })}
            id="image"
            name="image"
            type="text"
            value={product.image}
            required
          />
        </label>
        <label htmlFor="rate">
          <span>Rate</span>
          <span>:</span>
          <input
            onChange={(e) => onChange2({ rate: e.target.value })}
            id="rate"
            name="rate"
            type="number"
            value={product.rating.rate}
            required
          />
        </label>
        <label htmlFor="count">
          <span>Count</span>
          <span>:</span>
          <input
            onChange={(e) => onChange2({ count: e.target.value })}
            id="count"
            name="count"
            type="number"
            value={product.rating.count}
            required
          />
        </label>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 25,
          gap: 10,
          justifyContent: "flex-end",
        }}
      >
        <AlertDialog.Cancel asChild>
          <button className="Button Secondary">Cancel</button>
        </AlertDialog.Cancel>
        <button type="button" className="Button" onClick={handleUpdateProduct}>
          Update
        </button>
      </div>
    </>
  ) : (
    <div className="loader-wrapper">
      <AiOutlineLoading3Quarters className="product-loader" />
      <span>Loading...</span>
    </div>
  );
};
export default UpdatePopup;

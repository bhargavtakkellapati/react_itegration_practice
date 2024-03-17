import Item from "antd/es/list/Item";
import React, { useState, useEffect } from "react";
import { Modal, Button, message } from "antd";
 
const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
 
  const getProductsList = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products.slice(0, 9));
        console.log("hhhhhhhhhh", products.length);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
 
  const getProductsById = async (productId) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      if (res.ok) {
        const product = await res.json();
        setSelectedProduct(product);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
 
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result) {
        message.success("Product deleted successfully!");
        setProducts(products.filter((product) => product.id !== productId));
      }
      message.success("Product deleted successfully!");
      // getProductsList();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
 
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    getProductsList();
  }, []);
 
  return (
    <React.Fragment>
      <div className="product_list">
        <h2>Product Listings</h2>
        <table className="product_table">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>brand</th>
              <th>price</th>
              <th>rating</th>
              <th>Image</th>
              <th>category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>
                  <img
                    src={product.thumbnail}
                    style={{ maxWidth: "100px", height: "100px" }}
                  ></img>
                </td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => getProductsById(product.id)}>
                    view details
                  </button>
                  <button id="edit_btn" type="primary">
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(product.id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="Product Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedProduct && (
          <div>
            <p>
              <b>Title:</b> {selectedProduct.title}
            </p>
            <p>
              <b>Brand:</b> {selectedProduct.brand}
            </p>
            <p>
              <b>Price:</b> {selectedProduct.price}
            </p>
            <p>
              <b>Category:</b> {selectedProduct.category}
            </p>
            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
};
export default ProductListing; 
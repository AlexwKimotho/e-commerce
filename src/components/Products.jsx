import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-top: 1rem;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 1rem;
`;

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null); 


  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      setData(products);
      setLoading(false);
    };

    getProducts();
  }, []);

  const addToCart = (product) => {
    // Implement your logic to add the product to the cart
    // For now, just show a toast message
    toast.current.show({
      severity: "success",
      summary: "Item Added to Cart",
      detail: product.title,
      life: 3000,
    });
  };

  const Loading = () => {
    return <p>Loading...</p>;
  };

  const Products = () => {
    return (
      <ProductsContainer>
        {data.map((product) => (
          <Card key={product.id}>
            <Image src={product.image} alt={product.title} />
            <Title>{product.title}</Title>
            <Price>${product.price}</Price>
            <Button
              label="Add to Cart"
              className="p-button-outlined"
              onClick={() => addToCart(product)}
            />
          </Card>
        ))}
      </ProductsContainer>
    );
  };

  return (
    <div>
      <h1>Latest Products</h1>
      <hr />
      {loading ? <Loading /> : <Products />}
      <Toast ref={toast} />
    </div>
  );
};

export default ProductsPage;

import "./App.css";
import { useState, useEffect } from "react";

function App() {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

const checkout = async () => {
  try {
    console.log("Sending:", cart);

    const res = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    const data = await res.json();

    console.log("Response:", data);

    alert("Order placed successfully!");
    setCart([]);

  } catch (error) {
    console.error(error);
    alert("Checkout failed");
  }
};
  const products = [
    {
      name: "Maroon Sweetheart Neck Bodycon Maxi Dress",
      price: 600,
      img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9pacm9bzjiXpfuMtCkoRpUWswkydVZRwRULTWKJ5s-aygJMU9TmgBMzSo9WCKc6LJXCo241s-Jrm9_jlNjasUtud3nrngFw"
    },
    {
      name: "Women Fabulous Ribbon Dress",
      price: 589,
      img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR6N0_x3DnxrCxZE8-C_4V4QgkoDM8ME9CTf_JPanb5h6a2-emKEswRP8aWrnnzxznDbnSpG5tOhIx1VGRN9bQYZ22BulK0"
    },
    {
      name: "Floral Printed Bodycon Dress",
      price: 500,
      img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSYjt5PXmqZhc1-1eRYpHiDsf-HAC7XjDyZUNdN9YFOMfcA2KcMgyI4t8lkTMYGII5HWm8wSVhF7VfLW3wZqlLyRI4e1AUp"
    },
    {
      name: "Marble Print Bodycon Maxi Dress",
      price: 480,
      img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRUbE4VRXg45UCmpTscVquO5INM8K6w3-qA6ZS1JeF9sX1OjEjwMxOqrC5oitxKfWXl_JNoW8DLU904B9JRjVio6tzFXUuA"
    },
    {
      name: "Floral Print Mermaid Bodycon Maxi Dress",
      price: 499,
      img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQwf3AaFYv63PCd6Qj3J_fjiFOFDgwzCS-x6mrxC1FTYRgBccxfC_xKklCVn01oZ9X5MWHyE1QtdTmPaDrKsbWuru5PqfVFGw"
    }
  ];

  return (
    <div>

      <nav className="navbar">
        <h2>Serene</h2>
        <div>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      <div className="hero">
        <h1>Serene Clothing</h1>
        <p>Elegant Women Wear</p>
        <button>Shop Now</button>
      </div>

      <div className="products">
        {products.map((p, i) => (
          <div className="card" key={i}>
            <img src={p.img} alt="product" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>🛒 Cart ({cart.length})</h2>

        {cart.map((item, i) => (
          <p key={i}>{item.name} - ₹{item.price}</p>
        ))}

        <h3>Total: ₹{total}</h3>

      <button onClick={() => {
  
  checkout();
}}>
  Checkout
</button>
      </div>

    </div>
  );
}

export default App;
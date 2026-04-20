import "./App.css";
import { useState, useEffect } from "react";

function App() {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exist = cart.find(item => item.name === product.name);

    if (exist) {
      const updatedCart = cart.map(item =>
        item.name === product.name
          ? { ...item, qty: item.qty + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (name) => {
    const updatedCart = cart.map(item =>
      item.name === name
        ? { ...item, qty: item.qty + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const decreaseQty = (name) => {
    const updatedCart = cart
      .map(item =>
        item.name === name
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      .filter(item => item.qty > 0);

    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkout = async () => {
    try {
      const res = await fetch("https://sereneclothing.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });

      if (!res.ok) throw new Error("Server error");

      await res.json();

      alert("Order placed!");
      setCart([]);
    } catch (err) {
      console.log(err);
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
      </nav>

      <div className="hero">
        <div className="hero-content">
          <h1>Serene Clothing</h1>
          <p>Discover elegance in every outfit</p>
          <button>Shop Now</button>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for dresses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="products">
        {products
          .filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((p, i) => (
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
          <div key={i}>
            <p>{item.name}</p>
            <p>₹{item.price} × {item.qty}</p>

            <button onClick={() => decreaseQty(item.name)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => increaseQty(item.name)}>+</button>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>

        <button onClick={checkout}>Checkout</button>
      </div>

    </div>
  );
}

export default App;
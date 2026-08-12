import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plantsData = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2017/01/09/22/47/snake-plant-1966210_1280.jpg', cost: '$15' },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2019/06/11/12/49/spider-plant-4266064_1280.jpg', cost: '$12' },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2020/03/16/11/44/peace-lily-4937406_1280.jpg', cost: '$18' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://cdn.pixabay.com/photo/2016/07/06/10/24/lavender-1500950_1280.jpg', cost: '$20' },
      { name: 'Jasmine', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/jasmine-1846668_1280.jpg', cost: '$16' },
    ],
  },
  {
    category: 'Succulents',
    plants: [
      { name: 'Echeveria', image: 'https://cdn.pixabay.com/photo/2017/03/27/13/57/echeveria-2178926_1280.jpg', cost: '$10' },
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2016/11/06/00/17/aloe-1802396_1280.jpg', cost: '$14' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div className="product-list-container">
      <header className="product-header">
        <h1 onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          Paradise Nursery
        </h1>
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          🛒 Cart ({totalQuantity})
        </div>
      </header>

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        plantsData.map((category) => (
          <div key={category.category} className="category-section">
            <h2>{category.category}</h2>
            <div className="product-grid">
              {category.plants.map((plant) => {
                const added = isInCart(plant.name);
                return (
                  <div key={plant.name} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button
                      className={added ? 'added-to-cart-button' : 'add-to-cart-button'}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
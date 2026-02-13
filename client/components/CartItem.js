'use client';

import { updateCartItemQuantity, removeFromCart } from '../lib/cart';

export default function CartItem({ item, onUpdate }) {
  const handleQuantityChange = (newQuantity) => {
    updateCartItemQuantity(item._id, newQuantity);
    onUpdate();
  };

  const handleRemove = () => {
    removeFromCart(item._id);
    onUpdate();
  };

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        
        <span className="w-12 text-center">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
      
      <div className="text-right">
        <p className="font-bold text-lg">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="text-red-600 text-sm hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
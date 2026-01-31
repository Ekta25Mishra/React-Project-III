import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../store/actions/userActions";

const Cart = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const products = useSelector((state) => state.productReducer.products);

  const IncreaseQuantityHandler = (index, product) => {
    const copyuser = { ...users, cart: [...users.cart] };
    copyuser.cart[index] = {
      ...copyuser.cart[index],
      quantity: copyuser.cart[index].quantity + 1,
    };

    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const DecreaseQuantityHandler = (index, product) => {
    const copyuser = { ...users, cart: [...users.cart] };

    if (users.cart[index].quantity > 0) {
      copyuser.cart[index] = {
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity - 1,
      };
    } else {
      copyuser.cart.splice(index, 1);
    }

    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const cartItems = users.cart.map((c, index) => {
    return (
      <li
        key={c.product.id}
        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow 
                   flex items-center gap-6 p-4 mb-6"
      >
        <img
          className="w-[90px] h-[90px] object-contain bg-gray-50 rounded-xl p-2"
          src={c.product.image}
          alt={c.product.title}
        />

        <div className="flex-1">
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {c.product.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            ₹{c.product.price}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => DecreaseQuantityHandler(index, c)}
            className="w-8 h-8 rounded-full border border-gray-300 
                       flex items-center justify-center text-gray-700
                       hover:bg-gray-100 transition"
          >
            −
          </button>

          <span className="text-sm font-medium text-gray-800 w-6 text-center">
            {c.quantity}
          </span>

          <button
            onClick={() => IncreaseQuantityHandler(index, c)}
            className="w-8 h-8 rounded-full border border-gray-300 
                       flex items-center justify-center text-gray-700
                       hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 mt-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
         Your cart, {users.username}
        </h1>
        <ul>{cartItems}</ul>
      </div>
    </div>
  );
};

export default Cart;

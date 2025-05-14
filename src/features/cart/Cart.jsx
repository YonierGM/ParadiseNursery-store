// src/components/Cart.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./cartSlice";
import { useDispatch } from "react-redux";

function Cart() {
  const items = useSelector((state) => state.cart.items); // accedemos al estado del carrito

  const [originalPrice, setOriginalPrice] = useState(0);
  const [saving, setSaving] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(originalPrice + saving + tax);

  useEffect(() => {
    const newTotal = items.reduce((acc, item) => {
      return acc + parseFloat(item.cost) * item.quantity;
    }, 0);

    const savings = items.reduce((acc, item) => {
      return acc + parseFloat(item.cost) * item.quantity * 0.05;
    }, 0);

    const newOriginalPrice = parseFloat(newTotal.toFixed(1));
    const newSaving = parseFloat(savings.toFixed(1));
    const newTotalPrice = parseFloat(
      (newOriginalPrice - newSaving + tax).toFixed(1)
    );

    setOriginalPrice(newOriginalPrice);
    setSaving(newSaving);
    setTotal(newTotalPrice);
  }, [items, tax]); // Asegúrate de incluir `tax` también si puede cambiar

  const dispatch = useDispatch();

  const decrementQuantity = (id) => {
    const item = items.find((item) => item.id === id);
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const incrementQuantity = (id) => {
    const item = items.find((item) => item.id === id);

    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleRemoveItem = (id) => {
    const item = items.find((item) => item.id === id);
    if (!item) {
      return "No existe el producto";
    } else {
      console.log("eliminando: ", id);
      dispatch(removeItem({ id }));
    }
  };

  return (
    <div className="p-4 flex flex-col gap-2.5 md:max-w-[60%] mt-20 mx-auto">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">El carrito está vacío.</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {items.map((item, index) => (
            <section key={index} className="bg-white antialiased">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" className="shrink-0 md:order-1">
                    <img
                      className="h-20 w-20 object-contain"
                      src={item.image}
                      alt="imac image"
                    />
                    <img
                      className="hidden h-20 w-20"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                      alt="imac image"
                    />
                  </a>

                  <label htmlFor="counter-input" className="sr-only">
                    Choose quantity:
                  </label>
                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                      <button
                        type="button"
                        data-input-counter-decrement="counter-input"
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        <svg
                          className="h-2.5 w-2.5 text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="counter-input"
                        data-input-counter
                        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                        placeholder=""
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        type="button"
                        data-input-counter-increment="counter-input"
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        <svg
                          className="h-2.5 w-2.5 text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-semibold text-gray-900">
                        ${item.cost}
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        Total: ${item.cost * item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md flex flex-col gap-1.5">
                    <a className="text-base font-medium text-gray-900 hover:underline m-0">
                      {item.name}
                    </a>
                    <a className="text-base font-normal text-gray-900 hover:underline m-0">
                      {item.description}
                    </a>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                      >
                        <svg
                          className="me-1.5 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                          />
                        </svg>
                        Add to Favorites
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <svg
                          className="me-1.5 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </ul>
      )}

      <div className="w-full mt-6 flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xl font-semibold text-gray-900">Order summary</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Original price
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${originalPrice}
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">Savings</dt>
                <dd className="text-base font-medium text-green-600">
                  -${saving}
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Store Pickup
                </dt>
                <dd className="text-base font-medium text-gray-900">$0</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">Tax</dt>
                <dd className="text-base font-medium text-gray-900">${tax}</dd>
              </dl>
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-gray-900">${total}</dd>
            </dl>
          </div>

          <a className="flex w-full items-center justify-center rounded-lg bg-primary-700 cursor-pointer px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
            Proceed to Checkout
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cart;

import {
  addItem,
  removeItem,
  updateQuantity,
} from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Notify } from "notiflix/build/notiflix-notify-aio";

function Product({ id, name, image, description, cost, category, quantity }) {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items); // accedemos al estado del carrito
  const item = items.find((item) => item.id === id);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        name,
        image,
        description,
        cost,
        category,
        quantity,
      })
    );
    Notify.success("Added to cart", {
      timeout: 500,
    });
  };

  return (
    <>
      <section className="flex flex-col items-center gap-3.5">
        <div className="products flex flex-row flex-wrap justify-center items-center gap-3.5 mx-auto">
          <div className="flex flex-col justify-between w-[400px] h-[460px] max-md:w-[100%] cursor-pointer bg-white border border-gray-100 shadow-sm">
            <a className="">
              <img
                className="p-8 rounded-t-lg object-contain h-[300px] w-[100%]"
                src={image}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5 flex flex-col gap-2.5">
              <a>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-1">
                  {name}
                </h5>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm">
                  {category}
                </span>
              </a>
              <a>
                <h5 className="text-xl font-normal tracking-tight text-gray-900 line-clamp-1">
                  {description}
                </h5>
              </a>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  ${cost}
                </span>
                <a
                  onClick={handleAddToCart}
                  className={
                    item
                      ? "text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      : "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  }
                >
                  {item ? "Added to Cart" : "Add to Cart"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncupdateuser } from "../store/actions/userActions";
import { Suspense, useEffect, useState } from "react";
import axios from "../api/axiosconfig";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  // const products= useSelector((state) => state.productReducer.products);
  const [products, setproducts] = useState([]);
  const [hasMore, sethasMore] = useState(true);

  const fetchproducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=8&_start=${products.length}`,
      );
      if (data.length == 0) {
        sethasMore(false);
      } else {
        sethasMore(true);
      }
      setproducts([...products, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  const AddtoCartHandler = (product) => {
    const copyuser = { ...users, cart: [...users.cart] };
    const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id);

    if (x == -1) {
      copyuser.cart.push({ product, quantity: 1 });
    } else {
      copyuser.cart[x] = {
        product,
        quantity: copyuser.cart[x].quantity + 1,
      };
    }
    console.log(copyuser);

    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const renderproduct = products.map((product) => {
    return (
      <div
        className="bg-white mt-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 
                   w-[260px] flex flex-col overflow-hidden"
        key={product.id}
      >
        <img
          className="w-full h-[180px] object-contain bg-gray-50 p-4"
          src={product.image}
        />

        <div className="flex flex-col flex-grow px-4 pb-4">
          <h1 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
            {product.title}
          </h1>

          <small className="text-xs text-gray-500 line-clamp-3 mb-3">
            {product.description.slice(0, 100)}...
          </small>

          <div className="mt-auto flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900">
              ₹{product.price}
            </p>

            <button
              onClick={() => AddtoCartHandler(product)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-300 
                         hover:bg-gray-900 hover:text-white transition-colors"
            >
              Add to cart
            </button>
          </div>

          <Link
            className="text-xs text-gray-500 hover:text-gray-900 mt-3 self-start"
            to={`/product/${product.id}`}
          >
            More Info →
          </Link>
        </div>
      </div>
    );
  });

  return  (
    <div
      className="min-h-screen w-full bg-gray-100 
                 flex justify-center items-start py-10"
    >
      <InfiniteScroll
        className="max-w-6xl flex flex-wrap gap-6 justify-center"
        dataLength={products.length}
        next={fetchproducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all.</b>
          </p>
        }
      >
        <Suspense fallback={<h1 className="text-center text-5xl text-yellow-500">LOADING...</h1>}>{renderproduct}</Suspense>
      </InfiniteScroll>
    </div>
  ) 
};

export default Products;

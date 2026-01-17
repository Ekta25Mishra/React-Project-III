import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Products = () => {
  const products = useSelector((state) => state.productReducer.products);

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

  return products.length > 0 ? (
    <div
      className="min-h-screen w-full bg-gray-100 
                 flex justify-center items-start py-10"
    >
      <div className="max-w-6xl flex flex-wrap gap-6 justify-center">
        {renderproduct}
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

export default Products;

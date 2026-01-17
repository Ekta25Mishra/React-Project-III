import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncdeleteproduct, asyncupdateproduct } from "../../store/actions/productActions";

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.productReducer.products);
  const product = products?.find((product) => product.id == id);
  console.log(product);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      category: product?.category,
      description: product?.description,
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UpdateProductHandler = (product) => {
    dispatch(asyncupdateproduct(id, product));
  };

  const DeleteHandler = () => {
    dispatch(asyncdeleteproduct(id));
    navigate("/products");
  };

  return product ? (
    <div className="min-h-screen  bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Preview */}
        <div className="bg-white rounded-2xl  shadow-md p-6">
          <div className="bg-gray-50 rounded-xl  p-6 flex justify-center items-center">
            <img src={product.image} className="h-64 object-contain" />
          </div>

          <div className="mt-6 space-y-3">
            <h1 className="text-xl font-semibold text-gray-800">
              {product.title}
            </h1>

            <p className="text-sm text-gray-600">{product.description}</p>

            <p className="text-lg font-medium text-gray-900">
              ₹{product.price}
            </p>

            <button
              className="mt-4 px-5 py-2 rounded-full border border-gray-300 
                         text-sm hover:bg-gray-900 hover:text-white transition"
            >
              Add to cart
            </button>
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Update Product
          </h2>

          <form
            onSubmit={handleSubmit(UpdateProductHandler)}
            className="space-y-5"
          >
            <input
              {...register("image")}
              type="url"
              placeholder="Image URL"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                         border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-gray-300"
            />

            <input
              {...register("title")}
              type="text"
              placeholder="Title"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                         border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-gray-300"
            />

            <input
              {...register("price")}
              type="number"
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                         border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-gray-300"
            />

            <textarea
              {...register("description")}
              placeholder="Enter description here..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                         border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-gray-300 resize-none"
              rows={3}
            ></textarea>

            <input
              {...register("category")}
              type="text"
              placeholder="Category"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                         border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-gray-300"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gray-900 text-white 
                         font-medium hover:bg-gray-800 transition-colors mb-5"
            >
              Update Product
            </button>
            <button
            onClick={DeleteHandler}
            type="button"
            className="w-full py-3 rounded-xl bg-red-900 text-white 
                         font-medium hover:bg-red-800 transition-colors"
          >
            Delete Product
          </button>
          </form>

          
        </div>
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

export default ProductDetails;

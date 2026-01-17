import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asynccreateproduct } from "../../store/actions/productActions";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const CreateProductHandler = (product) => {
    product.id = nanoid();
    console.log(product);
    navigate("/products");
    dispatch(asynccreateproduct(product));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-md rounded-2xl p-10 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8 tracking-wide">
          Create Product
        </h1>

        <form
          onSubmit={handleSubmit(CreateProductHandler)}
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
                       font-medium hover:bg-gray-800 transition-colors"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

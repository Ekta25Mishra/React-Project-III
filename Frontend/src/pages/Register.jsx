import { nanoid } from "nanoid";
import {useForm} from "react-hook-form"
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import { asyncregisteruser } from "../store/actions/userActions";

const Register = () => {
  const navigate=useNavigate()
  const {register, reset, handleSubmit}= useForm();
  const dispatch= useDispatch();

  const RegisterHandler=(user)=>{
    user.id=nanoid();
    user.isAdmin= false;
    dispatch(asyncregisteruser(user));
    navigate("/login");
  }

   return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-md rounded-2xl p-10 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8 tracking-wide">
          Register
        </h1>

        <form 
          onSubmit={handleSubmit(RegisterHandler)}
          className="space-y-5"
        >
          <input
            {...register("username")}
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                       border border-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-gray-300"
          />

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                       border border-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-gray-300"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                       border border-gray-200 focus:outline-none 
                       focus:ring-2 focus:ring-gray-300"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gray-900 text-white 
                       font-medium hover:bg-gray-800 transition-colors"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?
            <Link
              className="ml-1 text-gray-800 hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

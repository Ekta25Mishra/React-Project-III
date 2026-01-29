import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncdeleteuser, asynclogoutuser, asyncupdateuser } from "../../store/actions/userActions";

const UserProfile = () => {
  const {users} = useSelector((state) => state.userReducer);

  //two way binding
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      username: users?.username,
      email: users?.email,
      password: users?.password,
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UpdateUserHandler = (user) => {
    dispatch(asyncupdateuser(users.id, user));
  };


  const LogoutUser = () => {
    dispatch(asynclogoutuser())
    navigate("/login");
  };

  const DeleteHandler = () => {
    dispatch(asyncdeleteuser(users.id))
    navigate("/login");
  };

  return users ? (
    <div>
      <div className="bg-white rounded-2xl mt-10 shadow-md p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
         Hii! {users.username}
        </h2>

        <form onSubmit={handleSubmit(UpdateUserHandler)} className="space-y-5">
          <input
            {...register("username")}
            type="text"
            placeholder="username"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                         border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-gray-300"
          />

          <input
            {...register("email")}
            type="email"
            placeholder="email"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                         border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-gray-300"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="*****"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 
                         border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-gray-300"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gray-900 text-white 
                         font-medium hover:bg-gray-800 transition-colors mb-5"
          >
            Update User
          </button>
          <button
            onClick={LogoutUser}
            type="button"
            className="w-full py-3 rounded-xl bg-green-900 text-white 
                         font-medium hover:bg-green-800 transition-colors"
          >
            Logout User
          </button>
          <button
            onClick={DeleteHandler}
            type="button"
            className="w-full py-3 rounded-xl bg-red-900 text-white 
                         font-medium hover:bg-red-800 transition-colors"
          >
            Delete User
          </button>
        </form>
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

export default UserProfile;

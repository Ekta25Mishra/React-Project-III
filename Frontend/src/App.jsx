import { useDispatch } from "react-redux"
import Nav from "./components/Nav"
import Mainroutes from "./routes/Mainroutes"
import { useEffect } from "react";
import { asynccurrentuser } from "./store/actions/userActions";
import { asyncloadproducts } from "./store/actions/productActions";

const App = () => {

  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(asyncloadproducts());
    dispatch(asynccurrentuser());
  },[]);

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800 font-normal">
      <Nav/>
      <main className="pt-4">
        <Mainroutes/>
      </main>
    </div>
  )
}

export default App

import { useEffect } from 'react';
import axios from './api/axiosconfig'
const App = () => {
  const getproduct = async()=>{
    try{
      const res=await axios.get('/products');
      console.log(res);
      
    }
    catch(error){
      console.log(error);;
    }
  };

  useEffect(()=>{
    getproduct();
  },[]);
  return (
    <div>App</div>
  )
}

export default App
import Nav from "./components/Nav"
import Mainroutes from "./routes/Mainroutes"

const App = () => {

  return (
    <div className='text-yellow font-thin w-screen h-screen bg-amber-100'>
      <Nav/>
      <Mainroutes/>
    </div>
  )
}

export default App
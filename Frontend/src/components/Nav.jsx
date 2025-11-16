import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='flex justify-end items-center gap-x-5 p-5 mb-10 font-black'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  )
}

export default Nav
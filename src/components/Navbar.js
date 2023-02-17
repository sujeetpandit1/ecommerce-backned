import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Navbar.css'

const Navbar = () => {
  const items = useSelector((state) => state.cart)
  return (
    <div className='navBar'>
      <span className='logo'><Link to='/'><h3>BHAV <span className='a'>BAZAAR</span></h3></Link></span>
      <div className='nav'>
      <Link to='/'>Home</Link>
      <Link to='/cart'>Cart</Link>
      <span className='cartCount'>Cart items: {items.length}</span>
      </div>
    </div>
  )
}

export default Navbar

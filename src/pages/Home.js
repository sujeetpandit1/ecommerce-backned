import React from 'react'
import Products from '../components/Products'

const Home = () => {
  return (
    <div>
      <h2 className='heading'>Welcome to BHAV BAZAAR</h2>
      <section>
      <h3>Products List</h3><br/>
      <Products />
      </section>
    </div>
  )
}

export default Home

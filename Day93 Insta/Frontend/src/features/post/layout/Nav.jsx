import React from 'react'
import "../style/nav.scss"
import CreatePost from '../pages/CreatePost'
import { Link } from 'react-router'
const Nav = () => {
  return (
   <nav>
    <h1>Insta</h1>
    <Link to="/create-post">
      <button>Create Post</button>
    </Link>
   </nav>
  )
}

export default Nav

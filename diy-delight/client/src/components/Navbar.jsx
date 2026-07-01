import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">👟 DIY Delight — Sneaker Studio</Link>
      <div className="nav-links">
        <Link to="/">My Sneakers</Link>
        <Link to="/create">Create New</Link>
      </div>
    </nav>
  )
}

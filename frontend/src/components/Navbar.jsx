import React from "react";
import { Link, NavLink } from "react-router-dom";
// Navlink agrega una clase activa si matchea con la ruta, si estamos en esa misma pagina

const Navbar = () => (
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        Showtech
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" exact='true' to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="checkout">
              Checkout
            </NavLink>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;

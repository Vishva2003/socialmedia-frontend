import React from 'react';
import './navbar.css'
import Logo from './logo.jpg'

const Navbar = () => {
  return (
    <nav>
        <div class="navbar">
            <div class="logoname">
            <img src={Logo} alt="logo"/>
            <h3>TheSocialCompany</h3>
            </div>

            <div class="menuitem">
                        <ul class="menuitems">
                            <li><a href="*">Home</a></li>
                            <li><a href="*">Customer </a></li>
                            <li><a href="*">About</a></li>
                        </ul>
            </div>
        </div>
    </nav>

  );
};

export default Navbar;

import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import {useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import "./header.css";
import {Badge, NavDropdown} from 'react-bootstrap'


const Header = () => {
 
  const [open, setOpen] = useState(false);
 
  const {cartItems} = useSelector((state) => state.cart);
  const {userInfo} = useSelector((state) => state.auth);

  const logoutHandler = () => {

  }
  

  return (
    <header className="header">
      {/* logo */}
      <div className="image-wrapper">
        <img src={logo} alt="logo" width={"350px"} />
      </div>

      {/* nav menu for desktop view */}
      <nav className="nav-menu">
        <span>Home</span>
        <span>About</span>
        <span>Contact Us</span>
        {userInfo ? (<NavDropdown 
        title={userInfo.name}
        id='username'>
          <LinkContainer to='/profile' >
            <NavDropdown.Item>
              Profile

            </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Logout
           

            </NavDropdown.Item>
        </NavDropdown>) : (<span
        
        >Login</span>)}
        <span>
        <AiOutlineShoppingCart size={"25px"} />
           {
            cartItems.length > 0 && (
              <Badge pill 
                     bg="success"
                     style={{marginLeft : "5px"}}>
                      {cartItems.reduce((a,c) => a + c.qty ,0)}

              </Badge>

            )
           }
        </span>
      </nav>

      {/* nav menu for mobile view */}
      
        <div className="ham-icon" onClick={() => setOpen(!open)}>
          {open ? <ImCross size={"20px"} /> : <GiHamburgerMenu size={"25px"} />}
        </div>
    

      {open && (
        <nav className="mobile-nav-menu">
          <span>Home</span>
          <span>About</span>
          <span>Contact Us</span>
          <span>Login</span>
          <span>
            <AiOutlineShoppingCart size={"30px"} />
          </span>
        </nav>
      )}

    </header>
  );
};

export default Header;

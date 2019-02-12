import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from 'react-router-dom'


import './navbar.css';

const NavBar = () => {
  return (
    <MDBContainer>
      <MDBRow className="navbarContainer">
        <MDBCol>
          <Link to={`/`} >
            <p>Home</p>
          </Link>
        </MDBCol>
        <MDBCol>
          <Link to={`/subreddits/`} >
            <p>Subreddits</p>
          </Link>
        </MDBCol>
        <MDBCol>
          <Link to={`/topics/`} >
            <p>Topics</p>
          </Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default NavBar;
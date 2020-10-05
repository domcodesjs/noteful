import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to='/'>
        <h1>Notely</h1>
      </Link>
    </nav>
  );
};

export default Nav;

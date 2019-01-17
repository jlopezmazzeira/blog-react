import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="col-12 col-md-8">
      <Link to={'/'}>
        <h1 className="text-center">{props.titulo}</h1>
      </Link>
    </header>
  );
}

export default Header;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SinglePost extends Component {

  mostrarPost = (props) => {
    if(!props.post){
      return null;
    }
    const {title, body, userId} = props.post;

    return(
      <React.Fragment>
        <h1>{title}</h1>
        <p>{userId}</p>
        <p>{body}</p>
      </React.Fragment>
    );
  }

  render() {

    return (
      <div className="col-12 col-md-8">
        {this.mostrarPost(this.props)}

        <Link className="btn btn-primary" to={'/'}>Volver</Link>
      </div>
    );
  }
}

export default SinglePost;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Formulario extends Component {

  tituloRef = React.createRef();
  contenidoRef = React.createRef();

  crearPost = (e) => {
    e.preventDefault();

    const post = {
      title: this.tituloRef.current.value,
      body: this.contenidoRef.current.value,
      userId: 1
    }

    this.props.crearPost(post);
  }

  render() {

    return (
        <form onSubmit={this.crearPost} className="col-8">
          <legend className="text-center">Crear Nuevo Post</legend>
          <div className="form-group">
            <label>Titulo del post:</label>
            <input ref={this.tituloRef} type="text" className="form-control" placeholder="Titulo del post"/>
          </div>
          <div className="form-group">
            <label>Contenido del post:</label>
            <textarea ref={this.contenidoRef} className="form-control" placeholder="Contenido del post"></textarea>
          </div>
          <button type="submit" className="btn btn-success">Crear Post</button>
          <Link to={'/'} className="btn btn-primary float-right">Cancelar</Link>
        </form>
    );
  }
}

export default Formulario;

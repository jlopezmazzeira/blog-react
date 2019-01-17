import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Editar extends Component {

  tituloRef = React.createRef();
  contenidoRef = React.createRef();

  editarPost = (e) => {
    e.preventDefault();

    const post = {
      title: this.tituloRef.current.value,
      body: this.contenidoRef.current.value,
      userId: 1,
      id: this.props.post.id
    }

    this.props.editarPost(post);
  }

  cargarFormulario = () => {
    if(!this.props.post) return  null;

    const {title, body} = this.props.post;

    return (
      <form onSubmit={this.editarPost} className="col-8">
        <legend className="text-center">Editar Post</legend>
        <div className="form-group">
          <label>Titulo del post:</label>
          <input ref={this.tituloRef} type="text" className="form-control" defaultValue={title}/>
        </div>
        <div className="form-group">
          <label>Contenido del post:</label>
          <textarea ref={this.contenidoRef} className="form-control" defaultValue={body}></textarea>
        </div>
        <button type="submit" className="btn btn-success">Guardar cambios</button>
        <Link to={'/'} className="btn btn-primary float-right">Cancelar</Link>
      </form>
    );
  }

  render() {

    return (
      <React.Fragment>
        {this.cargarFormulario()}
      </React.Fragment>


    );
  }
}

export default Editar;

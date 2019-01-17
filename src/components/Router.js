import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './Header';
import Navegacion from './Navegacion';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Formulario from './Formulario';
import Editar from './Editar';

class Router extends Component {
  state = {
    posts: []
  }

  componentDidMount(){
    this.obtenerPosts();
  }

  obtenerPosts = () => {
      let url = `https://jsonplaceholder.typicode.com/posts`;
      axios.get(url)
           .then(resp => {
             this.setState({
               posts: resp.data
             });
           });

  }

  borrarPost = (id) => {
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    axios.delete(url)
         .then(resp => {
           if(resp.status === 200){
             const posts = [...this.state.posts];

             let resultado = posts.filter(post => (
               post.id !== id
             ));

             this.setState({
               posts: resultado
             })
           }
         });
  }

  crearPost = (post) => {
    let url = `https://jsonplaceholder.typicode.com/posts/`;
    axios.post(url, {post})
         .then(resp => {
           if(resp.status === 201){
             Swal(
                'Post creado!',
                'Se creo correctamente!',
                'success'
              );

             let postId = {id: resp.data.id};
             const post = Object.assign({}, resp.data.post, postId);

             this.setState(prevState => ({
               posts: [...prevState.posts, post]
             }));
           }
         });
  }

  editarPost = (postActualizado) => {
    const {id} = postActualizado;
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    axios.put(url, {postActualizado})
         .then(resp => {
           if(resp.status === 200){
             Swal(
                'Post Actualizado!',
                'Se guardo correctamente!',
                'success'
              );

              let postId = resp.data.id;
              const posts = [...this.state.posts];

              const postEditar = posts.findIndex(post => postId === post.id );

              posts[postEditar] = postActualizado;

              this.setState(prevState => ({
                posts
              }))
           }
         });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row justify-content-center">
            <Header titulo="Blog"/>
            <Navegacion />
            <Switch>
              <Route exact path="/" render={() => {
                return (
                  <Posts
                      posts={this.state.posts}
                      borrarPost={this.borrarPost}
                  />
                )
              }}
              />

              <Route exact path="/post/:postId" render={(props) => {
                let postId = props.location.pathname.replace('/post/', '');
                const posts = this.state.posts;

                let filtro;
                filtro = posts.filter(post => (
                  post.id === Number(postId)
                ));

                return(
                  <SinglePost post={filtro[0]}/>
                )
              }}/>

              <Route exact path="/crear" render={() => {
                return(
                  <Formulario crearPost={this.crearPost}/>
                )
              }}/>

              <Route exact path="/editar/:postId" render={(props) => {
                let postId = props.location.pathname.replace('/editar/', '');
                const posts = this.state.posts;

                let filtro;
                filtro = posts.filter(post => (
                  post.id === Number(postId)
                ))

                return(
                  <Editar post={filtro[0]} editarPost={this.editarPost}/>
                )
              }}/>

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;

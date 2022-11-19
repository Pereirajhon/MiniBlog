import styles from "./Home.module.css";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../Hook/useFetchDocuments";

import PostsDetail from "../../components/PostsDetail";

const Home = () => {
  const [query, setQuery] = useState('')
  const {documents:posts, loading} = useFetchDocuments("posts");
  const navigate = useNavigate();
  //const [posts, setPosts] = useState([])
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <div className={styles.home}>
        <h1>Veja os posts mais recentes</h1>
        <form className={styles.form_search} onSubmit={handleSubmit}>

          <input className={styles.field_search} type="text" placeholder="Buscar por tags"
          onChange={(e) => setQuery(e.target.value)} />

          <button className="btn btn-dark">Buscar</button> 
        </form>
        <div className="post-list">
          {loading && <p>Carregando...</p> }
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <h1>Posts...</h1>
              <p>Posts não encontrado</p>
              <Link to="/posts/create">
                <button className="btn"> Criar primeiro post </button>
              </Link>   
            </div> )}
            
            {posts && posts.map((post)=>(<PostsDetail key={post.id} post={post} />))}
           
        </div>
        
    </div>
  )
}

export default Home;

/*

import styles from "./Home.module.css";

// hooks
import { useFetchDocument } from "../../Hook/useFetchDocument";
import { useNavigate, Link } from "react-router-dom";

// react
import { useState } from "react";

// components
import PostsDetail from "../../components/PostsDetail";

const Home = () => {
  const { documents: posts, loading } = useFetchDocument("posts");

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  console.log(loading);

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div className="post-list">
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostsDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
*/
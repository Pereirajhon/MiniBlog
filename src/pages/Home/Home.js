import styles from "./Home.module.css";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../Hook/useFetchDocuments";
import PostsDetail from "../../components/PostsDetail";

const Home = () => {
  const [query, setQuery] = useState('')
  const {documents:posts, loading} = useFetchDocuments("posts");
  const navigate = useNavigate();  

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

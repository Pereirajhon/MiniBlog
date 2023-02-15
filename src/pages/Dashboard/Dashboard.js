import styles from "./Dashboard.module.css";

import {Link} from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
import { useFetchDocuments } from "../../Hook/useFetchDocuments";
import { useDeleteDocument } from "../../Hook/useDeleteDocument";

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid;
  
  const {data: posts} = useFetchDocuments('posts', null, uid);
  const {deleteData} = useDeleteDocument('posts');

  return (
    <div className={styles.dashboard_container}>
      <h2>Dashboard</h2>
      <p>gerencie seus posts</p>

      {posts && posts.length ===0 ?(
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Cria primeiro post
          </Link>
        </div>
      ):(
        <div className={styles.dashboard_header}>
          <h4>Título</h4>
          <h4>Ações</h4>
        </div>
      )}        
       {posts && posts.map((post) =>(
          <div key={post.id} className= {styles.dashboard_posts}>
            <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`} className='btn btn-outline'>
                  Ver
                </Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                  Editar
                </Link>
                <button 
                 onClick={() => deleteData.mutate(post.id)}
                 className="btn btn-outline btn-danger">
                  Excluir
                </button>

              </div>
          </div>
       ))}
            
     
    </div>
  )
}

export default Dashboard
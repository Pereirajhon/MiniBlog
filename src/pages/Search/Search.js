import styles from "./Search.module.css"
import { Link } from 'react-router-dom';
import PostsDetail from '../../components/PostsDetail';

import { useFetchDocuments } from '../../Hook/useFetchDocuments'
import { useQuery } from '../../Hook/useQuery';

const Search = () => {
  const query = useQuery()
  const search = query.get('q');

  const {data: posts} = useFetchDocuments('posts', search);

  return (
    <div className={styles.search_container}>
        <h2>Resultado da busca "{search}" </h2>
        
        {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>Resultado da busca não encontrado</p>
              <Link to='/' className='btn btn-dark' >Voltar</Link>
            </div>
        )}
        <div className= {styles.post_result}>
          {posts && posts.map((post) => <PostsDetail key={post.id} 
          post={post} />)}
        </div>
    </div>
  )
}

export default Search ;
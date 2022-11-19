import styles from "./PostsDetail.module.css"
import {Link} from 'react-router-dom'

const PostsDetail = ({post}) => {

  return (
    <div className={styles.post_Detail}>
        <img src={post.image} alt={post.title} />
        <div className={styles.post_container}>
        <h2>{post.title}</h2>
        <p>
          por: <span className={styles.createdBy}>{post.createdBy}</span>
        </p>
        <p>
          {post.body}
        </p>
        <div className={styles.tags}>
          {post.tags?.map((tag)=> (
            <span className={styles.tags_items} key={tag}>
              <span>#</span>{tag}
            </span>
          ))}
        </div>
            <Link to={`/posts/${post.id}`} className="btn btn-outline" >
              Ler
            </Link>
      </div>
    </div>
  )
}

export default PostsDetail ;

/*

import { Link } from "react-router-dom";

import styles from "./PostsDetail.module.css";

const PostsDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdby}>por: {post.createdBy}</p>
      <div>
        {post.tags ?.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

export default PostsDetail; 
*/
import styles from './EditPost.module.css'
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
import { useFetchDocument } from "../../Hook/useFetchDocument";
import { useUpdateDocument } from '../../Hook/useUpdateDocument';

const EditPost = () => {
  const {id} = useParams();
  const {document:post} = useFetchDocument('posts', id);


  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument('posts');

  useEffect(()=> {
    if(post){
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tags.join(', ');
      setTags(textTags)
    }
  },[post])

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    const tagsArray = tags.split(', ').map((tag) => tag.trim().toLowerCase());


    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if(formError) return;
    
    const data = {
      title,
      image,
      body,
      uid: user.uid,
      tags: tagsArray,
      createdBy: user.displayName,
    };

    updateDocument(data, id)

    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post</h2>
          <p>Atualize o post como desejar !</p>
          <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              name="text"
              required
              placeholder="Pense num bom título..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          
          <label>
            <p>Previews da imagem</p>
            <img className={styles.previews_image} src={post.image} alt={post.title}/>
            <span>URL da imagem:</span>
            <input
              type="text"
              name="image"
              required
              placeholder="Insira uma imagem que representa seu post"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>
          <label>
            <span>Conteúdo:</span>
            <textarea
              name="body"
              required
              placeholder="Insira o conteúdo do post"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              required
              placeholder="Insira as tags separadas por vírgula"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
            />
          </label>
          {!response.loading && <button className="btn">Editar post</button>}
          {response.loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          {(response.error || formError) && (
            <p className="error">{response.error || formError}</p>
          )}
        </form>
        </>
      )}
      
      
    </div>
  );
};

export default EditPost ;

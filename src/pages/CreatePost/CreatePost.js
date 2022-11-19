/*import styles from "./CreatePost.module.css"
import { useState } from "react"
import {useNavigate} from 'react-router-dom'

import { useAuthValue} from "../../Context/AuthContext";
import { useInsertDocument } from "../../Hook/useInsertDocument";


const CreatePost = () => {
  
 // const [data, setData] = useState(null)
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  
  const {user} = useAuthValue();

  const navigate = useNavigate();

  const {insertDocument, response} = useInsertDocument("posts")

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate image URL
    try{
      new URL(image)

    }catch(error){
      setFormError("a imagem precisa ser uma URL")
    }

    //criar array de tags
    const tagsArray = tags.split(",").map((tag)=> tag.trim().toLowerCase());

    if(!title || !body || !tags || !image){
      setFormError("Prencha todos os campos !")
    }
      console.log({
      title,
      image,
      body,
      tags :tagsArray,
      uid: user.uid,
      createdBy: user.name,
    })

    if(formError) return;

    //chacar todos dos valores
    
    
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    })
    
    // Redirect 
    navigate("/")

  }

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o quiser compartilhar</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input type= 'text'
           name="title"
           onChange={(e)=> setTitle(e.target.value)}
           value={title} placeholder='Escreva o Título...' required />
        </label>

        <label>
          <span>Url da Imagem:</span>
          <input type='text' name="image" value={image} onChange={(e)=> setImage(e.target.value)} required/>
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea name="body" required 
          onChange={(e) => setBody(e.target.value)}
          placeholder="Insira o conteúdo do post"
          value={body} > 
          </textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input type="text"
          name='tags'
          onChange={e => setTags(e.target.value)}
          value={tags} 
          placeholder="Insira as tags separadas por virgula" 
          required
          />
        </label>

        {!response.loading && 
            <button className="btn">Postar</button>
        }

        {response.loading && (
          <button className="btn" disabled >Aguarde...</button>
          )}
        
        {/response.error && (
          <p className="error">{response.error}</p>
        )} 
        {formError && <p className="error">{formError}</p>/}

        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}

      </form>
    </div>
  )

}

export default CreatePost;
*/

import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useInsertDocument } from "../../Hook/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array

    const tagsArray = tags.split(', ').map((tag) => tag.trim().toLowerCase());

    

    // check values
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    console.log(tags);

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if(formError) return

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
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
        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;


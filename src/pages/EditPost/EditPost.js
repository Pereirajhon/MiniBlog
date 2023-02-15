import styles from './EditPost.module.css'

import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
import { useFetchDocument } from "../../Hook/useFetchDocument";
import { useUpdateDocument } from '../../Hook/useUpdateDocument';

import { useForm } from 'react-hook-form';

const EditPost = () => {
  const {id} = useParams();
  const {data: post, isLoading, isError, error} = useFetchDocument('posts', id);

  const {register, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      title: post.title,
      image: post.image,
      body: post.body,
      tags: post.tags
    }
  });

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { updateData} = useUpdateDocument('posts', user);

  //useEffect(()=> {
  //  if(post){
  //    setTitle(post.title);
   //   setBody(post.body);
  //    setImage(post.image);
  //    const textTags = post.tags.join(', ');
  //    setTags(textTags)
  //  }
  //},[post])

  const onSubmit = handleSubmit(async(data) => {

    new URL(post.image);

    const tagsArray = post.tags.split(', ').map((tag) => tag.trim().toLowerCase());

    console.log(data);

    const {title, image, body ,tags} = data

    const postEdit = {
      title,
      image,
      body,
      tags: tags ? tagsArray : tags
    }

    updateData.mutate(postEdit, id)

    // redirect to home page
    navigate("/");
  });

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post</h2>
          <p>Atualize o post como desejar !</p>
          <form onSubmit={onSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              {...register('title')}
              name="title"
              placeholder="Pense num bom título..."
            />
          </label>
          
          <label>
            <p>Previews da imagem</p>
            <img className={styles.previews_image} src={post.image} alt={post.title}/>
            <span>URL da imagem:</span>
            <input
              type="text"
              {...register('image')}
              name="image"
            />
          </label>
          <label>
            <span>Conteúdo:</span>
            <textarea
              {...register('body')}
              name="body"
              placeholder="Insira o conteúdo do post"
            ></textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input
              type="text"
              {...register('tags')}
              name="tags"
              placeholder="Insira as tags separadas por vírgula"
            />
          </label>
          <button type='submit' className="btn">Editar post</button>
          {isLoading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          {(isError || errors) && (
            <p className="error">{error}</p>
          )}
        </form>
        </>
      )}
      
      
    </div>
  );
};

export default EditPost ;

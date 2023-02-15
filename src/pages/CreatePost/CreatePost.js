import styles from "./CreatePost.module.css";

import { useInsertDocument } from "../../Hook/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";

import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

const CreatePost = () => {

  const postSchema = yup.object().shape({
    title: yup.string().required('Por favor preencha todos os campos !'),
    image: yup.string().url('A imagem deve ser uma URL').required('Por favor preencha todos os campos !'),
    body: yup.string().required('Por favor preencha todos os campos !'),
    tags: yup.string().required('Por favor preencha todos os campos !')
  })

  const { user } = useAuthValue();
  const { createPost } = useInsertDocument('posts');
  const navigate = useNavigate();
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(postSchema)
  })

  const onSubmitData = handleSubmit(data => {

    const {title, image, body, tags } = data

    // validate image
    new URL(image);

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    console.log({
      ...data,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    createPost.mutate({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate('/')
  })

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={onSubmitData}>
        <label>
          <span>Título:</span>
          <input
            {...register('title')}
            error= {errors?.title?.message}
            type="text"
            name="title"
            placeholder="Pense num bom título..."
          />
          { errors?.title && <p className="error">{errors.title?.message}</p> }
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            {...register('image')}
            type="text"
            name="image"
            error= {errors?.image?.message}
            placeholder="Insira uma imagem que representa seu post"
          />
          { errors?.image && <p className="error">{errors?.image?.message}</p> }
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            {...register('body')}
            error= {errors?.body?.message}
            name="body"
            placeholder="Insira o conteúdo do post"
          ></textarea>

          {errors?.body && <p className="error">{errors.body?.message}</p>}
        </label>
        <label>
          <span>Tags:</span>
          <input
            {...register('tags')}
            error= {errors?.tags?.message}
            type="text"
            name="tags"
            placeholder="Insira as tags separadas por vírgula"
          />
          {errors?.tags && <p className="error" > {errors.tags?.message} </p> }

        </label>
        <button type='submit' className="btn">Criar post!</button>
        {createPost.isLoading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        { createPost.isError && (
          <p className="error">{ createPost.error }</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;


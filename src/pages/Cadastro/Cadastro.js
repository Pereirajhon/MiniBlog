import { useAuthentication } from '../../Hook/useAuthentication'
import styles from "./Cadastro.module.css"

import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const Cadastro = () => {
  const {createUser} = useAuthentication();

  const registerFormSchema = yup.object().shape({
    displayName: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail invalido'),
    password: yup.string().required('Senha obrigatória')
    .min(6,'Senha deve ter no minimo 6 caracteres!'),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null],"As senhas precisam ser iguais!").required("A confirmação de senha é obrigatória")
  })
  
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(registerFormSchema)
  })


  const onSubmitData = handleSubmit(async(data) => {
    
    createUser.mutateAsync(data)
    console.log(data)
    console.log(errors)
    
  })

  return (
    <div className={styles.cadastro}>    
      <form onSubmit={onSubmitData}>
        <h2>Cadastre-se </h2>
        <p>Crie seu usuário e compartilhe suas histórias</p>
          <label className={styles.label} >
            <span>Nome: </span>
            <input
            {...register('displayName')}
            error={errors?.displayName?.message}
            type="text"
            name="displayName" 
            placeholder='Digite seu nome'
              />
            {errors?.displayName && (
              <p className='error'> {errors?.displayName.message} </p>
            )}
          </label>
          <label>
            <span>Email:</span>
            <input
            {...register('email')}
            error={errors?.email?.message}
            type="email"
            name="email" 
            placeholder="Insira seu email"
              />
            {errors?.email && (
              <p className='error'> {errors?.email.message} </p>
            )}

          </label>
          <label>
            <span> Senha:</span>
            <input
             {...register('password')}
             error={errors?.password?.message} 
             type="password"
             name='password'
             placeholder='Insira sua Senha' 
            />
            {errors?.password && (
              <p className='error'>{errors?.password.message} </p>
            )}
            
          </label>
          <label >
            <span>Confirme sua senha</span>
            <input
             {...register('confirmPassword')}
             error={errors?.confirmPassword?.message}
             type="password"
             name="confirmPassword" 
             placeholder="Confirme sua Senha"
            />
            {errors?.confirmPassword && (
              <p className='error'> {errors?.confirmPassword.message} </p>
            )}

        </label>
          {!createUser.isLoading && ( 
          <button className='btn'> Cadastrar </button>
          )}
          {createUser.isLoading && (
            <button className='btn' disabled>aguarde...</button>
          )}

        {createUser.isError && (
          <p className='error'> Ocorreu um erro, por favor tente mais tarde !  </p> 
        )}
      </form>
    </div>
  )
}

export default Cadastro;
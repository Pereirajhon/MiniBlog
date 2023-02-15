import styles from "./Login.module.css"
import { useAuthentication } from '../../Hook/useAuthentication'

import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const Login = () => {

  const {login} = useAuthentication();

  const formSchema = yup.object().shape({
    email: yup.string().required('E-mail é obrigatório !').email('E-mail invalido !'),
    password: yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter no minimo 6 caracteres')
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(formSchema)
  })
  

  const onSubmit = handleSubmit(async(data) => {

    await login.mutate(data)
    console.log(data)
  })


  return (
    <div className={styles.login}>
        <form onSubmit={onSubmit}>
          <h2>Login</h2>
          <p>Faça Login para utilizar o sistema</p>
            <label>
              <span>Email:</span>

              <input 
              {...register('email')}
              error= {errors?.email?.message}
              type="email"
              name="email"
              placeholder="Insira seu email"
              />
              { errors?.email && <p className='error'> {errors.email?.message} </p> }

            </label>
            <label>
              <span>Senha:</span>
              <input 
               {...register('password')}
               error= {errors?.password?.message}
               type= 'password'
               name='password'
               placeholder='Insira sua Senha'
              />
              { errors?.password && <p className='error'>{errors.password?.message}</p> }
            </label>

            {!login.isLoading && ( 
            <button type="submit" className='btn'>Login</button>
            )}
            {login.isLoading && (
              <button className='btn' disabled>aguarde...</button>
            )}
            { login.isError && (
              <p className='error'>Senha ou Usuário estão incorretos </p> 
            )}

        </form>
    </div>
  )
}

export default Login
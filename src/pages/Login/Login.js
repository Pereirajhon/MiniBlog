import styles from "./Login.module.css"
import {useState,useEffect} from 'react';
import { useAuthentication } from '../../Hook/useAuthentication'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('');

  const {login, error: authError, loading} = useAuthentication();

  async function handleSubmit(e){
    e.preventDefault();
    setError('')

    const user = {
      email,
      password,
    }
    
    await login(user)

    console.log(user)
  }

  useEffect(() =>{
    if(authError){
      setError(authError)
    }
  })

  return (
    <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p>Faça Login para utilizar o sistema</p>
            <label>
              <span>Email:</span>
              <input
              type="email"
              name="email" required 
              value={email}
              onChange= {(e) => setEmail(e.target.value)} placeholder="Insira seu email"
                />
            </label>
            <label>
              <span>Senha:</span>
              <input type="password"
                name='password'
                value={password} required
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Insira sua Senha' />
            </label>

            {!loading && ( 
            <button className='btn'>Login</button>
            )}
            {loading && (
              <button className='btn' disabled>aguarde...</button>
            )}
            {error && (
            <p className='error'>{error}</p> 
            )}
        </form>
    </div>
  )
}

export default Login
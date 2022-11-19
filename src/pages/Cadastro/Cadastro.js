import {useState, useEffect} from 'react'
import { useAuthentication } from '../../Hook/useAuthentication'
import styles from "./Cadastro.module.css"


const Cadastro = () => {

  //const [user, setUser] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState('')

  const {createUser, error: authError, loading} = useAuthentication();

  async function handleSubmit(e){
    e.preventDefault();
    setError('')

    const user = {
      displayName,
      email,
      password,
    }
    
    if(password !== confirmPassword)setError("As senhas precisam ser iguais !") ;
    
    const res = await createUser(user)

    console.log(res)
  }

  useEffect(() =>{
    if(authError){
      setError(authError)
    }
  },[authError])

  return (
    <div className={styles.cadastro}>    
        <form onSubmit={handleSubmit}>
          <h2>Cadastre-se </h2>
          <p>Crie seu usuário e compartilhe suas histórias</p>
            <label className={styles.label} >
                <span>Nome:</span>
                <input
                type="text"
                name="displayName" required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)} placeholder="Insira seu Nome"
                 />
            </label>
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
            <label>
                <span>Confirme sua senha</span>
                <input type="password"
                 name="confirmPassword" required
                 value={confirmPassword}
                 onChange={(e)=> setConfirmPassword(e.target.value)}
                 placeholder="Confirme sua Senha" />
            </label>
             {!loading && ( 
              <button className='btn'> Cadastrar</button>
              )}
              {loading && (
                <button className='btn' disabled>aguarde...</button>
              )}
            {error && <p className='error'>{error}</p> }
        </form>
    </div>
  )
}

export default Cadastro;
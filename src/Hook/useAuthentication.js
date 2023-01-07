import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import {useState, useEffect} from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled)return;
    }

    const createUser = async (data) => {

        checkIfIsCancelled()
        setLoading(true)
        try{
           const {user} = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
            ) 
            await updateProfile(user,{
                displayName : data.displayName,
            })

            setLoading(false) 
            return user
            
        } catch(e){

            console.log(e.message)
            console.log(typeof e.message)

            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter 6 caracteres!"

            }else if(error.message.includes("email-already")){
                systemErrorMessage = "email já cadastrado !"
            }else{
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde !"
            }          
            setError(systemErrorMessage)
            setLoading(false)
        }
           
    }

    useEffect(() =>{
        return () => setCancelled(true);
    }, [])

    const login = async(data) => {
          
          setLoading(true)
          checkIfIsCancelled()
        try{
            await signInWithEmailAndPassword(auth,
                data.email,
                data.password,
            )            

        }catch(e){
            let systemErrorMessage

            if(e.message.includes("user-not-found")){
                systemErrorMessage = "Usuário não encontrado"
            }else if(e.message.includes("wrong-password")){
                systemErrorMessage = 'Senha errada'
            }else{
                systemErrorMessage = "Ocorreu um erro"
            }
            setError(systemErrorMessage)
        }
        setLoading(false)
      }   

    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    useEffect(() => {
        return () => setCancelled(true);
      }, []);

    return {
        auth,
        login,
        createUser,
        error,
        loading,
        logout,
        }

}
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

import {useMutation} from 'react-query'

export const useAuthentication = () => {

    const auth = getAuth()
    
    const createUser = useMutation(async(data) => {
        const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password)
        await updateProfile(user, {displayName: data.displayName, password: data.password})
        return user   
    })

    const login = useMutation(async(data) => 
        await signInWithEmailAndPassword(auth, data.email, data.password)
    )
  
    const logout = () => {
        signOut(auth)
    }

    return {
        auth,
        createUser,
        login,
        logout
    }
}
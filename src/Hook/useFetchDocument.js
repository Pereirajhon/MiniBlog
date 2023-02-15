import { db } from "../firebase/config";
import {doc, getDoc }  from "firebase/firestore"
import {useQuery} from'react-query'

export const useFetchDocument = (docCollection, id) => {

    const {data, isError, error, isLoading} = useQuery([docCollection, id], async() => {
        const docRef = doc(db, docCollection, id)
        const docSnap = await getDoc(docRef)

        return docSnap.data()
    })
    
    return { data, isLoading,isError ,error}
}
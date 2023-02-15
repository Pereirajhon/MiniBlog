import {db} from "../firebase/config";
import {doc, updateDoc} from "firebase/firestore";
import {useMutation} from 'react-query'

export const useUpdateDocument = (docCollection) => {

    const updateData = useMutation(async(data, id) => {
        const docRef =  doc(db, docCollection, id)
        const editPost = await updateDoc(docRef, data)
        return editPost
    },
    {
        onError: (error) => console.error(error)
    })
    
    return {updateData}
}
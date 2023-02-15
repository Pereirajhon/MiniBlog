import {db} from "../firebase/config";
import { collection,Timestamp,addDoc } from "firebase/firestore";
import { useMutation } from "react-query";

export const useInsertDocument = (docCollection) => {

    const createPost = useMutation(docCollection, async(data) => {
 
        const insertedPost = await addDoc(collection(db, docCollection),{
            ...data, createdAt: Timestamp.now()
        })

        return insertedPost
    },
    {
        onError: (err) => console.error(err)
    })

    return {createPost}
}
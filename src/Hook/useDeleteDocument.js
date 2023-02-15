import { db } from "../firebase/config";
import {deleteDoc,doc } from "firebase/firestore";
import { useMutation} from "react-query";

export const useDeleteDocument = (docCollection) => {

    const deleteData = useMutation([docCollection], async(id) => {
        const docRef = doc(db, docCollection, id)
        const deletedDocRef = await deleteDoc(docRef)

        return deletedDocRef
    },
    {
        onError: (error) => console.log(error)
    })
    
    return {deleteData}
}
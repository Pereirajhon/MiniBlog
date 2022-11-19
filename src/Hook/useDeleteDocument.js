import { db } from "../firebase/config";
import {deleteDoc,doc } from "firebase/firestore";

import { useEffect, useState,useReducer} from "react"

const initialState = {
    loading: null,
    error : null
}

const deleteReducer = (state,action) =>{
    switch (action.type) {
        case "LOADING":
            return {loading:true, error: null};
        case "ERROR":
            return {loading : false, error:true};
        case "DELETE_DOCUMENT":
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useDeleteDocument = (docCollection) => {

    const [response, dispatch] = useReducer(deleteReducer, initialState);

    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
    if(cancelled) return dispatch(action);
    }

    const deleteDocument = async(id)=> {
        checkCancelBeforeDispatch({type : "LOADING"})
        try {
            const docRef = await doc(db, docCollection, id)
            const deletedDocument = await deleteDoc(docRef)

            checkCancelBeforeDispatch({
                type: "DELETE_DOCUMENT",
                payload: deletedDocument,
            })

        } catch(error) {
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message,
            })
        }
    }

    //useEffect(() =>{
    //    return () => setCancelled(true);
   // },[])
    
    return {deleteDocument,response}
}
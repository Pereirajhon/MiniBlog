import {db} from "../firebase/config";
import {useEffect, useState, useReducer} from 'react';
import { updateDoc, doc, collection} from "firebase/firestore";


const initialState = {
    loading: null,
    error: null,
}

const updateReducer = (state,action) =>{
    switch(action.type){
        case "LOADING" :
            return {loading:true, error: null}
        case "UPDATE_DOC":
            return {loading:false, error:null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useUpdateDocument = (docCollection) => {

    const [response, dispatch] = useReducer(updateReducer,initialState)
    const [cancelled, setCancelled] = useState(false)

    // deal with memory leak
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) return dispatch(action);
    }
    
    const updateDocument = async (data, id) => {

        checkCancelBeforeDispatch({ type:"LOADING"})
        try{
            console.log(document)
            const docRef = await doc(db, docCollection,id)
            const updatedDocument = await updateDoc(docRef, data)

            checkCancelBeforeDispatch({
                type: 'UPDATE_DOC',
                payload: updatedDocument
            }) 

        }catch(error){
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
     
    }  
    
    useEffect(() => {
       return () => setCancelled(true);
    },[]);

    return {updateDocument,response}
}
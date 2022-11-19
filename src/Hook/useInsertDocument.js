import {db} from "../firebase/config";
import {useEffect, useState, useReducer} from 'react';
import { collection,Timestamp,addDoc } from "firebase/firestore";


const initialState = {
    loading: null,
    error: null,
}

const insertReducer = (state,action) =>{
    switch(action.type){
        case "LOADING" :
            return {loading:true, error: null}
        case "INSERTED_DOC":
            return {loading:false, error:null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer,initialState)
    const [cancelled, setCancelled] = useState(false)

    // deal with memory leak
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) return dispatch(action);
    }
    
    const insertDocument = async (document) => {

        checkCancelBeforeDispatch({ type:"LOADING"})
        try{
            console.log(document)

            //const newDocument = {...document,createdAt:Timestamp.now()}

            const insertedDocument = await addDoc(collection(db,docCollection),{...document, createdAt:Timestamp.now()})
                
               // console.log(insertedDocument)
            checkCancelBeforeDispatch({
                type: 'INSERTED_DOC',
                payload: insertedDocument
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

    return {insertDocument,response}
}

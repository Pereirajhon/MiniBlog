import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import {doc, getDoc }  from "firebase/firestore"

export const useFetchDocument = (docCollection, id) =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [document, setDocument] = useState(null)

    useEffect(() => {
        async function loadDocument(){

            setLoading(true);

            try {
                const docRef = await doc(db,docCollection, id)
                const docSnap = await getDoc(docRef)
                setDocument(docSnap.data())

            } catch(error){
                console.log(error)
                setError(error.message)
            }
            setLoading(false)
        }
        loadDocument()
    },[docCollection,id])

    console.log(document)

    return {document, loading, error}
}
import {db} from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where
} from "firebase/firestore";

import {useCallback} from 'react'
import {useQuery} from 'react-query'

export const useFetchDocuments = (docCollection, search=null, uid) => {

    const loadData = useCallback(() => {

        const collectionRef = collection(db, docCollection)

        let q;     

        if(search) {
            q= query(collectionRef, where('tags','array-contains', search),orderBy('createdAt', 'desc'));  
        }
        else if(uid){
            q= query(collectionRef, where('uid',"==", uid),orderBy('createdAt', 'desc'))
        }
        else{
            q= query(collectionRef, orderBy('createdAt', 'desc'));
        }

        return new Promise((resolve) => {
            onSnapshot(q,(querySnapshot)=> {
                resolve(
                    querySnapshot.docs.map((doc) => ({      
                        id: doc.id,
                        ...doc.data()   
                    }))
                )           
            })  
        })            
    },[docCollection,search, uid])

    const {data, isLoading, isError} = useQuery([docCollection, search, uid],loadData) 

    return {data, isLoading, isError}
}


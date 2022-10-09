import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, storage } from "./firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc, query, where} from "firebase/firestore";
import Head from 'next/head';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
     useEffect(async() => {
       const uid = localStorage.getItem("uid") 
       if(uid){
    var docRef = doc(db, "user", uid);
    const infoSnap = await getDoc(docRef)
    if(infoSnap.data().email){
             setCurrentUser(infoSnap.data().email);
            setLoading(false);
      }
    }else{
setCurrentUser(null)
setLoading(false)
    }

  return docRef
  }, []);

  if (loading) return (
      <>
  <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
  </Head>
  <div className='vw-100 vh-100 '>
    <div className ="spinner-border text-danger ccc" role="status">
    <span className ="visually-hidden">Loading...</span>
  </div>
  </div>
  </>
  )

  return (
    <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
  );
};
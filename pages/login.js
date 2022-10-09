import React, { useState } from 'react';
import Head from "next/head";
import { useRouter } from "next/router"
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc, query, where} from "firebase/firestore";
const Login = () => {
    const [mail, setmail] = useState("");
    const [pass, setpass] = useState("");
    const [error, setError] = useState('');
    const router = useRouter()
       const handlename = (e) => {
      setmail(e.target.value);
      setError('');
    };
    const handlepass = (e) => {
        setpass(e.target.value);
        setError('');
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     
    var docRef = doc(db, "user", pass);
    const infoSnap = await getDoc(docRef)
    if(infoSnap.data().email==mail){
      localStorage.setItem("uid",infoSnap.data().uid)
      router.push('/admin')
    }
     else{
        alert("تأكد من صحة البريد والرقم السري")
     }
    };
  
    return (
        <>
                <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
   <title>مصنع فرسان الإنشاءات  للصناعة</title>
   <link rel="icon" href="wew.png" type="image/x-icon" />
        </Head>
      <div className="my-5 container">
        <h1>تسجيل الدخول</h1>
        <form onSubmit={handleSubmit}className="my-5 text-center">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            autoComplete="off"
            onChange={handlename}
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            onChange={handlepass}
            name="password"
          />
          <button type="submit">Submit</button>
          <p className="form__error">{error}</p>
        </form>
        
      </div>
      </>
    );
}
 
export default Login;
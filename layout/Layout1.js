import Head from "next/head";
import styles from '../styles/layout1.module.css'
import Image from 'next/image'
import { useAppContext } from "../AppContext";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Link from "next/link";

const Layout1 = ({children}) => {
  const de=[]
  var init ={}
  const [appState, setAppState] = useAppContext();
  const[cart,setcart]=useState([])
 useEffect(async()=>{
  const codelist = collection(db, 'category');
  const codesnapshot = await getDocs(codelist);
  const infoRef = doc(db, "info", "info");
  const infoSnap = await getDoc(infoRef)
  const getinfo =  infoSnap.data()?setinfo(infoSnap.data().info):{}
  const catolist = codesnapshot.docs?codesnapshot.docs.map(doc =>{ de.push(doc.data());   }):de
  setcategory(de)
  setcategory1(de)
  setcategory2(de)
  return catolist,getinfo
 },[])
 const [category1,setcategory1]=useState([]);
const [category2,setcategory2]=useState([]);
const [category,setcategory]=useState([]);
const [info,setinfo]=useState({});
const[activ,setactiv]=useState('')
const[activ1,setactiv1]=useState('')
const[nav,setnav]=useState("nav-side")

const fixed=()=>{
 activ=="fixed-active"?setactiv(""):setactiv("fixed-active");setactiv1('')
}
const fixed1=()=>{
  activ1=="fixed-active"?setactiv1(""):setactiv1("fixed-active");setactiv('')
 }
 const onnave=()=>{
   nav=="nav-side-active"?setnav("nav-side"):setnav("nav-side-active")
 }

  return (  
< div >
<Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'></link>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous"></script>
</Head>
<div className="divlarg d-none d-lg-block ">
<nav className="navbar navbar-light bg-white">
  <div className="container">
  <Link href='/cart'>
   
    <a className="navbar-brand" href="#">
      <img src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/logo-01.png?alt=media&token=96808f56-1ecb-42c9-b621-35d31208737e" alt="" width="200" height="100" className="d-inline-block align-text-top"/>
    </a>
    </Link>
  </div>
</nav>
<ul className={`nav justify-content-center ${styles.navdesk}`}>
    {/* {
  category.map((item) => (
       <li className="nav-item" key={item.name}>
            
    <a className="nav-link text-white " href={`/${item.name}`} >{item.name}</a>
            
       </li>
            ))}
            <li className="nav-item ">
    <Link href="/">
    <a className="nav-link text-white " >الرئيسية</a>
    </Link>
  </li> */}
</ul>
</div>
<div className="divsmal d-block d-lg-none">
<nav className="navbar navbar-light bg-white">
  <div className="container">
    <a className="navbar-brand mx-auto" href="/">
      <img src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/logo-01.png?alt=media&token=96808f56-1ecb-42c9-b621-35d31208737e" alt="" width="100" height="70" className="d-inline-block align-text-top"/>
    </a>
  </div>
</nav>
<nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navmob}`}>
  <div className="container-fluid">
   
    <button className="navbar-toggler" type="button" onClick={onnave}>
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="  navbar-collapse " >
      <ul className={`navbar-nav  ${nav} `}>
        <li className="nav-item text-end ms-auto">
           <Link href={`/`}>
          <a className="nav-link active" aria-current="page" >الرئيسية</a>
          </Link>
        </li>
        {
  category1.map((item) => (
       <li className="nav-item text-end ms-auto" key={item.name} onClick={()=>setnav("nav-side")}>
             
          <a className="nav-link  " href={`/${item.name}`}>{item.name}</a>
             
       </li>
            ))}
      </ul>
    </div>
  </div>
</nav>
</div>

{/* --------------------------------------------------------------------------------------------------- */}
{children}
<div className={`p-3 ${styles.footerx}`}>
{/* <nav className="navbar navbar-light ">
  <div className="container">
    <a className="navbar-brand mx-auto" href="#">
      <img src={info.logo} alt="" width="100" height="70" className="d-inline-block align-text-top"/>
    </a>
  </div>
</nav>
<div className="wrapper text-center">
  {info.face? <a href={info.face} className="icon p-2 facebook">
    <div className="tooltip">Facebook</div>
    <span><i className="fab fa-facebook-f"></i></span>
  </a>:""}
  {info.twitter?<a href={info.twitter} className="icon  p-2 twitter">
    <div className="tooltip">Twitter</div>
    <span><i className="fab fa-twitter"></i></span>
  </a>:""}
  {info.insta?<a href={info.insta} className="icon  p-2 instagram">
    <div className="tooltip">Instagram</div>
    <span><i className="fab fa-instagram"></i></span>
  </a>:""}
 {info.snap?<a href={info.snap} className="icon  p-2 github">
    <div className="tooltip">Github</div>
    <span><i className="fab fa-snapchat"></i></span>
  </a>:""}
  {info.linked?<a href={info.linked} className="icon  p-2 youtube">
    <div className="tooltip">Youtube</div>
    <span><i className="fab fa-linkedin"></i></span>
  </a>:""}
</div>
<div className="row justify-content-around">
    <div className="col-11 col-lg-5 ">
    <h5 className="card-title text-center text-primary">منتجات</h5>
    <ul className="row text-center list-unstyled">
       { category.map((item) => (
       <li className="col-6" key={item.name}>
             <Link href={`/${item.name}`}>
    <a className="text-decoration-none text-dark " >{item.name}</a>
             </Link>
       </li>
            ))}
    </ul>
    </div>
    <div className="col-11 col-lg-5 ">
    <h5 className="card-title text-end text-primary">تواصل معنا</h5>
    <ul className="row text-end list-unstyled">
        <li className="col-12 text-lift">
          <span className="text-dark">
           {info.adress?info.adress:""}
          </span>
        <i className="fas fa-map-marker-alt p-2"></i>
          </li>
          <li className="col-12 text-lift">
          <span className="text-dark">
           {info.tele?info.tele:""}
          </span>
          <i className="fas fa-phone-square-alt p-2"></i>
          </li>
          <li className="col-12 text-lift p-2">
          <span className="text-dark">
           {info.tele?info.tele:""}
          </span>
          <i className="fas fa-mobile p-2"></i>
          </li>
          <li className="col-12 text-lift">
          <span className="text-dark">
           {info.email?info.email:""}
          </span>
          <i className="fas fa-at p-2"></i>
          </li>
          
        
    </ul>
</div>
</div>
<h6 className="card-title text-center text-dark">{`الحقوق محفوظة${info.name} © 2022`}</h6> */}
<h6 className="card-title text-center text-dark">powered by <a  href="http://sayedkhalil.com">sayed khalil</a></h6>
</div>
</div>
    );
}
 

export default Layout1;

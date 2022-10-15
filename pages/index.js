   
import Head from 'next/head'
import Image from 'next/image'
import About from '../layout/about'
import Cover from '../layout/cover'
import NEw from '../layout/new'
import Opnion from '../layout/opnion'
import Partener from '../layout/partener'
import Productes from '../layout/productes'
import styles from '../styles/Home.module.css'
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc, query, where} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
export default function Home({getdata}) {
  var r=[]
  let cvs =JSON.parse(getdata.cvs)
  const [stream,setstream]=useState(cvs)
  const router = useRouter()
  ChartJS.register(ArcElement, Tooltip, Legend);
   const resort =(e)=>{
   const rar = cvs.filter(x=>x.title==e.target.value)
   setstream(rar)
   }
   const onh =(y)=>{
    router.push(`../cv/${y.replaceAll(/\s/g, '')}`)  
   }
  useEffect(()=>{
    setstream(cvs)
  },[])
  return (
    <div className={styles.container}> 
      <Head>
        <title>{getdata.getinfo.name}</title>
        <meta name="description" content={getdata.getinfo.des} />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
        <link rel="icon" href={getdata.getinfo.logo} type="image/x-icon" />
      </Head>
      <h1 className='c-orange text-center p-3' >CV management</h1>
       <div className='w-100 row'>
        <div className='col-2'>
          
        </div>
       <div className="col-3  ">
    <div className="p-3">
    <Doughnut data={{
    labels: [],
    datasets: [
     {
       label: '# of Votes',
       data: [cvs.length,100-cvs.length],
       backgroundColor: [
         'rgba(247, 148, 88,1)',
         'rgb(65, 65, 65)',
         
       ],
       borderColor: [
         'rgba(255, 99, 132, 0)',
         'rgba(54, 162, 235, 0)',
         
       ],
       borderWidth: 0,
     },
    ],
    }} />
    </div>
     <h5 className="text-center c-orange text-dark">Number of CVs for company employees</h5>
    </div> 
      
    <div className='row col-6'>
    <div className="card bg-light mb-3 col-3 m-2" style={{"max-width": "18rem"}}>
  <div className="card-header c-orange">CV management</div>
  <div className="card-body">
    <h5 className="card-title">management jobs</h5>
    <p className="card-text h1">00</p>
  </div>
</div>
<div className="card bg-light mb-3 col-3 m-2" style={{"max-width": "18rem"}}>
  <div className="card-header c-orange">CV management</div>
  <div className="card-body">
    <h5 className="card-title">Engineers</h5>
    <p className="card-text h1">00</p>
  </div>
</div>
<div className="card bg-light mb-3 col-3 m-2" style={{"max-width": "18rem"}}>
  <div className="card-header c-orange">CV management</div>
  <div className="card-body">
    <h5 className="card-title">technical professions</h5>
    <p className="card-text h1">00</p>
  </div>
</div>

    </div>
          
    </div> 
    <div className='mt-5'>
    <div class="input-group mb-3 w-100">
  <div class="input-group-prepend w-225">
    <label class="input-group-text c-orange bg-orange" for="inputGroupSelect01">title jop</label>
  </div>
  <select class="custom-select w-100" id="inputGroupSelect01" onChange={resort}>
    <option selected >Choose...</option>
    {cvs.map(x=><option value={x.title}>{x.title}</option>)}
    
  </select>
</div>
    </div>   
    <div className='w-100'>
      {stream.map(x=>(
   <div onClick={()=>onh(x.name)} className='w-100 border border sir  border-warning row rounded-bill '>
   <div className='col-11'>
     <h4>
      {x.name}
     </h4>
     <h6>
     {x.title}
     </h6>
   </div>
   {x.pic?<img className='col-1 ' src={x.pic} alt=""/>:""}
 </div>
      ))}
   
      
    </div>
    </div>
  )
}
export async function getServerSideProps(){
  const de=[]
  const opnionarr=[]
  const pro=[]
  const neww =[]
  const infoRef = doc(db, "info", "info");
  const infoSnap = await getDoc(infoRef)
  const getinfo =  infoSnap.data()?infoSnap.data().info:{}
  const docRef = doc(db, "cover", "cover");
  const docSnap = await getDoc(docRef);
  const getcover =  docSnap.data()?docSnap.data().covers:[]
  const docRefpar = doc(db, "partn", "partn");
  const docSnapar = await getDoc(docRefpar);
  const getpartn =  docSnapar.data()?docSnapar.data().partns:[]
  const codelist = collection(db, 'cv');
  const codesnapshot = await getDocs(codelist);
  const catolist = codesnapshot.docs?codesnapshot.docs.map(doc =>{ de.push(doc.data());   }):de
  const prodlist = collection(db, 'cv');
  const prodsnapshot = await getDocs(prodlist);
  const products =async()=>await prodsnapshot.docs?prodsnapshot.docs.map(doc =>{ pro.push(doc.data());   }):[]
  const opnion = collection(db, 'opnion');
  const opnionsnap = await getDocs(opnion);
  const getopnion =async()=> opnionsnap?opnionsnap.docs.map(doc =>{opnionarr.push(doc.data());   }):[];
  products()
  getopnion()  
  const newlist = collection(db, 'broductes');
  const n= query(newlist, where("category", "==","أبواب حديد"));
  const nprodsnapshot= await getDocs(n);
   nprodsnapshot?nprodsnapshot.forEach(doc =>{ neww.push({code:doc.data().code,
      title:doc.data().title,category:doc.data().category,imges:doc.data().imges[0]})  }):neww
     return{
      props:{getdata:{data:de,cvs:JSON.stringify(pro),getcov:getcover,getpart:getpartn,getopn:opnionarr,getinfo:getinfo,getnew:neww}}
           }
}


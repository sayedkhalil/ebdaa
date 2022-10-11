import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { useRouter } from "next/router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useAppContext } from "../../AppContext";
import { RWebShare } from "react-web-share";
import jsPDF from "jspdf";
import JsPDF from 'jspdf';
import * as htmlToImage  from "html-to-image";

import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';
import { async } from "@firebase/util";
const Product = ({item}) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const a4Ref =useRef()
    const router = useRouter()
    const [appState, setAppState] = useAppContext()
   
   const cv=JSON.parse(item)
  const getyear=(y)=>{
  return( new Date(y).getFullYear())   
  }
  const handlePrint = useReactToPrint({
    content: () => a4Ref.current,
    documentTitle:`cv:${cv.name}`
  });
 const savepdf=async()=>{
  const element = a4Ref.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL();
    var link = document.createElement("a")
    link.download=`cv-${cv.name}`
    link.href=data
    link.click()
 }
 const saveepdf= async () => {
  const dataUrl = await htmlToImage.toPng(a4Ref.current);
  console.log(dataUrl)
  // download image
  const link = document.createElement('a');
  link.download = "html-to-img.png";
  link.href = dataUrl;
  link.click();
}
  const handleDownloadPdf = async () => {
    const element = a4Ref.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/jpg');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    pdf.save(`cv:${cv.name}`)
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`cv:${cv.name}`)
  };
   return (  <>
           <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'></link>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous"></script>
<title>{`cv${cv.name}`}</title>   
   <link rel="icon" href={cv.pic} type="image/x-icon" />
        </Head>
    <div className="a4 row "ref={a4Ref} id="a4">
    {/* cection 1 ----------------------------------------------------------------------------------------------------------------  */}
        <div className="col-4 sec1  m-0 h-100">
         {/* avatar........................................................... */}
         {/* avtar */}
         <div className="cont-img">
           <img className="avatar-img" src={cv.pic}></img>
           <div className="label p-1  bg-light ">
         <h5 className="text-dark text-center">{cv.name}</h5>
         <hr className="bg-dark"></hr>
         <h6 className="text-dark text-center">{cv.title}</h6>
       </div>
         </div>
           {/* education........................................................... */}
           <div className="education w-100">
           <img src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/eduction.svg?alt=media&token=8894828b-09b7-41ae-b53d-36d930bfac67" className=" mb-3" alt=""/>
           <div className="w-100 edu">
             <div className="vr">                  
             </div>
           
              {
                cv.edues.map(x=>(
                    <div className="row w-100" key={ cv.edues.indexOf(x)}>
             <div className="col-1 p-2 poi rounded-circle bg-dark">            
             </div>
             <h5 className="col-3 ">{getyear(x.date)}</h5>
             <h6 className="text-dark  col-8">{x.deg}</h6>
             <div className="col-12 ">                 
               <h6 className="text-dark pl-1">{x.uni}</h6>
               <p className="text-dark pl-1 fs-6">
              {x.summary}
               </p>
             </div>
           </div>
                ))
              }


           </div>
          </div>
         {/* skills............................................................ */}
         <div className="skills row  p-1 mt-2">
          <img className="col-12 mb-2" src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/skills.svg?alt=media&token=1b9a8a61-2d63-4796-8803-a9be173d8eb0" alt=""/>
         {cv.skills.map(x=>( <div className="row w-100" key={cv.skills.indexOf(x)}>
          <h6 className="col-6 text-dark mt-1">{x.name}</h6>
          <progress className="col-6 mt-2 text-dark" id="file" value={x.range<90?95:x.range} max="100"> 32% </progress>
          </div>))}
       </div>
{/* langue----------------------------------------------------------------------------------- */}
<div className="langue">
<img src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/lang.svg?alt=media&token=fe942676-fa20-4507-bfe9-010c8de3425b" alt=""/>
<div className="row">
{cv.langs.map(x=>(
    <div className="col-6  " key={cv.langs.indexOf(x)}>
    <div className="p-3">
    <Doughnut data={{
    labels: [],
    datasets: [
     {
       label: '# of Votes',
       data: [x.range,100-x.range],
       backgroundColor: [
         'rgba(247, 148, 88,1)',
         'rgba(160, 16, 235, 0)',
         
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
     <h5 className="text-center text-dark">{x.name}</h5>
    </div> 
))}
</div>
</div>
       </div>
       {/* cection 2 ---------------------------------------------------------------------------------------------------------------  */}
       <div className="col-8 section-2 mt-3">
         {/* summary------------------------------------------------------------------------------------- */}
         <div className="summary p-2">
           <img className="w-100" src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/summary.svg?alt=media&token=393a9ca9-6b71-48e6-91cf-257c26bdcbc6" alt=""/>
           <p className="p-1">{cv.summary}
         </p>
         </div>
         {/* contact--------------------------------------------------------------------------- */}
 <div className="row">
   <div className="col-1"></div>
   <div className="contact row  col-11">
           <div className="row  col-6 cont-item row">
             <div className="col-1 p-1 borr">
             <img className="w-100" src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/call.svg?alt=media&token=0d8d3701-72a6-4145-b491-386335a762db" alt=""/>
             </div>                
             <h6 className="col-11 p-1">011 456 7137</h6>
           </div>
           {/* email */}
           <div className="row col-6 cont-item row">
             <div className="col-1 p-1 borr">
             <img className="w-100" src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/mail.svg?alt=media&token=3e031690-2235-4e8a-b359-9b03c48a58c8" alt=""/>
             </div>                
             <h6 className="col-11 p-1">{cv.email}</h6>
           </div>
           {/* adress */}
           <div className="row col-6 cont-item  row">
             <div className="col-1 p-1 borr">
             <img className="w-100" src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/loca.svg?alt=media&token=9e753ce6-bf41-433a-9c58-2ea372a99fef" alt=""/>
             </div>                
             <h6 className="col-11 p-1">Saudi Arabia – RIYADH </h6>
           </div>
          {/* birthday */}
          <div className="row col-6 cont-item  row">
             <div className="col-1 p-1 borr">
             <img className="w-100" src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/birh.svg?alt=media&token=c2c2d263-c8a7-40fd-8d9b-140a42878180" alt=""/>
             </div>                
             <h6 className="col-11 p-1">{cv.birth}</h6>
           </div>
           
         </div>
 </div>
 {/* exprienase-------------------------------------------------- */}
 <div className="exprien mt-3">
   <img className="w-100" src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/work.svg?alt=media&token=4fa51f4c-8f0f-4f12-86d5-9049509db86a" alt=""/>
   <div className="education w-100">
                        <div className="w-100 edu">
             <div className="vr">                  
             </div>
          
            {cv.works.map(x=>( <div className="row mt-2 w-100"key={cv.works.indexOf(x)}>
             <div className="col-1 p-2 poi rounded-circle bg-dark">            
             </div>
             <h6 className="text-dark p-1 col-8">{x.jo}</h6>
             <h5 className="col-3 p-1 ">{`${getyear(x.from)}-${getyear(x.to)}`}</h5>
               <div className="col-12 ">                 
               <h6 className="text-dark p-1">{x.comp}</h6>
               <p className="text-dark mrr fs-6">
             {x.summary}
               </p>
             </div>
           </div>))}


           </div>
          </div>
 </div>
   {/* certifacate------------------------------------------------------------ */}
   <div className="exprien mt-5">
   <img className="w-100" src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/certi.svg?alt=media&token=a6639041-ee76-481d-be99-94b69ef6ad9b" alt=""/>
   <div className="w-100">
   
     {cv.cers.map(x=>(<div className="work-item w-100 p-2 mt-3 row"key={cv.cers.indexOf(x)}>
   
   <div className="col-8">
   <h6 className="text-dark">{x.deg} </h6>
   <p className="text-dark">{x.summary}
</p>
   </div>
 </div>))}
   
     
   </div>
 </div>
 <span className="sp">powerd by  <img src="https://firebasestorage.googleapis.com/v0/b/cvebdaa.appspot.com/o/logo-01.png?alt=media&token=96808f56-1ecb-42c9-b621-35d31208737e" alt="" width="200" height="100" className="d-inline-block align-text-top"/></span>
         </div>
   
      
     </div>
     <button className="btn btn-lg btn-primary w-25" onClick={handlePrint}>print</button>
     </>
     );
}
//  hdh
export default Product;
export async function getStaticPaths() {
    const pro=[]
    const prodlist = collection(db, 'cv');
    const prodsnapshot = await getDocs(prodlist);
     prodsnapshot.docs?prodsnapshot.docs.map(doc =>{ pro.push({code:doc.data().code});   }):[]
    const paths =pro.map((item)=>{
       return{ 
           params:{id:item.code}
       }
    })
  
    return{
        paths,fallback:true
    }
  }
  export async function getStaticProps(context) {
const id        =context.params.id
const docRefpar = doc(db,'cv',id);
const docSnapar = await getDoc(docRefpar);
const getpartn =  docSnapar.data()?docSnapar.data():[]
   
    return {
      props: {item:JSON.stringify(getpartn)}
    }
  }
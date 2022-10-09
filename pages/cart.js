import Head from "next/head";
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,getDoc,doc,Timestamp,deleteDoc , setDoc, query, where} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAppContext } from "../AppContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { async } from "@firebase/util";
import { useLayoutEffect } from "react/cjs/react.production.min";
const Cart = () => {
  const [cart,setcart]=useState({})
  const [categ,setcateg]=useState([])
  const [mycart,setmycart]=useState([])
  const [place,setplace]=useState("للحصول على الخصم اكتب بروموكود")
  const [orname,setorname]=useState("")
  const [promo,setpromo]=useState("")
  const [promo1,setpromo1]=useState("")
  const initialValue = 0;  
  const [appState, setAppState] = useAppContext()
  const [total,settotal]=useState()
  const onnamee=(e)=>{
    setorname(e.target.value)
}
ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(()=>{
    const o =[]
    const myArrayFromLocalStorage = localStorage.getItem('mycart')
    if (myArrayFromLocalStorage && myArrayFromLocalStorage.length) {
    var myArray = JSON.parse(myArrayFromLocalStorage)}else{var myArray=[]  }
    const x= myArray.reduce(
      (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue.totalprice),
      initialValue
    )
    settotal(x)
    setcateg(myArray)
    var my=myArray.forEach(et=>o.push({code:et.code,title:et.title}))
    setmycart(o)  
    return myArrayFromLocalStorage
  },[])
  const delet=(x)=>{
    const deletx =categ.filter(i=>i.code!=x)
    setcateg(deletx)
    localStorage.setItem('mycart',JSON.stringify(deletx))
    settotal( deletx.reduce(
      (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue.totalprice),
      initialValue
    ))
  }
  const onname = (e) => setcart({...cart,name:e.target.value,mycart:categ,price:total,data:Date()})
  const ontele = (e) => setcart({...cart,tele:e.target.value})
  const onemail = (e) => setcart({...cart,email:e.target.value})
  const onmsg = (e) => setcart({...cart,msg:e.target.value})
  const onadress = (e) => setcart({...cart,adress:e.target.value})
 
  const onpromo=(e)=>{
   setpromo(e.target.value)
  }
  const sspromo =async()=>{
   if(promo){
    const promoRef = doc(db, "promocode", promo);
    const promoSnap = await getDoc(promoRef)
    if(promoSnap.data()){
      setpromo1(promo)
      setpromo("")
      setplace("مبروك الحصول على الخصم")
      let dis=total*(promoSnap.data().dis/100)
      if(dis>100){
        settotal(total-100)
        setcart({...cart,price:total-100,promo:promo})
      }else{
        settotal(total-dis)
        setcart({...cart,price:total-dis,promo:promo})
      }
    }else{
      setpromo("")
      setplace("الكود غير صحيح  تحقق من الكود")
    }
   }
  }
  const oncounting=(e,x,z)=>{
    let arr = categ
   let y=  arr.find(it=>it.code==z)
  if( e.target.value){
   y.totalprice=parseInt(x)*parseInt(e.target.value)
   y.count=e.target.value
   localStorage.setItem("mycart", JSON.stringify(arr))
   setcateg(arr)
   settotal( categ.reduce(
    (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue.totalprice),
    initialValue
  ))
  }
  }
  const onsend = async(e)=>{
    e.preventDefault() 
    const docRef = await setDoc(doc(db, "orders", cart.tele),cart); 
    setcart({name:"",tele:"",email:"",msg:"",mycart:""}) 
    setcateg([])
    setmycart([])
    localStorage.removeItem("mycart")
    settotal( 0)
    setAppState([])
}

    return ( 
      // container a4
        <div className="a4 row " id="a4">
       {/* cection 1 ----------------------------------------------------------------------------------------------------------------  */}
           <div className="col-4 sec1  m-0 h-100">
            {/* avatar........................................................... */}
            {/* avtar */}
            <div className="cont-img">
              <img className="avatar-img" src="avatar.jpg"></img>
              <div className="label p-1  bg-light ">
            <h5 className="text-dark text-center">Mustafa Tarek Omar</h5>
            <hr className="bg-dark"></hr>
            <h6 className="text-dark text-center">Project Management </h6>
          </div>
            </div>
              {/* education........................................................... */}
              <div className="education w-100">
              <img src="eduction.svg" className=" mb-3" alt=""/>
              <div className="w-100 edu">
                <div className="vr">                  
                </div>
              <div className="row w-100">
                <div className="col-1 p-2 poi rounded-circle bg-dark">            
                </div>
                <h5 className="col-3 ">2005</h5>
                <h6 className="text-dark  col-8">Master degree </h6>
                <div className="col-12 ">                 
                  <h6 className="text-dark pl-1">Cairo University</h6>
                  <p className="text-dark pl-1 fs-6">
                  in Architectural engineering, faculty of Engineering
                  </p>
                </div>
              </div>
{/* ---------------------------------------- */}

<div className="row w-100">
                <div className="col-1 p-2 poi rounded-circle bg-dark">            
                </div>
                <h5 className="col-3 ">2005</h5>
                <h6 className="text-dark  col-8">Master degree </h6>
                <div className="col-12 ">                 
                  <h6 className="text-dark pl-1">Cairo University</h6>
                  <p className="text-dark pl-1 fs-6">
                  in Architectural engineering, faculty of Engineering
                  </p>
                </div>
              </div>
              </div>
             </div>
            {/* skills............................................................ */}
            <div className="skills row  p-1 mt-2">
             <img className="col-12 mb-2" src="skills.svg" alt=""/>
             <div className="row w-100">
             <h6 className="col-6 text-dark mt-1">ESRI ArcGIS</h6>
             <progress className="col-6 mt-2 text-dark" id="file" value="90" max="100"> 32% </progress>
             </div>
             <div className="row w-100">
             <h6 className="col-6 text-dark mt-1">Sketch up</h6>
             <progress className="col-6 mt-2 text-dark" id="file" value="98" max="100"> 32% </progress>
             </div>
             <div className="row w-100">
             <h6 className="col-6 text-dark mt-1">AutoCAD</h6>
             <progress className="col-6 mt-2 text-dark" id="file" value="100" max="100"> 32% </progress>
             </div>
             <div className="row w-100">
             <h6 className="col-6 text-dark mt-1">InDesign</h6>
             <progress className="col-6 mt-2 text-dark" id="file" value="80" max="100"> 32% </progress>
             </div>
             <div className="row w-100">
             <h6 className="col-6 text-dark mt-1">Mapwingis.</h6>
             <progress className="col-6 mt-2 text-dark" id="file" value="90" max="100"> 32% </progress>
             </div>
             <div className="row w-100">
             <h6 className="col-6 text-dark mt-1">Photoshop</h6>
             <progress className="col-6 mt-2 text-dark" id="file" value="95" max="100"> 32% </progress>
             </div>
             <div className="row w-100">
             <h6 className="col-6 text-dark mt-1">InDesign</h6>
             <progress className="col-6 mt-2 text-dark" id="file" value="80" max="100"> 32% </progress>
             </div>
             <div className="row w-100">
             <h6 className="col-6 text-dark mt-1">Mapwingis.</h6>
             <progress className="col-6 mt-2 text-dark" id="file" value="90" max="100"> 32% </progress>
             </div>
             <div className="row w-100">
             <h6 className="col-6 text-dark mt-1">Photoshop</h6>
             <progress className="col-6 mt-2 text-dark" id="file" value="95" max="100"> 32% </progress>
             </div>
           
            </div>
{/* langue----------------------------------------------------------------------------------- */}
<div className="langue">
  <img src="lang.svg" alt=""/>
  <div className="row">
   <div className="col-6  ">
   <div className="p-3">
   <Doughnut data={{
  labels: [],
  datasets: [
    {
      label: '# of Votes',
      data: [90,10],
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
    <h5 className="text-center text-dark">english</h5>
   </div> 
   <div className="col-6  ">
   <div className="p-3">
   <Doughnut data={{
  labels: [],
  datasets: [
    {
      label: '# of Votes',
      data: [90,10],
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
    <h5 className="text-center text-dark">english</h5>
   </div> 
  </div>
</div>
          </div>
          {/* cection 2 ---------------------------------------------------------------------------------------------------------------  */}
          <div className="col-8 section-2">
            {/* summary------------------------------------------------------------------------------------- */}
            <div className="summary p-2">
              <img className="w-100" src="summary.svg" alt=""/>
              <p className="p-1">Master degree and about 14 years of experience in Urban Planning, worked for multinational and national companies in Egypt and Saudi Arabia, experienced working  in several fields such as Smart Cities, Slums Upgrading, Participatory Planning, Architecture & Urban Heritage, Coordinating Projects, Database, GIS and Laser scanning.
            </p>
            </div>
            {/* contact--------------------------------------------------------------------------- */}
    <div className="row">
      <div className="col-1"></div>
      <div className="contact row  col-11">
              <div className="row  col-6 cont-item row">
                <div className="col-1 p-1 borr">
                <img className="w-100" src="call.svg" alt=""/>
                </div>                
                <h6 className="col-11 p-1">966 599475939</h6>
              </div>
              {/* email */}
              <div className="row col-6 cont-item row">
                <div className="col-1 p-1 borr">
                <img className="w-100" src="mail.svg" alt=""/>
                </div>                
                <h6 className="col-11 p-1">m.tarek@live.com</h6>
              </div>
              {/* adress */}
              <div className="row col-6 cont-item  row">
                <div className="col-1 p-1 borr">
                <img className="w-100" src="loca.svg" alt=""/>
                </div>                
                <h6 className="col-11 p-1">Saudi Arabia – RIYADH </h6>
              </div>
             {/* birthday */}
             <div className="row col-6 cont-item  row">
                <div className="col-1 p-1 borr">
                <img className="w-100" src="birh.svg" alt=""/>
                </div>                
                <h6 className="col-11 p-1">: February 06, 1984</h6>
              </div>
              
            </div>
    </div>
    {/* exprienase-------------------------------------------------- */}
    <div className="exprien">
      <img className="w-100" src="work.svg" alt=""/>
      <div className="education w-100">
                           <div className="w-100 edu">
                <div className="vr">                  
                </div>
              <div className="row w-100">
                <div className="col-1 p-2 poi rounded-circle bg-dark">            
                </div>
                <h5 className="col-3 ">2005</h5>
                <h6 className="text-dark  col-8">Master degree </h6>
                <div className="col-12 ">                 
                  <h6 className="text-dark pl-1">Cairo University</h6>
                  <p className="text-dark pl-1 fs-6">
                  in Architectural engineering, faculty of Engineering
                  </p>
                </div>
              </div>
{/* ---------------------------------------- */}

<div className="row w-100">
                <div className="col-1 p-2 poi rounded-circle bg-dark">            
                </div>
                <h5 className="col-3 ">2005</h5>
                <h6 className="text-dark  col-8">Master degree </h6>
                <div className="col-12 ">                 
                  <h6 className="text-dark pl-1">Cairo University</h6>
                  <p className="text-dark pl-1 fs-6">
                  in Architectural engineering, faculty of Engineering
                  </p>
                </div>
              </div>
              </div>
             </div>
    </div>
      {/* certifacate------------------------------------------------------------ */}
      <div className="exprien">
      <img className="w-100" src="certi.svg" alt=""/>
      <div className="w-100">
      
        <div className="work-item w-100 p-2 row">
      
          <div className="col-8">
          <h6 className="text-dark">Senior Urban planner and GIS Developer </h6>
          <p className="text-dark">Design and develop GIS desopen source programs.
</p>
          </div>
        </div>
      
        
      </div>
    </div>
            </div>
      
         
        </div>
     );
}
 
export default Cart;

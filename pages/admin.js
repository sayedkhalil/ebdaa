import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import { async } from "@firebase/util";
export const getStaticProps =async()=>{
    const de=[]
    const opnionarr=[]
    const or=[]
    const pro=[]
    const infoRef = doc(db, "info", "info");
    const infoSnap = await getDoc(infoRef)
    const getinfo =  infoSnap.data()?infoSnap.data().info:{}
    const docRef = doc(db, "cover", "cover");
    const docSnap = await getDoc(docRef);
    const getcover =  docSnap.data()?docSnap.data().covers:[]
    const docRefpar = doc(db, "partn", "partn");
    const docSnapar = await getDoc(docRefpar);
    const getpartn =  docSnapar.data()?docSnapar.data().partns:[]
    const codelist = collection(db, 'category');
    const codesnapshot = await getDocs(codelist);
    const catolist = codesnapshot.docs?codesnapshot.docs.map(doc =>{ de.push(doc.data());   }):de
    const prodlist = collection(db, 'broductes');
    const prodsnapshot = await getDocs(prodlist);
    const products =()=> prodsnapshot.docs?prodsnapshot.docs.map(doc =>{ pro.push(doc.data());   }):[]
    const ordlist = collection(db, 'orders'); 
    const ordsnapshot = await getDocs(ordlist);
    const orderget =async()=>await ordsnapshot.docs?ordsnapshot.docs.map(doc =>or.push(doc.data()))   :[]
    const opnion = collection(db, 'opnion');
    const opnionsnap = await getDocs(opnion);
    const getopnion =async()=>await opnionsnap?opnionsnap.docs.map(doc =>{opnionarr.push(doc.data());   }):[];
    products()
    getopnion()  
    orderget()
   
        return{
        props:{getdata:{data:de,products:JSON.stringify(pro),getcov:getcover,getpart:getpartn,getopn:opnionarr,getinfo:getinfo,getorder:or}}
             }
}
const Admin = ({getdata}) => {
      var par=[]
    var cov=[]
    const pro=[]
  const i =1
 const dd=[]
  const {inputRef} = useRef();
  const {inputlogo} = useRef();
  const inputcategory = useRef()
  const [imagesitem, setImagesitem] = useState([]);
  const [progress, setProgress] = useState(0);
  const [logoitem, setlogoitem] = useState([getdata.getinfo.logo?getdata.getinfo.logo:""]);
  const [progresslogo, setProgresslogo] = useState(0);
  const [coveritem, setcoveritem] = useState([]);
  const [progresscover, setProgresscover] = useState(0);
  const [partnitem, setpartnitem] = useState([]);
  const [progressopn, setProgressopn] = useState(0);
  const [opnitem, setopnitem] = useState([]);
  const [progresspartn, setProgresspartn] = useState(0);
  const [product,setproduct]=useState({});
  const [category,setcategory]=useState(getdata.data);
  const [categoryitem,setcategoryitem]=useState();
  const [info,setinfo]=useState(getdata.getinfo?getdata.getinfo:{});
  const [opnion,setopnion]=useState({});
  const [opnions,setopnions]=useState(getdata.getopn); 
  const [partener,setparter]=useState(getdata.getpart);
  const [productes,setproductes]=useState(JSON.parse(getdata.products));
  const [orders,setorders]=useState({});
  const [covers,setcovers]=useState(getdata.getcov);
  var k= getdata.getorder.filter(i=>!i.case)
  const [orderss,setorderss]=useState(getdata.getorder.filter(i=>!i.case))
 
   cov=covers
   par=partener
  const cator= async(x)=>  {const har =[]
   const ordlist = collection(db, 'orders'); 
    const ordsnapshot = await getDocs(ordlist);
    const orderget =()=> ordsnapshot.docs?ordsnapshot.docs.map(doc =>har.push(doc.data()))   :[]
    orderget()
    setorderss(har.filter(i=>i.case==x))  

  }
   const oond= async(x,y)=>{
  const z ={...y,case:"deleted"}
    const docRef = await setDoc(doc(db, "orders", x),z); 
    setorderss(orderss.filter(i=>i.tele!=x))

   }
   const oonh= async(x,y)=>{
    const z ={...y,case:"holding"}
      const docRef = await setDoc(doc(db, "orders", x),z); 
      setorderss(orderss.filter(i=>i.tele!=x))
     }
     const oons= async(x,y)=>{
      const z ={...y,case:"shipping"}
        const docRef = await setDoc(doc(db, "orders", x),z); 
        setorderss(orderss.filter(i=>i.tele!=x))
       }
       const oonf= async(x,y)=>{
        const z ={...y,case:"finishing"}
          const docRef = await setDoc(doc(db, "orders", x),z); 
          setorderss(orderss.filter(i=>i.tele!=x))
         }
                  // -------------------------------------------------------------------------------------------------------procucts----------------
     const delproduct=async(id,name)=>{
        alert(`هل تريد مسح${name}`)
        await deleteDoc(doc(db, "broductes", id))
        setproductes(productes.filter(item => item.code!=id))        
     }
     const delorders=async(id)=>{
      alert(`هل تريد مسح`)
      await deleteDoc(doc(db, "orders", id))
      setorderss(orderss.filter(item => item.tele!=id))        
   }
 
     //  ---------------------------------------------------------------------------------------------------add category----------------
  const oncategory = (e) => setcategoryitem(e.target.value)
  const addcategory=async()=>{
      var inputc = document.querySelectorAll(".catinp")[0]
      if(categoryitem){
    const docRef = await addDoc(collection(db, "category"), {
        name:categoryitem
      }).then(()=>{setcategory([...category,{name:categoryitem}])
      setcategoryitem("")
    });}
      else{
          alert("الحقل فارغ")
      }
    
  }
//   --------------------------------------------------------------------------------------------------add product--------------------
const onprcode = (e) => setproduct({...product,code:e.target.value})
const onprtitle = (e) => setproduct({...product,title:e.target.value})
const onprdes = (e) => setproduct({...product,des:e.target.value})
const onprkey = (e) => setproduct({...product,key:e.target.value})
const onprcat = (e) => setproduct({...product,category:e.target.value})
const onfav = (e) => setproduct({...product,fav:e.target.value})
const onprice = (e) => setproduct({...product,price:e.target.value})
const onoffer = (e) => setproduct({...product,offer:e.target.value})
const onavailable = (e) => setproduct({...product,available:e.target.value})
const onorclient = (e) => setproduct({...product,orclient:e.target.value})
const onwidth = (e) => setproduct({...product,width:e.target.value})
const onheight = (e) => setproduct({...product,height:e.target.value})
const onweight = (e) => setproduct({...product,weight:e.target.value})
const ontag = (e) => setproduct({...product,tag:e.target.value})
const onshipping = (e) => setproduct({...product,shipping:e.target.value})
// ---------------------------------upload image-------------------------------------------

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if(file){
       if(imagesitem.length<4){            
        const storage = getStorage();
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress)
          console.log('Upload is ' + progress + '% done');          
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProgress(0);
        
            setImagesitem([...imagesitem,downloadURL])
            setproduct({...product,imges:imagesitem})
            });
        } 
      );}else{alert("أقصى عدد للصور  4 صور")}}
      };
      const addproduct=async(e)=>{
        e.preventDefault() 
       if(product.imges&&product.category){
       const docRef = await setDoc(doc(db, "broductes", product.code), {
       ...product,date:Timestamp.now(),imges:imagesitem }); 
       setproduct({title:"",code:"",des:"",key:"",imges:"",date:"",price:"",offer:"",width:"",height:"",weight:"",tag:""}) 
       setImagesitem([])
        }else{alert("أكمل باقي الحقول")}     
      }
     //   -------------------------------------------------------------------------------------------------- edit info --------------------      
     const oninfoname = (e) => setinfo({...info,name:e.target.value})
     const oninfoadress = (e) => setinfo({...info,adress:e.target.value})
     const oninfodes = (e) => setinfo({...info,des:e.target.value})
     const oninfokey = (e) => setinfo({...info,key:e.target.value})
     const oninfotele = (e) => setinfo({...info,tele:e.target.value})
     const oninfomob = (e) => setinfo({...info,mob:e.target.value})
     const oninfomob2 = (e) => setinfo({...info,mob2:e.target.value})
     const oninfoemail = (e) => setinfo({...info,email:e.target.value})
     const oninfowhats = (e) => setinfo({...info,whats:e.target.value})
     const oninfoface = (e) => setinfo({...info,face:e.target.value})
     const oninfoabout = (e) => setinfo({...info,about:e.target.value})
     const oninfotwitter = (e) => setinfo({...info,twitter:e.target.value})
     const oninfoinsta = (e) => setinfo({...info,insta:e.target.value})
     const oninfolinked = (e) => setinfo({...info,linked:e.target.value})
     const oninfosnap = (e) => setinfo({...info,snap:e.target.value})
     const uploadlogo = (e) => {
        const filelogo = e.target.files[0];
        if(filelogo){
         if(imagesitem.length<1){
        const filelogo = e.target.files[0];    
        const storage = getStorage();
        const storageRef = ref(storage, filelogo.name);
        const uploadTask = uploadBytesResumable(storageRef, filelogo);

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progresslogo = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgresslogo(progresslogo)
          console.log('Upload is ' + progresslogo + '% done');          
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProgresslogo(0);

            setlogoitem([downloadURL])
            setinfo({...info, logo:downloadURL})
            });
        }
      );}else{alert("أقصى عدد للصور صورة واحدة")}}
      };
      const addinfo=async(e)=>{
        e.preventDefault()
          if(info.logo){
          
        const docRef = await setDoc(doc(db, "info", "info"),{info:info});        
      }else{alert("لابد من تحويل لوجو للصفحة")}
      console.log(info)
    }
       //   -------------------------------------------------------------------------------------------------- edit cover --------------------      
       const uploadcover = (e) => {if(imagesitem.length<4){
        const filecover = e.target.files[0]; 
        if(filecover){  
        const storage = getStorage();
        const storageRef = ref(storage, filecover.name);
        const uploadTask = uploadBytesResumable(storageRef, filecover);

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progresscover = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgresscover(progresscover)
          console.log('Upload is ' + progresscover + '% done');          
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProgresscover(0);

            setcoveritem([...coveritem,downloadURL])
            cov.push(downloadURL)
          
        });
        }
      );}else{alert("أقصى عدد للصور 4 صور")}
        } };
      const addcover=async()=>{
          if(coveritem){
            const docRef = await setDoc(doc(db, "cover", "cover"),{covers:cov}); 
            const docRe = doc(db, "cover", "cover");
            const docSnap = await getDoc(docRe);
            const getcover =  docSnap.data()?docSnap.data().covers:[]
          setcovers(getcover)
          setcoveritem([])}               
      }
       const delcover=async(id)=>{
       if(covers.length>1){
        alert(`هل تريد مسح الصورة`)
        const docRef = await setDoc(doc(db, "cover", "cover"),{covers:covers.filter(item => item!=id)}); 
        const docRe = doc(db, "cover", "cover");
        const docSnap = await getDoc(docRe);
        const getcover =  docSnap.data()?docSnap.data().covers:[]
      setcovers(getcover)    
       }    else{
           alert("لابد من وجودصورة غلاف واحدة على الأقل")
       }      
     }
//  ------------------------------------------------------------------------------------------------------------------------edit partner--------------------------------
const onpartn = (e) => {
    const filepartn = e.target.files[0];
    if(filepartn){
    if(imagesitem.length<4){
    const filepartn = e.target.files[0];    
    const storage = getStorage();
    const storageRef = ref(storage, filepartn.name);
    const uploadTask = uploadBytesResumable(storageRef, filepartn);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progresspartn = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgresspartn(progresspartn)
      console.log('Upload is ' + progresspartn + '% done');          
    }, 
    (error) => {
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProgresspartn(0);

        setpartnitem([...partnitem,downloadURL])
         par.push(downloadURL)
        });
    }
  );}else{alert("أقصى عدد للصور 4 صور")}
  };   }
  const addpartn =async()=>{
      if(partener){
    const docRef = await setDoc(doc(db, "partn", "partn"),{partns:par});  
    const docRefpar = doc(db, "partn", "partn");
    const docSnapar = await getDoc(docRefpar);
    const getpartn =  docSnapar.data()?docSnapar.data().partns:[]
    setparter(getpartn)    
    setpartnitem([])  
  }}

  const delpartn=async(id)=>{
    if(partener.length>4){
     alert(`هل تريد مسح الصورة`)
     const docRef = await setDoc(doc(db, "partn", "partn"),{partns:partener.filter(item => item!=id)}); 
     const docRe = doc(db, "partn", "partn");
     const docSnap = await getDoc(docRe);
     const getpartn =  docSnap.data()?docSnap.data().partns:[]
   setparter(getpartn)    
    }    else{
        alert("لابد من وجودصورة غلاف واحدة على الأقل")
    }      
  }
//   ------------------------------------------------------------------------------------------------------------------------------------add opion------------------
const opntitle = (e) => setopnion({...opnion,name:e.target.value})
const opnmsg = (e) => setopnion({...opnion,msg:e.target.value})
const opnimg  = (e) => {if(imagesitem.length<1){
    const fileopn = e.target.files[0];
    if(fileopn){    
    const storage = getStorage();
    const storageRef = ref(storage, fileopn.name);
    const uploadTask = uploadBytesResumable(storageRef, fileopn);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progressopn = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgressopn(progressopn)
      console.log('Upload is ' + progressopn + '% done');          
    }, 
    (error) => {
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProgressopn(0);

        setopnitem([downloadURL])
        setopnion({...opnion, img:downloadURL})
        });
    }
  );}else{alert("أقصى عدد للصور صورة واحدة")}
  };}
  const addopnion=async(e)=>{
      e.preventDefault()
    const opnionarr=[]
    const docRef = await setDoc(doc(db, "opnion", opnion.name),opnion);
    setopnion({name:"",msg:"",img:""})
    const opniondoc = collection(db, 'opnion');
    const opnionsnap = await getDocs(opniondoc);
    const  getopnion =opnionsnap.docs.map(doc =>doc.data())        
    setopnions(getopnion)
    setopnitem([])
    
  }
  const delopn=async(id)=>{
      if(partener.length<4){
    alert(`هل تريد مسح`)
    await deleteDoc(doc(db, "opnion", id))
    const opniondoc = collection(db, 'opnion');
    const opnionsnap = await getDocs(opniondoc);
    const  getopnion =opnionsnap.docs.map(doc =>doc.data())
    setopnions(getopnion)
     }}
  
     //------------------------------------------------------------------------------------------------------------------   


return ( 
  <AuthRoute>
        <div className="my-5 container">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
<title>مصنع فرسان الإنشاءات  للصناعة</title>
   <link rel="icon" href="wew.png" type="image/x-icon" />
        </Head>
<div className="row w-100">
    <h4 className="col-12 col-lg-3 title ms-auto">لوحة التحكم</h4>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
<ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">طلبات الشراء</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">المنتجات</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">إضافة الأقسام</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contac" type="button" role="tab" aria-controls="contact" aria-selected="false">إضافة منتج</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#conta" type="button" role="tab" aria-controls="contact" aria-selected="false">تعديل معلومات الصفحة</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#cont" type="button" role="tab" aria-controls="contact" aria-selected="false">صور الغلاف</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#con" type="button" role="tab" aria-controls="contact" aria-selected="false">الآراء وشركاء النجاح</button>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
  <div className="col-12 row">
        <button onClick={()=> cator("deleted")} className="btn col-3 btn-danger">deleted</button>
        <button onClick={()=> cator("holding")} className="btn col-3 btn-warning">holding</button>
        <button onClick={()=> cator("shipping")} className="btn col-3 btn-info">shipping</button>
        <button onClick={()=> cator("finishing")} className="btn col-3 btn-success">finshed</button>
        </div>
     {
  orderss.map((item) => (
   <div className=" m-1 p-1 rounded-2 border row" key={item.tele}>
         <h6  className="  col-6 rounded-2 text-end text-dark"> <span className="border rounded-2 bg-danger   text-light" >رقم الطلب:</span> {item.tele}</h6>
         <h6  className="  col-6 rounded-2 text-end text-dark"> <span className="border rounded-2 bg-danger   text-light" >اسم العميل:</span>  {item.name}</h6>
         <h6  className="  col-6 rounded-2 text-end text-dark"> <span className="border rounded-2 bg-danger   text-light" >رقم الموبايل:</span>  {item.tele}</h6>
         <h6  className="  col-6 rounded-2 text-end text-dark"> <span className="border rounded-2 bg-danger   text-light" >العنوان:</span>  {item.adress}</h6>
         <h6  className="  col-6 rounded-2 text-end text-dark"> <span className="border rounded-2 bg-danger   text-light" >برموكود:</span> {item.promo}</h6>
         <h6  className="  col-6 rounded-2 text-end text-dark"> <span className="border rounded-2 bg-danger   text-light" >التاريخ:</span>  {item.data}</h6>
         <h6  className="  col-6 rounded-2 text-end text-dark"> <span className="border rounded-2 bg-danger   text-light" >الايميل:</span> {item.email}</h6>
         <h6  className="  col-6 rounded-2 text-end text-dark"> <span className="border rounded-2 bg-danger   text-light" >السعر:</span> {item.price}</h6>
        <div className="  col-12 row rounded-2 m-auto "> 
        {item.mycart.map((it)=>(<div className="  col-3 rounded-2 row text-end m-1 text-dark p-2 border " key={it.code}>
          <img className="border rounded col-4" src={it.img} width={`100px`} height={`100px`}  alt="" />
          <div  className="col-8 "> 
          <p className="m-0 p-0">{`${it.title}`}</p>
          <p className="m-0 p-0">{`الكود:${it.code}`}</p>
          <p className="m-0 p-0">{`الكمية:${it.count}`}</p>
          <p className="m-0 p-0">{`سعر:${it.price}`}</p>
          </div>
        </div>))}

        </div>
        <div className="col-12 row">
        <button onClick={()=>oond(item.tele,item)} className="btn col-2 m-1 btn-danger">delet</button>
        <button onClick={()=>oonh(item.tele,item)} className="btn col-2 m-1 btn-warning">hold</button>
        <button onClick={()=>oons(item.tele,item)} className="btn col-2 m-1 btn-info">shipping</button>
        <button onClick={()=>oonf(item.tele,item)} className="btn col-2 m-1 btn-success">finshed</button>
        </div>
       </div>

    
            ))} 
      

</div>
  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><table className="table">
  <thead>
    
    <tr>
      <th scope="col">#</th>
      <th scope="col">اسم المنتج</th>
      <th scope="col">القسم</th>
      <th scope="col">السعر</th>
      <th scope="col">العرض</th>
       <th scope="col">تعديل</th>
       <th scope="col">مسح</th>
    </tr>
    
  </thead>
  <tbody>
  {
  productes.map((item) => (
    <tr  key={item.code}>
    <th className="text-info" scope="row">{item.code}</th>
    <td className="text-success">{item.title}</td>
    <td>
    {item.category}
    </td>
    <td>
    {item.price}
    </td>
    <td>
    {item.offer}
    </td>
    <td>
        <button className="btn btn-info">تعديل</button>
    </td>
    <td>
        <button className="btn btn-danger" onClick={(x)=>delproduct(item.code,item.title)}>مسح</button>
    </td>
  </tr>

    
            ))}
   
  </tbody>
</table>
  </div>
  </div>
  <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
   <div className="input-group input-group-lg my-3">
  <span className="input-group-text text-light bg-primary btn catinp" id="inputGroup-sizing-lg" onClick={addcategory}>إضافةقسم</span>
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" ref={inputcategory} onChange={oncategory} value={categoryitem ||""}/>
  
</div>   
  <ul className="list-group"> {
            
            category.map((item) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.name}>
                {item.name}
                <span className="badge bg-primary rounded-pill">14</span>
              </li>
            ))}
</ul>
  </div>
  <div className="tab-pane fade" id="contac" role="tabpanel" aria-labelledby="contact-tab">
   <form onSubmit={addproduct}> 
  <div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={onprcode}value={product.code} required />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">code</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={onprtitle} value={product.title} required />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">اسم المنتج</span>
</div>
<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">رفع صور</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadImage} />
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
          {
            imagesitem.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>
        <select className="mb-3 w-75 ms-auto bg=primary" aria-label="Default select example" value={product.category}  onChange={onprcat} required>
  <option selected>اختار القسم</option>{
  category.map((item) => (
    <option value={item.name}>{item.name}</option>
            ))}
  </select>
  <div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={onprice} value={product.price} required />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">سعر المنتج</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={onoffer} value={product.offer}  />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">نسبة الخصم</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={onwidth} value={product.width} required />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">أبعاد: عرض</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={onheight} value={product.height} required />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">أبعاد: طول</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={onweight} value={product.weight} required />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">أبعاد:وزن</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={onavailable} value={product.available}  />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">العدد</span>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value="yes" id="flexCheckDefault" onChange={onorclient}/>
  <label className="form-check-label" for="flexCheckDefault">
  طلب على حسب العميل
  </label>
</div>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="yes" id="flexCheckDefault" onChange={onfav}/>
  <label className="form-check-label" for="flexCheckDefault">
    تفضيل
  </label>
</div>
<div className="input-group  mb-3 w-75 ms-auto">
  <textarea className="form-control" aria-label="With textarea"onChange={onprdes} required value={product.des}></textarea>
  <span className="input-group-text bg-primary text-light">وصف المنتج</span>
</div>

<div className="input-group  mb-3 w-75 ms-auto">
  <textarea className="form-control" aria-label="With textarea"onChange={onprkey}value={product.key}></textarea>
  <span className="input-group-text bg-primary text-light">الكلمات المفتاحية</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={ontag} value={product.tag} required />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">تاج</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"onChange={onshipping} value={product.shipping} required />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">مصاريف الشحن</span>
</div>
<input type="submit" className="btn btn-success my-3" value="إضافة المنتج"/>
</form>  
  </div>
  <div className="tab-pane fade" id="conta" role="tabpanel" aria-labelledby="contact-tab">
      <form action="" onSubmit={addinfo}>
  <div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfoname} value={info.name} placeholder={info.name?info.name:""} required/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">اسم الصفحة</span>
</div>
<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">رفع الوجو</label>
   <input className="form-control form-control-lg  text-light" id="htmlFormFileLg" type="file" onChange={uploadlogo}/>
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progresslogo}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresslogo}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
          {
            logoitem.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>
  <div className="input-group  mb-3 w-75 ms-auto required">
  <textarea className="form-control" aria-label="With textarea" onChange={oninfodes}  value={info.des} placeholder={info.des?info.des:""} required></textarea>
  <span className="input-group-text bg-primary text-light">وصف الصفحة</span>
</div>
<div className="input-group  mb-3 w-75 ms-auto required">
  <textarea className="form-control" aria-label="With textarea" onChange={oninfokey}  value={info.key} placeholder={info.key?info.key:""}required></textarea>
  <span className="input-group-text bg-primary text-light">الكلمات المفتاحية</span>
</div>
<div className="input-group  mb-3 w-75 ms-auto required">
  <textarea className="form-control" aria-label="With textarea"onChange={oninfoabout}value={info.about}  placeholder={info.about?info.about:""}required></textarea>
  <span className="input-group-text bg-primary text-light">لماذا نحن</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfoadress}value={info.aderss} placeholder={info.aderss?info.aderss:""}required/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">العنوان</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfotele}value={info.tele} placeholder={info.tele?info.tele:""}required/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رقم التليفون</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="tel" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfomob}value={info.mob} placeholder={info.mob?info.mob:""} required/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رقم  الجوال</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="tel" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfowhats}value={info.whats} placeholder={info.whats?info.whats:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رقم  الواتساب</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="tel" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfomob2}value={info.mob2} placeholder={info.mob2?info.mob2:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رقم  الجوال</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfoemail}value={info.email} placeholder={info.email?info.email:""} />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">البريد الإلكتروني</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfoface}value={info.face} placeholder={info.face?info.face:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط فيسبوك</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfotwitter} value={info.twitter} placeholder={info.twitter?info.twitter:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط تويتر</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfoinsta}value={info.insta} placeholder={info.insta?info.insta:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط انستجرام</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfosnap} value={info.snap} placeholder={info.snap?info.snap:""} />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط سناب شات</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfolinked} value={info.linked} placeholder={info.linked?info.linked:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط لينكد إن</span>
</div>
<input type="submit"  className="btn btn-success my-3" onSubmit={addinfo} value="تعديل" />

</form>
  </div>
   <div className="tab-pane fade" id="cont" role="tabpanel" aria-labelledby="contact-tab">
   <div className="row col-12 flex-row-reverse  ">
                        {
           covers.map((cover) => (
                <div className="col-12 col-lg-3 p-4  " key={cover}>
                <img className="w-100" src={cover} alt="" />
                
                <button type="button" className="btn btn-danger"onClick={(x)=>{ delcover(cover)}}>مسح الصورة</button>
            </div>
            ))}            
</div>
<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary"> رفع غلاف الموقع ---يفضل أن يكون الغلاف851 × 315</label>
   <input className="form-control form-control-lg  text-light" id="htmlFormFileLg" type="file" onChange={uploadcover}/>
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progresscover}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresscover}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
          {
            coveritem.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>
        <button type="button" className="btn btn-primary" onClick={addcover}>رفع غلاف الصفحة</button>
   </div>
  <div className="tab-pane fade" id="con" role="tabpanel" aria-labelledby="contact-tab">
  <div  >

                  <div className="row ">
                  {
           partener.map((partn) => (
                <div className="col-12 col-lg-3 p-4  " key={partn}>
                <img className="w-100" src={partn} alt="" />
                
                <button type="button" className="btn btn-danger" onClick={(x)=>{delpartn(partn)}} >مسح الصورة</button>
            </div>
            ))}   
               </div>
               
 <div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">  رفع لوجو</label> 
   <input className="form-control form-control-lg  text-light" id="htmlFormFileLg" type="file" onChange={onpartn}/>
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progresspartn}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresspartn}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
        </div>
        <button type="button" className="btn btn-primary" onClick={addpartn}>رفع لوجو شركاء</button>
   <div className="row my-3 justify-content-md-center gap">
           {
            opnions.map((op) => (
                <div className="col-12 col-lg-3 p-2 border border-success  rounded" key={op.name}>
                <p className="font-weight-bold text-center p-2">{op.msg}</p>
              <div className="row hop">
               <h6  className="col-8 p-2  text-primary">
                 {op.name}
               </h6>
               <Image className="col-3 p-3 rounded-circle"   loader={() => op.img} src={op.img}   width={"100px"}
      height={"100px"}/>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={(x)=>{delopn(op.name)}}>مسح الرأي</button>
               </div>
               
       
            ))}     
                  </div>
     <form action="" onSubmit={addopnion}>            
                  <div className="input-group input-group-lg border-success mb-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required onChange={opntitle} value={opnion.name}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">الاسم</span>
</div>
<div className="input-group  mb-3 w-75 ms-auto">
  <textarea className="form-control" aria-label="With textarea" onChange={opnmsg} required value={opnion.msg}></textarea>
  <span className="input-group-text bg-primary text-light">اكتب رسالتك</span>
</div>
<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">رفع صورة</label>
   <input className="form-control form-control-lg  text-light" id="htmlFormFileLg" type="file" onChange={opnimg} required/>
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progressopn}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progressopn}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
          {
            opnitem.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>
        <input type="submit" className="btn btn-success my-3" value="إضافة الرأي" onSubmit={addopnion} />
        </form> 

 </div>
  </div>
</div>
</div>
</AuthRoute>
     );
}
 
export default Admin;
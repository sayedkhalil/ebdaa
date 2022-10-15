import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import { useRouter } from "next/router";
import { async } from "@firebase/util";
const Add = () => {
       const router = useRouter()
    const[sec1,setsec1]=useState("block")
    const[sec2,setsec2]=useState("none")
    const[sec3,setsec3]=useState("none")
    const[sec4,setsec4]=useState("none")
    const[sec5,setsec5]=useState("none")
    const[btn1,setbtn1]=useState("btn-primary")
    const[btn2,setbtn2]=useState("btn-light")
    const[btn3,setbtn3]=useState("btn-light")
    const[btn4,setbtn4]=useState("btn-light")
    const[btn5,setbtn5]=useState("btn-light")
    const[bgbt1,setbgbt1]=useState("btn-secondary")
    const[bgbt2,setbgbt2]=useState("btn-primary")
    const[current,setcurrent]=useState(1)
    const [skill,setskill]=useState({})
    const [skills,setskills]=useState([])
    const [inputskill,setinputskill]=useState("add skill")
    const[nsp,setnsp]=useState(1)
    const [lang,setlang]=useState({})
    const [langs,setlangs]=useState([])
    const [inputlang,setinputlang]=useState("add language")
    const[lnp,setlnp]=useState(1)
    const [edue,setedue]=useState({})
    const [edues,setedues]=useState([])
    const [btnedue,setbtnedue]=useState("add item")
    const[countedue,setcountedue]=useState(1)
    const [work,setwork]=useState({})
    const [works,setworks]=useState([])
    const [btnwork,setbtnwork]=useState("add item")
    const[countwork,setcountwork]=useState(1)
    const [cer,setcer]=useState({})
    const [cers,setcers]=useState([]);
    const [btncer,setbtncer]=useState("add item")
    const[countcer,setcountcer]=useState(1)
     const [imagesitem, setImagesitem] = useState([]);
    const [cv,setcv]=useState({})
    const [logoitem, setlogoitem] = useState([""]);
    const [progresslogo, setProgresslogo] = useState(0);
    
    const onblock=()=>{
        switch (current) {
            case 1:
                setsec5("none")
                setsec4("none")
                setsec3("none")
                setsec2("none")
                setsec1("block")            
                break;
             case 2:
                    setsec5("none")
                    setsec4("none")
                    setsec3("none")
                    setsec1("none")
                    setsec2("block")            
                    break;
             case 3:
                        setsec5("none")
                        setsec4("none")
                        setsec2("none")
                        setsec1("none")
                        setsec3("block")            
                        break;
             case 4:
                        setsec5("none")
                        setsec3("none")
                        setsec2("none")
                        setsec1("none")
                        setsec4("block")            
                        break;
              case 5:
                            setsec4("none")
                            setsec3("none")
                            setsec2("none")
                            setsec1("none")
                            setsec5("block")            
                            break;}
    }
    const onbtn=()=>{
       switch (current) {
           case 1:
               setbtn5("btn-light")
               setbtn4("btn-light")
               setbtn3("btn-light")
               setbtn2("btn-light")
               setbtn1("btn-primary")            
               break;
            case 2:
                   setbtn5("btn-light")
                   setbtn4("btn-light")
                   setbtn3("btn-light")
                   setbtn1("btn-light")
                   setbtn2("btn-primary")            
                   break;
            case 3:
                       setbtn5("btn-light")
                       setbtn4("btn-light")
                       setbtn2("btn-light")
                       setbtn1("btn-light")
                       setbtn3("btn-primary")            
                       break;
            case 4:
                       setbtn5("btn-light")
                       setbtn3("btn-light")
                       setbtn2("btn-light")
                       setbtn1("btn-light")
                       setbtn4("btn-primary")            
                       break;
             case 5:
                           setbtn4("btn-light")
                           setbtn3("btn-light")
                           setbtn2("btn-light")
                           setbtn1("btn-light")
                           setbtn5("btn-primary")            
                           break;}
   }
   const onpress=()=>{
       switch (current) {
              case 2:
                 alert(`name:${cv.name}........
                 title jop:${cv.title}........
                 birth date:${cv.birth}........
                 summary:${cv.summary}........`
                 ) 
                  break;
               case 3:
                     alert(`${cv.skills.map(x=>`skill:${x.name}......
                     range:${x.range}......`)}`
                     )          
                      break;
               case 4:
                     alert(`${cv.edues.map(x=>`deg:${x.deg}......
                     uni:${x.uni}......`)}`
                     )     
                          break;
               case 5:
                     alert(`${cv.works.map(x=>`comp:${x.comp}......
                     jop:${x.jo}......`)}`
                     )        
                          break;}
            
   }
    const ondisable=()=>{
        if(current>1){
            setbgbt1("btn-primary")
        }else{
            setbgbt1("btn-secondary") 
        }
        if(current> 4){
            setbgbt2("btn-secondary")
        }else{
            setbgbt2("btn-primary") 
        }
    }
//     upload image 5454................................................................................
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
        
       }, 
       (error) => {
       }, 
       () => {
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           setProgresslogo(0);

           setlogoitem([downloadURL])
           setcv({...cv, pic:downloadURL})
           });
       }
     );}else{alert("أقصى عدد للصور صورة واحدة")}}
     };
   
    // add information--------------------------------------------------------------
    const onname = (e) => setcv({...cv,name:e.target.value})
    const ontitle = (e) => setcv({...cv,title:e.target.value})
    const onbirth = (e) => setcv({...cv,birth:e.target.value})
    const onsummary = (e) => setcv({...cv,summary:e.target.value})
    const onmail = (e) => setcv({...cv,email:e.target.value})
     // add skill--------------------------------------------------------------
     const onskill = (e) => setskill({...skill,name:e.target.value})
     const onrange = (e) => { setskill({...skill,range:e.target.value});  }
     const onaddskill= (e) => {
         e.preventDefault()
        if(nsp!=7){
              nsp++
              setnsp(nsp)
              skills.push(skill)
             setskills(skills);
          setcv({...cv,skills:skills})
          setskill({name:"",range:""})
          setinputskill("Add another skill")
        } else{
              setinputskill("You have entered the maximum number of skills")    
        }
      }
     const onlang = (e) => setlang({name:e.target.value})
     const onrangelang = (e) => { setlang({...lang,range:e.target.value});     }
     const addlang= (e) =>{
         e.preventDefault()
         if(lnp!=3){
              lnp++
              setlnp(lnp)
         langs.push(lang)
        setlangs(langs);
        setcv({...cv,langs:langs})
        setlang({name:"",range:""})
          setinputlang("Add another language")
        } else{
              setinputlang("You have entered the maximum number of languages")    
        }
     }
    // add edue--------------------------------------------------------------
    const ondeg = (e) => setedue({...edue,deg:e.target.value})
    const onuni = (e) => setedue({...edue,uni:e.target.value})
    const ondateedu = (e) => setedue({...edue,date:e.target.value})
     const oneduesummary = (e) => { setedue({...edue,summary:e.target.value});
    }
     const onaddedue=(e)=>{
         e.preventDefault()
         if(countedue!=4){
              countedue++
              setcountedue(countedue)
         edues.push(edue)
        setedues(edues);
        setcv({...cv,edues:edues})
        setedue({deg:"",uni:"",date:"",summary:""})
        setbtnedue("Add another item")
      } else{
            setbtnedue("You have entered the maximum number of items")    
      }
            }
     
     // add work--------------------------------------------------------------
    const oncomp = (e) => setwork({...work,comp:e.target.value})
    const onjo = (e) => setwork({...work,jo:e.target.value})
    const onto = (e) => setwork({...work,to:e.target.value})
    const onfrom = (e) => setwork({...work,from:e.target.value})
    const onworksummary =(e)=>setwork({...work,summary:e.target.value});
     const onaddwork = (e) => { 
         e.preventDefault()
         if(countwork!=5){
              countwork++
              setcountwork(countwork)
         works.push(work)
     setworks(works);
        setcv({...cv,works:works})
        setwork({comp:"",to:"",from:"",summary:"",jo:""})
        setbtnwork("Add another item")
      } else{
            setbtnwork("You have entered the maximum number of items")    
      }
           }
      // add certifficate--------------------------------------------------------------
    const oncert = (e) => setcer({...cer,deg:e.target.value})
    const ondatecer = (e) => setcer({...cer,date:e.target.value})
    const oncersummary =(e)=>setcer({...cer,summary:e.target.value});
    const onaddcer = (e) => { 
         e.preventDefault()
         if(countcer!=4){
              countcer++
              setcountcer(countcer)
         cers.push(cer)
     setcers(cers);
     setcv({...cv,cers:cers})
     setcer({deg:"",date:"",summary:""}) 
        setbtncer("Add another item")
      } else{
            setbtncer("You have entered the maximum number of items")    
      }
}
     //      add cv-------------------------------------------------------------
const addcv=async(e)=>{
       e.preventDefault()      
       const docRef = await setDoc(doc(db, "cv", cv.name.replaceAll(/\s/g, '')),{...cv,code: cv.name.replaceAll(/\s/g, '')});  
       router.push(`../cv/${ cv.name.replaceAll(/\s/g, '')}`)      
        }
        return ( 
        <div className="my-5 container">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'></link>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous"></script>
<title>Add CV</title>
   <link rel="icon" href="logo-01.png" type="image/x-icon" />
        </Head>
       <div className="nav-add ">
       <button type="button " className={`btn  mat ${btn1}`} onClick={()=>{
        setcurrent(1)
        onblock()  
        ondisable()
        onbtn()
       }}>PERSONAL INFORMATION</button>
       <button type="button" className={`btn  mat ${btn2}`}onClick={()=>{
              if(cv.name&&cv.title&&cv.summary&&cv.birth&&cv.email){
        setcurrent(2)
        onblock()  
        ondisable()
       onbtn()}else{alert("Enter personal information")}
       }}>SKILLS</button>
       <button type="button" className={`btn  mat ${btn3}`}onClick={()=>{
       if(cv.skills&&cv.langs){
        setcurrent(3)
        onblock()  
        ondisable()
       onbtn()}else{alert("Enter your skills")}
       }}>EDUCATION</button>
       <button type="button" className={`btn  mat ${btn4}`}
       onClick={()=>{
       if(cv.edues){
        setcurrent(4)
        onblock()  
        ondisable()
       onbtn()}else{alert("Enter your education")}
       }}>WORK EXPERIENCE</button>
       <button type="button" className={`btn  mat ${btn5}`}
       onClick={()=>{
       if(cv.works){
        setcurrent(5)
        onblock()  
        ondisable()
       onbtn()}else{alert("Enter your experiences")}
       }}>CERTIFICATES</button>     
       </div>
       {/* container------------------------------------------------------------- */}
       <div className="add-container">
        {/* PERSONAL INFORMATION--------------------------------------------------- */}
         <div className="ifo-p dnon" style={{ display:sec1}}>
            <h3 className="c-orange m-3">
            PERSONAL INFORMATION
            </h3>
            {/* name--------------------------------------- */}
            <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">name</span>
          </div>
          <input type="text" className="form-control" onChange={onname}/>
           </div>
           {/* jop------------------------------------------ */}
           <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">jop title</span>
          </div>
          <input type="text" className="form-control" onChange={ontitle}/>
           </div>
           {/* pic */}
           <div className=" mb-3 w-100 mt-3 ms-auto required">
<label htmlFor="htmlFormFileLg " className="form-label h3 c-orange text-right"> upload profile picture</label>
   <input className="form-control form-control-lg c-orange text-light" id="htmlFormFileLg" type="file" onChange={uploadlogo}/>
   </div>
   <div className="progress mb-3 w-100">
  <div className="progress-bar" role="progressbar" style={{width:` ${progresslogo}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresslogo}</div>
</div>
        <div className="photo-grid  mb-3 w-100 ms-auto">
          {
            logoitem.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>
           {/* contact */}
           
           {/* ................................. */}
           <div className="input-group mt-3">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">email</span>
          </div>
          <input type="email" className="form-control" onChange={onmail}/>
           </div>
         
           {/* --------------------------------- */}
           <div className="input-group mt-3">
  <        div className="input-group-prepend">
           <span className="input-group-text c-orange" id="">Date of Birth</span>
          </div>
          <input type="date" className="form-control" onChange={onbirth}/>
           </div>
           {/* --------------------------------- */}
           <div className="input-group mt-3">
  <        div className="input-group-prepend">
           <span className="input-group-text c-orange" id="">porfessional summary</span>
          </div>
          <textarea rows="" className="form-control" cols=""maxLength={200} onChange={onsummary} ></textarea>
           </div>
        </div>
         {/* skills---------------------------------------------------------------- */}
         <div className="skills dnon"style={{ display:sec2}}>
         <h3 className="c-orange m-3">
            SKILLS
            </h3>
     <span className="text-danger">Maximum 6 skills</span>
           <form className=" border border-warning mt-3 p-2" onSubmit={onaddskill}>
           <div className="input-group mt-3">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">skill</span>
          </div>
          
          <input type="text"onChange={onskill} className="form-control" required value={skill.name}/>
           </div>
          <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">skill level</span>
          </div>          
          <input type="range"onChange={onrange} className="form-control" required value={skill.range}/>
           </div>
           <input className="input-group-text c-orange w-100 tc mt-2 "onSubmit={onaddskill} type="submit" name="" value={inputskill}/>
            </form>
         
           
         
                     
           <h3 className="c-orange m-3">
           Language Skills
            </h3>
            <span className="text-danger">Maximum 2 language</span>
            <form className=" border border-warning mt-3 p-2"onSubmit={addlang}>
            <div className="input-group mt-3">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">language</span>
          </div>
          
          <input type="text"onChange={onlang} value={lang.name} required className="form-control"/>
           </div>
          <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">language level</span>
          </div>          
          <input type="range"onChange={onrangelang} value={lang.range} required className="form-control"/>
           </div>
           <input className="input-group-text c-orange w-100 tc mt-2 " onSubmit={addlang} type="submit" name="" value={inputlang}/>
            </form>
  
           
        </div>
         {/* education---------------------------------------------------------------- */}
        <div className="edu-add dnon"style={{ display:sec3}}>
            <h3 className="c-orange m-3">
            EDUCATION
            </h3>
            <span className="text-danger">Maximum 3 Study certificates</span>
           <form className=" border border-warning mt-3 p-2"onSubmit={onaddedue}>
             {/* degree--------------------------------------- */}
             <div className="input-group mt-3">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">degree name</span>
          </div>
          <input type="text"onChange={ondeg}required value={edue.deg} className="form-control"/>
           </div>
           <div className="">
             {/* University--------------------------------------- */}
             <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id=""  >University</span>
          </div>
          <input type="text" onChange={onuni} value={edue.uni}   required className="form-control"/>
           </div>
           {/* date--------------------------------------- */}
           <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">date</span>
          </div>
          <input type="date" onChange={ondateedu} className="form-control" value={edue.date} required/>
           </div>
             {/* summary--------------------------------------- */}
             <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">summary</span>
          </div>
          <textarea rows="" cols=""  className="form-control" maxLength={60} value={edue.summary} onChange={oneduesummary}  required></textarea>
           </div>
           </div>
           <input className="input-group-text c-orange w-100 tc mt-2 " onSubmit={onaddedue} type="submit" name="" value={btnedue}/>
            </form>
                     
        </div>
        {/* work---------------------------------------------------------------- */}
        <div className="work-add dnon"style={{ display:sec4}}>
            <h3 className="c-orange m-3">
            WORK EXPERIENCE            </h3>
            <span className="text-danger">Maximum 4 professional experiences</span>
            {/* company--------------------------------------- */}
     <form className=" border border-warning mt-3 p-2" onSubmit={onaddwork}>
     <div className="input-group mt-3">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">company</span>
          </div>
          <input type="text" className="form-control" onChange={oncomp} value={work.comp} required/>
           </div>
           <div className="">
             {/* jop title--------------------------------------- */}
              <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">jop title</span>
          </div>
          <input type="text" className="form-control" value={work.jo} onChange={onjo}/>
           </div>
           
           {/* date--------------------------------------- */}
           <h6 className="text-dark mt-3">Joining Date</h6>
           <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">from</span>
          </div>
          <input type="date" className="form-control" onChange={onfrom} value={work.from} required/>
           </div>
           <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">to</span>
          </div>
          <input type="date" className="form-control" value={work.to} onChange={onto}required/>
           </div>
             {/* summary--------------------------------------- */}
             <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">summary</span>
          </div>
          <textarea rows="" cols=""  className="form-control" maxLength={140} value={work.summary} onChange={onworksummary}required></textarea>
           </div>
           </div>
           <input className="input-group-text c-orange w-100 tc mt-2 " onSubmit={onaddwork} type="submit" name="" value={btnwork}/>
     </form>   
           
        </div>
        {/* CERTIFICATES---------------------------------------------------------------- */}
        <div className="work-add dnon"style={{ display:sec5}}>
            <h3 className="c-orange m-3">
            CERTIFICATES          </h3>
            <span className="text-danger">Maximum 3 items</span>
            {/* certificate--------------------------------------- */}
            <form className=" border border-warning mt-3 p-2"onSubmit={onaddcer}>
                
           <div className="input-group mt-3">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">certificate name </span>
          </div>
          <input type="text" className="form-control" value={cer.deg} onChange={oncert}required/>
           </div>
           <div className="">
       
           {/* date--------------------------------------- */}
          
           <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">date</span>
          </div>
          <input type="date"onChange={ondatecer}required value={cer.date}  className="form-control"/>
           </div>

             {/* summary--------------------------------------- */}
             <div className="input-group mt-1">
  <        div className="input-group-prepend">
         <span className="input-group-text c-orange" id="">summary</span>
          </div>
          <textarea rows="" cols=""  className="form-control"onChange={oncersummary} value={cer.summary} maxLength={60} required></textarea>
           </div>
           </div>
           <input className="input-group-text c-orange w-100 tc mt-2 " onSubmit={onaddcer} type="submit" name="" value={btncer}/>
           </form>
           
           <button className="btn btn-success w-100 text-center mt-4" onClick={addcv} type=""> create cv</button>
        </div>
        
       </div>
       <div className="btn-group w-100 mt-4" role="group" aria-label="Basic example">
  <button type="button" className={`${bgbt1} btn mx-5`}onClick={(e)=>{
   if(current>0){
       current-1
    setcurrent(current)
    onblock()  
    ondisable()
    onbtn()
       }
     }}  >Previous</button>

  <button type="button" className={`${bgbt2} btn mx-5`}
   onClick={(e)=>{
       switch (current) {
              case 1:if(cv.name&&cv.email&&cv.birth&&cv.title&&cv.summary)
              {
                     current++
                     setcurrent(current)
                     onblock()
                     ondisable()
                     onbtn()  
                     onpress()
                     console.log(current) 
              }else{
                     alert("Complete the remaining fields")
              }

              break;     
              case 2:if(cv.skills&&cv.langs)
              {
                     current++
                     setcurrent(current)
                     onblock()
                     ondisable()
                     onbtn()  
                     onpress() 
              }else{
                     alert("Complete the remaining fields")
              }                  
                     
               break;
                     case 3:if(cv.edues)
              {
                     current++
                     setcurrent(current)
                     onblock()
                     ondisable()
                     onbtn() 
                     onpress()  
              }else{
                     alert("Complete the remaining fields")
              }                  
                     
               break;
               case 4:if(cv.works)
               {
                     current++
                      setcurrent(current)
                      onblock()
                      ondisable()
                      onbtn()  
                      onpress() 
               }else{
                      alert("Complete the remaining fields")
               }                  
                      
                break;
            
       }
  
    }} >Next</button>
</div>

        </div>
     );
}
 
export default Add;
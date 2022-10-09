import Head from "next/head";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export const getStaticProps =async()=>{
    const de=[]
const codelist = collection(db, 'category');
const codesnapshot = await getDocs(codelist);
const catolist = codesnapshot.docs?codesnapshot.docs.map(doc =>{ de.push(doc.data());   }):de
return{
    props:{getdata:{data:de}}
         }
}
const Adminprodact = ({getdata}) => {
const {inputRef} = useRef();
const [imagesitem, setImagesitem] = useState([]);
const [progress, setProgress] = useState(0);
const [category,setcategory]=useState(getdata.data);
const [product,setproduct]=useState({});
const onprcode = (e) => setproduct({...product,code:e.target.value})
const onprtitle = (e) => setproduct({...product,title:e.target.value})
const onprdes = (e) => setproduct({...product,des:e.target.value})
const onprkey = (e) => setproduct({...product,key:e.target.value})
const onprcat = (e) => setproduct({...product,category:e.target.value})
const onfav = (e) => setproduct({...product,fav:e.target.value})
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
       ...product,date:Timestamp.now() }); 
       setproduct({title:"",code:"",des:"",key:"",imges:"",date:""}) 
        }else{alert("أكمل باقي الحقول")}     
      }
    return (  
        <div className="container">
         <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
<title>مصنع فرسان الإنشاءات  للصناعة</title>
   <link rel="icon" href="wew.png" type="image/x-icon" />
        </Head>
<div className="row w-100">
    <h4 className="col-12 col-lg-3 title mt-3+ ms-auto">تعديل المنتج</h4>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
    </script>
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
      <input type="submit" className="btn btn-success my-3" value="إضافة المنتج"/>
      </form>  
      </div>
      </div>
    );
}
 
export default Adminprodact;
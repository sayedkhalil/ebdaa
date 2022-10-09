import Head from "next/head";
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , getDoc, query, where} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useLayoutEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAppContext } from "../AppContext";
import ProdItem from "../layout/proditem";

const Productess = ({item}) => {
    var arr=[]
    var categ=JSON.parse(item)

    const router = useRouter()
    const [appState, setAppState] = useAppContext()
    const[prod,setprod]=useState([])
    const [categi,setcategi]=useState([])
    const[order,setorder]=useState(1)
    const handelrouter=(e,path)=>{
        e.preventDefault() 
        router.push(`../product/${path}`)
    }
    let count=categ.length
    let pages= count>16?count/16:1
  let floor=  Math.ceil(pages)
  useEffect(()=>{
      arr=[]
      const sub=()=>{ for (let index = 0; index < floor; index++) {
        arr.push(index+1)}
        setcategi(arr)     
     }
     return sub(categ)
  },[])
 useLayoutEffect(()=>{
      const sube=()=>{
        switch(order) {
            case 1:
              setprod(categ.slice(0,16))
              break;
            case 2:
                setprod(categ.slice(17,32))
              break;
              case 3:
                setprod(categ.slice(33,48))
              break;
              case 4:
                setprod(categ.slice(49,64))
              break;
              case 5:
                setprod(categ.slice(65,80))
              break;
              case 6:
                setprod(categ.slice(81,96))
              break;
            default:
                setprod(categ.slice(0,17))
          }
      }
      return sube()
 },[order])

 

 

       const oncart =async()=> {
        const myArrayFromLocalStorage = localStorage.getItem('mycart')
        if (myArrayFromLocalStorage && myArrayFromLocalStorage.length) {
        var myArray = JSON.parse(myArrayFromLocalStorage)}else{var myArray=[]  }
             myArray.push({"code":x,"title":y,"img":z})
            localStorage.setItem("mycart", JSON.stringify(myArray))
            setAppState(myArray)
            myArray=[]
            }  
    return ( 
        <div className="container">
        <div className="mt-5">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
   <title>مصنع فرسان الإنشاءات  للصناعة</title>
   <link rel="icon" href="wew.png" type="image/x-icon" />
        </Head>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
<div className="row col-12 flex-row-reverse  ">
{
        prod.map((item)=>(
          < ProdItem item={{img:item.imges[0],
            title:item.title,
            price:item.price,
            code:item.code
            }} key={item.code}
            />
            ))
    }           
</div>
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><a className="page-link pointer1" onClick={()=>{floor>1&&order>1?setorder(order-1):order}}>Previous</a></li>
  {
   categi.map((i)=><li  className="page-item pointer1" key={i} ><a className="page-link" onClick={()=>setorder(i)} >{i}</a></li>)

  }
  
    <li className="page-item"><a className="page-link pointer1" onClick={()=>{floor>1&&order<floor?setorder(order+1):order}}>Next</a></li>
  </ul>
</nav>
</div>
</div>
     );
}
 
export default Productess;
export async function getStaticPaths() {
    const de=[]
    const codelist = collection(db, 'category');
    const codesnapshot = await getDocs(codelist);
     codesnapshot.docs?codesnapshot.docs.map(doc =>{ de.push(doc.data());   }):de
        const paths =de.map((item)=>{
       return{ 
           params:{id:item.name}
       }
    })
  
    return{
        paths,fallback:false
    }
  }
  export async function getStaticProps(context) {
const id        =context.params.id
const pro=[]
const prodlist = collection(db, 'broductes');
const q = query(prodlist, where("category", "==",id));
const prodsnapshot= await getDocs(q);
 prodsnapshot?prodsnapshot.forEach(doc =>{ pro.push(doc.data())  }):pro
       return {
      props: {item:JSON.stringify(pro)}
    }
  }
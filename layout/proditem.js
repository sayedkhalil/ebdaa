import Head from "next/head";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useAppContext } from "../AppContext";
import { useRouter } from "next/router";
const ProdItem = (props) => {
      const [appState, setAppState] = useAppContext()
    const router = useRouter()
    const[imgc,setimgc]=useState("")
    const [cc,setcc]=useState("oncart")
    const handelrouter=(path)=>{
             router.push(`product/${path}`)
    }
          useEffect(()=>{
          const myArrayFromLocalStorage = localStorage.getItem('mycart')
         if (myArrayFromLocalStorage && myArrayFromLocalStorage.length) {
         var myArray = JSON.parse(myArrayFromLocalStorage)}else{var myArray=[]  }
         setAppState(myArray)    
         return myArrayFromLocalStorage
         },[])
         const oncart =async(x,y,z,ii)=> {
             let totalprice=y
             let count=1
             const myArrayFromLocalStorage = localStorage.getItem('mycart')
             if (myArrayFromLocalStorage && myArrayFromLocalStorage.length) {
             var myArray = JSON.parse(myArrayFromLocalStorage)}else{var myArray=[]  }
             if(myArray.find(it=>it.code==x)){var i = myArray.find(z=>z.code==x  )
             i.count=parseInt(i.count)+1
             count=count+1
             i.totalprice=parseInt(i.totalprice)+ parseInt(y)
             localStorage.setItem("mycart", JSON.stringify(myArray))
             console.log("yes")
             }else{
                 console.log("no")
                  myArray.push({"code":x,"title":z,"img":ii,"count":count,"price":y ,"totalprice":totalprice})
                 localStorage.setItem("mycart", JSON.stringify(myArray))
                 setAppState(myArray)
                 myArray=[]
                 } 
                  setimgc(ii)
                setcc("oncart2")
              setTimeout(() => {
                setimgc("")
               setcc("oncart")
              }, 1000); }
    return (
        <div  className="p-2 col-6 col-lg-3 rel ">
    <div className="border border-secondary rounded-3 position-relative p-0 pb-4  mb-2 mt-5 w-100 shadow">
    <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
    </Head>
    
    <Image
      onClick={()=>handelrouter(props.item.code)}
      className='rounded-3 pointer1 '
      loader={() => `${props.item.img}?w=500px`}
      src={props.item.img}
      alt={props.item.title}
      width={600}
      height={600}
    />
     <img    
      className={`rounded-3 ${cc}`}   
      src={imgc}    
    />
     <h4 className="text-center text-danger">
   {props.item.title}
    </h4>
    <h5  className="text-center text-dark p-2"> 
           {` ${"جنيها"}${props.item.price}`}    
    </h5>
    <span className="rounded-pill border border-secondary p-3 bg-light cart pointer1" /*onClick={()=>oncart(item.code,item.title,item.imges)}*/ >
    <i onClick={()=>oncart(props.item.code,props.item.price,props.item.title,props.item.img)} className="fa fa-shopping-bag  fa-2x" aria-hidden="true"></i>
    </span>
</div>
</div>
      );
}
 
export default ProdItem;
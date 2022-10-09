import Head from "next/head";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image'
const Opnion = (props) => {
    return (  
        <div className="mt-5">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

        </Head>
        <div className="row w-100">
    <h4 className="col-12 col-lg-3 title ms-auto"> آراء العملاء</h4>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>

<div className="row my-3 justify-content-md-center gap">
           {
            props.data.map((op) => (
                <div className="col-12 col-lg-3 p-2 border border-success  rounded" key={op.name}>
                <p className="font-weight-bold text-center p-2">{op.msg}</p>
              <div className="row hop">
               <h6  className="col-8 p-2 text-end text-primary">
                 {op.name}
               </h6>
               <Image className="col-2 p-1 rounded-circle" unoptimized="false"  loader={() => op.img} src={op.img}   width={"60px"}
      height={"60px"}/>
                    </div>
                   
               </div>
               
       
            ))}     
                  </div>
               
</div>
    );
}
 
export default Opnion;
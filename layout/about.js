import Head from "next/head";
import ProdItem from "./proditem";

const About = (props) => {
  
    return (  
        <div className="mt-5 ">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

        </Head>
        <div className="row w-100">
<ProdItem 

item={{img:"b06.jpg",title:"صندوق هدايا",price:30}}
/>
<ProdItem 

item={{img:"b06.jpg",title:"علبة مكياج",price:50}}
/>
<ProdItem 

item={{img:"b06.jpg",title:"طارة خطوبة",price:20}}
/>
<ProdItem 

item={{img:"b06.jpg",title:"ميداية",price:10}}
/>

</div>
</div>
    );
}
 
export default About;
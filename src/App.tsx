import { useEffect, useState } from 'react'
import './App.css'

interface datah {
  origin:string,
  life_span:string,
  weight: {
    metric: string;
    imperial: string;
  };

}

function App() {

  const [ban, setBan] = useState<datah>({
    origin:"",
    life_span:"",
    weight: {metric: "",
            imperial: ""}
  })
  
  const [currData, setCurrData] = useState<any>({
    image:"",
    origin:"",
    life_span:"",
    weight:""
  })

  const getCat = async () => {
    const url = "https://api.thecatapi.com/v1/images/search/";
    const apiKey = import.meta.env.VITE_API_KEY
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey
      }
    });

    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data
  }

  const fetchCatImageWithBreed = async () => {
    
    const data = await getCat()
    console.log("data", {data})

    if (data && data.length > 0) {
      const imageInfo = data[0];

      if (imageInfo.breeds && imageInfo.breeds.length > 0) {
        const breedInfo = imageInfo.breeds[0];
        console.log("Breed Information:", breedInfo);
        setCurrData({
          image: imageInfo.url,
          origin: breedInfo.origin || "",
          life_span: breedInfo.life_span || "",
          weight: breedInfo.weight.metric || "",
        });
      } else {
        console.log("No breed information available for this image.");
        setCurrData({
          image: imageInfo.url,
          origin: "",
          life_span: "",
          weight: "",
        });
      }
    } else {
      console.log("No image data found.");
    }
  };

  
  useEffect(() => {
    const fetchdata = async () => {
      await fetchCatImageWithBreed()
    }

    fetchdata()
  }, [])


  return (
    <>
      <div>
       <img className = " w-72 h-72 m-auto" src={currData["image"]} alt="" />
       <div className=' flex flex-row justify-center'>
        {currData.origin?(<button>Origin: {currData.origin}</button>):null}
        {currData.life_span?(<button>Lifespan: {currData.life_span} years</button>):null}
        {currData.weight?(<button>Weight: {currData.weight} pounds</button>):null}
       </div>
       <button onClick = {() => {fetchCatImageWithBreed()}}>Next Cat</button>
      </div>
    </>
  )
}

export default App

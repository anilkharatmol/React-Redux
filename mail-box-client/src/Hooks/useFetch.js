import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
   const i= setInterval(async()=>{
       
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.error);
    }
    setData(data);
  } catch (error) {
    alert(error);
  }
    },2000)
    return()=>   clearInterval(i);
  }, [url]);

  return [data];
};

export default useFetch;
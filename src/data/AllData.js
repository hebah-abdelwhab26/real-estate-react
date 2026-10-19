 import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
 const apivalue = createContext();

 function AllData({children}) {
    const [api, setApi] = useState([]);
    useEffect(()=>{
axios.get('/assets/js/Api.json')
.then((result)=>{
    setApi(result.data.products)
})
    },[])
   return (
     <apivalue.Provider value={api}>
        {children}
     </apivalue.Provider>
   )
 }
 
 export {AllData,apivalue} ;
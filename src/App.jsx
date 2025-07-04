import { useState } from "react";

function App(){
   
  const [count,setCount]=useState(1000);//[1000,f]

  function handleClick(){
    setCount(count+1000);//2000
    console.log(count);    //2000
  }

  return (
     <>
      <h1>dsa</h1>
      <h1>{count}</h1>

      <button onClick={handleClick}> increase a</button>
     </>
  )
}

export default App;
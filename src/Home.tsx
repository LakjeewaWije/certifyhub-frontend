import { useEffect } from "react";

const Home = () => {

  useEffect(()=>{
    //fetch all certificates per user
    
  },[]);
    return <div>
      <div id="header">
          <button>Add New Certificate</button>
      </div>
      <div id="content">
            <h1>category</h1>
            <h2>Name of Certificate</h2>
            <p>Description</p>
            <a>File</a>
      </div>
    </div>;
  };
  
  export default Home;
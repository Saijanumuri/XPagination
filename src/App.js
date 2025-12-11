import React, { use, useEffect, useState } from 'react';
import axios from "axios";


function App() {

const [fulldaata, setFulldata] = useState([]);
  const [data, setData] = useState([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(10);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response) => {
        setFulldata(response.data);
      })
      .catch((error) => {
        window.alert("failed to fetch data");
        console.error(error);
      });
  }, []);
  useEffect(()=>{
    setData(fulldaata.slice(left,right))
  },[fulldaata,left,right])
 
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
      <h1>Employee Data Table</h1>
      <table style={{width:"90%",borderCollapse:"collapse",textAlign:"center"}}>
        <thead style={{backgroundColor:"lightgreen",height:"40px"}}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={{height:"30px",border:"1px solid black"}}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:"20px",display:"flex",gap:"10px",alignItems:"center"}}>
      <button onClick={()=>{
        if(left<=0) return;
        setLeft(left-10);
        setRight(right-10);
        page>1 && setPage(page-1);
      }}
      style={{backgroundColor:"lightgreen",border:"none",borderRadius:"3px",}}>Previous</button>
      <span>{page}</span>
      <button onClick={()=>{
        if(left+10>=fulldaata.length) return;
        setLeft(left+10);
        setRight(right+10);
        setPage(page+1);
        
      }}
      style={{backgroundColor:"lightgreen",border:"none",borderRadius:"3px",}}>Next</button>
      </div>


    </div>
  );
}

export default App;

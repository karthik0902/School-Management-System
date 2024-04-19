import axios from 'axios'
import {useState,useEffect} from 'react'
import classes from "./crud.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import {getAllSchools} from "../../api"
import TextField from '@mui/material/TextField';
import Schoolcard from '../Schoolcard/Schoolcard';
import Sort from '../sort/sort';
import UserContext from '../UserContext/UserContext'
import { useContext } from 'react';
import Filter from "../filter/Filter";


import 'reactjs-popup/dist/index.css';







function Crud() {
    const [name,School_name]=useState()
    const [Schoolname,setname]=useState()
    
    const [loading1,setloading1]=useState(true)
    const { data1,setData1} = useContext(UserContext);

    const [data,setData]=useState(null)
    const [fee,School_fees]=useState()
    const [basic,basic_details]=useState()
    const [loading,setloading]=useState(false)

    let [file, setFile] = useState(null);




        const Post =  () => {
            const formData = new FormData();
      formData.append("School_name",name);
      formData.append("School_fees",fee);
      formData.append("basic_details",basic);
      formData.append("image", file);

            axios.post('http://localhost:3003/',formData)
            .then(response => {

                console.log('Product added successfully:', response.data);
            }).catch(error => {
                console.error('Error adding product:', error); });

                
        }



        function GetById () {
            setloading(true)
        async function GetBy(){
            try {
                
                const response = await axios.get('http://localhost:3003/'+Schoolname);
                setData(response.data);
                
                
                }
                catch(error) {
                    setData(null);
                }finally{
                    setloading(false);
                }
            
            
        }
        const fetchDataAfterDelay = () => {
            setTimeout(GetBy, 900); 
          };
          fetchDataAfterDelay(); 
    }


    
 

    useEffect(() => {
        const fetchData = async () => {
        
        try {
            
            const response = await getAllSchools();
            setData1(response);
            console.log("hi");
  
 
            }
            catch(error) {
                console.log(error);
                setData(null);
            }finally{
                setloading1(false);
            }
        }
        const fetchDataAfterDelay = () => {
            setTimeout(fetchData, 500); 
          };
          fetchDataAfterDelay(); 
          
        },[setData1]);    






  
return(
    <div>
    <div className='container' style={{marginRight:"70%"}}>
        <div className='Crud'>
            <h4>Post</h4>
            <TextField id="standard-basic" label="School name:" onChange={(e)=>School_name(e.target.value)} variant="standard" /><br/>
            <TextField id="standard-basic" label="Fee :" onChange={(e)=>School_fees(e.target.value)} variant="standard" /><br/>
            <TextField id="standard-basic" label="About :" onChange={(e)=>basic_details(e.target.value)} variant="standard" /><br/>

        
            <label style={{marginTop:"10px"}} >Image: </label>
            <input style={{marginTop:"20px"}} type='file'  name="file" onChange={(e)=>setFile(e.target.files[0])} ></input><br/>
            <Button style={{marginTop:"20px"}} variant="contained" onClick={Post} size="medium">
            Post
        </Button>
        </div>

        
    


    </div>

<div className='card' style={{backgroundColor:"lightblue",paddingBottom:"4%"}}>
    <div style={{display:"flex",margin:'20px'}}>
    <Filter/>
<Sort/>
<TextField style={{marginLeft:"80px",marginTop:"10px"}} id="standard-basic" label="School name:" onChange={(e)=>setname(e.target.value)} variant="standard" /><br/>

<Button style={{height:"35px",marginTop:"25px",marginLeft:"30px"}} onClick={GetById}  variant="outlined">search</Button>

</div>


            {loading && <Box style={{marginTop:"20px" ,marginLeft:"40px"}} >
      <CircularProgress />
    </Box>}
    {
          data?<div > 
            
            <Schoolcard obj={data}/>
             
        
        </div>:<div style={{display:"flex" ,  flex: "1",flexDirection: "row",flexWrap: "wrap" }}>
        {loading1 && <Box style={{marginTop:"20px" ,marginLeft:"40px"}} >
      <CircularProgress />
    </Box>}
   
    {data1.map((obj,School_name)=>{
        

      return <div key={School_name} style={{margin:"10px",marginLeft:"15px"}} >
                  <div style={{display:'flex'}}>
                    <Schoolcard obj={obj}/>

          
  </div>
          
          
          </div>
          
    })}
  
</div>
}
</div>





    </div>
)


}
export default Crud
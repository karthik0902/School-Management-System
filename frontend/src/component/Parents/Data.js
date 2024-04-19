import * as React from 'react';
import { styled } from '@mui/material/styles';
import {useState,useEffect} from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {getAllSchools} from "../../api"
import Schoolcard from '../Schoolcard/Schoolcard';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';




const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function Data() {
    const [data,setData]=useState([])
   
   



    const [loading,setloading]=useState(true)
    const [error,seterror]=useState()




    useEffect(() => {
        const fetchData = async () => {
        
        try {
            
            const response = await getAllSchools();
            setData(response);
            seterror(null);
          
            }
            catch(error) {
                seterror(error.message);
                setData(null);
            }finally{
                setloading(false);
            }
        }
        const fetchDataAfterDelay = () => {
            setTimeout(fetchData, 500); 
          };
          fetchDataAfterDelay(); 
          
        },[]);






       



  return (
    <div>
    <div cstyle={{display:"flex"}}>
  
    


    {loading && <Box style={{marginTop:"20px" ,marginLeft:"40px"}} >
      <CircularProgress />
    </Box>}
  
    {data?
      data.map((obj,School_name)=>{
        return <div key={School_name} style={{margin:"10px",marginLeft:"15px"}} >
                    <div style={{display:'flex'}}>
                    <Paper style={{margin:"1%",marginLeft:"5%" ,marginTop:"3%"}}
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2} >
        <Grid item>
          <ButtonBase sx={{ width: 125, height: 128 }}>
            <Img alt="complex" src={obj.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {obj.School_name}
              </Typography>
              <Typography variant="body2" gutterBottom>
              Fee :{obj.School_fees}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                About: {obj.basic_details}
              </Typography>
              <div style={{display:"flex"}}>
              
        </div>
        
     
              
            </Grid>
            
          </Grid>
          
        </Grid>
        
      </Grid>
     
    </Paper>


            
    </div>
            
            
            </div>
      })
      
   :null }
  
</div>


    
    </div>
  );
}


export default Data
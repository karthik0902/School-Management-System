import axios from 'axios'
import {useState,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Popup from 'reactjs-popup';
import TextField from '@mui/material/TextField';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });






function Schoolcard({obj}) {

    const [Schoolname1,setname1]=useState()
    const [popup,setPop]=useState()

    const [basic1,basic_details1]=useState()
    const [fee1,School_fees1]=useState()
  


    let [file1, setFile1] = useState(null);



    function put(Schoolname){
        console.log(fee1);
        const formData = new FormData();//School_name
        formData.append("School_name",Schoolname1);

      formData.append("School_fees",fee1);
      formData.append("basic_details",basic1);
      formData.append("image", file1);
        axios.put('http://localhost:3003/'+Schoolname,formData )
        .then(response => {

            console.log('Product added successfully:', response.data);
        }).catch(error => {
            console.error('Error adding product:', error); });

    }
    function del(schoolName){
        
        axios.delete('http://localhost:3003/'+ schoolName)
        .then(response => {

            console.log('Product added successfully:', response.data);
        }).catch(error => {
            console.error('Error adding product:', error); });
    }


    return(<div >
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
              <Button  variant="contained" style={{marginLeft:"10px",marginTop:"20px"}} onClick={() => del(obj.School_name)} size="medium">
              DELETE
        </Button>
       
        <Button  variant="contained" style={{marginLeft:"10px",marginTop:"20px"}} onClick={() => setPop(true)} size="medium">
              EDIT
        </Button>
        </div>
        <Popup 
                        open={popup} 
                        modal
                        nested
            
                      >
                        {
                          <div className="modal">
                            
                            <div >
            <h4>Put By School Name</h4>
            <label >School name   :</label><br/>
            <input  type="text" onChange={(e) => setname1(e.target.value)} ></input><br/>
            <label  >School fees:  </label><br/>
            <input  type="text" onChange={(e) => School_fees1(e.target.value)}></input><br/>
            <label >About :</label><br/>
            <input  type="text" onChange={(e) => basic_details1(e.target.value)}></input><br/>
            <input type='file'  name="file1" onChange={(e)=>setFile1(e.target.files[0])} ></input><br/>
            <Button style={{height:"35px",marginTop:"25px"}} onClick={()=>put(obj.School_name)} variant="outlined">APPLY</Button>


        </div>
                            
                            <div>
                              <Button style={{marginTop:"2%"}} onClick={() => setPop(false)} variant="contained">
                                Close 
                              </Button>
                            </div>
                          </div>
                        }
                      </Popup>
     
              
            </Grid>
            
          </Grid>
          
        </Grid>
        
      </Grid>
     
    </Paper>

    </div> </div>)
}
export default Schoolcard
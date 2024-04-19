import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {useState,useEffect} from 'react'
import {filterByFee} from "../../api"
import axios from 'axios'
import UserContext from '../UserContext/UserContext'
import { useContext } from 'react';



export default function Filter() {
    const { data1,setData1} = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  async function filterFee(i,j){
    const response = await filterByFee(i,j);
    setData1(response)
 
  }






  return (
    <div style={{marginTop:"10px"}}>
    <List
      sx={{ width: '100%', maxWidth: 300, bgcolor: 'lightblue' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
     
        
      <ListItemButton onClick={handleClick}>
       
        <ListItemText primary="Filter by Fee" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={() => filterFee(10000, 20000)}  sx={{ pl: 4 }}>
            
            <ListItemText primary="10000-20000" />
            
          </ListItemButton>
          <ListItemButton onClick={() => filterFee(20000, 30000)}  sx={{ pl: 4 }}>
            
            <ListItemText primary="20000-30000" />
            
          </ListItemButton>
          <ListItemButton onClick={() => filterFee(30000, 50000)}  sx={{ pl: 4 }}>
            
            <ListItemText primary="30000-50000" />
            
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    </div>
  );
}

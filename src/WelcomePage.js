import { Button } from '@mui/material';
import React from 'react';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SingleUserTable from './SingleUserTable'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextFields } from '@mui/icons-material';

export default function WelcomePage() {
    const [open, setOpen] = React.useState(false);
    const username = Cookies.get('user');
    
    const [data,setdata] = React.useState({Date:"",
      Event:"",
      Name:username
  })
    
   
    const navigate = useNavigate();
    // useEffect(()=>{
    //   axios.get('/singleUserDetail',{params:{name:username}}
    //     ).then((response)=>{
    //     setUserData(response.data)
    //   })
    // },[])

    // axios.get('/userTableDetails',{params:{name:username}}).then((response)=>{
    //   setUserData(response.data)
    // })
    
    const handleOpen = () => {
        setOpen(true);
      };
    const handleClose = () =>{
        setOpen(false);
    }
    const handleLogOut=()=>{
      navigate('/')
    }
    const today = new Date();
    const todayDate = today.getFullYear()+'-'+(((today.getMonth()+1)>10)?(today.getMonth()+1):('0'+(today.getMonth()+1)))+'-'+today.getDate();
    

    const handleChange = (e)=>{
        const {name,value,} = e.target
        const newData = {...data}
        newData[name]= value
        setdata(newData)
        console.log(todayDate)
    }
    const handleAdd = ()=>{
      setOpen(false);
      const temp = {name:username,userdetail:data}
      // console.log(temp)
      axios.post('/newAppointment',temp).then()
      
    }
  return (
    <div><center>Welcome {username} </center>  
    <Button color='error' onClick={handleLogOut}>logout</Button>
    <Button onClick={handleOpen}><Icon color="primary">add_circle</Icon>New Appointment</Button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>New Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose an date
          </DialogContentText>
         
          
           <input
            autoFocus
            name='Date'
            margin="dense"
            id="date"
            onChange={handleChange}
            type="date"
            min={todayDate}
            max='2050-12-10'
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            name='Event'
            margin="dense"
            id="passwordevent"
            label='Event'
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"

          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>create</Button>
        </DialogActions>
    </Dialog>
    <SingleUserTable userData={username}/>
    </div>

  )
}

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
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';

export default function WelcomePage() {
    const [open, setOpen] = React.useState(false);
    const username = Cookies.get('user');
    // const usersname = username.toUpperCase
    
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
    // const avatarname = ()=>{
    //     username.slice(1,20)
    // };
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
    <div><center><h1> <Avatar sx={{ bgcolor: deepPurple[500] }}>{username[0]}</Avatar>Welcome {username} </h1></center>  
    <Button variant='contained' onClick={handleOpen}><Icon color="inherit">add_circle</Icon> New Appointment</Button>
    <Button color='error' className='logOutUser' onClick={handleLogOut}>Logout<LogoutIcon  /></Button><br/><br/><br/>
    
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>New Appointment <Button className='cancelNew' color='error'><CancelIcon  onClick={handleClose}/></Button></DialogTitle>
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
    
    <span>
    <SingleUserTable userData={username}/>
    </span></div>

  )
}

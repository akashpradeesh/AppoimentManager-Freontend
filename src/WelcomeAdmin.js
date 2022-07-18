import axios from 'axios';
import React from'react';
import TableData from "./TableData"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


export default function WelcomeAdmin() {
  const [dataBase,setDataBase] = React.useState([])
  const navigate = useNavigate();
  axios.get(`/userDataBase`).then((response)=>{
    setDataBase(response.data)
    // console.log(dataBase)
  })
  const handleLogOut = ()=>{
    navigate('/');
  }
  return (
    <div
    // style={{
    //   backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/341/65/160/coffee-laptop-notes-5k-uhd-wallpaper-preview.jpg)',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundColor: (t) =>
    //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    // }}
    ><h1 ><center>Welcome Admin <SupervisorAccountIcon fontSize='large'/></center></h1>
    <Button color='error' varient='contained'
      onClick={handleLogOut}>Logout<LogoutIcon/></Button><br/><br/><br/>
        <TableData dataBase = {dataBase}/>
    </div>

  )
}

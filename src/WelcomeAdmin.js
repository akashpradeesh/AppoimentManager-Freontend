import axios from 'axios';
import React from'react';
import TableData from "./TableData"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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
    <div><h1>Welcome Admin</h1>
    <Button color='error' onClick={handleLogOut}>logout</Button>
        <TableData dataBase = {dataBase}/>
    </div>

  )
}

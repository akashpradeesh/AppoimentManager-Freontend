import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
// import Cookies from 'js-cookie';
// import { keys } from '@mui/system';


export default function TableData({dataBase}) {
    const [action, setAction] = React.useState([]);
    const [status, setStatus] = React.useState([''])
    // console.log(dataBase)
    // const username =Cookies.get('user')

    const handleChange = (e,index) => {
        const newValue = [...action]
        newValue[index]=e.target.value
        setAction([...newValue]);
        console.log(action);
    };
    const handleSave = (index,user,date,event)=>{
        console.log(action)
        if(action[index]==='Cancel'){
            axios.delete(`/handleDeleteAdmin`,{params:{key1:index,key2:user,key3:date,key4:event}}).then()
        }else if(action[index]==='Paid'){
            const paid = [...status]
            paid[index] = 'Paid'
            setStatus(paid)
        }else if(action[index]==='Approve'){
            const paid = [...status]
            paid[index] = 'Scheduled'
            setStatus(paid)
        }
    }
    

    return (
        <TableContainer component={Paper} >
            <Table sx={{ maxWidth: 2000 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell align='right'>Date</TableCell>
                        <TableCell align="right">Event</TableCell>
                        <TableCell align="right">Action</TableCell>
                        <TableCell align="right">Save</TableCell>
                        <TableCell align='right'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {datas.map((data) => (
              <TableRow
                key= {data.date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                {data.date}
                </TableCell>
                <TableCell align="right">{data.slept}</TableCell>
                <TableCell align="right">{data.wake}</TableCell>
                <TableCell align="right">{data.duration}</TableCell>
              </TableRow>
            ))} */}
            {dataBase.map((data,index)=>(
                
                   
                <TableRow
                // key={data.key}
                // sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                >
                <TableCell component='th' scope='row'>{data.username}</TableCell>
                
                    
                    <TableCell align='right'>{data.date}</TableCell>
                    <TableCell align='right'>{data.event}</TableCell>
                    <TableCell align='right'><Box sx={{ minWidth:120 }}>
                <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Action</InputLabel>
                <Select labelId='demo-simple-select-label' label='Action' value={action[index]} onChange={(e)=>{handleChange(e,index)}}>
                    <MenuItem value={"Approve"}>Approve</MenuItem>
                    <MenuItem value ={"Cancel"}>Cancel</MenuItem>
                    <MenuItem value ={"Paid"}>Paid</MenuItem>
                    </Select>
                    </FormControl>
                    </Box>
                    </TableCell>
                    <TableCell align='right'><Button varient='contained' onClick={()=>{handleSave(index,data.username,data.date,data.event)}}><SaveIcon></SaveIcon></Button></TableCell>
                    <TableCell align='right'>{status[index]}</TableCell>
                    
                
                
                </TableRow>
          
           ))}
                    {/* <TableRow><TableCell>1</TableCell>
                        <TableCell align='right'>2</TableCell>
                        <TableCell align='right'> <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Action</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={action}
                                    label="Action"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Reshedule"}>Reshedule</MenuItem>
                                    <MenuItem value={"cancel"}>Cancel</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        </TableCell>
                    </TableRow> */}
                
                </TableBody>
            </Table>
        </TableContainer>
            
    );
}

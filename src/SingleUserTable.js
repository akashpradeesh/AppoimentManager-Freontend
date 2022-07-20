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
import Cookies from 'js-cookie';

export default function SingleUserTable({userData}) {
    const userName = Cookies.get('user');
    const [action, setAction] = React.useState([]);
    const [schedule,setSchedule]=React.useState([]);
    const [dateChange,setDateChange] = React.useState({date:''})
    const [singleUserData,setSingleUserData] = React.useState([]);
    const [saveIcon,setSaveIcon] = React.useState(true);
    // const navigate = useNavigate();
    React.useEffect(()=>{
      axios.get('/singleUserDetail',{params:{name:userData}}
        ).then((response)=>{
        setSingleUserData(response.data)
        // console.log(response.data)
      })
    },[singleUserData])
    // console.log(userData)
    // const [userDetails,setUserDetails]=React.useState('');
    const handleChange = (e,index) => {
        const newValue = [...action];
        newValue[index]= e.target.value;
        setAction([...newValue]);
        
        // console.log(action);
    };
    const saveVisibility =()=> {
        setSaveIcon(false);
    }
    const handleOnClick = (index,event,date)=>{
        console.log(index)
        if(action[index]=== "Reshedule"){
            const newValue =[...schedule];
            newValue[index] =false; 
            setSchedule(newValue)
            setSaveIcon(false)
            // console.log(schedule)
        }
            if(action[index] === 'Cancel'){
            axios.delete(`/handleDelete`,{params:{key1:index,key2:event,key3:date,key4:userName}}).then()
        }
    }
    const today = new Date();
    const todayDate = today.getFullYear()+'-'+(((today.getMonth()+1)>10)?(today.getMonth()+1):('0'+(today.getMonth()+1)))+'-'+today.getDate();

    const handleDateChange = (e,event)=>{
        
        const {name,value}= e.target
        const newValue = dateChange;
        newValue[name]=value
        newValue.events = event
        setDateChange(newValue);
        console.log(dateChange)
    }
    const handleDateOnChange = (index)=>{
        const newValue = [...schedule];
        newValue[index]= true;
        // const temp = {data:dateChange,user:userName}
        setSchedule(newValue);
        setSaveIcon(true);
        axios.post(`/DateChange`,{dateChange,userName}).then()
    }
    // console.log(action);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 2000 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Event</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Action</TableCell>
                        <TableCell align='right'>Save</TableCell>
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
            {singleUserData.map((data,index)=>
                    <TableRow
                // key={data.Date}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component='th' scope='row' name='event'>{data.event}</TableCell>
                <TableCell align='right' name='date'>{(schedule[index] === false)?(<a><input type='date'  name="date" min={todayDate} onChange={(e)=>{handleDateChange(e,data.event)}}></input><Button onClick={()=>{handleDateOnChange(index)}}><SaveIcon className='resheduleSave'/></Button></a>):(<a>{data.date}</a>)}</TableCell>
                <TableCell align='right'><Box sx={{ minWidth:120 }}>
                <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Action</InputLabel>
                <Select labelId='demo-simple-select-label' label='Action' value={action[index]} onChange={(e)=>handleChange(e,index)}>
                    <MenuItem value={"Reshedule"}>Reshedule</MenuItem>
                    <MenuItem value ={"Cancel"}>Cancel</MenuItem>
                    </Select>

                    </FormControl>
                    </Box></TableCell>
                    {saveIcon === true?<TableCell align='right' name='date'><Button onClick={()=>{handleOnClick(index,data.date,data.event)}}><SaveIcon/></Button></TableCell>:null}
                    </TableRow>              
            )}
            
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

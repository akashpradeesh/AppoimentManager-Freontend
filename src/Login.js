import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import Cookies from 'js-cookie'
import Alert from '@mui/material/Alert';
import CancelIcon from '@mui/icons-material/Cancel';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const form = React.useRef(null);
  const [detail,setDetail]=React.useState({email:"",password:""})
  let navigate = useNavigate();
  const [incorrect,setIncorrect]= React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange=(e)=>{
    setIncorrect(false);
    const {name,value} =e.target
    const newData = {...detail}
    newData[name]=value
    setDetail(newData)
    // console.log(detail)
  }
  const handleSubmit=()=>{
    if(detail.email === 'admin@gmail.com' && detail.password==='admin'){
      
      navigate('/WelcomeAdmin')
    }else{
    axios.post('/loginUser',detail).then((response)=>{
      if(response.data === false){

        Cookies.set('user',detail.email.slice(0,-10))
        // console.log(Cookies.get('user'))
        navigate('/Welcome')
      }else{
        setIncorrect(true);
      }
    })
  }}

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
      Login<LoginIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <ValidatorForm
            ref = {form}
            onSubmit={handleSubmit}
            >
        <DialogTitle>Login <LockOpenIcon/> <Button className='cancelIcon' color='error' onClick={handleClose}><CancelIcon  /></Button></DialogTitle>
        <DialogContent>
            
          <DialogContentText>
            Login to Check your appointments.
          </DialogContentText>
          {(incorrect === true)?(<Alert severity="error">Incorrect username or password!</Alert>):(null)}
          <TextValidator
            autoFocus
            margin="dense"
            name='email'
            id="email"
            onChange = {handleChange}
            label="Email Address"
            type="email"
            fullWidth
            value={detail.email}
            variant="standard"
            validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
          />
          <TextValidator
            autoFocus
            name='password'
            margin="dense"
            id="password"
            onChange={handleChange}
            label="Password"
            type="password"
            fullWidth
            value={detail.password}
            variant="standard"
            validators={['required']}
                    errorMessages={[ 'this field is required']}

          />
        </DialogContent>
        <DialogActions>
          <Button color= 'error' onClick={handleClose}>Cancel</Button>
          <Button 
          type='submit'
          color='primary'
          >Login</Button>
        </DialogActions>
        <DialogTitle>
            Don't have an account?
            <DialogContent><SignUp/></DialogContent>
        </DialogTitle>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
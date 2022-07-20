import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';



export default function SignUp() {
    const [open, setOpen] = React.useState(false);
    const [exist,setExist] = React.useState(false);
    const [pswdMatch,setPswdMatch] = React.useState(false)
  const form = React.useRef(null);
  const [detail,setDetail]=React.useState({email:"",password:"",confirmpswd:""})
  const [opens, setOpens] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloses = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpens(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange=(e)=>{
    setExist(false)
    setPswdMatch(false)
    const {name,value} =e.target
    const newData = {...detail}
    newData[name]=value
    setDetail(newData)
  }
  
  const handleSubmit=()=>{
    if(detail.confirmpswd === detail.password){
      axios.post('newUser',detail).then((response)=>{
        if(response.data === true){
          setExist(true);
        }else{
          setOpens(true)
          
          setOpen(false)
          
        }
      })
    }else{
      setPswdMatch(true);
    }
    }
    


  return (
    <div>
      
      <Button size='small' variant="outlined"  className=
      'signupbtn' onClick={handleClickOpen}>
        SignUp<ExitToAppIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <ValidatorForm
            ref = {form}
            onSubmit={handleSubmit}
            >
        <DialogTitle>SIGN UP FORM <VpnKeyIcon fontSize='medium'/> <Button className='cancelIconsignup' fontSize='small' color='error' onClick={handleClose}><CancelIcon  /></Button></DialogTitle>
        <DialogContent>
            
          <DialogContentText>
            Sign Up to Check your appointments.
          </DialogContentText>
          {(exist === true)?(<Alert severity="warning">User Already exists!</Alert>):(null)}
          {(pswdMatch === true)?(<Alert severity="error">Password does not matches!</Alert>):(null)}
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
                    <TextValidator
            autoFocus
            margin="dense"
            id="confirmpassword"
            name='confirmpswd'
            onChange={handleChange}
            label="Confirm Password"
            type="password"
            fullWidth
            value={detail.confirmpswd}
            variant="standard"
            validators={['required']}
                    errorMessages={[ 'this field is required']}

          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>Cancel</Button>
          <Button 
          type='submit'
          color='success'
          >Sign in</Button>

          
        </DialogActions>
        </ValidatorForm>
      </Dialog>
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
        <Alert onClose={handleCloses} severity="success" sx={{ width: '100%' }}>
          Successfully Registered!
        </Alert>
      </Snackbar>
      </Stack>
    </div>
  );
}

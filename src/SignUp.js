import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import axios from 'axios';

export default function SignUp() {
    const [open, setOpen] = React.useState(false);
  const form = React.useRef(null);
  const [detail,setDetail]=React.useState({email:"",password:"",confirmpswd:""})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange=(e)=>{
    const {name,value} =e.target
    const newData = {...detail}
    newData[name]=value
    setDetail(newData)
    console.log(detail)
  }
  const handleSubmit=()=>{
    if(detail.confirmpswd === detail.password){
      axios.post('newUser',detail).then((response)=>{
        if(response.data === true){
          
          alert("User Already exist")
        }else{
          setOpen(false)
          alert('Successfully Registered')
        }
      })
    }else{
      alert("Password does not matches")
    }
    }
    


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        SignUp
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <ValidatorForm
            ref = {form}
            onSubmit={handleSubmit}
            >
        <DialogTitle>SIGN UP FORM</DialogTitle>
        <DialogContent>
            
          <DialogContentText>
            Sign Up to Check your appointments.
          </DialogContentText>
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
    </div>
  );
}

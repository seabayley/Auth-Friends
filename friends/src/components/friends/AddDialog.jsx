import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { createFriend } from '../../actions/index'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import InfoIcon from '@material-ui/icons/Info';
import ImageIcon from '@material-ui/icons/Image';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

export default props => {
    const dispatch = useDispatch()
    const [friend, setFriend] = useState({})

    const handleConfirm = () => {
        dispatch(createFriend(friend))
        props.onClose()
    }

    const handleChange = (type, event) => {
        setFriend({ ...friend, [type]: event.target.value })
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle id="form-dialog-title">New Friend</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Input the required information to add a new friend
                    </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    onChange={(event) => handleChange('email', event)}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Name"
                    type="name"
                    onChange={(event) => handleChange('name', event)}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    margin="dense"
                    id="age"
                    label="Age"
                    type="age"
                    onChange={(event) => handleChange('age', event)}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <InfoIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    margin="dense"
                    id="image"
                    label="Image Url"
                    type="url"
                    onChange={(event) => handleChange('image', event)}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ImageIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} color="primary" startIcon={<AddIcon />}>
                    Add
          </Button>
                <Button onClick={props.onClose} color="secondary" startIcon={<CancelIcon />}>
                    Cancel
          </Button>
            </DialogActions>
        </Dialog>
    );
}
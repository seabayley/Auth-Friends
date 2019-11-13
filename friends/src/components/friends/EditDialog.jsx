import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateFriend } from '../../actions/index'
import { makeStyles } from '@material-ui/core/styles';
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

export default props => {
    const dispatch = useDispatch()
    const currentFriend = useSelector(state => state.currentFriend)
    const [newData, setNewData] = useState({})

    const handleConfirm = () => {
        dispatch(updateFriend({ ...currentFriend, ...newData }))
        props.onClose()
    }

    const handleChange = (type, event) => {
        setNewData({ ...newData, [type]: event.target.value })
    }

    const useStyles = makeStyles(theme => ({
        margin: {
            margin: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle id="form-dialog-title">Edit Friend</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Update any information you would like to change
                    </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    defaultValue={currentFriend.email}
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
                    defaultValue={currentFriend.name}
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
                    defaultValue={currentFriend.age}
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} color="primary">
                    Save Changes
          </Button>
                <Button onClick={props.onClose} color="primary">
                    Cancel
          </Button>
            </DialogActions>
        </Dialog>
    );
}
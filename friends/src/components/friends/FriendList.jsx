import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFriends, updateCurrentFriend, deleteFriend, logoutUser } from '../../actions/index'

import AddDialog from './AddDialog'
import EditDialog from './EditDialog'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import AddIcon from '@material-ui/icons/Add'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'


export default (props) => {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends)
    const currentFriend = useSelector(state => state.currentFriend)
    const [dialogOpen, setDialogOpen] = useState({
        'edit': false,
        'delete': false,
        'add': false,
        'addToast': false
    })

    const toggleDialog = name => {
        setDialogOpen({ ...dialogOpen, [name]: !dialogOpen[name] })
    }

    const handleEdit = friend => {
        dispatch(updateCurrentFriend(friend))
        toggleDialog('edit')
    }

    const handleConfirm = friend => {
        dispatch(updateCurrentFriend(friend))
        toggleDialog('delete')
    }

    const handleDelete = () => {
        dispatch(deleteFriend(currentFriend))
        toggleDialog('delete')
    }

    const handleLogout = () => {
        dispatch(logoutUser(props))
    }

    const Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://portfolio-website-5itpbi9fh.now.sh/">
                    Christopher Bailey
            </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const useStyles = makeStyles(theme => ({
        icon: {
            marginRight: theme.spacing(2),
        },
        heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
        },
        friendGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        friend: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        friendMedia: {
            paddingTop: '100%' //56.25 for 16:9
        },
        friendContent: {
            flexGrow: 1,
        },
        footer: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(6),
        },
    }));

    useEffect(() => {
        dispatch(getFriends())
    }, [dispatch])

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <EmojiPeopleIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Friend List
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Manage Those Friends
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Here you can add new people to your already impressive list of friends.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => toggleDialog('add')}>
                                        Add a new friend
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="secondary" startIcon={<ExitToAppIcon />} onClick={handleLogout}>
                                        logout
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.friendGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {friends.map(friend => (
                            <Grid item key={friend.id} xs={12} sm={6} md={4}>
                                <Card className={classes.friend}>
                                    <CardMedia className={classes.friendMedia} image={friend.image} title="Unknown" />
                                    <CardContent className={classes.friendContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {friend.name} - Age: {friend.age}
                                        </Typography>
                                        <Typography>
                                            {friend.email}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(friend)}>
                                            Edit
                                        </Button>
                                        <Button size="small" color="secondary" startIcon={<DeleteIcon />} onClick={() => handleConfirm(friend)}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Friend List
            </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Got enough friends yet?
            </Typography>
                <Copyright />
            </footer>
            <AddDialog open={dialogOpen['add']} onClose={() => toggleDialog('add')} />
            <EditDialog open={dialogOpen['edit']} onClose={() => toggleDialog('edit')} />
            <Dialog open={dialogOpen['delete']} onClose={() => toggleDialog('delete')}>
                <DialogTitle id="delete-dialog-title">{`Delete friend ${currentFriend.name}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you delete this person, they will be forever removed from your friend list.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleDialog('delete')} color="primary">
                        Nevermind
                    </Button>
                    <Button onClick={handleDelete} color="secondary" startIcon={<DeleteForeverIcon />} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
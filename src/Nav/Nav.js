import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link as RouterLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  link: {
    color: '#fff'
  }
}));

function Nav() {
  const classes = useStyles();
  return(
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Button component={RouterLink} to="/">
          <Typography variant="h6" className={classes.link}>
            Home
          </Typography>
        </Button>

        <Button component={RouterLink} to="/profile">
          <Typography className={classes.link} variant="h6">
            Profile
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Nav)

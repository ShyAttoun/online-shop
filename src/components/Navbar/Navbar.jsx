import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/shop.png'
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ totalItems }) => {
  const classes = useStyles()
  const location = useLocation()
  console.log('my total items are', totalItems)

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            Shupit online
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="show cart items"
                color="inherit"
              >
                <Badge
                  badgeContent={totalItems}
                  color="secondary"
                  overlap="rectangular"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar

import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core'

import useStyles from './styles'

const CartItem = ({ item, onUpdateCartqty, onRemoveFromCart }) => {
  const classes = useStyles()

  console.log('my item is', item.image)

  return (
    <div>
      <Card>
        <CardMedia
          image={item.image?.url}
          alt={item.name}
          className={classes.media}
          component="img"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h4">{item.name}</Typography>
          <Typography variant="h5">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
            <Button
              type="button"
              size="small"
              onClick={() => onUpdateCartqty(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <Typography>{item.quantity}</Typography>
            <Button
              type="button"
              size="small"
              onClick={() => onUpdateCartqty(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => onRemoveFromCart(item.id)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CartItem

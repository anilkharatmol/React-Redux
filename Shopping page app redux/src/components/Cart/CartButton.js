import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../Store/CartSlice';

const CartButton = () => {

  const dispatch=useDispatch();
  const totalQuantity=useSelector(state=>state.cart.totalQuantity)
  
function showCartHandler(){
  dispatch(cartActions.showCart())
}

  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;

import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import './App.css';
import { uiActions } from './components/Store/UiSlice';
import { cartActions } from './components/Store/CartSlice';

let isInitial=true;

function App() {
  const showCart=useSelector(state=>state.ui.showCart)
  const cart=useSelector(state=>state.cart)

  const isSending=useSelector(state=>state.ui.isSending)

  const isError=useSelector(state=>state.ui.isError)

  const isSuccess=useSelector(state=>state.ui.isSuccess);

  const dispatch=useDispatch();


  

  useEffect(()=>{
    if(isInitial){
      isInitial=false;
      return;
    }
    fetch('https://expense-tracker-8d365-default-rtdb.firebaseio.com/cart.json',{
      method:'PUT',
      body:JSON.stringify(cart)
    }).then(resposnse=>{

      dispatch(uiActions.sendData())
      if(resposnse.ok){
        dispatch(uiActions.isSuccess())
        return resposnse.json();
      }
      else{
        dispatch(uiActions.isError())
      }
    }).then(()=>{ 
     dispatch(uiActions.sendData())})
       .catch(err=>{console.log(err)})
  },[cart,dispatch])


  useEffect(()=>{
    fetch('https://expense-tracker-8d365-default-rtdb.firebaseio.com/cart.json').then(response=>{
        return response.json();
    }).then( (data)=>{console.log(data);
      dispatch(cartActions.replaceCart(data))})
  },[dispatch])

  
  
  return (
    <Fragment>
     { isSending && <header className='header'>    
        <h2>Sending...</h2>  
        <h2 style={{textAlign:'right'}}>Sending Cart data!</h2>
      </header>}
    { isError && <header className='error'>    
        <h2>Error!</h2>  
        <h2 style={{textAlign:'right'}}>Sending data failed!</h2>
      </header>}
     {isSuccess && <header className='success'>    
        <h2>Success</h2>  
        <h2 style={{textAlign:'right'}}>Cart data sent successfully!</h2>
      </header>}
       <Layout>
      {showCart &&<Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;

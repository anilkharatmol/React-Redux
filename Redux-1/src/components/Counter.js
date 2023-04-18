import classes from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
  const dispatch=useDispatch();
  const counter=useSelector(state=>state.counter)

  function incrementHandler(){
    dispatch({type:'increment'})
  }

  function decrementHandler(){
    dispatch({type:'decrement'})
  }
  function incrementBy2Handler(){
    dispatch({type:'incrementby2'})
  }
  function decrementBy2Handler(){
    dispatch({type:'decrementby2'})
  }
  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <div>
        <button onClick={incrementBy2Handler}>Increment By 2</button>
        <button onClick={decrementBy2Handler}>Decrement By 2</button>
        </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

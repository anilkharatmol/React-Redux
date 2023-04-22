import axios from 'axios';
import classes from './AddExpenseForm.module.css' ;
import { useCallback,useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../Store/ExpenseSlice';

export default function AddExpenseForm(){
    

    const expenses=useSelector(state=>state.savedExpenses.expenses)

    const dispatch=useDispatch();

    const amountRef=useRef('');
    const descriptionRef=useRef(''); 
    const categoryRef=useRef('');

    const firebaseUrl='https://expense-tracker-8d365-default-rtdb.firebaseio.com/expenses';

    
   async function OnAdd(event){
        event.preventDefault();
        const obj={
            description:descriptionRef.current.value,
            price: amountRef.current.value,
            category:categoryRef.current.value,
        }
        
        
        const res = await axios.post(`${firebaseUrl}.json`, obj);
        
        obj.id=res.data.name;
        console.log(obj);

        dispatch(expenseActions.addExpense(obj));

        //   console.log(res);

    }

  async  function deleteExpenseHandler(id){
           await  axios.delete(`${firebaseUrl}/${id}.json`)
            console.log("Expense successfuly deleted");

            dispatch(expenseActions.deleteExpense(id))

    }

async  function editExpenseHandler(id,category,description,price){

    categoryRef.current.value=category;
   descriptionRef.current.value=description;
   amountRef.current.value=price;

    await  axios.delete(`${firebaseUrl}/${id}.json`)

    dispatch(expenseActions.deleteExpense(id))
    
    console.log("Update now");


    }

 
    const fetchExpensesHandler=useCallback(async ()=>{
          const response=await  fetch(`${firebaseUrl}.json`);
          
          const data= await response.json();
          
          const fetchedExpenses=[];
          
          for(const key in data){
              fetchedExpenses.push({
                  id:key,
                  description:data[key].description,
                  price:data[key].price,
                  category:data[key].category
                })
            }

            console.log(fetchedExpenses);
            
        
         dispatch(expenseActions.fethedExpenses(fetchedExpenses))
           
        },[dispatch])
        
        useEffect(()=>{fetchExpensesHandler()},[fetchExpensesHandler]);


        const expense=expenses.map(exp=>(
            <li key={exp.id} className={classes.expense}>
                <div>         
                  <h3>{exp.category}</h3>
            <div className={classes.description}>{exp.description}</div>
              </div>
            <div className={classes.price}>Rs {exp.price}
            <button onClick={()=>{deleteExpenseHandler(exp.id)}} className={classes.expense_delete}>Delete</button>
            <button onClick={()=>{editExpenseHandler(exp.id,exp.category,exp.description,exp.price)}} className={classes.expense_edit}>Edit</button>
            </div>
        </li>
        ))

        let totalAmount=0;

        expenses.forEach(exp=>{
            totalAmount+= Number(exp.price);
        })


    return(
        <div>
           <h1 style={{fontFamily:'cursive',textAlign:'center'}}>Enter the details to add expense</h1>
            <div className={classes.form}>
        <form onSubmit={OnAdd} >
            <div className={classes.control}>
        <label htmlFor="Money">Money Spent:</label><br></br>
        <input type="number" id="money" ref={amountRef} /><br></br>
        <label htmlFor="description">Description:</label><br></br>
        <input type="text" id="description"ref={descriptionRef}/>
        </div>
        <h3>Select Category:</h3>
        <select name="category" id="category" ref={categoryRef} className={classes.options}>
            <option value="movie">Movie</option>
            <option value="gym">Gym</option>
            <option value="mobilerecharge">Mobile Recharge</option>
            <option value="rent">Rent</option>
            <option value="Gas">Gas</option>
            <option value="electricitybill">Electricity Bill</option>
        </select>
        <div className={classes.actions}>
        <button>Add Expense</button>
        {totalAmount>10000 && <button>Activate Premium</button>}
        </div>
        </form>
        </div>
        <h1>Added Expenses</h1>
        {expense}
        </div>
    )
}
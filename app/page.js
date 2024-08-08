'use client';
import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '' });
  const [total, setTotal] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState('');

  // Add item to pantry tracker database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.quantity !== '') {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
      });
      setNewItem({ name: '', quantity: '' });
    }
  };

  // Add expense to expense tracker database
  const addExpense = async (e) => {
    e.preventDefault();
    if (newExpense.name !== '' && newExpense.amount !== '') {
      await addDoc(collection(db, 'expenses'), {
        name: newExpense.name.trim(),
        amount: parseFloat(newExpense.amount),
      });
      setNewExpense({ name: '', amount: '' });
    }
  };

  // Read items from pantry database
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      return () => unsubscribe();
    });
  }, []);

  // Read expenses from expense tracker database
  useEffect(() => {
    const q = query(collection(db, 'expenses'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let expensesArr = [];

      querySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(expensesArr);

      // Calculate total expenses
      const calculateTotal = () => {
        const totalAmount = expensesArr.reduce(
          (sum, expense) => sum + parseFloat(expense.amount),
          0
        );
        setTotal(totalAmount);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  // Delete items from pantry tracker database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  // Delete expense from expense tracker database
  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, 'expenses', id));
  };

  // Fetch recipe suggestions
  const fetchRecipes = async (e) => {
    e.preventDefault();
    if (ingredients !== '') {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=131468b95d564acbab0399ffaaa44c0f`
      );
      const data = await response.json();
      setRecipes(data);
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
        {/* Pantry Tracker Section */}
        <h1 className='text-4xl p-4 text-center'>Pantry Inventory Tracker</h1>
        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-black'>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className='col-span-3 p-3 border'
              type='text'
              placeholder='Enter Item'
            />
            <input
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
              className='col-span-2 p-3 border mx-3'
              type='number'
              placeholder='Enter Quantity'
            />
            <button
              onClick={addItem}
              className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'
              type='submit'
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className='my-4 w-full flex justify-between bg-slate-950'
              >
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Expense Tracker Section */}
        <h2 className='text-4xl p-4 text-center'>Pantry Expense Tracker</h2>
        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-black'>
            <input
              value={newExpense.name}
              onChange={(e) =>
                setNewExpense({ ...newExpense, name: e.target.value })
              }
              className='col-span-3 p-3 border'
              type='text'
              placeholder='Enter Expense'
            />
            <input
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              className='col-span-2 p-3 border mx-3'
              type='number'
              placeholder='Enter Amount $'
            />
            <button
              onClick={addExpense}
              className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'
              type='submit'
            >
              +
            </button>
          </form>
          <ul>
            {expenses.map((expense, id) => (
              <li
                key={id}
                className='my-4 w-full flex justify-between bg-slate-950'
              >
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{expense.name}</span>
                  <span>${expense.amount.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {expenses.length < 1 ? (
            ''
          ) : (
            <div className='flex justify-between p-3'>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Recipe Suggestion Section */}
        <h2 className='text-4xl p-4 text-center'>Recipe Suggestions</h2>
        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='text-black' onSubmit={fetchRecipes}>
            <input
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className='p-3 border w-full mb-4'
              type='text'
              placeholder='Enter ingredients separated by commas'
            />
            <button
              className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'
              type='submit'
            >
              Get Recipes
            </button>
          </form>
          {recipes.length > 0 ? (
            <ul>
              {recipes.map((recipe, id) => (
                <li key={id} className='my-4 w-full flex justify-between bg-slate-950'>
                  <div className='p-4 w-full flex justify-between'>
                    <span className='capitalize'>{recipe.title}</span>
                    <span>
                      <a href={recipe.sourceUrl} target='_blank' rel='noopener noreferrer' className='text-blue-500'>View Recipe</a>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recipe suggestions available.</p>
          )}
        </div>
      </div>
    </main>
  );
}

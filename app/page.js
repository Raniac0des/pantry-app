'use client'
import React, {useState, useEffect} from 'react'; 
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore"; 


export default function Home() {
  const [items, setItems] = useState([ 
    {name: 'Vegetables', price: 5.00},
    { name: 'Fruits', price: 5.00},
    {name: 'Carbohydrates', price: 4.00},
    {name: 'Candy', price: 10.00},
  ]);
  const [newItem, setNewItem] = useState({name: '', price: ''})
  const [total, setTotal] = useState(0)

  // add item to database 
  const addItem = async (e) => { 
    e.preventDefault()
    if(newItem.name !== '' && newItem.price !== '') {
      //setItems([...items, newItem])
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(), 
        price: newItem.price, 
    }); 
    }
  }

  // read items from database 

  //delete items from database 


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl p-4 text-center">Pantry Expense Tracker</h1>
        <div className="bg-slate-800 p-5 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
            value= {newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item:"
            />
            <input
            value= {newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter price:"
            />
            <button
            onClick= {addItem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl col-span-1"
              type="submit"
            >
              Add
            </button>
          </form>
          <ul> 
            {items.map} 
            <li key={id} className= 'my-4w full flex justify-between '> 
              <div className= 'p-4 w-full flex justify-between'> 
                <span className= 'capitalize'>{item.name}</span>
                <span>${item.price}</span>
              </div>
              <button className = 'ml-8 p-4 border-l-2 border-slate-900 hover: bg-slate-900 w-16'>
                X
              </button>
            </li>
            </ul> 
            {items.length < 1 ? (''): ( 
              <div className= 'flex justify-between p-3'>
                <span>Total</span> 
                <span> ${total}</span>
              </div> 

            )}
        </div>
      </div>
    </main>
  );
}

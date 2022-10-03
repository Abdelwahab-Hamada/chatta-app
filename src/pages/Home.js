import React from 'react'

import ChatDemo from '../demo/Chat'
import ChatsDemo from '../demo/Chats'

import { Link, } from "react-router-dom";


const Home = () => {
  return (
    <div className='h-full overflow-overlay scrollbar'>
        <div className='w-full text-center mb-10'>
          <Link 
          to='/chatta-app/register/'
          className=' text-gray-400 p-1 hover:underline'
          >Register</Link>
          or
          <Link 
          to='/chatta-app/login/'
          className=' text-gray-400 p-1 hover:underline'
          >Login</Link>
        </div>
        <ChatsDemo/>
        <p className='mb-5 font-semibold'>this is what chat looks like.</p>
        <p className='mb-5 font-semibold'>remember no clickable elements in this page.</p>
        <ChatDemo/>
        <div className='w-full text-center mt-10'>
          <Link 
          to='/chatta-app/register/'
          className=' text-gray-400 p-1 hover:underline'
          >Register</Link>
          or
          <Link 
          to='/chatta-app/login/'
          className=' text-gray-400 p-1 hover:underline'
          >Login</Link>
        </div>
    </div>
  )
}

export default Home
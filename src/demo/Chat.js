import React from 'react'

import {useState} from 'react'


const ChatDemo = () => {
    const [msgs,]=useState([
        {text:'hi',
        style:"ml-auto bg-slate-200 text-slate-500"},
        {text:'hello',
        style:"mr-auto bg-slate-500 text-slate-200"},
    ])

  return (
    <div id='chat' className='border rounded relative p-5 bg-white h-3/4 flex flex-col'>
        <h1 className=' mx-auto text-lg font-semibold'>@user
        {/* <span className=' text-xs text-gray-300'>online</span> */}
        </h1>
      
      <div className='flex flex-col-reverse gap-2 overflow-overlay scrollbar pr-3 mt-auto mb-10'>
        {
            msgs.map(({
              text,
              style
          },index)=>(
              <p className={` px-2 rounded ${style}`} key={index}>{text}</p>
            ))
        }
        
      </div>
      <form className='absolute flex gap-0.5 bottom-5 w-11/12'>
          <input 
            type="text"
            id="message"
            autoComplete="off"
            value='this is just a demo of chat'
            required
            className=" p-0.5 border-b-2 
            focus:outline-none w-full "
            placeholder='write message'>

          </input>
          <h1 
          className='  w-fit rounded px-2 bg-white hover:text-white hover:bg-black/10 inline-block'>
          
          Send</h1>
      </form>
    </div>
  )
}

export default ChatDemo
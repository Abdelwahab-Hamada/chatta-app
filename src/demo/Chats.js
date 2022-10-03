import React from 'react'
import {useState} from 'react'


const ChatsDemo = () => {
    const [chats,]=useState([
        {   id:1,
            latestMessage:{
                getSender:'user',
                seen:false,
                text:"hello",
                time:"1 hour ago",
                hover:''
            },
            other:{
                username:"@user"
            },
            hover:'the left gray bar indicates new message'
        },
        {   id:2,
            latestMessage:{
                getSender:'you',
                seen:false,
                text:"hi",
                time:"1 hour ago",
                hover:''
            },
            other:{
                username:"@user2",
                hover:""
            },
            hover:'click @user name to start a chat'
        },
        {   id:3,
            latestMessage:null,
            other:{
                username:"@user2",
                hover:''
            },
            hover:'this is a chat with no message, (.) instead of message text'
        },
        
    ])
    return (
        <div className='relative h-fit overflow-overlay scrollbar pr-2 mb-10'>
            <p className='mb-5 font-semibold text-black'>this is just a demo.</p>
            <p className='mb-5 font-semibold text-black'>hover @user</p>
            

            <div className=' flex flex-col gap-1 w-full border p-5'>
            {chats.map((chat)=>(
                <div className='relative w-full h-full' key={chat.id}>
                    <div className='w-full peer ...'>
                        <div id={chat.id} className={` border-l-4 p-2  flex flex-col ${
                            chat.latestMessage?.getSender !== 'you' && 
                            !chat.latestMessage?.seen 
                        ? 'border-gray-500'
                        : 'border-white' }`} >
                            <div id='user' className='flex items-baseline gap-1'>
                                <a
                                href='#chat'
                                id='name' className=' outline-none text-lg font-semibold text-black z-20'>{chat.other.username}</a>
                            </div>                    
                            <div id='message' className='flex items-baseline font-semibold'>
                                <p id='text' className=' text-start text-gray-500 text-sm font-semibold truncate'>{chat.latestMessage?.text}</p>·  
                                <p id='time' className=' text-gray-300 text-xs font-bold whitespace-nowrap'>{chat.latestMessage?.time}</p>
                            </div>
                        </div>
                        
                    </div> 
                    <p className='top-4 right-8 hidden absolute rounded bg-black/25 w-1/2 px-0.5 peer-hover:block'>{chat.hover}</p>
                </div>
                
            ))}

            </div>
        </div>
    )
}

export default ChatsDemo
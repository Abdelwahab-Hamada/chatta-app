import { useQuery,useMutation,useSubscription } from '@apollo/client'
import { useRef,useEffect } from 'react'

import chatsQuery from '../gql/queries/chats'

import { Popover, Transition } from '@headlessui/react'

import Chat from './Chat'

import offlineMeMutation from '../gql/mutations/offline';
import onlineMeMutation from '../gql/mutations/online';

import { chatSubscription } from '../gql/subscriptions/chat'

import { useLocation, Navigate, } from "react-router-dom";

import leavingMutation from '../gql/mutations/chatLeaving'

import { Fragment } from 'react'


const Chats = () => {
    const {loading,data}=useQuery(chatsQuery,{fetchPolicy:'no-cache'})
    const [off,]=useMutation(offlineMeMutation)
    const [on,]=useMutation(onlineMeMutation)
    const [leave,]=useMutation(leavingMutation)

    const location = useLocation();

    useEffect(()=>{
        if (ran.current === false){
            window.addEventListener("beforeunload", () => {  
                off()
            });
            on()
        }
        return ()=>{
            ran.current=true
        }
        
    },[])

    const ran=useRef(false)

    try{useSubscription(chatSubscription,{
        variables:{},
        onSubscriptionData:(data)=>{
            const {text,isRead,readTimeAgo,sender,chat}=data.subscriptionData.data?.subscribeChat.message
            const chatElement=document.getElementById(chat.id);
            if (sender !== 'you' && !isRead) {
                chatElement.style.borderColor = "#6B7280"
                chatElement.addEventListener("click",()=>{
                    chatElement.style.borderColor = "white"
                })
            }
            const message=chatElement.querySelector('#message')
            const messageText=message.querySelector('#text')
            const messageTime=message.querySelector('#time')
            messageText.textContent=text
            messageTime.textContent=readTimeAgo
        }
      })}catch (error){
          console.log('error')
        return <Navigate to="/chatta-app/login/" state={{ from: location }} replace />
      }


    const spinner = (
        <svg role="status" className="inline m-auto w-6 h-6 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        )

    const whiteBorder=(chatId)=>{
        const chat=document.getElementById(chatId)
        chat.style.borderColor = "white"
    }

    
    if (loading){
        return (
            <div className=' w-full h-full flex'>
                {spinner}
            </div>
        )
    } else if(!data?.friends.length){
        return (<h1>you are lonely :)</h1>)
    }
    
    return (
        <div className='relative h-full overflow-overlay scrollbar pr-2'>
            {/* <h1 className='mx-auto font-semibold text-lg border px-1 rounded-lg w-fit'>Chats</h1> */}
            <div className=' flex flex-col gap-1 w-full '>
            {data?.friends.map((friend)=>(
                <Popover className='w-full h-full' key={friend.id}>
                    <Popover.Button onClick={()=>whiteBorder(friend.chat.id)} className='w-full'>
                        <div id={friend.chat.id} className={` border-l-4 p-2  flex flex-col ${
                            friend.chat.lastMessage?.sender !== 'you' && 
                            !friend?.chat.lastMessage?.isRead 
                        ? 'border-gray-500'
                        : 'border-white' }`} >
                            <div id='user' className='flex items-baseline gap-1'>
                                <h1
                                id='name' className=' outline-none text-lg font-semibold text-black'>{friend.username}</h1>
                                <span id='status' className=' text-xs text-gray-300 '> {friend.status}</span>
                            </div>                    
                            <div id='message' className='flex items-baseline font-semibold'>
                                <p id='text' className=' text-start text-gray-500 text-sm font-semibold truncate'>{friend.chat.lastMessage?.text}</p>·  
                                <p id='time' className=' text-gray-300 text-xs font-bold whitespace-nowrap'>{friend.chat.lastMessage?.readTimeAgo}</p>
                            </div>
                        </div>
                    </Popover.Button> 
                    {/* <Popover.Overlay className="fixed inset-0 bg-black opacity-30" /> */}
                    <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className='top-0 left-0 absolute w-full pb-5 h-full z-40'>
                                <Popover.Button onClick={leave} className='absolute top-0 left-0.5 z-40'>close</Popover.Button>
                                <Chat recipientUsername={friend.username} recipientId={friend.id}/>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            ))}

            </div>
        </div>
    )
}

export default Chats
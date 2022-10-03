import { useSubscription,useMutation,useQuery } from '@apollo/client'

import { chatSubscription } from '../gql/subscriptions/chat'

import chatQuery from '../gql/queries/chat'

import messageMutation from '../gql/mutations/sendMessage'

import {useState,useRef,useEffect} from 'react'

import chatMutation from '../gql/mutations/chat'

const Chat = ({recipientId,recipientUsername}) => {
    const [msgs,setMsgs]=useState([])
    const [msg,setMsg]=useState([])
    const msgBox=useRef()

    const {data}=useQuery(chatQuery,{
      fetchPolicy:'no-cache',
      variables:{recipientId}
  })

    const [join,]=useMutation(chatMutation,{variables:{
      recipientId
    }})

    const [send,]=useMutation(messageMutation)

    useSubscription(chatSubscription,{
      variables:{chatId:data?.chat.id},
      onSubscriptionData:(data)=>{
          const {text,sender,readTimeAgo}=data.subscriptionData.data?.subscribeChat.message
        if (sender !== 'you'){
          setMsgs([...msgs,{
            text,
            readTimeAgo,
            sender
          }])
        }
      }
    })

    const handleSend=async (e)=>{
      e.preventDefault()

      const {data}=await send({variables:{
          recipientId,
          text:msg
        }})

        const readTimeAgo=data.sendMessage.message.readTimeAgo

      setMsgs([...msgs,{
        text:msg,
        readTimeAgo,
        sender:'you'
      }])
    
        setMsg('')
        msgBox.current.focus()
    }

    useEffect(()=>{
      msgBox.current.focus()
      join()
    },[])
    
  return (
    <div className='relative p-5 bg-white h-full flex flex-col'>
      <h1 className=' mx-auto text-lg font-semibold'>{recipientUsername}
      {/* <span className=' text-xs text-gray-300'> {data?.chat.other.status}</span> */}
      </h1>
      
      <div className='flex flex-col-reverse overflow-overlay scrollbar pr-3 mt-auto mb-10'>
        {
            msgs.slice(-20).reverse().map(({
              text,
              readTimeAgo,
              sender
          },index)=>(
            <div key={index} className={` px-2 rounded w-full mb-0.5 flex flex-col ${
                  sender === 'you'
                  ? 'items-end'
                  : ''
                }`}>
                <p className={`peer ... px-2 rounded w-fit ${
                  sender === 'you'
                  ? ' bg-slate-200 text-slate-500'
                  : ' bg-slate-500 text-slate-200'
                }`} >{text}</p>
                <p className=' invisible peer-hover:visible w-fit text-gray-300 text-xs font-bold whitespace-nowrap'>{readTimeAgo}</p>
              </div>
            ))
        }
        <div>
          {
              data?.chat.unreadMessages.slice(0).map(({
                id,
                text,
                sender,
                readTimeAgo
            })=>(
              <div key={id} className={` px-2 rounded w-full mb-0.5 flex flex-col ${
                  sender === 'you'
                  ? 'items-end'
                  : ''
                }`}>
                <p className={`peer ... px-2 rounded w-fit ${
                  sender === 'you'
                  ? ' bg-slate-200 text-slate-500'
                  : ' bg-slate-500 text-slate-200'
                }`} >{text}</p>
                <p className=' invisible peer-hover:visible w-fit text-gray-300 text-xs font-bold whitespace-nowrap'>{readTimeAgo}</p>
              </div>
              ))
          }
        </div>
        
      </div>
      <form onSubmit={handleSend} className='absolute flex gap-0.5 bottom-5 w-11/12'>
          <input 
            type="text"
            id="message"
            ref={msgBox}
            autoComplete="off"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            required
            className=" p-0.5 border-b-2 
            focus:outline-none w-full "
            placeholder='write message'>

          </input>
          <button 
          className='  w-fit rounded px-2 bg-white hover:text-white hover:bg-black/10 inline-block'>
          
          Send</button>
      </form>
    </div>
  )
}

export default Chat

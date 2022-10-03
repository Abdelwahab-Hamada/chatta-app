import { useRef, useState,useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client'

import registerMutation from '../gql/mutations/register';



const Register = () => {
    const usrRef=useRef()

    const [usr,setUsr]=useState('')
    const [pwd,setPwd]=useState('')
    const [msg,setMsg]=useState('')

    const navTo=useNavigate()

    const [register,{loading}]=useMutation(registerMutation)

    const spinner=(
    <svg role="status" className="inline mr-3 w-4 h-4 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    )
    let isLoading = (loading 
      ? spinner
      : '' )

    const handleRegister=async (e)=>{
        e.preventDefault()

        try {
            const {data}=await register({variables:{
              username:usr,
              password:pwd
            }})

            setMsg(
              <>
                <p className='text-green-600 inline-block'>
                  Successfully created
                </p>
                <span className='text-black text-lg block'> redirecting to Login {spinner}</span>
              </>
            )
            setTimeout(()=>navTo('/chatta-app/login/'), 3000)

          } catch (err){
            setMsg(
                    <p className='text-red-600 inline-block'>
                      this username already exists
                    </p>
                    )
            setTimeout(()=>setMsg(''), 3000)
          }
    }


    useEffect(()=>{
        usrRef.current.focus()
    },[])
  return (
    <div className='w-full py-11'>
        <h1 className='w-full text-center text-5xl font-mono'>Register</h1>
        <form onSubmit={handleRegister} className='mt-7'>
          <div className='w-full flex flex-col-reverse relative'>
            <input
                type="text"
                id="username"
                ref={usrRef}
                autoComplete="off"
                onChange={(e) => setUsr(e.target.value)}
                value={usr}
                required
                className="font-mono pt-0.5 peer ... border-b-2 
                focus:outline-none w-full "
                placeholder=' '
            />
            <label 
            htmlFor="username"
            className='
            rounded px-1 text-xs font-mono ml-0 absolute 
            peer-placeholder-shown:top-1.5 -top-3/4
          text-white bg-gray-500 duration-300 ease-in-out 
            peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:border-none
            peer-placeholder-shown:bg-transparent
            '
            >Username</label>
          </div>
          
          <div className='w-full flex flex-col-reverse relative mt-7'>
            <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className=" pt-0.5 peer ... border-b-2 
                focus:outline-none w-full"
                placeholder=' '
            />
            <label 
            htmlFor="password"
            className='
            rounded px-1 text-xs font-mono ml-0 absolute 
            peer-placeholder-shown:top-1.5 -top-3/4
          text-white bg-gray-500 duration-300 ease-in-out 
            peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:border-none
            peer-placeholder-shown:bg-transparent
            '
            >Password</label>
          </div>

          <button 
          className='mr-2 border-2 w-fit rounded px-2 hover:bg-black/10 mt-3'>
          Create account</button>
          {isLoading}
          {msg}
          
          <div className='w-full text-right'>
          <Link 
          to='/chatta-app/login/'
          className=' text-gray-400 underline p-1 hover:no-underline'
          >Login</Link>
        </div>
          
        </form>
    </div>
  )
}

export default Register
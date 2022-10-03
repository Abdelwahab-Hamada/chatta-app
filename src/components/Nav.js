import { NavLink,useLocation,useNavigate,} from "react-router-dom";

import { useMutation } from '@apollo/client'

import logoutMutation from "../gql/mutations/logout";

const Nav = () => {  
  const location = useLocation();
  const [logout]=useMutation(logoutMutation)
  const navTo=useNavigate()

  let content
  if (location.pathname === '/chatta-app/chats/' 
  || location.pathname === '/chatta-app/users/'){
  content= (
    
    <div className='flex gap-1 justify-between mb-3'>
      <div className="flex bg-slate-200 rounded">        
        <NavLink 
        to='/chatta-app/users/'
        className={({isActive}) =>'border rounded p-1 '+(
        isActive 
        ? "bg-white border border-slate-200 font-semibold" 
        : "bg-slate-200 hover:font-semibold")}
        >
            <h1>Others</h1>
        </NavLink>
        <NavLink 
        to='/chatta-app/chats/'
        className={({isActive}) =>'border rounded p-1 '+(
        isActive 
        ? "bg-white border border-slate-200 font-semibold" 
        : "bg-slate-200 hover:font-semibold")}
        >
            <h1>Friends</h1>
        </NavLink>
      </div>
      <img alt="Chatta Logo" className=" w-32" src={process.env.PUBLIC_URL+"/logo192.png"} />
      <button
        onClick={async ()=>{
                try{
                    const {data}=await logout()
                    localStorage.setItem("logged", false)
                    navTo('/chatta-app/login/')
                }catch(error){
                    navTo('/chatta-app/login/')
                }
            }
        }
        className=" text-gray-400 p-1 hover:underline">Logout</button>
    </div>
  )
        }
  
  return content
}

export default Nav
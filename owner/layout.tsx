import React, { ReactNode } from 'react'
import SideBar from '../Components/SideBar'

interface props {
    children: ReactNode
}

const OwnerLayout = ({ children }: props) => {
    return (
        <div className='flex'>

           <SideBar/>
           <div className='flex-1'>

            <div>{children}</div>
           </div>
        </div>
    )
}

export default OwnerLayout
//import DriverComponent from '@/app/Components/DriverComponent'
import React from 'react'
import DriverTable from './DriverTable'

function page() {
  return (
    <div className='p-10 h-screen '>
      <div tabIndex={0} className="flex justify-start p-5 items-center bg-base-200 rounded-md  shadow-lg">
        <div className=" text-xl font-extrabold">
          Driver List
        </div>
      </div>
      <div className='mt-10'>
            
     
      </div>
      <div className='mt-5 p-5'>
      <DriverTable/>
      </div>
    </div>
  )
}

export default page
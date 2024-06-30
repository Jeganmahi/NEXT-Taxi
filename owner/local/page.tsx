import LocalComponent from '@/app/Components/LocalComponent'
import React from 'react'
import LocalTable from './LocalTable'
import { PrismaClient } from '@prisma/client'
import SideBar from '@/app/Components/SideBar';
const prisma  = new PrismaClient();
async function page() {
  const carData = await prisma.carInformation.findMany({
    where:{
        WorkingType:"unallocated",
    },
    select:{
        cid:true,
        LicenseNumber:true
    }
})
  return (
    <div className='flex '>
     
      <div className='flex-1 p-5'>

      <div tabIndex={0} className="flex justify-start p-5 items-center bg-base-200 rounded-md  shadow-lg">
        <div className=" text-xl font-extrabold">
          Local Routes
        </div>
      </div>
      <div className='mt-10'>
          <LocalComponent carData={carData}/>
      </div>
      <div className='mt-5 p-5'>
        <LocalTable/>
      </div>
      </div>
    </div>
  )
}

export default page
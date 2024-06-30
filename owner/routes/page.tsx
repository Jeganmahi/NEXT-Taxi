import RouteComponent from '@/app/Components/RouteComponent'
import React from 'react'
import RoutesTable from './RoutesTable'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
async function page() {
  const data = await prisma.carInformation.findMany({
    where:{
      WorkingType:"unallocated"
    },
    select:{
      cid:true,
      LicenseNumber:true
    }
  })

  return (
    <div className='p-10 h-screen '>
      <div tabIndex={0} className="flex justify-start p-5 items-center bg-base-200 rounded-md  shadow-lg">
        <div className=" text-xl font-extrabold">
          ADD ROUTES
        </div>
      </div>
      <div className='mt-10'>
          <RouteComponent carData={data}/>
      </div>
      <div className='mt-5 p-5'>
        <RoutesTable/>
      </div>
    </div>
  )
}

export default page
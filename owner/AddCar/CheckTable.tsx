import React from 'react'
import { PrismaClient } from '@prisma/client'
import { DeleteData } from '@/app/Components/Button';
import UpdateData from '@/app/Components/Button';
const prisma = new PrismaClient();
async function CheckTable() {

  const data = await prisma.carInformation.findMany({
    where:{
      cid: {
        gt:0
      }
    }
  });
  const checkStatus = async(id:Number) => {
    console.log(id)
    const Did = parseInt(id)
    console.log(id)
    if(Did === 0 || Did === null){
      return <span className='badge badge-error'> unallocated</span>
    }
    else{
      const data = await prisma.driverList.findFirst({
        where:{
          Did:Did
        },
        select:{
          Name:true
        }
      })
      return <span className='badge badge-success'>{data?.Name}</span>
    }
    
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
  <thead className="border-b border-gray-200">
    <tr>
      <th scope="col"></th>
      <th scope="col" className="text-left">Registration Number</th>
      <th scope="col" className="text-left">Driver Name</th>
      <th scope="col" className="text-left">Current Status</th>
      <th scope="col" className="text-left">Working Type</th>
      <th scope="col" className="text-right">Action</th>
    </tr>
  </thead>

  <tbody>
    {data.map((data, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{data.LicenseNumber}</td>
          <td>{checkStatus(data.DriverId)}</td>
          <td>{data.CurrentStatus}</td>
          <td>{data.WorkingType}</td>
          <td className="whitespace-nowrap py-3 pl-6 pr-3">
            <div className="flex justify-end gap-3">
              <div className="inline-block">
                <UpdateData id={data.cid} />
              </div>
              <div className="inline-block">
                <DeleteData id={data.cid} />
              </div>
            </div>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

    </div>
  )
}

export default CheckTable
import LandingNavBar from '@/app/Components/LandingNavBar';
import React from 'react'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
interface props {
    params:{slug: string[]}
}


async function page({params: {slug}}:props) {
    const start = slug[0];
    const end = slug[1];
    const date = slug[2];
    const Class = slug[3];
    const person = parseInt(slug[4]);
    
    const data = await prisma.routesInfo.findMany({
        where:{
          StartingPoint:start,
          EndingPoint:end,
          CarInformation:{
            CurrentStatus:"rest",
            Class:Class,
            SeatingCount:{
                gte:person
            },
        
            
          },

        },
        
    })
    const findCarNum = async (id:String) => {
        const data = await prisma.carInformation.findFirst({
            where:{
                cid:id
            },
            select:{
                LicenseNumber:true
            }
        })
        return data?.LicenseNumber
    }
  return (
    <div>
        <LandingNavBar/>
        <div className="overflow-x-auto p-20 bg-white">
            <table className="table">
                <thead className="border-b border-gray-200">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col" className="text-left">Starting point</th>
                        <th scope="col" className="text-left">Ending Point</th>
                        <th scope="col" className="text-left">Fare</th>
                        <th scope="col" className="text-left">Registration Number</th>

                        <th scope="col" className="text-left">Status</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data.map((data, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.StartingPoint}</td>
                                <td>{data.EndingPoint}</td>
                                <td>{data.Fare}</td>
                                <td>{findCarNum(data.carId)}</td>
                                <td>{data.Status}</td>
                                <td className='flex justify-center'>
                                    
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    </div>
  )
}

export default page
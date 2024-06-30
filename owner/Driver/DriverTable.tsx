import React from 'react'
import { PrismaClient } from '@prisma/client'
import { DeleteDriver } from '@/app/Components/Button';
const prisma = new PrismaClient();
async function DriverTable() {
    const data = await prisma.driverList.findMany();
    const findVehicleNumber = async (id: Number) => {
        if(id === 0){
            return <p> unallocated </p>
        }
        const number = await prisma.carInformation.findFirst({
            where: {
                cid: parseInt(id)
            },
            select: {
                LicenseNumber: true
            }
        })
        return number?.LicenseNumber;
    }
    
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="border-b border-gray-200">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col" className="text-left">Driver Name</th>
                        <th scope="col" className="text-left">Age</th>
                        <th scope="col" className="text-left">Blood Group</th>
                        <th scope="col" className="text-left">Car Number</th>
                        <th scope="col" className="text-left">Status</th>
                        <th scope="col" className="text-right">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((data, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.Name}</td>
                                <td>{data.Age}</td>
                                <td>{data.BloodGroup}</td>
                                <td>{
                                    findVehicleNumber(data.carId)
                                }</td>
                                <td>{data.Status}</td>
                                <td>
                                    <DeleteDriver id={data.Did}/>
                                    </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default DriverTable
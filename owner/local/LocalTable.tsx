import React from 'react'
import { PrismaClient } from '@prisma/client'
import { DeleteLocalRoute } from '@/app/Components/Button';
import { cibD3Js } from '@coreui/icons';
const prisma = new PrismaClient();
async function LocalTable() {
    const data = await prisma.localRoutes.findMany();
    const findVehicleNumber = async (id: Number) => {
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
                        <th scope="col" className="text-left">Total Hours</th>
                        <th scope="col" className="text-left">Ending Time</th>
                        <th scope="col" className="text-left">Fare</th>
                        <th scope="col" className="text-left">Vehicle Number</th>
                        <th scope="col" className="text-left">City</th>
                        <th scope="col" className="text-left">Status</th>
                        <th scope="col" className="text-right">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((data, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.TotalHours}</td>
                                <td>{data.EndingTime}</td>
                                <td>{data.FarePerDay}</td>
                                <td>{
                                    findVehicleNumber(data.carId)
                                }</td>
                                <td>{data.City}</td>

                                <td>{data.Status}</td>
                                <td>
                                    <DeleteLocalRoute id={data.RouteID} />
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default LocalTable
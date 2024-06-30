
import React from 'react'
import { redirect } from 'next/navigation'

function LongBookingTable({ tableData }) {
    console.log(tableData)
    const handleBooking = async (id) => {
        const formData = {
            id:id
        }
        const response = await fetch("http://localhost:3000/api/fetch", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          alert("you have status booked");
          redirect("/")

    }
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="border-b border-gray-200">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col" className="text-left">Starting point</th>
                        <th scope="col" className="text-left">Ending Point</th>
                        <th scope="col" className="text-left">Fare</th>

                        <th scope="col" className="text-left">Status</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData && tableData.map((data, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.StartingPoint}</td>
                                <td>{data.EndingPoint}</td>
                                <td>{data.Fare}</td>
                                <td>{data.Status}</td>
                                <td className='flex justify-center'>
                                    <button className='btn btn-info' onClick={()=>{handleBooking(data.routeID)}}>
                                        Book car
                                    </button>
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default LongBookingTable
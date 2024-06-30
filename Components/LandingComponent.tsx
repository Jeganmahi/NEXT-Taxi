
'use client'
import React, { useEffect, useState } from 'react';
import { MapPinIcon, CalendarIcon, UserIcon, FlagIcon, StarIcon } from '@heroicons/react/24/solid';
import LongBookingTable from './LongBookingTable';
import Link from 'next/link';
function LandingComponent() {
  const [TableData, setTableData] = useState([]);
  const [tableShow, setTableShow] = useState(false);
  const [formData, setFormData] = useState({
    start:"",
    end:"",
    date:"",
    person:0,
    class:""
  })
  const handleLongSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    const response = await fetch("http://localhost:3000/api/fetch", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const responseData = await response.json();
    setTableData(responseData);
    console.log(responseData);
    setTableShow(true);
  }
  
  return (
    <div>
      {/* Conditionally render BookingForm or DataTable */}
      {tableShow === false ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-2xl p-4 mx-auto">
            <div className="flex flex-col items-center">
              <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16">
                <div className="w-full max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form className="bg-white p-8 rounded-lg shadow-lg w-full" >
                      <h6 className="text-2xl font-semibold mb-6 text-gray-800">Book a Long Taxi</h6>
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <MapPinIcon className="h-6 w-6 text-blue-500" />
                          <input type="text" className="w-full border-none focus:outline-none bg-white" onChange={ (e)=> { setFormData({...formData,start:e.target.value})}} name='start' placeholder="Starting Point" />
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <FlagIcon className="h-6 w-6 text-blue-500" />
                          <input type="text" className="w-full border-none focus:outline-none bg-white" onChange={ (e)=> { setFormData({...formData,end:e.target.value})}} placeholder="Ending Point" name='end' />
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <CalendarIcon className="h-6 w-6 text-blue-500" />
                          <input type="date" className="w-full border-none focus:outline-none bg-white" onChange={ (e)=> { setFormData({...formData,date:e.target.value})}} name='date' />
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <UserIcon className="h-6 w-6 text-blue-500" />
                          <input type="number" className="w-full border-none focus:outline-none bg-white " onChange={ (e)=> { setFormData({...formData,person:e.target.value})}} name='persons' placeholder="No. of Persons" />
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <StarIcon className="h-6 w-6 text-blue-500" />
                          <input type="text" className="w-full border-none focus:outline-none bg-white" name="class" onChange={ (e)=> { setFormData({...formData,class:e.target.value})}} placeholder="Class" />
                        </div>
                      </div>
                      <Link href={`/book/${formData.start}/${formData.end}/${formData.date}/${formData.class}/${formData.person}`}>
                      <button type="submit"  className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">Search</button>
                      </Link>
                    </form>
                    <form className="bg-white p-8 rounded-lg shadow-lg w-full">
                      <h6 className="text-2xl font-semibold mb-6 text-gray-800">Book Local Taxi</h6>
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <MapPinIcon className="h-6 w-6 text-blue-500" />
                          <input type="text" className="w-full border-none focus:outline-none bg-white" placeholder="City" />
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <FlagIcon className="h-6 w-6 text-blue-500" />
                          <input type="text" className="w-full border-none focus:outline-none bg-white" placeholder="Total Hours" />
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <CalendarIcon className="h-6 w-6 text-blue-500" />
                          <input type="date" className="w-full border-none focus:outline-none bg-white" />
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <UserIcon className="h-6 w-6 text-blue-500" />
                          <input type="number" className="w-full border-none focus:outline-none bg-white" placeholder="No. of Persons" />
                        </div>
                        <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                          <StarIcon className="h-6 w-6 text-blue-500" />
                          <input type="text" className="w-full border-none focus:outline-none bg-white" placeholder="Class" />
                        </div>
                      </div>
                      <button type="submit" className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">Search </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-10'>

          <LongBookingTable tableData={TableData}/>
                    
        </div>
      )}
    </div>
  );
};


export default LandingComponent;

import React from 'react'
import CheckTable from './CheckTable'
import SideBar from '@/app/Components/SideBar'
function page() {
    return (
        <div className='mt-10 p-5'>
            <div tabIndex={0} className="flex justify-start p-5 items-center bg-base-200 rounded-md  shadow-lg">
                <div className=" text-xl font-extrabold">
                    List of cars
                </div>
            </div>

            <div className='mt-10 p-5'>

                <CheckTable />
            </div>
        </div>
    )
}

export default page
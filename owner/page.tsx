import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import DashCard from '../Components/DashCard'
import { PrismaClient } from '@prisma/client'
import BookingTable from './BookingTable'
import SideBar from '../Components/SideBar'
const prisma = new PrismaClient();

async function page() {
  const session = await getServerSession(authOptions)
  const email = session && session.user.email
  const countRoutes = await prisma.routesInfo.findMany();
  const routesLength = countRoutes.length

  const localRoutes = await prisma.localRoutes.findMany();
  const localLength = localRoutes.length

  const car = await prisma.carInformation.findMany()
  const carLength = car.length

  return (
    <div className='flex'>


      <div className='flex-1 p-5'>
        <div className="navbar bg-orange-300 shadow-md rounded-full mb-5">
          <div className="flex-1">
            <div className="btn btn-ghost text-xl">Owner DashBoard</div>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <div className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </div>
                </li>
                <li><div>Settings</div></li>
                <li>
                  <Link href="/api/auth/signout">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 p-5">
          <div>
            <DashCard name={email} title={"Welcome!"} />
          </div>
          <div>
            <DashCard name={routesLength} title={"Total Long Routes"} />
          </div>
          <div>
            <DashCard name={localLength} title={"Local Routes Count"} />
          </div>
          <div>
            <DashCard name={carLength} title={"Car Count"} />
          </div>
        </div>
        <div className='mt-5 p-10'>
          <BookingTable />
        </div>
      </div>
    </div>
  )
}

export default page

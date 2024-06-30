import React from 'react'

import { fetchCarById } from '../../request/route'
import Form from "@/app/Components/Form";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function page({ params }: { params: { id: Number } }) {
  const data = await fetchCarById(params.id);
  const driverData = await prisma.driverList.findMany({
    where: {
      carId: 0
    },
    select: {
      Name: true,
      Did: true
    }
  })
  

  return (
    <main>
      <Form data={data} DriverData={driverData} />
    </main>
  )
}

export default page
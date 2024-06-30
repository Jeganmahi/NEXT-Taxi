import Image from "next/image";
import Link from "next/link";
import LandingComponent from "./Components/LandingComponent";
import LandingNavBar from "./Components/LandingNavBar";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
const prisma  = new PrismaClient();

export default async function Home() {
  
  const authSession = await getServerSession();
  const email =  authSession.user.email;
  const ownerData = await prisma.user.findFirst({
    where:{
      email:email
    },
    select:{
      role:true
    }
  })
  const role = ownerData.role;
  console.log(role)
  if(role === "owner"){
    redirect("/owner");
  }
  else{
    redirect("/");
  }

  


  return (
    <main className="min-h-screen " data-theme="cupcake">
      <LandingNavBar/>
      

      <LandingComponent/>
      
    </main>
  );
}

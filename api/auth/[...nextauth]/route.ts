
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name:"credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(Credentials, req) {
               
                
                if (!Credentials?.username || !Credentials.password) {
                    
                    return null;    
                }
                const data = await prisma.user.findUnique({ where: { email: Credentials.username } });
                console.log(data)
                if (!data) {
                    return null;
                }
               
               

                const passwordmatch = await bcrypt.compare(Credentials.password, data.hashedPassword!);
                

                return passwordmatch ? data : null;
            },
            
        }),
    ],
  
    pages:{
        signIn:"/login"
    }
}


export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

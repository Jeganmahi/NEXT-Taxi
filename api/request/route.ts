'use server';
import { revalidatePath } from "next/cache";
import { Prisma, PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { connect } from "http2";
const primsa = new PrismaClient();

export async function handleCarDataSubmit(formData: FormData) {
    const make = formData.get("make");
    const model = formData.get("model");
    const year = formData.get("year");
    const RegNo = formData.get("RegNo");
    const EngineNumber = formData.get("EngineNumber");
    const DoorCount = formData.get("DoorCount");
    const SeatingCapacity = formData.get("SeatingCapacity");
    const Class = formData.get("class");
    const color = formData.get("Color");
    const image = formData.get("imageId")

    const data = await primsa.carInformation.create({
        data: {
            Make: make,
            Model: model,
            Year: year,
            LicenseNumber: RegNo,
            DoorCount: DoorCount,
            Class: Class,
            SeatingCount: parseInt(SeatingCapacity),
            Color: color,
            EngineNumber: EngineNumber,
            RCImage:image

        }
    })
    revalidatePath("/owner/AddCar");

}
export async function fetchCarById(id: Number) {
    const data = await primsa.carInformation.findFirst({
        where: {
            cid: parseInt(id)
        }
    })

    return data;
}

export async function updateCarData(id: string, formData: FormData) {
    
   

    const data = await primsa.carInformation.update({
        where: {
            cid: parseInt(id)
        },
        data: {
            Make: formData.get("make"),
            Year: formData.get("year"),
            LicenseNumber: formData.get("regno"),
            EngineNumber: formData.get("engineNumber"),
            Color: formData.get("color"),
            DoorCount: formData.get("doorcount"),
            SeatingCount: parseInt(formData.get("seatCapacity")),
            DriverId: parseInt(formData.get("driver")),
            WorkingType: formData.get("workingType"),
            CurrentStatus: formData.get("current"),
            DriverStatus:"allocated"
        }
    })
    const Did = parseInt(formData.get("driver"));
    console.log(Did)
    if(Did > 0){
        const updateData = await primsa.driverList.update({
            where:{
                Did:Did
            },
            data:{
                carId:id,
                carAllocation:"allocated"
            }
        })
    }
    revalidatePath("/owner/Addcar");
    redirect("/owner/AddCar");
}

export async function DeleteCar(id: Number) {
    const data = await primsa.carInformation.delete({
        where: {
            cid: parseInt(id)
        }
    })
    revalidatePath("/owner/AddCar")

}
export async function DeleteDriverData(id: Number) {
    const data = await primsa.driverList.delete({
        where: {
            Did: parseInt(id)
        }
    })
    revalidatePath("/owner/Driver")

}
export async function DeleteRoute(id: Number) {
    const data = await primsa.routesInfo.delete({
        where: {
            RouteID: parseInt(id)
        }
    })
    revalidatePath("/owner/local")

}
export async function DeleteLocalData(id: Number) {
    const data = await primsa.localRoutes.delete({
        where: {
            RouteID: parseInt(id)
        }
    })
    revalidatePath("/owner/local")

}
export async function handleLocalSubmit(formData: FormData) {
    console.log(formData)
    
    const cid = parseInt(formData.get("cid") as string);

    const car = await primsa.carInformation.update({
        where:{
            cid:cid
        },
        data:{
            WorkingType:"local"
        }
    })

    const data = await primsa.localRoutes.create({
        data: {
            TotalHours: formData.get("totalHours"),
            EndingTime: formData.get("endingTime"),
            FarePerDay: formData.get("Fare"),
            CarInformation: {
                connect: { cid: cid }
            },
            Status: formData.get("status") as String || "notBooked"


        }
    })
    revalidatePath("/owner/local")
}
export async function handleRouteData(formData: FormData) {
    const cid = parseInt(formData.get("cid") as string);
    
    const car = await primsa.carInformation.update({
        where:{
            cid:cid
        },
        data:{
            WorkingType:"Long Routes"
        }
    })
    const data = await primsa.routesInfo.create({
        data: {
            StartingPoint: formData.get("startingPoint") as string,
            EndingPoint: formData.get("EndingPoint") as string,
            Fare: formData.get("fare") as string,
            CarInformation: {
                connect: { cid: cid }  // Connect the existing car by its ID
            },
            Status: formData.get("status") as string || "notbooked" // Use the provided status or default to "notbooked"
        }
    });
    revalidatePath("/owner/routes")

    return data;
}

export async function handleDriverData(formData: FormData) {
    
    try {
        const cid = parseInt(formData.get("carId"));
        let carAllocation;
        if(cid == 0){
             carAllocation = "unallocated"
        }
        else{
             carAllocation = "allocated"
        }
        const data = await primsa.driverList.create({
            data: {
                Name: formData.get("Name"),
                Age: parseInt(formData.get("Age")),
                BloodGroup: formData.get("BloodGroup"),

                Status: "rest",
                carId:cid,
                carAllocation:carAllocation
            }
        });
        revalidatePath("/owner/Driver");
    } catch (error) {
        console.error("Error creating driver data:", error);
        // Handle error accordingly, e.g., return a response or throw an error
    }
}

export async function handleLong(formData:FormData){
    console.log(formData)
}


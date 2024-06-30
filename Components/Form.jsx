import React from "react";
import { updateCarData } from "../api/request/route";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import ImageComponent from "./ImageComponent";
const prisma = new PrismaClient();
function Form({ data, DriverData }) {
  const updateCarDataBind = updateCarData.bind(null, data.cid);
  console.log(data);
  const findName = async (id) => {
    if (id === 0) {
      return "Unallocated";
    }
    const data = await prisma.driverList.findFirst({
      where: {
        Did: id,
      },
      select: {
        Name: true,
      },
    });
    return data.Name;
  };
  return (
    <div className="flex justify-center items-center align-middle h-screen bg-gray-100">
      <div className="card w-full max-w-4xl h-auto p-6 flex flex-col rounded-lg shadow-lg bg-white">
        <form
          action={updateCarDataBind}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <label className="input input-bordered flex items-center gap-2">
            Car Id
            <input
              type="text"
              className="grow"
              defaultValue={data.cid}
              placeholder="Daisy"
              name="carId"
              disabled
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Year
            <input
              type="text"
              className="grow"
              defaultValue={data.Year}
              placeholder="Year"
              name="year"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Model
            <input
              type="text"
              className="grow"
              defaultValue={data.Model}
              placeholder="Model"
              name="model"
            />
          </label>
          
          <label className="input input-bordered flex items-center gap-2">
            Make
            <input
              type="text"
              className="grow"
              defaultValue={data.Make}
              placeholder="Model"
              name="make"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Registration Number
            <input
              type="text"
              className="grow"
              defaultValue={data.LicenseNumber}
              placeholder="Reg No"
              name="regno"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Engine Number
            <input
              type="text"
              className="grow"
              defaultValue={data.EngineNumber}
              placeholder="Engine Number"
              name="engineNumber"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Color
            <input
              type="text"
              className="grow"
              defaultValue={data.Color}
              placeholder="Color"
              name="color"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Door Count
            <input
              type="text"
              className="grow"
              defaultValue={data.DoorCount}
              placeholder="Door count"
              name="doorcount"
            />
          </label>
          <ImageComponent/>
          <select
            className="select select-bordered w-full max-w-xs"
            name="driver"
          >
            <option disabled selected>
              Driver name
            </option>
            {DriverData.map((driver) => (
              <option key={driver.Did} value={driver.Did}>
                {driver.Name}
              </option>
            ))}
          </select>
          <label className="input input-bordered flex items-center gap-2">
            Seating Count
            <input
              type="text"
              className="grow"
              defaultValue={data.SeatingCount}
              placeholder="Seat capacity"
              name="seatCapacity"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Working Type
            <input
              type="text"
              className="grow"
              defaultValue={data.WorkingType}
              placeholder="Daisy"
              name="workingType"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Current
            <input
              type="text"
              className="grow"
              defaultValue={data.CurrentStatus}
              placeholder="Daisy"
              name="current"
              disabled
            />
          </label>
          <div className="col-span-full flex justify-end gap-4 mt-4">
            <Link href="/owner/AddCar">
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </Link>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;

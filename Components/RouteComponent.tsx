'use client';
import React, { useState, useEffect } from 'react';
import { handleRouteData } from '../api/request/route';
function RouteComponent({ carData }) {
    console.log(carData)
    const [data, setData] = useState({
        startingPoint: "",
        EndingPoint: "",
        fare: 0,
        RegNo: "",
        cid: 0,
        status: ""
    });

    const [driverData, setDriverData] = useState([]);



    const handleSubmit = () => {
        const formData = new FormData();

        // Append each field to the FormData object
        for (const key in data) {
            formData.append(key, data[key]);
        }

        handleRouteData(formData);
        document.getElementById('my_modal_4')?.close();
    };

    return (
        <div className='flex justify-end'>
            <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>Add Route</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl justify-start">
                    <form method="dialog" className="grid grid-cols-2 gap-6 justify-center items-center">
                        <div>
                            <div className="label">
                                <span className="label-text">Starting Point</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs mb-5"
                                required
                                value={data.startingPoint}
                                onChange={(e) => setData({ ...data, startingPoint: e.target.value })}
                            />
                        </div>
                        <div>
                            <div className="label">
                                <span className="label-text">Ending Point</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs mb-5"
                                required
                                value={data.EndingPoint}
                                onChange={(e) => setData({ ...data, EndingPoint: e.target.value })}
                            />
                        </div>
                        <div>
                            <div className="label">
                                <span className="label-text">Fare</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs mb-5"
                                required
                                value={data.fare}
                                onChange={(e) => setData({ ...data, fare: e.target.value })}
                            />
                        </div>
                        <div>
                            <div className="label">
                                <span className="label-text">VehicleId</span>
                            </div>
                            <select
                                className="input input-bordered w-full max-w-xs mb-5"
                                required
                                value={data.cid}
                                onChange={(e) => setData({ ...data, cid: e.target.value })}
                            >
                                <option value="" disabled>Select a Vehicle</option>
                                {carData.map((data) => (
                                    <option key={data.cid} value={data.cid}>{data.LicenseNumber}</option>
                                ))}
                            </select>
                        </div>
                        <button type="button" className="btn col-span-3" onClick={handleSubmit}>Add Route</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default RouteComponent;

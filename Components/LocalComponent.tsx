'use client';
import React from 'react'
import { useState } from 'react';
import { handleLocalSubmit } from '../api/request/route';
function LocalComponent({ carData }) {
    const [data, setData] = useState({
        cid: 0,
        totalHours: "",
        endingTime: "",
        Fare: "",
        status: "",

    })
    const handleSubmit = () => {
        const formData = new FormData();

        // Append each field to the FormData object
        for (const key in data) {
            formData.append(key, data[key]);
        }
        handleLocalSubmit(formData);
        document.getElementById('my_modal_4')?.close()

    }
    return (
        <div className='flex justify-end'>

            <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>Add</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl justify-start">



                    <form method="dialog" className="grid grid-cols-2 gap-6 justify-center items-center" >

                        <div>
                            <div className="label">
                                <span className="label-text">Total Hours Per Day</span>
                            </div>
                            <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" required value={data.totalHours} onChange={(e) => { setData({ ...data, totalHours: e.target.value }) }} />
                        </div>
                        <div>
                            <div className="label">
                                <span className="label-text">Ending Time</span>
                            </div>
                            <input type="time" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={data.endingTime} onChange={(e) => { setData({ ...data, endingTime: e.target.value }) }} required />
                        </div>
                        <div>
                            <div className="label">
                                <span className="label-text">Total Fare</span>
                            </div>
                            <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={data.Fare} onChange={(e) => { setData({ ...data, Fare: e.target.value }) }} required />
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





                        <button type="button" className="btn col-span-3" onClick={handleSubmit}>Submit</button>

                    </form>


                </div>
            </dialog>
        </div>
    )
}

export default LocalComponent
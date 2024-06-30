'use client';
import React, { useState,useRef,useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { handleCarDataSubmit } from '../api/request/route';

function CarComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imageUploadRef = useRef(null); // Reference to the upload widget
    const [data, setData] = useState({
        make: "",
        model: "",
        year: 0,
        RegNo: "",
        EngineNumber: "",
        DoorCount: 0,
        SeatingCapacity: 0,
        class: "",
        entertainment: false,
        ac: false,
        color: "",
        imageId: ""
    });
    useEffect(() => {
        imageUploadRef.current?.clearStoredFiles(); // Clear any pre-selected files
      }, [isModalOpen]); // Clear on modal open/close

    const handleSubmit = () => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        handleCarDataSubmit(formData);
        setIsModalOpen(false);
    };
    const handleImageUpload = (result) => {
        if (result.event !== "success") return;
    
        const info = result.info;
        return new Promise((resolve) => {
          setData((prevData) => ({ ...prevData, imageId: info.public_id }));
          resolve(); // Signal state update completion
        });
      };

    return (
        <div className='flex justify-end'>
            <button className="btn" onClick={() => setIsModalOpen(true)}>Add Car</button>
            {isModalOpen && (
                <dialog id="my_modal_4" className="modal" open>
                    <div className="modal-box w-11/12 max-w-5xl justify-start">
                        <form method="dialog" className="grid grid-cols-2 gap-6 justify-center items-center">
                            <div>
                                <div className="label">
                                    <span className="label-text">Car Make</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" required value={data.make} onChange={(e) => { setData({ ...data, make: e.target.value }) }} />
                            </div>
                            <div>
                                <div className="label">
                                    <span className="label-text">Car Model</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" required value={data.model} onChange={(e) => { setData({ ...data, model: e.target.value }) }} />
                            </div>
                            <div>
                                <div className="label">
                                    <span className="label-text">Year</span>
                                </div>
                                <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={data.year} onChange={(e) => { setData({ ...data, year: e.target.value }) }} required />
                            </div>
                            <div>
                                <div className="label">
                                    <span className="label-text">Vehicle Number</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={data.RegNo} onChange={(e) => { setData({ ...data, RegNo: e.target.value }) }} required />
                            </div>
                            <div>
                                <div className="label">
                                    <span className="label-text">Engine Number</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={data.EngineNumber} onChange={(e) => { setData({ ...data, EngineNumber: e.target.value }) }} required />
                            </div>
                            <div>
                                <div className="label">
                                    <span className="label-text">No. of Doors</span>
                                </div>
                                <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={data.DoorCount} onChange={(e) => { setData({ ...data, DoorCount: parseInt(e.target.value) }) }} required />
                            </div>
                            <div>
                                <div className="label">
                                    <span className="label-text">Color</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={data.color} onChange={(e) => { setData({ ...data, color: e.target.value }) }} required />
                            </div>
                            <div>
                                <div className="label">
                                    <span className="label-text">Seating Capacity</span>
                                </div>
                                <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={data.SeatingCapacity} onChange={(e) => { setData({ ...data, SeatingCapacity: parseInt(e.target.value) }) }} required />
                            </div>
                            <div>
                                <div className="label">
                                    <span className="label-text">Car Class</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5" value={data.class} onChange={(e) => { setData({ ...data, class: e.target.value }) }} required />
                            </div>
                            <select className="select border-black select-ghost w-full max-w-xs" value={data.entertainment} onChange={(e) => { setData({ ...data, entertainment: e.target.value === 'Yes' }) }}>
                                <option disabled value="">Entertainment System</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <select className="select border-black select-ghost w-full max-w-xs" value={data.ac} onChange={(e) => { setData({ ...data, ac: e.target.value === 'Yes' }) }}>
                                <option disabled value="">AC System</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <CldUploadWidget uploadPreset="szjnhppm" style={{ zIndex: 9999 }}
                                ref={imageUploadRef} // Assign the ref
                                onUploadAdded={handleImageUpload} 
                                >
                                {({ open }) => {
                                    return (
                                        <button type="button" onClick={(e) => {
                                            e.preventDefault();
                                            setIsModalOpen(false);
                                            setTimeout(() => {
                                                open();
                                            }, 100); // Small timeout to ensure state updates
                                        }} className="btn btn-success" style={{ zIndex: 9999 }}>
                                            Upload an Image
                                        </button>
                                    );
                                }}
                            </CldUploadWidget>
                            <button type="button" className="btn col-span-3" onClick={handleSubmit}>Add Car</button>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
}

export default CarComponent;

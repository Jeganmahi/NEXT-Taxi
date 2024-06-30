'use client';
import React from 'react';
import LandingNavBar from '../Components/LandingNavBar';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
function page({ searchParams }) {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signIn("credentials", {
            username: inputs.username,
            password: inputs.password,
            callbackUrl: "/",
        });
    };

    return (
        <div>
            <LandingNavBar />
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-white w-[1090px] h-[600px] flex justify-between items-center p-4'>
                    <div>
                        <img
                            src="/logo.jpg"
                            alt="Image"
                            className="h-[400px] w-[600px] object-cover"
                        />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label className="input input-bordered flex items-center gap-2 mb-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path
                                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input type="text" className="grow" name="username" onChange={handleChange} value={inputs.username || ""} placeholder="Email" />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd" />
                                    </svg>
                                    <input type="password" className="grow" onChange={handleChange} value={inputs.password} name='password' />
                                </label>


                                <button className="btn btn-success w-64 mt-5">Success</button>

                            </div>
                        </form>
                        {searchParams.error && (
                            <div
                                role="alert"
                                className="mt-2 alert alert-danger text-danger text-center text-capitalize"
                            >
                                Login failed.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;

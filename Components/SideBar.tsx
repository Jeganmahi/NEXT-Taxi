import React from 'react';
import routesArray from './routesArray';
import Link from 'next/link';

function SideBar() {
  return (
    <div className='flex flex-col min-h-screen bg-orange-400 w-52'>
      <div className='p-5 flex-grow'>
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
          <img src="/logo.jpg" alt="Logo" />
        </div>
        <div className="divider divider-success">Success</div>
        <div className='mt-28'>
          <ul>
            {routesArray.map((route, index) => (
              <li key={index} className='mb-5 flex items-center'>
                <Link href={route.path}>
                  <div className="text-black hover:text-gray-300 flex items-center">
                    <route.icon className='h-5 w-5 mr-2' />
                    <div className="text-xl">{route.text}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='p-5'>
        <button className='bg-red-500 text-white w-full py-2 rounded-lg'>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;

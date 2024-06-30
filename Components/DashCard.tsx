import React from 'react'

function DashCard({name,title}) {
  return (
    <div>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <div className='flex justify-end'>

              <p>{name}</p>
              </div>
              
            </div>
          </div>
    </div>
  )
}

export default DashCard
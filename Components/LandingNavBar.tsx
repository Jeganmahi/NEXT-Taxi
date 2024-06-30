import React from 'react'
import "../global.css"
import Link from 'next/link'
function LandingNavBar() {
  return (
    <div className="navbar bg-orange-300 flex items-center justify-between">
        <a className="btn btn-ghost text-xl">
          Online cab booking
        </a>
        <div className="flex items-center">  {/* Group logo and contact info */}
          <div className="ml-12" style={{ width: "100px", height: "30px" }}>
            <img style={{ height: "30px" }} src="/logo.jpg" />
          </div>
          <span className="badge badge-success ml-4">
            contact: +91 807277281
          </span>
          <span className="badge badge-error ml-4">
            contact: jeganvc2004@gmail.com
          </span>
        </div>
        <Link href="/login">
          <button className="btn btn-primary">Login</button>  {/* Remove justify-end */}
        </Link>
      </div>
  )
}

export default LandingNavBar
import React from 'react'
import {Link} from "react-router-dom"
import "./header.css"
function Header() {
    return (
        <>
            <div className="header-main-container">
                <nav>
                    <div className="logo-container">
                        <h2>Documnet Mangement</h2>
                    </div>
                    <ul>
                        <Link to='/view-my-docs'>View My Docs</Link>
                        <Link>View All Docs</Link>
                        <Link>Account</Link>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Header
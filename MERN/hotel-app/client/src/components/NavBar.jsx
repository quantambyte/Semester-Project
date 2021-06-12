import React from 'react'

// for conditional rendering
import { useSelector , useDispatch } from 'react-redux'

// useHistory hook
import { useHistory } from 'react-router'

// importing link
import { Link } from 'react-router-dom'

const NavBar = () => {

    const { auth } = useSelector( (state) => ({ ...state}))

    const dispatch = useDispatch()
    const history = useHistory()

    // logout
    const logOut = () => {

        dispatch( {
            type: 'LOGOUT',
            payload: null
        })

        window.localStorage.removeItem('auth')
        history.push('/')
        
    }

    return (
        <div className = "nav bg-dark d-flex justify-content-between p-3 stick-top">

            <Link className = 'navbar-brand' to = '/'>Hotel App</Link>

            <Link className = 'nav-link' to = '/'>
                Home
            </Link>

            { auth === null && (
                <>
                    <Link className = 'nav-link' to = '/login'>
                        LogIn
                    </Link>

                    <Link className = 'nav-link' to = '/signup'>
                        Sign Up
                    </Link>
                </>
            )}

            { auth !== null && (
                <>
                    <Link className= 'nav-link pointer' to = '' onClick = {logOut}>
                        Log Out
                    </Link>
                </>
            ) }
        </div>
    )
}

export default NavBar

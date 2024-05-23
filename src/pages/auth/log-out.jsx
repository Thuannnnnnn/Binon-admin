import React from 'react'
import { useCookies } from 'react-cookie';
function logOut() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    
    return (
        <div className='flex justify-center align-middle'>
            
        </div>
    )
}

export default logOut

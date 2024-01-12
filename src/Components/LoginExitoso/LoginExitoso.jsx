import React from 'react'
import { Link, useLocation } from 'react-router-dom'; 

export const LoginExitoso = () => {
    const location = useLocation();
    const email = location.state?.email; 
  return (
    <div>
        <div>
    <h1>Inicio</h1>
    {email && <p>Email del usuario: {email}</p>} 
    <Link to="/">Volver al inicio</Link>
  </div>
    </div>
  )
}

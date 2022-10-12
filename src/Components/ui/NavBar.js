import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar({title}) {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link
                to='/'
                className="navbar-brand"
                tabIndex={0} 
                aria-label='ir a inicio'
                >
                {title}                                
            </Link>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <NavLink
                        to='/estados'
                        tabIndex={1}
                        className="nav-item nav-link"                    
                    >
                        Estados
                    </NavLink>
                    <NavLink
                        to='/inventarios'
                        tabIndex={2}
                        className="nav-item nav-link"                    
                    >
                        Inventarios
                    </NavLink>
                    <NavLink
                        to='/marcas'
                        tabIndex={3}
                        className="nav-item nav-link"                    
                    >
                        Marcas
                    </NavLink>
                    <NavLink
                        to='/tiposequipos'
                        tabIndex={4}
                        className="nav-item nav-link"                    
                    >
                        Tipos de Equipos
                    </NavLink>
                    <NavLink
                        to='/usuarios'
                        tabIndex={5}
                        className="nav-item nav-link"                    
                    >
                        Usuarios
                    </NavLink>
                 </ul>               
            </div>
        </div>
    </nav>
  )
}

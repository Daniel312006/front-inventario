import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from '../Components/ui/NavBar'
import TipoEquipos from '../Components/tiposequipos/TipoEquipos';
import Estados from '../Components/estados/Estados';
import Marcas from '../Components/marcas/Marcas';
import Usuarios from '../Components/usuarios/Usuarios';
import Inventarios from '../Components/inventarios/Inventarios';
import NotFound from '../Components/ui/NotFound';


export default function AppRouter() {
  return (
    <div>
        <NavBar title={'IE EL ROSARIO'}/>
        <main className='container'>
            <Routes>
                <Route path= '/' element={<Inventarios />}/>
                <Route path= '/tiposequipos' element={<TipoEquipos />}/>
                <Route path= '/estados' element={<Estados />}/>
                <Route path= '/marcas' element={<Marcas />}/>
                <Route path= '/usuarios' element={<Usuarios />}/>
                <Route path= '/inventarios' element={<Inventarios />}/>
                <Route path= '*' element={<NotFound />}/>
            </Routes>                 
        </main>        
       
    </div>
  )
}

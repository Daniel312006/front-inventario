import { axiosConfig } from "../configuration/axiosConfig"
/** 
 * Obtener todos los equipos
*/
const getMarcas = (estado = true) => {
    return axiosConfig.get('marcas?estado='+estado, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Crear un tipo 
*/
const createMarca = (data) => {
    return axiosConfig.post('marcas', data, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Actualizar por ID un equipo
*/
const updateMarca = (id, data) => {
    return axiosConfig.put('marcas/'+id, data, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Borra por ID un equipo
*/
const deleteMarca = (id) => {
    return axiosConfig.delete('marcas/'+id, {}, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

/** 
 * Consultar un equipo por ID
*/
const getMarcaById = (id) => {
    return axiosConfig.get('marcas/'+id, {}, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

export {
    getMarcas, getMarcaById, createMarca, updateMarca, deleteMarca
}
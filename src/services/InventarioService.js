import { axiosConfig } from "../configuration/axiosConfig"
/** 
 * Obtener todos los equipos
*/
const getInventarios = () => {
    return axiosConfig.get('inventarios', {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Crear un tipo 
*/
const createInventario = (data) => {
    return axiosConfig.post('inventarios', data, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Actualizar por ID un equipo
*/
const updateInventario = (id, data) => {
    return axiosConfig.put('inventarios/'+id, data, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Borra por ID un equipo
*/
const deleteInventario = (id) => {
    return axiosConfig.delete('inventarios/'+id, {}, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

/** 
 * Consultar un equipo por ID
*/
const getInventarioPorId = (id) => {
    return axiosConfig.get('inventarios/'+id, {}, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

export {
    getInventarios, getInventarioPorId, createInventario, updateInventario, deleteInventario
}
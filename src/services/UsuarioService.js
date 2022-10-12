import { axiosConfig } from "../configuration/axiosConfig"
/** 
 * Obtener todos los equipos
*/
const getUsuarios = (estado = true) => {
    return axiosConfig.get('usuarios?estado='+estado, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Crear un tipo 
*/
const createUsuario = (data) => {
    return axiosConfig.post('usuarios', data, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Actualizar por ID un equipo
*/
const updateUsuario = (id, data) => {
    return axiosConfig.put('usuarios/'+id, data, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Borra por ID un equipo
*/
const deleteUsuario = (id) => {
    return axiosConfig.delete('usuarios/'+id, {}, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

/** 
 * Consultar un equipo por ID
*/
const getUsuarioById = (id) => {
    return axiosConfig.get('usuarios/'+id, {}, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

export {
    getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario
}
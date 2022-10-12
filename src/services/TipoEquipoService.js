import { axiosConfig } from "../configuration/axiosConfig"
/** 
 * Obtener todos los equipos
*/
const obtenerTiposEquipos = (estado = true) => {
    return axiosConfig.get('tipoequipos?estado='+estado, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Crear un tipo 
*/
const crearTipoEquipo = (data) => {
    return axiosConfig.post('tipoequipos', data, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Actualizar por ID un equipo
*/
const editarTipoEquipoPorId = (tipoId, data) => {
    return axiosConfig.put('tipoequipos/'+tipoId, data, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
/** 
 * Borra por ID un equipo
*/
const borrarTipoEquipoPorId = (tipoId) => {
    return axiosConfig.delete('tipoequipos/'+tipoId, {}, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

/** 
 * Consultar un equipo por ID
*/
const obtenerTipoEquipoPorId = (tipoId) => {
    return axiosConfig.get('tipoequipos/'+tipoId, {}, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
export {
    obtenerTiposEquipos,
    crearTipoEquipo,
    editarTipoEquipoPorId,
    borrarTipoEquipoPorId,
    obtenerTipoEquipoPorId
}
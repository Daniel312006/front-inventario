import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from '../../services/UsuarioService'
import HeaderTable from '../ui/HeaderTable'
import ModalUsuario from '../ui/ModalUsuario.js'
import Swal from 'sweetalert2'

export default function Marcas() {

  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    estado: true
  })

  const [errorSend, setErrorSend] = useState({
    status: false,
    msg: ''
  })

  const listarUsuarios = async () => {
    setLoading(true)
    try {
      setError(false)
      const { data } = await getUsuarios(query)
      setUsuarios(data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    listarUsuarios();
  }, [query])

  const cambiarSwitche = () => {
    setQuery(!query)
  }

  const guardarUsuario = async () => {
    setErrorSend({ status: false, msg: '' })
    setLoading(true)
    try {
      const res = await createUsuario(usuario)
      console.log(res)
      setLoading(true)
      setUsuario({ nombre: '', email: '' })
      listarUsuarios()
    } catch (e) {
      const { status, data } = e.response;
      setErrorSend({ status: true, msg: data.msg })
      console.log(e)
      setLoading(false)
    }
  }

  const handleChange = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const borrarUsuario = async (e) => {
    setLoading(true)
    try {
      setError(false)
      const id = e.target.id
      Swal.fire({
        title: "Eliminar",
        text: "Desea eliminar el usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
      }).then ((result) => {
        if (result.isConfirmed) {
          deleteUsuario(id).then((res) => {
            if (res.status === 204) {
              Swal.fire({
                title: "Eliminado",
                icon: "success",
                text: "Usuario eliminado"
              })
              listarUsuarios();
            } else {              
              Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al aliminar el usuario"
              })
            }
          })
        }
      })
      setLoading(false)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  const editarUsuario = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      setError(false)
      const resp = await updateUsuario(usuario._id, usuario);
      console.log(resp)
      resetUsuario()
      listarUsuarios()
    } catch (e) {
      setLoading(false)
      console.log(e)
      setError(true)
    }
  }

  function setUsuarioPorId(e) {
    console.log(e.target.id)
    const usuariosFilter = usuarios.filter(t => t._id == e.target.id)
    const usuario = usuariosFilter[0]
    console.log(usuario)
    setUsuario(usuario)
  }

  const resetUsuario = () => {
    setUsuario({
      nombre: '',
      email: '',
      estado: true
    })
  }

  return (
    <div>
      <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModal2Label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModal2Label">Editar Usuario</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetUsuario}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={editarUsuario}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="nombre"
                    onChange={handleChange}
                    value={usuario.nombre}
                    name="nombre"
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor="email" className="col-form-label">Email:</label>
                  <input
                    type={'email'}
                    className="form-control mb-3"                    
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor="estado" className="col-form-label">Estado:</label>
                  <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    name="estado"
                    value={usuario.estado}
                    onChange={handleChange}
                  >
                    <option value={false}>Inactivo</option>
                    <option value={true}>Activo</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={resetUsuario}
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={usuario.nombre.length <= 0}
                  data-bs-dismiss="modal"
                >
                  Enviar
                </button>
              </form>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
      <ModalUsuario
        titulo={'Nuevo Usuario'}
        guardar={guardarUsuario}
        element={usuario}
        change={handleChange}
      />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Nuevo
      </button>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={query}
          onChange={cambiarSwitche}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">( Inactivo / Activo )</label>
      </div>
      {
        loading &&
        (<div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>)
      }
      {errorSend.status && (
        <div className="alert alert-danger" role="alert">
          {errorSend.msg}
        </div>)
      }
      {
        error && (
          <div className="alert alert-danger" role="alert">
            Error al cargar datos
          </div>)
      }
      <table className="table">
        <HeaderTable />
        <tbody>
          {
            usuarios.map((usuario, index) => {
              return (
                <tr key={usuario._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>{dayjs(usuario.fechaCreacion).format('YYYY-MM-DD')}</td>
                  <td>{dayjs(usuario.fechaActualizacion).format('YYYY-MM-DD')}</td>
                  <td>
                    <button
                      id={usuario._id}
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      onClick={setUsuarioPorId}
                    >
                      Editar
                    </button>
                    <button
                      id={usuario._id}
                      type="button"
                      className="btn btn-danger"
                      onClick={borrarUsuario}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { borrarEstadoPorID, crearEstado, editarEstadoPorID, obtenerEstadoPorID, obtenerEstados } from '../../services/EstadoService'
import HeaderTable from '../ui/HeaderTable'
import Modal from '../ui/Modal.js'
import Swal from 'sweetalert2'

export default function Estados() {

  const [estados, setEstados] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [estado, setEstado] = useState({
    nombre: '',
    estado: true
  })

  const [errorSend, setErrorSend] = useState({
    status: false,
    msg: ''
  })

  const listarEstados = async () => {
    setLoading(true)
    try {
      setError(false)
      const { data } = await obtenerEstados(query)
      setEstados(data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    listarEstados();
  }, [query])

  const cambiarSwitche = () => {
    setQuery(!query)
  }

  const guardarEstado = async () => {
    setErrorSend({ status: false, msg: '' })
    setLoading(true)
    try {
      const res = await crearEstado(estado)
      console.log(res)
      setLoading(true)
      setEstado({ nombre: '' })
      listarEstados()
    } catch (e) {
      const { status, data } = e.response;
      setErrorSend({ status: true, msg: data.msg })
      console.log(e)
      setLoading(false)
    }
  }

  const handleChange = e => {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value
    })
  }

  const borrarEstado = async (e) => {
    setLoading(true)
    try {
      setError(false)
      const id = e.target.id
      Swal.fire({
        title: "Eliminar",
        text: "Desea eliminar el estado?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
      }).then ((result) => {
        if (result.isConfirmed) {
          borrarEstadoPorID(id).then((res) => {
            if (res.status === 204) {
              Swal.fire({
                title: "Eliminado",
                icon: "success",
                text: "Estado eliminado"
              })
              listarEstados();
            } else {              
              Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al aliminar el estado"
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

  const editarEstado = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      setError(false)
      const resp = await editarEstadoPorID(estado._id, estado);
      console.log(resp)
      resetEstado()
      listarEstados()
    } catch (e) {
      setLoading(false)
      console.log(e)
      setError(true)
    }
  }

  function setEstadoPorId(e) {
    console.log(e.target.id)
    const estadosFilter = estados.filter(t => t._id == e.target.id)
    const estado = estadosFilter[0]
    console.log(estado)
    setEstado(estado)
  }

  const resetEstado = () => {
    setEstado({
      nombre: '',
      estado: true
    })
  }

  return (
    <div>
      <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModal2Label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModal2Label">Editar Estado</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetEstado}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={editarEstado}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="nombre"
                    onChange={handleChange}
                    value={estado.nombre}
                    name="nombre"
                  />
                  <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    name="estado"
                    value={estado.estado}
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
                  onClick={resetEstado}
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={estado.nombre.length <= 0}
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
      <Modal
        titulo={'Nuevo Estado'}
        guardar={guardarEstado}
        element={estado}
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
            estados.map((estado, index) => {
              return (
                <tr key={estado._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{estado.nombre}</td>
                  <td>{estado.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>{dayjs(estado.fechaCreacion).format('YYYY-MM-DD')}</td>
                  <td>{dayjs(estado.fechaActualizacion).format('YYYY-MM-DD')}</td>
                  <td>
                    <button
                      id={estado._id}
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      onClick={setEstadoPorId}
                    >
                      Editar
                    </button>
                    <button
                      id={estado._id}
                      type="button"
                      className="btn btn-danger"
                      onClick={borrarEstado}
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

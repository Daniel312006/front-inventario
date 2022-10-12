import React from 'react'
import notfound from './notfound.gif'

export default function NotFoud() {
  return (
    <div>
        <h2>Página no encontrada</h2>
        <img
            alt=""
            className="figure img img-fluid d-block"
            src={notfound}
            />
    </div>
  )
}

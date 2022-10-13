import React from "react"
import { Route, Routes } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';

import Estados from "./components/estados/Estados"
import Marcas from "../components/marcas/Marcas"
import Tipos from "../components/tipos/Tipos"
import Usuarios from "../components/usuarios/Usuarios"
import Inventarios from "../components/inventarios/Inventarios"
import NotFound from "../components/ui/NotFound"
import Home from "../components/ui/Home"

export default function AppRouter() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">IE EL ROSARIO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/inventarios">Inventario</Nav.Link>
                    <Nav.Link href="/Estados">Estados</Nav.Link>
                    <Nav.Link href="/Marcas">Marcas</Nav.Link>
                    <Nav.Link href="/Tipos">Tipos</Nav.Link>
                    <Nav.Link href="/Usuarios">Usuarios</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/inventarios" element={<Inventarios />} />
                    <Route path="/estados" element={<Estados />} />
                    <Route path="/marcas" element={<Marcas />} />
                    <Route path="/tipos" element={<Tipos />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    )
}
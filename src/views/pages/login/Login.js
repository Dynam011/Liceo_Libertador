import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [cedula, setCedula] = useState('')
  const [password, setPassword] = useState('')
  const [cedulaError, setCedulaError] = useState('')

  // Solo permite 8 dígitos numéricos
  const handleCedulaChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8)
    setCedula(value)
    setCedulaError(value.length === 8 ? '' : 'La cédula debe tener 8 dígitos')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cedula.length !== 8) {
      setCedulaError('La cédula debe tener 8 dígitos')
      return
    }
    // Aquí va la lógica de autenticación
  }

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-body-tertiary">
      <CContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <CRow className="justify-content-center align-items-center w-100">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4 shadow">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1 className="text-info fw-bold mb-3 text-center">Ingreso al Liceo</h1>
                    <p className="text-body-secondary mb-4 fst-italic text-center">"Formando el futuro de Venezuela"</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Cédula (8 dígitos)"
                        autoComplete="username"
                        value={cedula}
                        onChange={handleCedulaChange}
                        maxLength={8}
                        required
                      />
                    </CInputGroup>
                    {cedulaError && <div className="text-danger mb-2 text-center">{cedulaError}</div>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} className="d-grid gap-2">
                        <CButton color="info" type="submit" className="px-4 fw-bold">
                          Ingresar
                        </CButton>
                      </CCol>
                      <CCol xs={12} className="text-center mt-2">
                        <CButton color="link" className="px-0 text-info">
                          ¿Olvidaste tu contraseña?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-info py-5 d-md-block d-none" style={{ width: '44%' }}>
                <CCardBody className="text-center d-flex flex-column justify-content-center align-items-center h-100">
                  <div>
                    <h2>¡Bienvenido!</h2>
                    <p>
                      Accede a tu cuenta para gestionar estudiantes, docentes y mucho más.<br />
                      <span className="fst-italic">"Educando con valores y excelencia"</span>
                    </p>
                    <Link to="/register">
                      <CButton color="light" className="mt-3 fw-bold" active tabIndex={-1}>
                        ¿No tienes cuenta? Regístrate
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

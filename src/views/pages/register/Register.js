import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom'

const Register = () => {
  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const [cedulaError, setCedulaError] = useState('')
  const [correoError, setCorreoError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [repeatPasswordError, setRepeatPasswordError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Validaciones
  const handleCedulaChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8)
    setCedula(value)
    setCedulaError(value.length === 8 ? '' : 'La cédula debe tener 8 dígitos')
  }

  const handleCorreoChange = (e) => {
    const value = e.target.value
    setCorreo(value)
    setCorreoError(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Correo inválido'
    )
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    setPasswordError(
      value.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres'
    )
  }

  const handleRepeatPasswordChange = (e) => {
    const value = e.target.value
    setRepeatPassword(value)
    setRepeatPasswordError(
      value === password ? '' : 'Las contraseñas no coinciden'
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let valid = true

    if (cedula.length !== 8) {
      setCedulaError('La cédula debe tener 8 dígitos')
      valid = false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setCorreoError('Correo inválido')
      valid = false
    }
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres')
      valid = false
    }
    if (password !== repeatPassword) {
      setRepeatPasswordError('Las contraseñas no coinciden')
      valid = false
    }
    if (!nombre) {
      valid = false
    }
    if (!apellido) {
      valid = false
    }
    if (valid) {
      // Aquí va la lógica de registro
      setSuccessMsg('¡Usuario creado exitosamente! Ahora puedes iniciar sesión.')
      // Limpia los campos
      setCedula('')
      setNombre('')
      setApellido('')
      setCorreo('')
      setPassword('')
      setRepeatPassword('')
      setCedulaError('')
      setCorreoError('')
      setPasswordError('')
      setRepeatPasswordError('')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={12} sm={10} md={8} lg={6} xl={5}>
            <CCard className="mx-2 shadow border-0">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1 className="text-info fw-bold mb-3 text-center">Registro</h1>
                  <p className="text-body-secondary mb-4 text-center">Crea tu cuenta para el Liceo Libertador</p>
                  {successMsg && (
                    <CAlert color="success" className="text-center">
                      {successMsg}
                    </CAlert>
                  )}
                  <CRow className="g-3">
                    <CCol xs={12}>
                      <CInputGroup>
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
                      {cedulaError && <div className="text-danger mb-2">{cedulaError}</div>}
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Nombre"
                          value={nombre}
                          onChange={e => setNombre(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Apellido"
                          value={apellido}
                          onChange={e => setApellido(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      <CInputGroup>
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          placeholder="Correo electrónico"
                          autoComplete="email"
                          value={correo}
                          onChange={handleCorreoChange}
                          required
                        />
                      </CInputGroup>
                      {correoError && <div className="text-danger mb-2">{correoError}</div>}
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Contraseña"
                          autoComplete="new-password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </CInputGroup>
                      {passwordError && <div className="text-danger mb-2">{passwordError}</div>}
                    </CCol>
                    <CCol xs={12} md={6}>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Repetir contraseña"
                          autoComplete="new-password"
                          value={repeatPassword}
                          onChange={handleRepeatPasswordChange}
                          required
                        />
                      </CInputGroup>
                      {repeatPasswordError && <div className="text-danger mb-2">{repeatPasswordError}</div>}
                    </CCol>
                  </CRow>
                  <div className="d-grid mt-4">
                    <CButton color="info" type="submit" className=" fw-bold">
                      Crear Cuenta
                    </CButton>
                  </div>
                  <div className="text-center mt-4">
                    
                    <br />
                    <Link to="/login">
                      <CButton className="px-0 text-info fw-bold">
                        <span className="text-body-secondary">¿Ya tienes una cuenta?. </span>
                        Inicia sesión
                      </CButton>
                    </Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

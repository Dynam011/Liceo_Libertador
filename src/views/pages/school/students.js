import React, { useState } from 'react'
import {
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CButton, CForm, CFormInput, CFormSelect, CRow, CCol,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLowVision } from '@coreui/icons'

const initialForm = {
  cedula: '',
  nombres: '',
  apellidos: '',
  sexo: '',
  pasaporte: '',
  celular: '',
  fecha_nacimiento: '',
  lugar_nacimiento: '',
  parroquia: '',
  nacionalidad: '',
  estado_civil: '',
  correo_electronico: '',
  grupo_sanguineo: '',
  peso: '',
  talla_camisa: '',
  talla_pantalon: '',
  talla_calzado: '',
  direccion_habitacion: '',
  parroquia_habitacion: '',
  nro_casa: '',
  telefono_casa: '',
}

const StudentForm = () => {
  const [visible, setVisible] = useState(false)
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [editId, setEditId] = useState(null)
  const [viewStudent, setViewStudent] = useState(null)
  const [search, setSearch] = useState('')

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (editId !== null) {
      setStudents(students.map(s => s.id === editId ? { ...formData, id: editId } : s))
      setEditId(null)
    } else {
      setStudents([...students, { ...formData, id: Date.now() }])
    }
    setFormData(initialForm)
    setVisible(false)
  }

  const handleEdit = (student) => {
    setFormData(student)
    setEditId(student.id)
    setVisible(true)
  }

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id))
  }

  // Modal para ver datos del estudiante
  const handleView = (student) => {
    setViewStudent(student)
  }

  const handleCloseView = () => {
    setViewStudent(null)
  }

  // Filtrar estudiantes por cédula, nombre o apellido
  const filteredStudents = students.filter(student =>
    student.cedula.toLowerCase().includes(search.toLowerCase()) ||
    student.nombres.toLowerCase().includes(search.toLowerCase()) ||
    student.apellidos.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-info mb-0">Gestión de Estudiantes</h3>
        <CButton color="info" onClick={() => { setFormData(initialForm); setEditId(null); setVisible(true) }}>
          Registrar Estudiante
        </CButton>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-3">
        <CFormInput
          type="text"
          placeholder="Buscar por cédula, nombre o apellido..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <CModal visible={visible} onClose={() => { setVisible(false); setEditId(null); }}>
        <CModalHeader>
          <CModalTitle>{editId ? 'Editar Estudiante' : 'Registrar Estudiante'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="g-3">
              <CCol md={6}><CFormInput label="Cédula" name="cedula" value={formData.cedula} onChange={handleInputChange} required /></CCol>
              <CCol md={6}><CFormInput label="Pasaporte" name="pasaporte" value={formData.pasaporte} onChange={handleInputChange} /></CCol>
              <CCol md={6}><CFormInput label="Nombres" name="nombres" value={formData.nombres} onChange={handleInputChange} required /></CCol>
              <CCol md={6}><CFormInput label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required /></CCol>
              <CCol md={4}>
                <CFormSelect label="Sexo" name="sexo" value={formData.sexo} onChange={handleInputChange} required>
                  <option value="">Seleccione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormInput label="Celular" name="celular" value={formData.celular} onChange={handleInputChange} maxLength={11} />
              </CCol>
              <CCol md={4}>
                <CFormInput type="date" label="Fecha de Nacimiento" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleInputChange} />
              </CCol>
              <CCol md={6}><CFormInput label="Lugar de Nacimiento" name="lugar_nacimiento" value={formData.lugar_nacimiento} onChange={handleInputChange} /></CCol>
              <CCol md={6}><CFormInput label="Correo Electrónico" name="correo_electronico" value={formData.correo_electronico} onChange={handleInputChange} /></CCol>
              <CCol md={4}><CFormInput label="Parroquia" name="parroquia" value={formData.parroquia} onChange={handleInputChange} /></CCol>
              <CCol md={4}><CFormInput label="Nacionalidad" name="nacionalidad" value={formData.nacionalidad} onChange={handleInputChange} /></CCol>
              <CCol md={4}>
                <CFormSelect label="Estado Civil" name="estado_civil" value={formData.estado_civil} onChange={handleInputChange}>
                  <option value="">Seleccione</option>
                  <option value="S">Soltero(a)</option>
                  <option value="C">Casado(a)</option>
                  <option value="D">Divorciado(a)</option>
                  <option value="V">Viudo(a)</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}><CFormInput label="Grupo Sanguíneo" name="grupo_sanguineo" value={formData.grupo_sanguineo} onChange={handleInputChange} /></CCol>
              <CCol md={4}><CFormInput label="Peso (kg)" name="peso" value={formData.peso} onChange={handleInputChange} type="number" min={0} /></CCol>
              <CCol md={4}><CFormInput label="Talla Camisa" name="talla_camisa" value={formData.talla_camisa} onChange={handleInputChange} /></CCol>
              <CCol md={4}><CFormInput label="Talla Pantalón" name="talla_pantalon" value={formData.talla_pantalon} onChange={handleInputChange} type="number" min={0} /></CCol>
              <CCol md={4}><CFormInput label="Talla Calzado" name="talla_calzado" value={formData.talla_calzado} onChange={handleInputChange} type="number" min={0} /></CCol>
              <CCol md={8}><CFormInput label="Dirección de Habitación" name="direccion_habitacion" value={formData.direccion_habitacion} onChange={handleInputChange} /></CCol>
              <CCol md={4}><CFormInput label="Parroquia Habitación" name="parroquia_habitacion" value={formData.parroquia_habitacion} onChange={handleInputChange} /></CCol>
              <CCol md={4}><CFormInput label="Nro. de Casa" name="nro_casa" value={formData.nro_casa} onChange={handleInputChange} /></CCol>
              <CCol md={4}><CFormInput label="Teléfono de Casa" name="telefono_casa" value={formData.telefono_casa} onChange={handleInputChange} /></CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={() => { setVisible(false); setEditId(null); }}>Cancelar</CButton>
          <CButton color="info" onClick={handleSubmit}>{editId ? 'Actualizar' : 'Guardar'}</CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para ver datos del estudiante */}
      <CModal visible={!!viewStudent} onClose={handleCloseView}>
        <CModalHeader>
          <CModalTitle>Datos del Estudiante</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {viewStudent && (
            <div>
              <p><strong>Cédula:</strong> {viewStudent.cedula}</p>
              <p><strong>Pasaporte:</strong> {viewStudent.pasaporte}</p>
              <p><strong>Nombres:</strong> {viewStudent.nombres}</p>
              <p><strong>Apellidos:</strong> {viewStudent.apellidos}</p>
              <p><strong>Sexo:</strong> {viewStudent.sexo}</p>
              <p><strong>Celular:</strong> {viewStudent.celular}</p>
              <p><strong>Fecha de Nacimiento:</strong> {viewStudent.fecha_nacimiento}</p>
              <p><strong>Lugar de Nacimiento:</strong> {viewStudent.lugar_nacimiento}</p>
              <p><strong>Parroquia:</strong> {viewStudent.parroquia}</p>
              <p><strong>Nacionalidad:</strong> {viewStudent.nacionalidad}</p>
              <p><strong>Estado Civil:</strong> {viewStudent.estado_civil}</p>
              <p><strong>Correo Electrónico:</strong> {viewStudent.correo_electronico}</p>
              <p><strong>Grupo Sanguíneo:</strong> {viewStudent.grupo_sanguineo}</p>
              <p><strong>Peso:</strong> {viewStudent.peso}</p>
              <p><strong>Talla Camisa:</strong> {viewStudent.talla_camisa}</p>
              <p><strong>Talla Pantalón:</strong> {viewStudent.talla_pantalon}</p>
              <p><strong>Talla Calzado:</strong> {viewStudent.talla_calzado}</p>
              <p><strong>Dirección de Habitación:</strong> {viewStudent.direccion_habitacion}</p>
              <p><strong>Parroquia Habitación:</strong> {viewStudent.parroquia_habitacion}</p>
              <p><strong>Nro. de Casa:</strong> {viewStudent.nro_casa}</p>
              <p><strong>Teléfono de Casa:</strong> {viewStudent.telefono_casa}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseView}>Cerrar</CButton>
        </CModalFooter>
      </CModal>

      <CTable striped hover responsive bordered align="middle" className="shadow-sm">
        <CTableHead color="info">
          <CTableRow>
            <CTableHeaderCell>Cédula</CTableHeaderCell>
            <CTableHeaderCell>Nombres</CTableHeaderCell>
            <CTableHeaderCell>Apellidos</CTableHeaderCell>
            <CTableHeaderCell>Sexo</CTableHeaderCell>
            <CTableHeaderCell>Celular</CTableHeaderCell>
            <CTableHeaderCell>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredStudents.map(student => (
            <CTableRow key={student.id}>
              <CTableDataCell>{student.cedula}</CTableDataCell>
              <CTableDataCell>{student.nombres}</CTableDataCell>
              <CTableDataCell>{student.apellidos}</CTableDataCell>
              <CTableDataCell>{student.sexo}</CTableDataCell>
              <CTableDataCell>{student.celular}</CTableDataCell>
              <CTableDataCell>
                <CButton color="info" size="sm" className="me-2" variant="outline" onClick={() => handleView(student)}>
                  <CIcon icon={cilLowVision} />
                </CButton>
                <CButton color="warning" size="sm" className="me-2" onClick={() => handleEdit(student)}>
                  Editar
                </CButton>
                <CButton color="danger" size="sm" variant="outline" onClick={() => handleDelete(student.id)}>
                  Borrar
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default StudentForm
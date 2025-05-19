import React from 'react'



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Docents = React.lazy(() => import('./views/pages/school/docents'))
const Estudiantes = React.lazy(() => import('./views/pages/school/students'))
const Error = React.lazy(() => import('./views/pages/page404/Page404'))


const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: 'Panel', element: Dashboard },
  { path: '/docents', name: 'Docentes', element: Docents },
  { path: '/students', name: 'Estudiantes', element: Estudiantes },
{ path: '/error404', name: 'Pagina no encontrada', element: Error },

]

export default routes

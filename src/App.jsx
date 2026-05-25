import { useAuth0 } from '@auth0/auth0-react'
import { useAuthValidation } from './hooks/useAuthValidation'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AuthServiceError from './components/AuthServiceError.jsx'

const spinnerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
}

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0()
  const { validated, authServiceError, errorMessage, retry } = useAuthValidation()

  // Auth0 inicializando o validando contra el backend
  if (isLoading || (isAuthenticated && !validated && !authServiceError)) {
    return (
      <div style={spinnerStyle}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  // Servicio de autenticación no disponible — bloquear acceso
  if (isAuthenticated && authServiceError) {
    return <AuthServiceError message={errorMessage} onRetry={retry} />
  }

  return isAuthenticated ? <Dashboard /> : <Login />
}

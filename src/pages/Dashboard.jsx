import { useAuth0 } from '@auth0/auth0-react'
import SessionInfo from '../components/SessionInfo'
import { clearInternalToken } from '../utils/tokenStore'

const lisLogo = '/lis-logo.png'

export default function Dashboard() {
  const { user, logout } = useAuth0()

  const handleLogout = () => {
    clearInternalToken()
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const firstName = user?.given_name || user?.name?.split(' ')[0] || 'Usuario'

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="dashboard-avatar"
          />
        ) : (
          <div className="dashboard-avatar-placeholder">
            {firstName.charAt(0).toUpperCase()}
          </div>
        )}

        <h1 className="dashboard-greeting">
          ¡Bienvenido, {firstName}!
        </h1>
        <p className="dashboard-email">{user?.email}</p>

        <div className="dashboard-message">
          Has iniciado sesión correctamente en{' '}
          <strong>LIS Inventory</strong>. Pronto encontrarás aquí
          las herramientas para gestionar tu inventario.
        </div>

        <SessionInfo className="mt-3 mb-3 text-start" />

        <img src={lisLogo} alt="LIS" className="dashboard-logo" />

        <br />

        <button className="btn-logout" onClick={handleLogout}>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

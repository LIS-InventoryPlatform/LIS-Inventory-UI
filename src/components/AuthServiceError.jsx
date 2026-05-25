import PropTypes from 'prop-types'

const lisLogo = '/lis-logo.png'

/**
 * Pantalla de bloqueo que se muestra cuando el servicio de autenticación
 * del backend no está disponible o retorna un error irrecuperable.
 * No expone detalles técnicos al usuario final.
 */
export default function AuthServiceError({ message, onRetry }) {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={lisLogo} alt="LIS Logo" className="login-logo" />
        <h1 className="login-title">LIS Inventory</h1>

        <div
          className="d-flex align-items-center justify-content-center mb-3"
          style={{ color: '#dc2626' }}
        >
          <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
        </div>

        <p
          className="mb-3"
          style={{ fontSize: '0.95rem', color: '#374151', fontWeight: 500 }}
        >
          Servicio temporalmente no disponible
        </p>

        <p
          className="mb-4"
          style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.6 }}
        >
          {message}
        </p>

        {onRetry && (
          <button
            className="btn-google"
            onClick={onRetry}
            style={{ justifyContent: 'center' }}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            Reintentar
          </button>
        )}

        <p className="login-footer" style={{ marginTop: '1.5rem' }}>
          Si el problema persiste, contacta al administrador del sistema.
        </p>
      </div>
    </div>
  )
}

AuthServiceError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
}

AuthServiceError.defaultProps = {
  onRetry: null,
}

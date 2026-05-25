import PropTypes from 'prop-types'
import { useSession } from '../hooks/useSession'

/**
 * Componente que muestra la información de sesión del usuario autenticado.
 * Consume el hook useSession y renderiza los datos retornados por el backend.
 */
export default function SessionInfo({ className }) {
  const { sessionData, loading, error, refetch } = useSession()

  if (loading) {
    return (
      <div className={`card border-0 shadow-sm ${className}`}>
        <div className="card-body text-center py-4">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <span className="text-muted">Cargando información de sesión...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`card border-0 shadow-sm ${className}`}>
        <div className="card-body">
          <div className="alert alert-warning mb-0 d-flex align-items-center gap-2" role="alert">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <span>{error}</span>
          </div>
          <button
            className="btn btn-sm btn-outline-secondary mt-3 w-100"
            onClick={refetch}
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (!sessionData) return null

  return (
    <div className={`card border-0 shadow-sm ${className}`}>
      <div className="card-header bg-white border-bottom py-3">
        <h6 className="mb-0 fw-semibold text-dark">
          <svg width="16" height="16" fill="currentColor" className="me-2 text-primary" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          </svg>
          Información de Sesión
        </h6>
      </div>
      <div className="card-body py-3">
        <dl className="row mb-0 small">

          {sessionData.id && (
            <>
              <dt className="col-sm-5 text-muted fw-normal">Identificador</dt>
              <dd className="col-sm-7 fw-semibold mb-2">{sessionData.id}</dd>
            </>
          )}

          {sessionData.fullName && (
            <>
              <dt className="col-sm-5 text-muted fw-normal">Nombre</dt>
              <dd className="col-sm-7 fw-semibold mb-2">{sessionData.fullName}</dd>
            </>
          )}

          {sessionData.email && (
            <>
              <dt className="col-sm-5 text-muted fw-normal">Correo</dt>
              <dd className="col-sm-7 fw-semibold mb-2 text-break">{sessionData.email}</dd>
            </>
          )}

          {sessionData.role && (
            <>
              <dt className="col-sm-5 text-muted fw-normal">Rol</dt>
              <dd className="col-sm-7 mb-0">
                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 fw-normal">
                  {sessionData.role}
                </span>
              </dd>
            </>
          )}

          {sessionData.permissions && sessionData.permissions.length > 0 && (
            <>
              <dt className="col-sm-5 text-muted fw-normal">Permisos</dt>
              <dd className="col-sm-7 mb-0">
                <div className="d-flex flex-wrap gap-1">
                  {sessionData.permissions.map((p) => (
                    <span key={p} className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 fw-normal">
                      {p}
                    </span>
                  ))}
                </div>
              </dd>
            </>
          )}

        </dl>
      </div>
    </div>
  )
}

SessionInfo.propTypes = {
  className: PropTypes.string,
}

SessionInfo.defaultProps = {
  className: '',
}

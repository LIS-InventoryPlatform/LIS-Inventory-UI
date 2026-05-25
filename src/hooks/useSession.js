import { useState, useEffect, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getSessionInfo } from '../services/sessionService'

/**
 * Hook para consultar la información de sesión del usuario autenticado.
 * Usa el JWT interno almacenado en tokenStore (ya intercambiado por useAuthValidation).
 *
 * @returns {{ sessionData: Object|null, loading: boolean, error: string|null, refetch: Function }}
 */
export const useSession = () => {
  const { isAuthenticated } = useAuth0()
  const [sessionData, setSessionData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchSession = useCallback(async () => {
    if (!isAuthenticated) return

    setLoading(true)
    setError(null)

    try {
      const data = await getSessionInfo()
      setSessionData(data)
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Sesión no válida. Por favor, vuelve a autenticarte.')
      } else if (err.response?.status === 403) {
        setError('El usuario se encuentra inactivo. Contacta al administrador.')
      } else {
        setError('No se pudo obtener la información de sesión. Inténtalo nuevamente.')
      }
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  return { sessionData, loading, error, refetch: fetchSession }
}

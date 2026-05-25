import { useState, useEffect, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { exchangeToken } from '../services/authService'
import { setInternalToken, clearInternalToken } from '../utils/tokenStore'
import { logAuthError } from '../utils/authErrorLogger'

const USER_MESSAGE = 'No es posible autenticar en este momento. Por favor, intente más tarde.'

/**
 * Hook que valida la disponibilidad del servicio de autenticación del backend
 * antes de permitir el acceso al sistema.
 *
 * Flujo:
 *  1. Obtiene el access token de Auth0 (getAccessTokenSilently)
 *  2. Lo intercambia por el JWT interno via POST /api/auth/token
 *     y valida que la respuesta contenga token y email
 *
 * Bloquea el acceso ante: servicio caído (503), timeout, error de red,
 * error técnico (5xx) o respuesta inválida/incompleta.
 *
 * @returns {{ validated: boolean, loading: boolean, authServiceError: boolean, errorMessage: string|null, retry: Function }}
 */
export const useAuthValidation = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authServiceError, setAuthServiceError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const validate = useCallback(async () => {
    if (!isAuthenticated) return

    setLoading(true)
    setAuthServiceError(false)
    setValidated(false)
    setErrorMessage(null)
    clearInternalToken()

    try {
      // Paso 1 — obtener el access token de Auth0
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      })

      // Paso 2 — intercambiar por JWT interno del backend
      const exchangeResponse = await exchangeToken(accessToken)

      // Verificar que la respuesta del servicio sea válida y completa
      if (!exchangeResponse?.token || !exchangeResponse?.email) {
        clearInternalToken()
        logAuthError({
          type: 'AUTH_SERVICE_INVALID_RESPONSE',
          status: 200,
          detail: 'La respuesta del servicio de autenticación es inválida o incompleta',
        })
        setAuthServiceError(true)
        setErrorMessage(USER_MESSAGE)
        return
      }

      setInternalToken(exchangeResponse.token)
      setValidated(true)
    } catch (err) {
      clearInternalToken()
      const status = err.response?.status

      if (err.code === 'ECONNABORTED') {
        logAuthError({
          type: 'AUTH_SERVICE_TIMEOUT',
          status: 'TIMEOUT',
          detail: 'La solicitud al servicio de autenticación excedió el tiempo de espera',
        })
        setAuthServiceError(true)
        setErrorMessage(USER_MESSAGE)
      } else if (!err.response) {
        logAuthError({
          type: 'AUTH_SERVICE_NETWORK_ERROR',
          status: 'NO_RESPONSE',
          detail: err.message ?? 'Error de red al conectar con el servicio de autenticación',
        })
        setAuthServiceError(true)
        setErrorMessage(USER_MESSAGE)
      } else if (status === 503) {
        logAuthError({
          type: 'AUTH_SERVICE_UNAVAILABLE',
          status: 503,
          detail: err.response?.data?.message ?? 'Servicio de autenticación no disponible',
        })
        setAuthServiceError(true)
        setErrorMessage(USER_MESSAGE)
      } else if (status >= 500) {
        logAuthError({
          type: 'AUTH_SERVICE_SERVER_ERROR',
          status,
          detail: err.response?.data?.message ?? 'Error técnico en el servicio de autenticación',
        })
        setAuthServiceError(true)
        setErrorMessage(USER_MESSAGE)
      } else {
        // 401, 403 u otros 4xx — el servicio responde, el rechazo es por datos del usuario
        setValidated(true)
      }
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, getAccessTokenSilently])

  useEffect(() => {
    validate()
  }, [validate])

  return { validated, loading, authServiceError, errorMessage, retry: validate }
}

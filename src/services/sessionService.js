import axios from 'axios'
import { getInternalToken } from '../utils/tokenStore'

const API_URL = import.meta.env.VITE_API_URL

/**
 * Consulta la información de sesión del usuario autenticado.
 * Usa el JWT interno almacenado en tokenStore (obtenido tras el intercambio con Auth0).
 * @returns {Promise<Object>} Datos de sesión: identificador, nombre, correo y roles
 */
export const getSessionInfo = async () => {
  const token = getInternalToken()
  const response = await axios.get(`${API_URL}/api/iam/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  })
  return response.data
}

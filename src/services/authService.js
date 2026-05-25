import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

/**
 * Intercambia el idToken de Auth0 por el JWT interno de LIS-InventoryPlatform.
 * @param {string} idToken - ID Token devuelto por Auth0
 * @returns {Promise<{ token: string, tokenType: string }>}
 */
export const exchangeToken = async (idToken) => {
  const response = await axios.post(
    `${API_URL}/api/auth/token`,
    { idToken },
    { timeout: 10000 },
  )
  return response.data
}

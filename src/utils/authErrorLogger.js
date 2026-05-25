const AUTH_ERROR_ORIGIN = 'LIS-InventoryPlatform-UI'

/**
 * Registra errores del servicio de autenticación para trazabilidad técnica.
 * Incluye: timestamp, origen, tipo de error y estado HTTP.
 * Nunca almacena contraseñas, tokens ni información sensible del usuario.
 *
 * @param {{ type: string, status: string|number, detail: string }} params
 */
export const logAuthError = ({ type, status, detail }) => {
  const entry = {
    timestamp: new Date().toISOString(),
    origin: AUTH_ERROR_ORIGIN,
    type,
    status: status ?? 'N/A',
    detail: detail ?? 'Sin detalle disponible',
  }
  // eslint-disable-next-line no-console
  console.error('[LIS_AUTH_ERROR]', JSON.stringify(entry))
}

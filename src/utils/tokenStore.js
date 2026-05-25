const TOKEN_KEY = 'lis_internal_token'

/** Almacena el JWT interno en sessionStorage. */
export const setInternalToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

/** Recupera el JWT interno almacenado. */
export const getInternalToken = () => sessionStorage.getItem(TOKEN_KEY)

/** Elimina el JWT interno (logout o error de autenticación). */
export const clearInternalToken = () => {
  sessionStorage.removeItem(TOKEN_KEY)
}

import axios from 'axios'

class AuthenticateUserService {
    async execute(code: string) {

        const response = await axios.post(
            "https://api.mercadolibre.com/oauth/token",
            null,
            {
                headers: {
                    Accept: "application/json"
                },
                params: {
                    grant_type: "authorization_code",
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    code: code,
                    redirect_uri: "http://localhost:3001"
                }
            }
        )

        /**
         * {
            "access_token": "APP_USR-8565598613236594...",
            "token_type": "bearer",
            "expires_in": 21600,
            "scope": "offline_access read write",
            "user_id": 15795...,
            "refresh_token": "TG-61ae2489668989001a170..."
            }
         */

        const { access_token, refresh_token } = response.data

        return { access_token, refresh_token}
    }
}

export { AuthenticateUserService }
let jwtToken: string | null = null;

function jwtManager() {

    function setToken(token: string): void {
        jwtToken = token;
    }

    function getToken(): string | null {
        return jwtToken;
    }

    function clearToken(): void {
        jwtToken = null;
    }

    return {
        setToken,
        getToken,
        clearToken
    }
}

export default jwtManager;
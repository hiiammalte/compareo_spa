import { createContext, useEffect, useState, ReactNode, ReactElement } from 'react';
import jwt_decode from "jwt-decode";
import jwtManager from '../services/jwtManager';

interface IAccessToken {
    iat: number,
    exp: number,
    payload: IAccessTokenPayload
}
  
interface IAccessTokenPayload {
    userId: string;
    username: string;
    roles: string[];
}

interface ICurrentUserContext {
    currentUser: IAccessTokenPayload | null,
    signIn: (token: string) => void
    signOut: () => void
}

const CurrentUserContext = createContext<ICurrentUserContext>({
    currentUser: null,
    signIn: () => {},
    signOut: () => {}
});

function AuthProvider({ children }: { children: ReactNode } ) : ReactElement {
    const { setToken, getToken, clearToken } = jwtManager();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        async function getAccessToken() {
            const refreshedAccessToken = await refreshAccessToken();
            if (refreshedAccessToken) {
                setToken(refreshedAccessToken);
            } else {
                clearToken();
            }
            setLoading(false);
        }

        getAccessToken();
    }, []);
    
    function getJwtPayload(): IAccessTokenPayload | null {
        const token = getToken();
        if (token) {
            try {
                const { payload, exp } = jwt_decode<IAccessToken>(token);
                if (exp * 1000 > Date.now()) {
                    return payload;
                } else {
                    clearToken();
                    return null;
                }
            } catch(err) {
                console.log("Cannot decode Access Token. Error:" , err)
            }
        }
        return null;   
    }

    if (loading) return (<p>...loading</p>);

    return (
        <CurrentUserContext.Provider value={{
                currentUser : getJwtPayload(),
                signIn: (val) => setToken(val),
                signOut: () => clearToken()
            }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

async function refreshAccessToken(): Promise<string | null> {
    const response = await fetch(`${process.env.REACT_APP_REFRESH_ACCESS_URL}`, { credentials: 'include' });
    const {token, ok, errors} : ({token: string, ok: boolean, errors: string[]}) = await response.json();
    if (ok) {
        return token;
    } else {
        console.log("REFRESHING ACCESS TOKEN ERRORS: ", errors);
        return null;
    }
}

export { AuthProvider as default, CurrentUserContext, refreshAccessToken };
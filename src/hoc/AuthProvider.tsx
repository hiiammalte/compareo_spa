import { createContext, useContext, useEffect, useState, ReactNode, ReactElement } from 'react';
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
        fetch(`${process.env.REACT_APP_REFRESH_ACCESS_URL}`, { credentials: 'include' })
            .then(res => res.json())
            .then(({token, ok, errors} : ({token: string, ok: boolean, errors: string[]})) => {
                if (ok) {
                    setToken(token);
                } else {
                    console.log("REFRESHING ACCESS TOKEN ERRORS: ", errors);
                }
            })
            .then(() => setLoading(false))
            .catch(err => {
                console.log("REFRESHING ACCESS TOKEN ERRORS: ", err);
            })
    }, [setToken]);
    
    function getJwtPayload(): IAccessTokenPayload | null {
        let tokenPayload: IAccessTokenPayload | null = null;
        const token = getToken();
        if (token) {
            try {
                const { payload } = jwt_decode<IAccessToken>(token);
                tokenPayload = payload;
            } catch(err) {
                console.log("Cannot decode Access Token. Error:" , err)
            }
            
        }
        return tokenPayload;   
    }

    if (loading) return <p>...loading</p>

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

function useAuth() : ICurrentUserContext {
    return useContext(CurrentUserContext)
}

export { AuthProvider as default, useAuth };
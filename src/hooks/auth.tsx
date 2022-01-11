import React, {createContext,
ReactNode,
useContext,
useState,
useEffect} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderPrps{
    children: ReactNode;
}

interface User{
    id: string;
    name: string | null | undefined;
    email: string | null;
    photo?: string;
}

interface AuthContextData{
    user: User;
    signInWithGoogle(): Promise<void>; 
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoadging: boolean;
}

interface AuthorizationResponse{
    params: {
        access_token: string;
    };
    type: string;

}
const AuthContext = createContext({} as AuthContextData);

function AuthProvider( { children } : AuthProviderPrps){

    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoadging, setUserStorageLoading] = useState(true);
    const userStorageKey = '@gofinances:user';

    async function signInWithGoogle(){
        try {

            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const {type, params} = await AuthSession
            .startAsync({authUrl}) as AuthorizationResponse;
            
            if ( type === 'success' ) {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json();
                
                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                }
                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }


        } catch (error) {
            throw new Error(error as string);
           
        }
    }

    async function signInWithApple(){
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            })

            if(credential){
                const userLogged = {
                    id: String(credential.user),
                    name: credential.fullName!.givenName!,
                    email: credential.email!,
                    photo: `https://ui-avatars.com/api/?name=${credential.fullName?.givenName}&length=1`
                };
                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }

        } catch (error){
            throw new Error (error as string);
        }
    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(()=>{
        async function loadUserStorageData(){

            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            if (userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }
            setUserStorageLoading(false);

        }
        loadUserStorageData();
    },[]);

    return(
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signInWithApple,
            signOut,
            userStorageLoadging
        }}>
           {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth };


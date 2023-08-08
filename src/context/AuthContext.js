import React, {useState, useEffect, createContext, useContext, useRef} from "react";
import { auth } from "../../firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const info = useRef();

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user)=> {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        info
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
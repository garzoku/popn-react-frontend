import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';



const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    function signUpWithEmail(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
          
    }

    function logInWithEmail (email, password){
         return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return signOut(auth);
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email){
        return currentUser.updateEmail(email);
    }

    function changePassword(password){
        updatePassword(currentUser, password);
    }
useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false);
    })
    // unsubscribe when we unmount this component
    return unsubscribe
}, [])
    const value = {
        currentUser,
        logInWithEmail,
        signUpWithEmail,
        logout,
        resetPassword,
        updateEmail,
        changePassword
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

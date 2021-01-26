import React, { useContext, useEffect, useState } from 'react';
import {auth, firestore} from '../utils/firebase';
import firebase from 'firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [projects, setProjects] = useState([]);

    function signIn(email, password) {
        return auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
            return auth.signInWithEmailAndPassword(email, password);
        });
    };

    function signOut() {
        return auth.signOut().then(() => window.location = '/');
    }

    function updateState() {
        const projectss = [];
        firestore.collection('projects').get().then(data => {
            data.forEach(doc => {
                projectss.push({id: doc.id, data: doc.data(), 'createdAt': doc.data().createdAt});
            });
        }).then(() => {
            setProjects([...projectss]);
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            updateState();
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        projects,
        updateState,
        signIn,
        signOut
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
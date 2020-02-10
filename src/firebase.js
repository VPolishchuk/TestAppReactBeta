import React, { useEffect, useState }  from 'react';
import app from "./firebase-config";
// ui
import './style.scss';
//////////////////////////////////////////////////////

export const AuthContext = React.createContext();

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) =>  setCurrentUser(user))
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      <div className='wrapper'>
        {children}
      </div>
    </AuthContext.Provider>
  );
};





export default FirebaseProvider;
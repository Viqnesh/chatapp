//ProfileContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext(null);

export const ProfiletProvider = ({ children }) => {
  const [profileData, setProfileData] = useState("Test");

return (
    <ProfileContext.Provider value={{ profileData, setProfileData }} >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '@/lib/definitions';
import { MOCK_USERS } from '@/lib/mock-data';

interface AppContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  signedPetitions: string[];
  signPetition: (petitionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [signedPetitions, setSignedPetitions] = useState<string[]>([]);

  const login = (email: string) => {
    // In a real app, this would involve a server call.
    // Here we just find the user in our mock data.
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      // Simulate that the user has already signed one petition
      setSignedPetitions(['p2']);
    }
  };

  const logout = () => {
    setUser(null);
    setSignedPetitions([]);
  };

  const signPetition = (petitionId: string) => {
    if (!signedPetitions.includes(petitionId)) {
      setSignedPetitions(prev => [...prev, petitionId]);
    }
  };

  return (
    <AppContext.Provider value={{ user, login, logout, signedPetitions, signPetition }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

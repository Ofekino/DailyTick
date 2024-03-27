import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
  toggleNotiFreq: (newNotiFreq) => {},  // Modify toggleNotiFreq to accept the new value
  notiFreq: 'disabled',
  toggleNotiTime: (newNotiTime) => {},
  notiTime: (new Date(1710748800000)),
  toggleCurrentStreakDate: (newCurrentStreakDate) => {},
  currentStreakDate: (new Date(0)),
  toggleCurrentStreakNum: (newCurrentStreakNum) => {}, 
  currentStreakNum: 0,
  toggleActualStreakDate: (newActualStreakDate) => {},
  actualStreakDate: (new Date(0))
});

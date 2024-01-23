import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});

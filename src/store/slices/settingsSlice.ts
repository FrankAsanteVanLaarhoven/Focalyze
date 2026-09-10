
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reduceMotion: boolean;
}

interface PrivacySettings {
  shareData: boolean;
  shareUsageStatistics: boolean;
}

interface DataSyncSettings {
  autoSync: boolean;
  syncFrequency: 'daily' | 'weekly' | 'manual';
  lastSyncDate: string | null;
}

interface SettingsState {
  darkMode: boolean;
  notificationsEnabled: boolean;
  soundsEnabled: boolean;
  dataSync: DataSyncSettings;
  accessibility: AccessibilitySettings;
  privacy: PrivacySettings;
  language: string;
}

const initialState: SettingsState = {
  darkMode: false,
  notificationsEnabled: true,
  soundsEnabled: true,
  dataSync: {
    autoSync: true,
    syncFrequency: 'daily',
    lastSyncDate: null
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false
  },
  privacy: {
    shareData: true,
    shareUsageStatistics: true
  },
  language: 'en'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    toggleSounds: (state) => {
      state.soundsEnabled = !state.soundsEnabled;
    },
    updateDataSync: (state, action: PayloadAction<Partial<DataSyncSettings>>) => {
      state.dataSync = { ...state.dataSync, ...action.payload };
    },
    updateLastSyncDate: (state) => {
      state.dataSync.lastSyncDate = new Date().toISOString();
    },
    updateAccessibility: (state, action: PayloadAction<Partial<AccessibilitySettings>>) => {
      state.accessibility = { ...state.accessibility, ...action.payload };
    },
    updatePrivacy: (state, action: PayloadAction<Partial<PrivacySettings>>) => {
      state.privacy = { ...state.privacy, ...action.payload };
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    resetToDefaults: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const {
  toggleDarkMode,
  toggleNotifications,
  toggleSounds,
  updateDataSync,
  updateLastSyncDate,
  updateAccessibility,
  updatePrivacy,
  setLanguage,
  resetToDefaults
} = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;
export const selectDarkMode = (state: RootState) => state.settings.darkMode;
export const selectAccessibility = (state: RootState) => state.settings.accessibility;

export default settingsSlice.reducer;

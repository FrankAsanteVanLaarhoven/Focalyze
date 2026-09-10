
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector } from '../hooks/useRedux';

// Import screens
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import MonitoringScreen from '../screens/monitoring/MonitoringScreen';
import ClinicalScreen from '../screens/clinical/ClinicalScreen';
import SelfManagementScreen from '../screens/self-management/SelfManagementScreen';
import TransitionScreen from '../screens/transition/TransitionScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import { colors } from '../styles/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Auth Navigator
const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'help-circle-outline';

        if (route.name === 'Dashboard') {
          iconName = 'view-dashboard';
        } else if (route.name === 'Monitoring') {
          iconName = 'chart-line';
        } else if (route.name === 'Clinical') {
          iconName = 'medical-bag';
        } else if (route.name === 'Self-Management') {
          iconName = 'brain';
        } else if (route.name === 'Chat') {
          iconName = 'chat-processing';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarStyle: {
        height: Platform.OS === 'ios' ? 88 : 60,
        paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        paddingTop: 8,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Monitoring" component={MonitoringScreen} />
    <Tab.Screen name="Self-Management" component={SelfManagementScreen} />
    <Tab.Screen name="Clinical" component={ClinicalScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
  </Tab.Navigator>
);

// Drawer Navigator
const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.textOnPrimary,
      drawerActiveTintColor: colors.primary,
      drawerInactiveTintColor: colors.textSecondary,
    }}
  >
    <Drawer.Screen 
      name="Home" 
      component={MainTabNavigator} 
      options={{
        drawerIcon: ({ color }) => (
          <Icon name="home" size={24} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Transition" 
      component={TransitionScreen} 
      options={{
        drawerIcon: ({ color }) => (
          <Icon name="transit-transfer" size={24} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        drawerIcon: ({ color }) => (
          <Icon name="account" size={24} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Settings" 
      component={SettingsScreen} 
      options={{
        drawerIcon: ({ color }) => (
          <Icon name="cog" size={24} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

// Root Navigator
const AppNavigator = () => {
  const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={DrawerNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

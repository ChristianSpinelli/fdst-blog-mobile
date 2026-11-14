import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../pages/Login/Login';
import DashboardScreen from '../pages/Dashboard/Dashboard';
import HeaderTitle from '../components/Header/HeaderTitle';
import HeaderRight from '../components/Header/HeaderRight';

const Stack = createNativeStackNavigator();

export function Routes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ED145B" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerStyle: { backgroundColor: '#18181B' },
          headerTintColor: '#FFFFFF',
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerTitle: () => <HeaderTitle /> }} 
          />
        ) : (
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              headerTitle: () => <HeaderTitle />,
              headerRight: () => <HeaderRight />,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09090B',
  },
});
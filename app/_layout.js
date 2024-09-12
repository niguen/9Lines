import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#777777',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>

         {/* Definieren Sie hier Ihre Routen */}
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="menuScreen" options={{ title: 'Select Difficulty' }} />
      <Stack.Screen name="loadConfigScreen" options={{ title: 'Load Config' }} />
      <Stack.Screen name="gameScreen" options={{ title: 'Play 9Lines' }} />
    
    </Stack>
  );
}

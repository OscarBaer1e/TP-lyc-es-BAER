import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2f2a85' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 18 },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Menu principal' }} />
      <Stack.Screen name="lycees-creteil" options={{ title: 'Lycées Créteil' }} />
      <Stack.Screen name="lycees-prives-idf" options={{ title: 'Lycées privés IDF' }} />
      <Stack.Screen name="types-lycees" options={{ title: 'Types' }} />
      <Stack.Screen name="emails-versailles" options={{ title: 'Mails Versailles' }} />
      <Stack.Screen name="nombre-par-academie" options={{ title: 'Nb par académie' }} />
    </Stack>
  );
}

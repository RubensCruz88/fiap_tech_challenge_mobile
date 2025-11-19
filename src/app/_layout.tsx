import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../providers/authProvider";

const InitialLayout = () => {
    const { isAuthenticated } = useAuth()

    return (
        <Stack
            screenOptions={{headerShown: false}}
        >
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="index"/>
            </Stack.Protected>
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(tabs)"/>
            </Stack.Protected>
        </Stack>
    )
}

export default function Layout() {
    return (
        <AuthProvider>
            <InitialLayout />
        </AuthProvider>        
    )
}
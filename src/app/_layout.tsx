import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "../providers/authProvider";

const InitialLayout = () => {
    const { authState } = useAuth()

    return (
        <Stack
            screenOptions={{headerShown: false}}
        >
            <Stack.Protected guard={!authState.authenticated}>
                <Stack.Screen name="index"/>
            </Stack.Protected>
            <Stack.Protected guard={authState.authenticated}>
                <Stack.Screen name="(tabs)"/>
            </Stack.Protected>
        </Stack>
    )
}

export default function Layout() {
    return (
        <AuthProvider>
            <InitialLayout />
            <Toast />
        </AuthProvider>        
    )
}
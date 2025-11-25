import { useAuth } from "@/src/providers/authProvider";
import { Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Configuracoes() {
    const { logOut } = useAuth();

    return(
        <SafeAreaProvider style={{marginTop: 50}}>
                    <SafeAreaView>
                        <Button title="Logout" onPress={() => logOut()}></Button>
                    </SafeAreaView>
                </SafeAreaProvider>
    )
}
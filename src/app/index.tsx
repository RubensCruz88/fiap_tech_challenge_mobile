
import Logo from '@/assets/images/logo.png';
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import { useAuth } from '../providers/authProvider';

export default function Login() {
    const { logIn } = useAuth()
    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState('')

    const onButtonPress = async () => {
       const retorno = await logIn(email,password)

       if(!retorno) {
            Toast.show({
                type: "error",
                text1: 'Usuário ou senha inválidos'
            })
       }
    }

    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
            />
            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
					autoCapitalize="none"
                    onChangeText={onChangeEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={onChangePassword}
                    value={password}
                />
                <TouchableOpacity style={styles.button} onPress={onButtonPress}>
					<Text style={styles.buttonText}>Entrar</Text>
				</TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#B5D195',
        gap: 50
    },
    logo: {
        alignSelf: 'center',
        width: 120,
        height: 120
    },
    form: {
        gap: 10,
        width: '60%'
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        borderColor: '#A9DFBF',
        backgroundColor: '#F9F9F9'
    },
    button: {
		backgroundColor: "#1E8449",
		paddingVertical: 14,
		borderRadius: 10,
		marginTop: 24,
		alignItems: "center",
	},
	buttonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "700",
	}
})
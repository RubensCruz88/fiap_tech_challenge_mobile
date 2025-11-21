
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
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
                text1: 'Usuário ou senha inválidos',
                text1Style: {
                    fontSize: 15
                }
            })
       }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
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
                <Button 
                    title="Login" 
                    onPress={onButtonPress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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
        backgroundColor: '#FFF'
    }
})
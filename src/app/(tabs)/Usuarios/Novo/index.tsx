import usersService from '@/src/services/users.service';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';

export default function NovoUsuario() {
	const navigation = useNavigation()
	const [name, onChangeName] = useState('')
	const [email, onChangeEmail] = useState('')
	const [password, onChangePassword] = useState('')
	const [type, onChangeType] = useState<'admin' | 'professor' | 'aluno'>('aluno')

	const onsubmit = async () => {
		try {
			const newUser = {
				nome: name,
				email,
				tipo: type,
				senha: password
			}
			
			await usersService.createUser(newUser)

			Toast.show({
				type: "success",
				text1: `Usuário ${name} criado com sucesso`,
				text1Style: {
					fontSize: 15
				}
			})

			navigation.goBack()

		} catch (err) {
			Toast.show({
				type: "error",
				text1: `Erro ao criar usuário`,
				text1Style: {
					fontSize: 15
				}
			})
		}
	}

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.form}>
				<Text style={styles.title}>Cadastrar Usuário</Text>
				<TextInput
					style={styles.input}
					placeholder="Nome"
					onChangeText={onChangeName}
					value={name}
				/>
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
				<Picker
					selectedValue={type}
					onValueChange={onChangeType}
				>
					<Picker.Item label="Admin" value="admin" />
					<Picker.Item label="Professor" value="professor" />
					<Picker.Item label="Aluno" value="aluno" />
				</Picker>
				<TouchableOpacity style={styles.button} onPress={onsubmit}>
					<Text style={styles.buttonText}>Salvar</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
		</KeyboardAvoidingView>
)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#B5D195'
	},
	form: {
		gap: 10,
		padding: 20,
		borderRadius: 12,
		width: '70%',
		backgroundColor: '#FFF'
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		color: "#145A32",
		textAlign: "center",
		marginBottom: 20,
	},
	input: {
		height: 44,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: '#A9DFBF',
		padding: 10,
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
	},
})
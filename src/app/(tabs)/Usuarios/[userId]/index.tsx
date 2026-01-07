import DeleteModal from "@/src/components/DeleteModal";
import { useAuth } from "@/src/providers/authProvider";
import { CreateUserBody } from "@/src/services/types/Users.type";
import usersService from "@/src/services/users.service";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function UserDetail() {
	const [showConfirm, setShowConfirm] = useState(false);
	const { userId } = useLocalSearchParams<{ userId: string }>();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [type, setType] = useState<"admin" | "professor" | "aluno">("aluno");

	const { authState } = useAuth();

	useEffect(() => {
		async function loadData() {
			const userData = await usersService.getUserData(userId);

			if (userData) {
				setName(userData.nome);
				setEmail(userData.email);
				setType(userData.tipo);
			}
		}
		loadData();
	}, [userId]);

	const onSubmit = async () => {
		const userData: CreateUserBody = {
			nome: name,
			email,
			senha: password,
			tipo: type,
		};

		// Professors can only update Alunos
		if (authState.tipo === "professor" && type !== "aluno") {
			Toast.show({
				type: "error",
				text1: "Permissão negada",
				text2: "Professores só podem editar alunos.",
			});
			return;
		}

		const response = await usersService.updateUser(userId, userData);

		if (response) {
			Toast.show({
				type: "success",
				text1: `Usuário atualizado com sucesso`,
			});

			router.back();
		}
	};

	async function onDelete() {
		try {
			// Professors can only delete Alunos
			if (authState.tipo === "professor" && type !== "aluno") {
				Toast.show({
					type: "error",
					text1: "Permissão negada",
					text2: "Professores só podem excluir alunos.",
				});
				return;
			}

			await usersService.deleteUser(userId);

			Toast.show({
				type: "success",
				text1: `Usuário excluído com sucesso`,
			});

			router.back();
		} catch {}
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<DeleteModal
				message="Tem certeza que deseja excluir este Usuário?"
				visible={showConfirm}
				onCancel={() => setShowConfirm(false)}
				onConfirm={onDelete}
			/>

			<View style={styles.form}>
				<Text style={styles.title}>Editar Usuário</Text>

				<Text style={styles.label}>Nome</Text>
				<TextInput
					style={styles.input}
					placeholder="Nome"
					onChangeText={setName}
					value={name}
				/>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					placeholder="Email"
					autoCapitalize="none"
					onChangeText={setEmail}
					value={email}
				/>
				<Text style={styles.label}>Nova Senha</Text>
				<TextInput
					style={styles.input}
					autoCapitalize="none"
					placeholder="Senha"
					secureTextEntry={true}
					onChangeText={setPassword}
					value={password}
				/>
				<Picker selectedValue={type} onValueChange={setType}>
					<Picker.Item label="Admin" value="admin" />
					<Picker.Item label="Professor" value="professor" />
					<Picker.Item label="Aluno" value="aluno" />
				</Picker>
				<TouchableOpacity style={styles.button} onPress={onSubmit}>
					<Text style={styles.buttonText}>Salvar</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.deleteButton}
					onPress={() => setShowConfirm(true)}
				>
					<Text style={styles.deleteButtonText}>Excluir Usuário</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#B5D195",
	},
	form: {
		gap: 10,
		padding: 20,
		borderRadius: 12,
		width: "70%",
		backgroundColor: "#FFF",
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		color: "#145A32",
		textAlign: "center",
		marginBottom: 20,
	},
	label: {
		fontSize: 15,
		fontWeight: "bold",
		marginTop: 10,
		color: "#1E8449",
	},
	input: {
		height: 44,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#A9DFBF",
		padding: 10,
		backgroundColor: "#F9F9F9",
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
	deleteButton: {
		marginTop: 16,
		backgroundColor: "#B91C1C", // vermelho escuro elegante
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#EF4444",
	},
	deleteButtonText: {
		color: "#FFF",
		fontWeight: "bold",
		fontSize: 16,
	},
});

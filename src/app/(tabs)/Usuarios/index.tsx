import UserItem from '@/src/components/UserItem';
import { UserModel } from '@/src/models/Usuario/user.model';
import UserService from '@/src/services/users.service';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Usuarios() {
	const router = useRouter();
	const [users, setUsers] = useState<UserModel[]>([])

	useFocusEffect(
		useCallback(() => {
			fetchData();
		}, [])
	);

	async function fetchData() {
		try {
			const usersList = await UserService.getUsers();

			if(usersList){
				setUsers(usersList)
			}
		} catch(error) {
			console.log("erro",error)
		}
	}

	async function newUser() {
		router.push('../Usuarios/Novo')
	}

	return(
		<SafeAreaProvider style={{marginTop: 50}}>
			<SafeAreaView style={styles.container}>
				<TouchableOpacity style={styles.headerButton} onPress={newUser}>
					<Text style={styles.headerButtonText}>Novo Usuário</Text>
				</TouchableOpacity>

				<FlatList
					showsVerticalScrollIndicator={false}
					data={users}
					keyExtractor={(user) => user.id}
					renderItem={({ item }) => <UserItem user={item} />}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B5D195",
    padding: 20,
  },

  headerButton: {
    backgroundColor: "#145A32",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  headerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  listItem: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#1E8449", // barra verde lateral
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  itemNome: {
    fontSize: 18,
    fontWeight: "700",
    color: "#145A32",
    marginBottom: 4,
  },

  itemEmail: {
    fontSize: 14,
    color: "#2F4F4F",
    marginBottom: 4,
  },

  itemTipo: {
    fontSize: 13,
    color: "#1E8449",
    fontWeight: "600",
  },
});
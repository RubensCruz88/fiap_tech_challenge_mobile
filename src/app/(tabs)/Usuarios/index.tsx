import UserItem from '@/src/components/UserItem';
import { UserModel } from '@/src/models/Usuario/user.model';
import UserService from '@/src/services/users.service';
import { useFocusEffect } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useCallback, useState } from "react";
import { Button, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Usuarios() {
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

	}

	return(
		<SafeAreaProvider style={{marginTop: 50}}>
			<SafeAreaView>
				<Link href={"/(tabs)/Usuarios/Novo"} asChild>
					<Button title="Novo Usuário" onPress={() => newUser()}></Button>
				</Link>
				<FlatList 
					data={users}
					keyExtractor={(user) => user.id}
					renderItem={({item}) => <UserItem user={item}/>}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
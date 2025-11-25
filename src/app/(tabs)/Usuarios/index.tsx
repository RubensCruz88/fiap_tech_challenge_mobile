import UserItem from '@/src/components/UserItem';
import { UserModel } from '@/src/models/user.model';
import UserService from '@/src/services/users.service';
import { useEffect, useState } from "react";
import { Button, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Usuarios() {
	const [users, setUsers] = useState<UserModel[]>([])

	useEffect(() => {
			fetchData()
		},[])
	
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
				<Button title="Novo Usuário" onPress={() => newUser()}></Button>
				<FlatList 
					data={users}
					keyExtractor={(user) => user.id}
					renderItem={({item}) => <UserItem user={item}/>}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
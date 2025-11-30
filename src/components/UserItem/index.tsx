import { UserModel } from "@/src/models/Usuario/user.model";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UserProps {
    user: UserModel
}

export default function UserItem({user}: UserProps) {
  return(
    <Link href={{
      pathname: '/Usuarios/[userId]',
      params: {userId: user.id}
    }} asChild>
      <TouchableOpacity>
		<View style={styles.container}>
			<Text style={styles.itemNome}>{user.nome}</Text>
			<Text style={styles.itemEmail}>{user.email}</Text>
			<Text style={styles.itemTipo}>Tipo: {user.tipo}</Text>
		</View>
      </TouchableOpacity>
    </Link>
  )
}

export const styles = StyleSheet.create({
	container: {
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
})

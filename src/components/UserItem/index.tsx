import { UserListModel } from "@/src/models/Usuario/user.model";
import { dateToString } from "@/src/utils/dateFnsUtils";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UserProps {
    user: UserListModel
}

export default function UserItem({user}: UserProps) {
  const tagStyle: Record<string, any> = {
    admin: tagStyles.tagAdmin,
    professor: tagStyles.tagProfessor,
    aluno: tagStyles.tagAluno,
  };

  return(
    <Link href={{pathname: "/Usuarios/User"}} asChild>
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>{user.nome}</Text>
            <View style={[tagStyles.tag,tagStyle[user.tipo]]}>
              <Text style={styles.tagText}>{user.tipo}</Text>
            </View>
          </View>

          <Text style={styles.email}>{user.email}</Text>

          <Text style={styles.date}>
              Criado em: {dateToString(user.createdAt,"dd/MM/yyyy HH:mm")}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E8EC",
    marginVertical: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C2C2C",
  },

  email: {
    fontSize: 14,
    marginTop: 6,
    color: "#6B6B6B",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2C2C2C",
  },

  date: {
    marginTop: 10,
    fontSize: 12,
    color: "#8A8A8A",
  },
});

const tagStyles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  tagAdmin: {
    backgroundColor: "#D9534F",
  },

  tagProfessor: {
    backgroundColor: "#0275D8",
  },

  tagAluno: {
    backgroundColor: "#5CB85C",
  },

  tagText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize"
  }
});
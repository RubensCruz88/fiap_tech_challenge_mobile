import { useAuth } from "@/src/providers/authProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

export default function RootLayout() {
  const { authState } = useAuth();

  return (
    <React.Fragment>
      <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: '#1E8449'}}>
        <Tabs.Screen 
          name="(home)" 
          options={{
            title: "Home", 
            tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color} />
          }}/>
        <Tabs.Protected guard={authState.tipo !== 'aluno'} >
          <Tabs.Screen 
            name="MeusPosts"
            options={{
              title: "Meus Posts",
              tabBarIcon: ({color}) => <FontAwesome size={28} name="file-text" color={color} />
            }}
          />
        </Tabs.Protected>
        <Tabs.Protected guard={authState.tipo !== 'aluno'} >
          <Tabs.Screen 
            name="Usuarios"
            options={{
              title: "Usuários",
              tabBarIcon: ({color}) => <FontAwesome size={28} name="user" color={color} />
            }}
          />
        </Tabs.Protected>
        <Tabs.Screen
          name="Configuracoes"
          options={{
            title: "Configurações",
            tabBarIcon: ({color}) => <FontAwesome size={28} name="gear" color={color} />
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}

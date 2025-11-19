import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <React.Fragment>
      <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen 
          name="(home)" 
          options={{
            title: "Home", 
            tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color} />
          }}/>
        <Tabs.Screen 
          name="MeusPosts"
          options={{
            title: "Meus Posts",
            tabBarIcon: ({color}) => <FontAwesome size={28} name="file-text" color={color} />
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}

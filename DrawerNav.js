import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./routes";
import DrawerComponent from "./components/DrawerComponent";
import { useWindowDimensions } from "react-native";
import { useContext } from "react";
import SignUp from "./pages/SignUp";
import { ThemeContext } from "./App";
import { getAuth } from "firebase/auth/react-native";
import SignUpEmpresa from "./pages/SignUpEmpresa";

const Drawer = createDrawerNavigator();

export default function DrawerNav({ COLORS }) {
  const { width } = useWindowDimensions();
  const { user, setUser } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerComponent />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "transparent",
        },
        swipeEdgeWidth: (width / 4) * 3,
      }}
    >
      {user && user.firstName ? (
        <Drawer.Screen
          name="tab"
          component={BottomTabs}
          initialParams={{ screen: "Home" }}
          options={{
            headerShown: false,
          }}
        />
      ) : getAuth().currentUser.displayName ? (
        <Drawer.Screen
          name="Profile"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Drawer.Screen
          name="ProfileEmpresa"
          component={SignUpEmpresa}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Drawer.Navigator>
  );
}

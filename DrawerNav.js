import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./routes";
import DrawerComponent from "./components/DrawerComponent";
import { useWindowDimensions } from "react-native";
import { useContext  } from "react";
import SignUp from "./pages/SignUp";
import { ThemeContext } from "./App";

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
      {user.name ? (
        <Drawer.Screen
          name="tab"
          component={BottomTabs}
          initialParams={{ screen: "Home" }}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Drawer.Screen
          name="Profile"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Drawer.Navigator>
  );
}

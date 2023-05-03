import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./routes";
import DrawerComponent from "./components/DrawerComponent";
import { useWindowDimensions } from "react-native";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const { width } = useWindowDimensions();
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
      <Drawer.Screen
        name="tab"
        component={BottomTabs}
        initialParams={{ screen: "Home" }}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

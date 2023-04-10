import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./routes";
import DrawerComponent from "./components/DrawerComponent";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator drawerContent={()=><DrawerComponent />}>
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

import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./routes";
import DrawerComponent from "./components/DrawerComponent";
import { useWindowDimensions } from "react-native";
import { createContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/FirebaseConfig";
import { getAuth } from "firebase/auth/react-native";
import SignUp from "./pages/SignUp";

const Drawer = createDrawerNavigator();
export const UserContext = createContext();

export default function DrawerNav() {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState([]);

  useEffect(() => {
    useHasAccount();
  }, []);

  const useHasAccount = async () => {
    await getDoc(doc(db, "users", getAuth().currentUser.uid)).then((doc) => {
      if (doc.data()) {
        setUser(doc.data());
      } else {
        setUser([]);
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
  );
}

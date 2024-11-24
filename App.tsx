import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./routes/home/HomeScreen";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "./utils/database";
import WalletProvider from "./store/WalletProvider";
import { Suspense, useState } from "react";
import { View } from "react-native";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default function App() {
  const [ready, setReady] = useState(false);
  async function setup(db: SQLiteDatabase) {
    try {
      await migrateDbIfNeeded(db);
      setReady(true);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Suspense fallback={<View />}>
      <SQLiteProvider databaseName="test2.db" onInit={setup} useSuspense>
        {ready ? (
          <WalletProvider>
            <Navigation />
          </WalletProvider>
        ) : (
          <View />
        )}
      </SQLiteProvider>
    </Suspense>
  );
}

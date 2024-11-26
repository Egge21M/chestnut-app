import {
  createStaticNavigation,
  DarkTheme,
  DefaultTheme,
  StaticParamList,
  ThemeProvider,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./routes/home/HomeScreen";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "./utils/database";
import WalletProvider from "./store/WalletProvider";
import { Suspense, useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import ReceiveHomeScreen from "./routes/receive/ReceiveHomeScreen";
import ReceiveTokenScreen from "./routes/receive/screens/ReceiveTokenScreen";
import { TamaguiProvider } from "tamagui";

const ReceiveStack = createNativeStackNavigator({
  screens: {
    ReceiveHome: ReceiveHomeScreen,
    ReceiveToken: ReceiveTokenScreen,
    PaymentRequest: PaymentRequestScreen,
  },
  screenOptions: {
    headerShown: false,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
    },
    Receive: ReceiveStack,
  },
});

const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

import { tamaguiConfig } from "./tamagui.config";
import { useFonts } from "expo-font";
import PaymentRequestScreen from "./routes/receive/screens/PaymentRequestScreen";

export default function App() {
  const [ready, setReady] = useState(false);
  const [dbReady, setDbReady] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  async function setup(db: SQLiteDatabase) {
    try {
      await migrateDbIfNeeded(db);
      setDbReady(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (dbReady && loaded) {
      setReady(true);
    }
  }, [dbReady, loaded]);
  return (
    <Suspense fallback={<View />}>
      <SQLiteProvider databaseName="test2.db" onInit={setup} useSuspense>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={"light_gray"}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            {ready ? (
              <WalletProvider>
                <Navigation />
              </WalletProvider>
            ) : (
              <View />
            )}
          </ThemeProvider>
        </TamaguiProvider>
      </SQLiteProvider>
    </Suspense>
  );
}

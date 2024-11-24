import { registerRootComponent } from "expo";
import { getRandomValues } from "expo-crypto";

import App from "./App";
import { EventManager } from "./utils/EventManager";

//@ts-ignore
crypto = { getRandomValues };

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

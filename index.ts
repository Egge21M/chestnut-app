import { registerRootComponent } from "expo";
import "react-native-get-random-values";

import App from "./App";
import { SimplePool } from "nostr-tools";

export const pool = new SimplePool();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

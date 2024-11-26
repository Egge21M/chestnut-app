import { StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";
import { theme } from "../styles/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "tamagui";

type ScreenContainerProps = {
  children: ReactNode;
};

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: theme.background?.get() || "white",
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.backgroundPrimary,
  },
});

export default ScreenContainer;

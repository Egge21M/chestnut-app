import { StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";
import { theme } from "../styles/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenContainerProps = {
  children: ReactNode;
};

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
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

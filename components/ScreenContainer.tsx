import { StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";

type ScreenContainerProps = {
  children: ReactNode;
};

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});

export default ScreenContainer;

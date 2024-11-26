import {
  View,
  Text,
  Pressable,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";
import React from "react";
import { theme } from "../styles/colors";

const StandardButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed ? { backgroundColor: theme.backgroundSecondary } : undefined,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    borderColor: theme.colorPrimary,
    backgroundColor: theme.backgroundPrimary,
    borderWidth: 2,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colorPrimary,
    fontSize: 20,
    fontWeight: 600,
  },
});

export default StandardButton;

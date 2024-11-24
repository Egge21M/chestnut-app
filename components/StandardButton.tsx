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
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: 600,
  },
});

export default StandardButton;

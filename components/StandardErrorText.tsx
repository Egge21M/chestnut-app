import { Text, StyleSheet } from "react-native";
import React from "react";

const StandardErrorText = ({ error }: { error: string }) => {
  return <Text style={styles.text}>{error}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "red",
    fontWeight: 500,
  },
});

export default StandardErrorText;

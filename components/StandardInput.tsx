import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { theme } from "../styles/colors";

const StandardInput = ({
  value,
  onChangeText,
  placeholder,
  label,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
}) => {
  return (
    <View>
      {label ? <Text>{label}</Text> : undefined}
      <TextInput
        style={style.container}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: 8,
  },
});

export default StandardInput;

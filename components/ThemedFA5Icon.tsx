import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { useTheme } from "tamagui";

const ThemedFA5Icon = ({ name, size }: { name: string; size?: number }) => {
  const theme = useTheme();
  return (
    <FontAwesome5
      name={name}
      size={size}
      color={theme.color?.get() || "white"}
    />
  );
};

export default ThemedFA5Icon;

import React from "react";
import ScreenContainer from "../../components/ScreenContainer";
import { useNavigation } from "@react-navigation/native";
import { Button, Label, XStack } from "tamagui";

const ReceiveHomeScreen = () => {
  const { navigate } = useNavigation();
  return (
    <ScreenContainer>
      <Label>Cashu</Label>
      <XStack space="$2">
        <Button
          flex={1}
          onPress={() => {
            navigate("Receive", {
              screen: "ReceiveToken",
              params: {},
            });
          }}
        >
          Redeem Token
        </Button>
        <Button
          flex={1}
          onPress={() => {
            navigate("Receive", { screen: "PaymentRequest" });
          }}
        >
          Create Request
        </Button>
      </XStack>
    </ScreenContainer>
  );
};

export default ReceiveHomeScreen;

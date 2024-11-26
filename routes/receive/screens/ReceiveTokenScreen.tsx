import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { StaticScreenProps } from "@react-navigation/native";
import ScreenContainer from "../../../components/ScreenContainer";
import StandardInput from "../../../components/StandardInput";
import StandardButton from "../../../components/StandardButton";
import { getDecodedToken } from "@cashu/cashu-ts";
import useGetWallet from "../../../hooks/useGetWallet";
import useProofStore from "../../../hooks/useProofStore";
import StandardErrorText from "../../../components/StandardErrorText";
import { Button, Input, Label, TextArea, XStack, YStack } from "tamagui";
import ThemedFA5Icon from "../../../components/ThemedFA5Icon";

type ScreenProps = StaticScreenProps<{ token?: string }>;

const ReceiveTokenScreen = ({ route }: ScreenProps) => {
  const [input, setInput] = useState(route.params.token ?? "");
  const [error, setError] = useState("");
  const getWallet = useGetWallet();
  const { saveProofs } = useProofStore();
  async function redeemToken() {
    setError("");
    try {
      const decoded = getDecodedToken(input);
      const wallet = getWallet(decoded.mint);
      const newProofs = await wallet.receive(decoded);
      await saveProofs(
        newProofs.map((p) => ({
          ...p,
          status: "ready",
          mintUrl: decoded.mint,
        })),
      );
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      console.error(e);
    }
  }
  return (
    <ScreenContainer>
      <View style={{ flex: 1, gap: 16 }}>
        <YStack>
          <Label>Enter Token</Label>
          <XStack space="$2">
            <Input
              placeholder="cashu..."
              value={input}
              onChangeText={setInput}
              flex={1}
            />
            <Button>
              <ThemedFA5Icon name="paste" />
            </Button>
          </XStack>
        </YStack>
        {error ? <StandardErrorText error={error} /> : undefined}
      </View>
      <Button onPress={redeemToken} size="$6">
        Receive
      </Button>
    </ScreenContainer>
  );
};

export default ReceiveTokenScreen;

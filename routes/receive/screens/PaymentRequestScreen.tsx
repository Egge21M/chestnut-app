import { View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "../../../components/ScreenContainer";
import {
  Button,
  Input,
  Label,
  Separator,
  Switch,
  XStack,
  YStack,
} from "tamagui";
import { PaymentRequest, PaymentRequestTransportType } from "@cashu/cashu-ts";
import { generateSecretKey, getPublicKey, nip19 } from "nostr-tools";
import PaymentRequestBox from "../components/PaymentRequestBox";

const randomKey = generateSecretKey();

const PaymentRequestScreen = () => {
  const [amount, setAmount] = useState<string>();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>();

  async function createRequest() {
    const nprofile = nip19.nprofileEncode({
      pubkey: getPublicKey(randomKey),
      relays: ["wss://nostr.mom"],
    });
    const paymentRequest = new PaymentRequest(
      [
        {
          type: PaymentRequestTransportType.NOSTR,
          target: nprofile,
          tags: [["n", "17"]],
        },
      ],
      undefined,
      amount ? Number(amount) : undefined,
      "sat",
    );
    setPaymentRequest(paymentRequest);
  }

  if (paymentRequest) {
    return (
      <ScreenContainer>
        <PaymentRequestBox
          paymentRequest={paymentRequest}
          randomKey={randomKey}
        />
      </ScreenContainer>
    );
  }
  return (
    <ScreenContainer>
      <View style={{ flex: 1, gap: 12 }}>
        <YStack>
          <Label>Amount</Label>
          <Input onChangeText={setAmount} />
        </YStack>
        <XStack alignItems="center" gap="$2">
          <Label>Use Default Mint</Label>
          <Separator vertical minHeight={20} />
          <Switch size="$2" defaultChecked>
            <Switch.Thumb animation="quicker" />
          </Switch>
        </XStack>
      </View>
      <Button size="$4" onPress={createRequest}>
        Create Request
      </Button>
    </ScreenContainer>
  );
};

export default PaymentRequestScreen;

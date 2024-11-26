import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, Paragraph, Spinner, XStack, YStack } from "tamagui";
import QRCode from "react-qr-code";
import ThemedFA5Icon from "../../../components/ThemedFA5Icon";
import { PaymentRequest } from "@cashu/cashu-ts";
import NDK, { NDKSubscription } from "@nostr-dev-kit/ndk";
import { nip19, nip17 } from "nostr-tools";

const PaymentRequestBox = ({
  paymentRequest,
  randomKey,
}: {
  paymentRequest: PaymentRequest;
  randomKey: Uint8Array;
}) => {
  const [isPaid, setIsPaid] = useState(false);

  nip17;

  useEffect(() => {
    let sub: NDKSubscription;
    if (paymentRequest) {
      const decodedNProfile = nip19.decode(
        paymentRequest.transport[0].target as `nprofile1${string}`,
      );
      const ndk = new NDK({ explicitRelayUrls: decodedNProfile.data.relays });
      ndk.connect().then(() => {
        sub = ndk.subscribe({
          //@ts-ignore
          kinds: [1059],
          "#p": [decodedNProfile.data.pubkey],
        });
        console.log(sub);
        sub.on("event", (e) => {
          // const message = nip17.unwrapEvent(
          //   {
          //     kind: e.kind!,
          //     content: e.content,
          //     created_at: e.created_at!,
          //     tags: e.tags,
          //     id: e.id,
          //     sig: e.sig!,
          //     pubkey: e.pubkey,
          //   },
          //   randomKey,
          // );
          console.log();
        });
      });
    }
    return () => {
      if (sub) {
        sub.stop();
      }
    };
  }, [paymentRequest]);

  return (
    <YStack justifyContent="center" alignItems="center" gap="$2">
      <View style={{ padding: 8, borderRadius: 8, backgroundColor: "white" }}>
        <QRCode value={paymentRequest.toEncodedRequest()} />
      </View>
      <XStack width={"100%"} space="$2">
        <Input
          value={paymentRequest.toEncodedRequest()}
          editable={false}
          flex={1}
        />
        <Button>
          <ThemedFA5Icon name="copy" />
        </Button>
      </XStack>
      <XStack>
        <Paragraph>Awaiting payment...</Paragraph>
        <Spinner />
      </XStack>
    </YStack>
  );
};

export default PaymentRequestBox;

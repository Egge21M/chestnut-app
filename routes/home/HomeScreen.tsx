import { Button, Text, View } from "react-native";
import React from "react";
import ScreenContainer from "../../components/ScreenContainer";
import useBalance from "../../hooks/useBalance";
import useGetWallet from "../../hooks/useGetWallet";
import useProofStore from "../../hooks/useProofStore";
import { deleteDatabaseAsync, useSQLiteContext } from "expo-sqlite";
import StandardButton from "../../components/StandardButton";

const HomeScreen = () => {
  const balance = useBalance();
  const getWallet = useGetWallet();
  const { saveProofs } = useProofStore();
  const db = useSQLiteContext();
  return (
    <ScreenContainer>
      {Object.keys(balance).map((url) => (
        <Text>
          {url}: {balance[url]}
        </Text>
      ))}
      <Button
        title="Test"
        onPress={async () => {
          try {
            console.log("Getting proofs");
            const wallet = getWallet("https://nofees.testnut.cashu.space");
            const quoteRes = await wallet.createMintQuote(21);
            console.log("quote");
            await new Promise((res) => {
              setTimeout(res, 4000);
            });
            const proofs = await wallet.mintProofs(21, quoteRes.quote);
            saveProofs(
              proofs.map((p) => ({
                ...p,
                mintUrl: "https://nofees.testnut.cashu.space",
                status: "ready",
              })),
            );
          } catch (e) {
            console.log(e);
          }
        }}
      />
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          width: "100%",
        }}
      >
        <StandardButton title="Receive" />
        <StandardButton title="Send" />
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;

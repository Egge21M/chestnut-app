import { View } from "react-native";
import React from "react";
import ScreenContainer from "../../components/ScreenContainer";
import useBalance from "../../hooks/useBalance";
import { useNavigation } from "@react-navigation/native";
import { Button, Heading, Paragraph, XStack } from "tamagui";
import ThemedFA5Icon from "../../components/ThemedFA5Icon";

const HomeScreen = () => {
  const balance = useBalance();
  const { navigate } = useNavigation();

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Heading
          size="$12"
          onPress={() => {
            console.log("yay!");
          }}
        >
          {balance.total} SATS
        </Heading>
      </View>
      <XStack flex={2}>
        <Button>
          <ThemedFA5Icon name="database" />
        </Button>
      </XStack>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          width: "100%",
        }}
      >
        <XStack width="100%" space={"$2"}>
          <Button
            size={"$6"}
            onPress={() => {
              navigate("Receive");
            }}
            flex={1}
          >
            Receive
          </Button>
          <Button size={"$6"} flex={1}>
            Send
          </Button>
        </XStack>
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;

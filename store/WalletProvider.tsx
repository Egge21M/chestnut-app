import { CashuWallet } from "@cashu/cashu-ts";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type UrlMap = { [url: string]: CashuWallet };

export const WalletContext = createContext<
  [UrlMap, Dispatch<SetStateAction<UrlMap>>]
>([{}, () => {}]);

const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallets, setWallets] = useState<UrlMap>({});

  return (
    <WalletContext.Provider value={[wallets, setWallets]}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;

import { useContext } from "react";
import { WalletContext } from "../store/WalletProvider";
import { CashuMint, CashuWallet } from "@cashu/cashu-ts";

function useGetWallet() {
  const [wallets, setWallets] = useContext(WalletContext);

  function getWallet(url: string): CashuWallet {
    if (wallets[url]) {
      return wallets[url];
    }
    const newWallet = new CashuWallet(new CashuMint(url));
    setWallets((p) => ({ ...p, url: newWallet }));
    return newWallet;
  }

  return getWallet;
}

export default useGetWallet;

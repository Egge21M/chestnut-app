import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useMemo, useState } from "react";
import { EventManager } from "../utils/EventManager";
import { sumProofs } from "@cashu/cashu-ts/dist/lib/es5/utils";
import { getReadyProofsFromDb } from "../utils/database";

const useBalance = () => {
  const [balance, setBalance] = useState<number>();
  const db = useSQLiteContext();
  const emitter = useMemo(() => {
    return EventManager.getInstance();
  }, []);
  useEffect(() => {
    const proofs = getReadyProofsFromDb(db);
    setBalance(sumProofs(proofs));
    emitter.on("proofsUpdated", () => {
      const proofs = getReadyProofsFromDb(db);
      setBalance(sumProofs(proofs));
    });
  });
  return balance;
};

export default useBalance;

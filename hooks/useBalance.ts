import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useMemo, useState } from "react";
import { EventManager } from "../utils/EventManager";
import { sumProofs } from "@cashu/cashu-ts/dist/lib/es5/utils";
import { getReadyProofsFromDb } from "../utils/database";
import { Proof } from "@cashu/cashu-ts";
import { ProofModel } from "../types/model";

const useBalance = () => {
  const [proofs, setProofs] = useState<ProofModel[]>([]);
  const balanceMap: { [url: string]: number; total: number } = useMemo(() => {
    const map: { [key: string]: number; total: number } = { total: 0 };
    for (let i = 0; i < proofs.length; i++) {
      if (map[proofs[i].mintUrl]) {
        map[proofs[i].mintUrl] = map[proofs[i].mintUrl] + proofs[i].amount;
      } else {
        map[proofs[i].mintUrl] = proofs[i].amount;
      }
    }
    map.total = Object.keys(map).reduce((a, c) => a + map[c], 0);
    return map;
  }, [proofs]);

  const db = useSQLiteContext();
  const emitter = useMemo(() => {
    return EventManager.getInstance();
  }, []);
  useEffect(() => {
    const proofs = getReadyProofsFromDb(db);
    console.log(proofs);
    setProofs(proofs);
    emitter.on("proofsUpdated", () => {
      const proofs = getReadyProofsFromDb(db);
      setProofs(proofs);
    });
  }, []);
  return balanceMap;
};

export default useBalance;

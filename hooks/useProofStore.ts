import { useSQLiteContext } from "expo-sqlite";
import { getReadyProofsFromDb, saveProofsToDb } from "../utils/database";
import { Proof } from "@cashu/cashu-ts";
import { useMemo } from "react";
import { EventManager } from "../utils/EventManager";
import { ProofModel } from "../types/model";

const useProofStore = () => {
  const db = useSQLiteContext();
  const emitter = useMemo(() => {
    return EventManager.getInstance();
  }, []);
  function getReadyProofs() {
    return getReadyProofsFromDb(db);
  }
  function saveProofs(proofs: ProofModel[]) {
    saveProofsToDb(db, proofs);
    emitter.emit("proofsUpdated", undefined);
  }
  return { saveProofs, getReadyProofs };
};

export default useProofStore;

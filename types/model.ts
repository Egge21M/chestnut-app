import { Proof } from "@cashu/cashu-ts";

export type ProofModel = Proof & {
  mintUrl: string;
  status: "ready" | "inflight" | "spent";
};

import { Proof } from "@cashu/cashu-ts";
import { SQLiteDatabase } from "expo-sqlite";
import { ProofModel } from "../types/model";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const res = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  console.log(res);
  let currentDbVersion = res?.user_version ?? 0;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE proofs (
id INTEGER NOT NULL,
secret TEXT NOT NULL,
amount INTEGER NOT NULL,
C TEXT PRIMARY KEY NOT NULL,
status TEXT NOT NULL,
mintUrl TEXT NOT NULL
);
`);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export function getReadyProofsFromDb(db: SQLiteDatabase) {
  return db.getAllSync<ProofModel>(
    `SELECT * from proofs WHERE status = "ready"`,
  );
}

export function saveProofsToDb(db: SQLiteDatabase, proofs: ProofModel[]) {
  const statement = db.prepareSync(
    `INSERT INTO proofs (id, secret, amount, C, status, mintUrl) VALUES ($id, $secret, $amount, $C, "ready", $mintUrl)`,
  );
  for (const proof of proofs) {
    statement.executeSync({
      $id: proof.id,
      $secret: proof.secret,
      $amount: proof.amount,
      $C: proof.C,
      $mintUrl: proof.mintUrl,
    });
  }
  statement.finalizeSync();
}

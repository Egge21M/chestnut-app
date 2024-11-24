import { Proof } from "@cashu/cashu-ts";
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const res = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
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
status TEXT NOT NULL
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
  return db.getAllSync<Proof>(`SELECT * from proofs WHERE status = 'ready'`);
}

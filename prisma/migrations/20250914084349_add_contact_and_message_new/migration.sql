/*
  Warnings:

  - Added the required column `phone` to the `contactMessage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_contactMessage" ("createdAt", "email", "id", "message", "name") SELECT "createdAt", "email", "id", "message", "name" FROM "contactMessage";
DROP TABLE "contactMessage";
ALTER TABLE "new_contactMessage" RENAME TO "contactMessage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

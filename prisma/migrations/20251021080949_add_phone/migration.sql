/*
  Warnings:

  - Added the required column `phone` to the `ImmigrationEvaluation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImmigrationEvaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "education" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "englishLevel" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ImmigrationEvaluation" ("age", "country", "createdAt", "education", "email", "englishLevel", "experience", "fullName", "id") SELECT "age", "country", "createdAt", "education", "email", "englishLevel", "experience", "fullName", "id" FROM "ImmigrationEvaluation";
DROP TABLE "ImmigrationEvaluation";
ALTER TABLE "new_ImmigrationEvaluation" RENAME TO "ImmigrationEvaluation";
CREATE UNIQUE INDEX "ImmigrationEvaluation_email_key" ON "ImmigrationEvaluation"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

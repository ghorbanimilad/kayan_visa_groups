-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "phone" TEXT,
    "idCardImage" TEXT,
    "profileImage" TEXT,
    "immigrationCase" TEXT,
    "slug" TEXT NOT NULL DEFAULT 'temp-slug',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("code", "createdAt", "fatherName", "id", "idCardImage", "immigrationCase", "name", "phone", "profileImage", "status", "updatedAt") SELECT "code", "createdAt", "fatherName", "id", "idCardImage", "immigrationCase", "name", "phone", "profileImage", "status", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

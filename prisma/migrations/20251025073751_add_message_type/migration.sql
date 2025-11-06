-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "adminId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'INTERNAL',
    CONSTRAINT "Message_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("adminId", "content", "createdAt", "id", "read", "updatedAt", "userId") SELECT "adminId", "content", "createdAt", "id", "read", "updatedAt", "userId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "updatedAt" DATETIME NOT NULL,
    "assignedAdminId" TEXT,
    CONSTRAINT "users_assignedAdminId_fkey" FOREIGN KEY ("assignedAdminId") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("code", "createdAt", "fatherName", "id", "idCardImage", "immigrationCase", "name", "phone", "profileImage", "slug", "status", "updatedAt") SELECT "code", "createdAt", "fatherName", "id", "idCardImage", "immigrationCase", "name", "phone", "profileImage", "slug", "status", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

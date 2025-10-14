-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VisaType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "showInNavbar" BOOLEAN NOT NULL DEFAULT true,
    "showInFooter" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_VisaType" ("id", "name", "slug") SELECT "id", "name", "slug" FROM "VisaType";
DROP TABLE "VisaType";
ALTER TABLE "new_VisaType" RENAME TO "VisaType";
CREATE UNIQUE INDEX "VisaType_slug_key" ON "VisaType"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the `_VisaTypeCountries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `visaTypeId` on the `Content` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_VisaTypeCountries_B_index";

-- DropIndex
DROP INDEX "_VisaTypeCountries_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_VisaTypeCountries";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_CountryVisaTypes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryVisaTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryVisaTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "VisaType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Content" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "section" TEXT,
    "imageUrl" TEXT,
    "order" INTEGER,
    "countryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Content_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Content" ("body", "countryId", "createdAt", "id", "imageUrl", "order", "section", "title", "updatedAt") SELECT "body", "countryId", "createdAt", "id", "imageUrl", "order", "section", "title", "updatedAt" FROM "Content";
DROP TABLE "Content";
ALTER TABLE "new_Content" RENAME TO "Content";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CountryVisaTypes_AB_unique" ON "_CountryVisaTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryVisaTypes_B_index" ON "_CountryVisaTypes"("B");

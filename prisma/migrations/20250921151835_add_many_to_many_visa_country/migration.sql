/*
  Warnings:

  - You are about to drop the column `visaTypeId` on the `Country` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_VisaTypeCountries" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_VisaTypeCountries_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_VisaTypeCountries_B_fkey" FOREIGN KEY ("B") REFERENCES "VisaType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "flagUrl" TEXT,
    "coverImage" TEXT
);
INSERT INTO "new_Country" ("countryCode", "coverImage", "flagUrl", "id", "name", "slug") SELECT "countryCode", "coverImage", "flagUrl", "id", "name", "slug" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
CREATE UNIQUE INDEX "Country_slug_key" ON "Country"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_VisaTypeCountries_AB_unique" ON "_VisaTypeCountries"("A", "B");

-- CreateIndex
CREATE INDEX "_VisaTypeCountries_B_index" ON "_VisaTypeCountries"("B");

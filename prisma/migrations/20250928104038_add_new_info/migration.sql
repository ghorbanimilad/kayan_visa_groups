-- CreateTable
CREATE TABLE "CountryVisaCover" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "countryId" TEXT NOT NULL,
    "visaTypeId" TEXT NOT NULL,
    "coverImage" TEXT,
    CONSTRAINT "CountryVisaCover_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CountryVisaCover_visaTypeId_fkey" FOREIGN KEY ("visaTypeId") REFERENCES "VisaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CountryVisaCover_countryId_visaTypeId_key" ON "CountryVisaCover"("countryId", "visaTypeId");

-- AlterTable
ALTER TABLE "Content" ADD COLUMN "order" INTEGER;
ALTER TABLE "Content" ADD COLUMN "visaTypeId" TEXT;

-- CreateTable
CREATE TABLE "_ContentVisaTypes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ContentVisaTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Content" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ContentVisaTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "VisaType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContentVisaTypes_AB_unique" ON "_ContentVisaTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentVisaTypes_B_index" ON "_ContentVisaTypes"("B");

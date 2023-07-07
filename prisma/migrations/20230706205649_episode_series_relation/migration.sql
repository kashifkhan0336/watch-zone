/*
  Warnings:

  - You are about to drop the column `director` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `runTime` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "director" TEXT;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "director",
DROP COLUMN "runTime";

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "seriesId" INTEGER NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "mediaId" INTEGER,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Series_mediaId_key" ON "Series"("mediaId");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

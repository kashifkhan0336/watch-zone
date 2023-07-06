-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "mediaName" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "mediaId" INTEGER,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_mediaId_key" ON "Movie"("mediaId");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

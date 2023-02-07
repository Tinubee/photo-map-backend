/*
  Warnings:

  - You are about to drop the column `caption` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `isMine` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "isMine" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "caption",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

/*
  Warnings:

  - Made the column `phone` on table `providerProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `restaurantThumbnail` on table `providerProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "providerProfile" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "restaurantThumbnail" SET NOT NULL;

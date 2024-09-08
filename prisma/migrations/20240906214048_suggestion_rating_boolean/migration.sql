/*
  Warnings:

  - The `suggestionRating` column on the `PromptResult` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PromptResult" DROP COLUMN "suggestionRating",
ADD COLUMN     "suggestionRating" BOOLEAN;

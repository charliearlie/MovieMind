/*
  Warnings:

  - The primary key for the `PromptResult` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PromptResult" DROP CONSTRAINT "PromptResult_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PromptResult_pkey" PRIMARY KEY ("id");

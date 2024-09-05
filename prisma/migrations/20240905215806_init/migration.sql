-- CreateTable
CREATE TABLE "PromptResult" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "prompt" TEXT NOT NULL,
    "claudeResponse" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromptResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromptResult_id_key" ON "PromptResult"("id");

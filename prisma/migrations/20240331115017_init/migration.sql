-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "holderId" TEXT,
    "cardId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_address_key" ON "users"("address");

-- CreateIndex
CREATE UNIQUE INDEX "users_holderId_key" ON "users"("holderId");

-- CreateIndex
CREATE UNIQUE INDEX "users_cardId_key" ON "users"("cardId");

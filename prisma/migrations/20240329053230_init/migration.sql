-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);
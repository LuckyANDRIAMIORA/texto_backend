-- CreateTable
CREATE TABLE "Message" (
    "message_id" SERIAL NOT NULL,
    "discussion_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Discussion" (
    "discussion_id" TEXT NOT NULL,

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("discussion_id")
);

-- CreateTable
CREATE TABLE "User_discussion" (
    "user_discussion_id" SERIAL NOT NULL,
    "discussion_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_discussion_pkey" PRIMARY KEY ("user_discussion_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discussion_discussion_id_email_key" ON "User_discussion"("discussion_id", "email");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "Discussion"("discussion_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_discussion" ADD CONSTRAINT "User_discussion_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "Discussion"("discussion_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_discussion" ADD CONSTRAINT "User_discussion_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

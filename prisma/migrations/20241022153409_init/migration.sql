-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "bar_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "volume" INTEGER NOT NULL,
    "stock" INTEGER,
    "price" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flow" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_bar_code" TEXT NOT NULL,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Products_bar_code_key" ON "Products"("bar_code");

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_product_bar_code_fkey" FOREIGN KEY ("product_bar_code") REFERENCES "Products"("bar_code") ON DELETE RESTRICT ON UPDATE CASCADE;

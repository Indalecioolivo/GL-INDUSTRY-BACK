-- CreateTable
CREATE TABLE "RawMaterial" (
    "id" SERIAL NOT NULL,
    "bar_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER,

    CONSTRAINT "RawMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowRawMaterial" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawMaterial_bar_code" TEXT NOT NULL,

    CONSTRAINT "FlowRawMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RawMaterial_bar_code_key" ON "RawMaterial"("bar_code");

-- AddForeignKey
ALTER TABLE "FlowRawMaterial" ADD CONSTRAINT "FlowRawMaterial_rawMaterial_bar_code_fkey" FOREIGN KEY ("rawMaterial_bar_code") REFERENCES "RawMaterial"("bar_code") ON DELETE CASCADE ON UPDATE CASCADE;

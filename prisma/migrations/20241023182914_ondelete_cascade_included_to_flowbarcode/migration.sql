-- DropForeignKey
ALTER TABLE "Flow" DROP CONSTRAINT "Flow_product_bar_code_fkey";

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_product_bar_code_fkey" FOREIGN KEY ("product_bar_code") REFERENCES "Products"("bar_code") ON DELETE CASCADE ON UPDATE CASCADE;

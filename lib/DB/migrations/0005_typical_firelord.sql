ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::text::"public"."role";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
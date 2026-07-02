ALTER TABLE "users"
ALTER COLUMN "avatar_URL"
TYPE varchar(255)[]
USING ARRAY["avatar_URL"];
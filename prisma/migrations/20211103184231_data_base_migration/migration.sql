-- CreateTable
CREATE TABLE "userInfoMigrate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "github_id" INTEGER NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "login" TEXT NOT NULL
);

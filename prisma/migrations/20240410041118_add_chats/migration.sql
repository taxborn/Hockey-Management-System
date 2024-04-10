/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `UserGroups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Chats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "groupId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Chats_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Chats_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "UserGroups" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME,
    "location" TEXT,
    "organizerId" INTEGER NOT NULL,
    "groupId" INTEGER,
    CONSTRAINT "Events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Events_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "UserGroups" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Events" ("color", "description", "end_date", "groupId", "id", "location", "name", "organizerId", "start_date") SELECT "color", "description", "end_date", "groupId", "id", "location", "name", "organizerId", "start_date" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroups_name_key" ON "UserGroups"("name");

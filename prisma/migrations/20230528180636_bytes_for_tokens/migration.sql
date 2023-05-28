-- AlterTable
ALTER TABLE `User` MODIFY `refreshToken` LONGBLOB NOT NULL,
    MODIFY `token` LONGBLOB NOT NULL;

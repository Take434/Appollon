-- CreateTable
CREATE TABLE `ValidStates` (
    `state` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`state`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Country` (
    `id` CHAR(2) NOT NULL,
    `name` VARCHAR(40) NULL,
    `regionId` INTEGER UNSIGNED NOT NULL,

    INDEX `regionId`(`regionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `managerId` INTEGER UNSIGNED NULL,
    `locationId` INTEGER UNSIGNED NULL,

    INDEX `locationId`(`locationId`),
    INDEX `managerId`(`managerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER UNSIGNED NOT NULL,
    `firstName` VARCHAR(20) NULL,
    `lastName` VARCHAR(20) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `hiredAt` DATE NOT NULL,
    `jobId` VARCHAR(10) NOT NULL,
    `salary` DECIMAL(8, 2) NOT NULL,
    `commissionPct` DECIMAL(2, 2) NULL,
    `managerId` INTEGER UNSIGNED NULL,
    `departmentId` INTEGER UNSIGNED NULL,

    INDEX `departmentId`(`departmentId`),
    INDEX `jobId`(`jobId`),
    INDEX `managerId`(`managerId`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobHistory` (
    `employeeId` INTEGER UNSIGNED NOT NULL,
    `startedAt` DATE NOT NULL,
    `endedAt` DATE NOT NULL,
    `jobId` VARCHAR(10) NOT NULL,
    `departmentId` INTEGER UNSIGNED NOT NULL,

    INDEX `departmentId`(`departmentId`),
    INDEX `jobId`(`jobId`),
    UNIQUE INDEX `employeeId`(`employeeId`, `startedAt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `id` VARCHAR(10) NOT NULL,
    `title` VARCHAR(35) NOT NULL,
    `minSalary` DECIMAL(8, 0) NULL,
    `maxSalary` DECIMAL(8, 0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `streetAddress` VARCHAR(40) NULL,
    `postalCode` VARCHAR(12) NULL,
    `city` VARCHAR(30) NOT NULL,
    `stateProvince` VARCHAR(25) NULL,
    `countryId` CHAR(2) NOT NULL,

    INDEX `countryId`(`countryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(25) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bio` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(80) NOT NULL,
    `name` VARCHAR(60) NULL,
    `password` VARCHAR(60) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Country` ADD CONSTRAINT `Country_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `JobHistory` ADD CONSTRAINT `JobHistory_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `JobHistory` ADD CONSTRAINT `JobHistory_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `JobHistory` ADD CONSTRAINT `JobHistory_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

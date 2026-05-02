/*
  Warnings:

  - You are about to drop the column `groupId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the `CompanyGroupMapping` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Company] DROP CONSTRAINT [Company_groupId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[CompanyGroupMapping] DROP CONSTRAINT [CompanyGroupMapping_companyId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[CompanyGroupMapping] DROP CONSTRAINT [CompanyGroupMapping_groupId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Company] DROP COLUMN [groupId];

-- AlterTable
ALTER TABLE [dbo].[Ledger] ADD [groupId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_role_df];
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_role_df] DEFAULT 'USER' FOR [role];

-- DropTable
DROP TABLE [dbo].[CompanyGroupMapping];

-- AddForeignKey
ALTER TABLE [dbo].[Ledger] ADD CONSTRAINT [Ledger_groupId_fkey] FOREIGN KEY ([groupId]) REFERENCES [dbo].[Group]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

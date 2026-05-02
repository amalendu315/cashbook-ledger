/*
  Warnings:

  - The primary key for the `CompanyGroupMapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupId` on the `CompanyGroupMapping` table. All the data in the column will be lost.
  - Added the required column `ledgerId` to the `CompanyGroupMapping` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CompanyGroupMapping] DROP CONSTRAINT [CompanyGroupMapping_groupId_fkey];

-- DropIndex
DROP INDEX [CompanyGroupMapping_groupId_idx] ON [dbo].[CompanyGroupMapping];

-- AlterTable
ALTER TABLE [dbo].[Company] ADD [groupId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[CompanyGroupMapping] DROP CONSTRAINT [CompanyGroupMapping_pkey];
ALTER TABLE [dbo].[CompanyGroupMapping] DROP COLUMN [groupId];
ALTER TABLE [dbo].[CompanyGroupMapping] ADD [ledgerId] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[CompanyGroupMapping] ADD CONSTRAINT CompanyGroupMapping_pkey PRIMARY KEY CLUSTERED ([companyId],[ledgerId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyGroupMapping_ledgerId_idx] ON [dbo].[CompanyGroupMapping]([ledgerId]);

-- AddForeignKey
ALTER TABLE [dbo].[Company] ADD CONSTRAINT [Company_groupId_fkey] FOREIGN KEY ([groupId]) REFERENCES [dbo].[Group]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyGroupMapping] ADD CONSTRAINT [CompanyGroupMapping_ledgerId_fkey] FOREIGN KEY ([ledgerId]) REFERENCES [dbo].[Ledger]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

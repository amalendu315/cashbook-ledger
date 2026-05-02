/*
  Warnings:

  - The primary key for the `CompanyGroupMapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ledgerId` on the `CompanyGroupMapping` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `CompanyGroupMapping` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CompanyGroupMapping] DROP CONSTRAINT [CompanyGroupMapping_ledgerId_fkey];

-- DropIndex
DROP INDEX [CompanyGroupMapping_ledgerId_idx] ON [dbo].[CompanyGroupMapping];

-- AlterTable
ALTER TABLE [dbo].[CompanyGroupMapping] DROP CONSTRAINT [CompanyGroupMapping_pkey];
ALTER TABLE [dbo].[CompanyGroupMapping] DROP COLUMN [ledgerId];
ALTER TABLE [dbo].[CompanyGroupMapping] ADD [groupId] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[CompanyGroupMapping] ADD CONSTRAINT CompanyGroupMapping_pkey PRIMARY KEY CLUSTERED ([companyId],[groupId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyGroupMapping_groupId_idx] ON [dbo].[CompanyGroupMapping]([groupId]);

-- AddForeignKey
ALTER TABLE [dbo].[CompanyGroupMapping] ADD CONSTRAINT [CompanyGroupMapping_groupId_fkey] FOREIGN KEY ([groupId]) REFERENCES [dbo].[Group]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

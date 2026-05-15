/*
  Warnings:

  - You are about to drop the column `paymentMode` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `paymentModeId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Transaction] DROP COLUMN [paymentMode];
ALTER TABLE [dbo].[Transaction] ADD [paymentModeId] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[PaymentMode] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [category] NVARCHAR(1000) NOT NULL,
    [isActive] BIT NOT NULL CONSTRAINT [PaymentMode_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PaymentMode_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PaymentMode_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PaymentMode_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Transaction_paymentModeId_idx] ON [dbo].[Transaction]([paymentModeId]);

-- AddForeignKey
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_paymentModeId_fkey] FOREIGN KEY ([paymentModeId]) REFERENCES [dbo].[PaymentMode]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

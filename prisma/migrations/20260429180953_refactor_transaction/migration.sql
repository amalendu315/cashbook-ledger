BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Transaction] (
    [id] NVARCHAR(1000) NOT NULL,
    [voucherNo] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [companyId] NVARCHAR(1000) NOT NULL,
    [ledgerId] NVARCHAR(1000),
    [destinationCompanyId] NVARCHAR(1000),
    [amount] FLOAT(53) NOT NULL,
    [paymentMode] NVARCHAR(1000) NOT NULL,
    [businessDate] DATETIME2 NOT NULL,
    [particulars] NVARCHAR(1000) NOT NULL,
    [remarks] NVARCHAR(max),
    [approvedBy] NVARCHAR(1000),
    [approvedOver] NVARCHAR(1000),
    [attachmentUrl] NVARCHAR(1000),
    [createdById] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Transaction_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Transaction_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Transaction_voucherNo_key] UNIQUE NONCLUSTERED ([voucherNo])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Transaction_companyId_idx] ON [dbo].[Transaction]([companyId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Transaction_ledgerId_idx] ON [dbo].[Transaction]([ledgerId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Transaction_businessDate_idx] ON [dbo].[Transaction]([businessDate]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Transaction_type_idx] ON [dbo].[Transaction]([type]);

-- AddForeignKey
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_companyId_fkey] FOREIGN KEY ([companyId]) REFERENCES [dbo].[Company]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_ledgerId_fkey] FOREIGN KEY ([ledgerId]) REFERENCES [dbo].[Ledger]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_destinationCompanyId_fkey] FOREIGN KEY ([destinationCompanyId]) REFERENCES [dbo].[Company]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Transaction] ADD CONSTRAINT [Transaction_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

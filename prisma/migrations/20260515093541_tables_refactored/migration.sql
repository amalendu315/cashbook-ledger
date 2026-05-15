BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CompanyPaymentModeMapping] (
    [companyId] NVARCHAR(1000) NOT NULL,
    [paymentModeId] NVARCHAR(1000) NOT NULL,
    [mappedAt] DATETIME2 NOT NULL CONSTRAINT [CompanyPaymentModeMapping_mappedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CompanyPaymentModeMapping_pkey] PRIMARY KEY CLUSTERED ([companyId],[paymentModeId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyPaymentModeMapping_companyId_idx] ON [dbo].[CompanyPaymentModeMapping]([companyId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyPaymentModeMapping_paymentModeId_idx] ON [dbo].[CompanyPaymentModeMapping]([paymentModeId]);

-- AddForeignKey
ALTER TABLE [dbo].[CompanyPaymentModeMapping] ADD CONSTRAINT [CompanyPaymentModeMapping_companyId_fkey] FOREIGN KEY ([companyId]) REFERENCES [dbo].[Company]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyPaymentModeMapping] ADD CONSTRAINT [CompanyPaymentModeMapping_paymentModeId_fkey] FOREIGN KEY ([paymentModeId]) REFERENCES [dbo].[PaymentMode]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

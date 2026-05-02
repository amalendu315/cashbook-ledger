BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [passwordHash] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'MANAGER',
    [isActive] BIT NOT NULL CONSTRAINT [User_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Company] (
    [id] NVARCHAR(1000) NOT NULL,
    [companyCode] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Company_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Company_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Company_companyCode_key] UNIQUE NONCLUSTERED ([companyCode])
);

-- CreateTable
CREATE TABLE [dbo].[Ledger] (
    [id] NVARCHAR(1000) NOT NULL,
    [ledger_name] NVARCHAR(1000) NOT NULL,
    [ledger_details] NVARCHAR(max),
    [isActive] BIT NOT NULL CONSTRAINT [Ledger_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Ledger_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Ledger_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Group] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Group_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Group_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserCompanyAccess] (
    [userId] NVARCHAR(1000) NOT NULL,
    [companyId] NVARCHAR(1000) NOT NULL,
    [assignedAt] DATETIME2 NOT NULL CONSTRAINT [UserCompanyAccess_assignedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [UserCompanyAccess_pkey] PRIMARY KEY CLUSTERED ([userId],[companyId])
);

-- CreateTable
CREATE TABLE [dbo].[CompanyLedgerMapping] (
    [companyId] NVARCHAR(1000) NOT NULL,
    [ledgerId] NVARCHAR(1000) NOT NULL,
    [mappedAt] DATETIME2 NOT NULL CONSTRAINT [CompanyLedgerMapping_mappedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CompanyLedgerMapping_pkey] PRIMARY KEY CLUSTERED ([companyId],[ledgerId])
);

-- CreateTable
CREATE TABLE [dbo].[CompanyGroupMapping] (
    [companyId] NVARCHAR(1000) NOT NULL,
    [groupId] NVARCHAR(1000) NOT NULL,
    [mappedAt] DATETIME2 NOT NULL CONSTRAINT [CompanyGroupMapping_mappedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CompanyGroupMapping_pkey] PRIMARY KEY CLUSTERED ([companyId],[groupId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [UserCompanyAccess_userId_idx] ON [dbo].[UserCompanyAccess]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [UserCompanyAccess_companyId_idx] ON [dbo].[UserCompanyAccess]([companyId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyLedgerMapping_companyId_idx] ON [dbo].[CompanyLedgerMapping]([companyId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyLedgerMapping_ledgerId_idx] ON [dbo].[CompanyLedgerMapping]([ledgerId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyGroupMapping_companyId_idx] ON [dbo].[CompanyGroupMapping]([companyId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [CompanyGroupMapping_groupId_idx] ON [dbo].[CompanyGroupMapping]([groupId]);

-- AddForeignKey
ALTER TABLE [dbo].[UserCompanyAccess] ADD CONSTRAINT [UserCompanyAccess_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCompanyAccess] ADD CONSTRAINT [UserCompanyAccess_companyId_fkey] FOREIGN KEY ([companyId]) REFERENCES [dbo].[Company]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyLedgerMapping] ADD CONSTRAINT [CompanyLedgerMapping_companyId_fkey] FOREIGN KEY ([companyId]) REFERENCES [dbo].[Company]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyLedgerMapping] ADD CONSTRAINT [CompanyLedgerMapping_ledgerId_fkey] FOREIGN KEY ([ledgerId]) REFERENCES [dbo].[Ledger]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyGroupMapping] ADD CONSTRAINT [CompanyGroupMapping_companyId_fkey] FOREIGN KEY ([companyId]) REFERENCES [dbo].[Company]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompanyGroupMapping] ADD CONSTRAINT [CompanyGroupMapping_groupId_fkey] FOREIGN KEY ([groupId]) REFERENCES [dbo].[Group]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

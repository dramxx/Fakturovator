## High level app functionality structure

### Invoices

- list all invoices ( edit, delete, download pdf )
- create an invoice

### Lists

- #### my companies
  - list all companies ( edit, delete )
  - create a company

- #### my clients
  - list all clients ( edit, delete )
  - create a client

## Core Entities & Fields

### 1. Company (Supplier / My Companies)

Used as "supplier" when creating invoices. Stored in "my companies" list.

Fields:

- BusinessName textfield (required)
- Street textfield
- City textfield
- ZIP textfield
- State textfield (optional, e.g. Slovakia)
- CompanyIdICO textfield (IČO – Slovak company registration number)
- TaxNumberDIC textfield (DIČ)
- VatIdICDPH textfield (IČ DPH / VAT ID)
- VatPayer select (Yes / No) – default No
- Phone textfield
- Email textfield
- Website textfield
- DefaultBankAccount textfield (IBAN format preferred) or select from linked bank accounts
- NoteAboveItems textarea
- NoteBelowItems textarea
- IssuedBy textfield (person name who issues invoices)
- Details textarea (free text notes)

### 2. Client (Customer / My Clients)

Used as "customer" when creating invoices. Stored in "my clients" list.

Fields:

- BusinessName textfield (required)
- Street textfield
- City textfield
- ZIP textfield
- State textfield
- CompanyIdICO textfield (IČO)
- TaxNumberDIC textfield (DIČ)
- VatIdICDPH textfield (IČ DPH / VAT ID)
- Email textfield
- Details textarea

Delivery address (optional – can be same as above or different):

- DeliveryBusinessName textfield
- DeliveryStreet textfield
- DeliveryCity textfield
- DeliveryZIP textfield
- DeliveryState textfield

Client defaults / preferences:

- TotalDiscountPercent number (0–100, default 0)
- DueDateDays number (default 15) – days after issue date
- DefaultPriceLevel select (Standard / default price)
- DefaultPaymentMethod select (bank transfer, cash, card, etc.)
- DefaultLanguage select (Slovak default, English, etc.)
- DefaultCurrency select (EUR default)
- NoteAboveItems textarea
- NoteBelowItems textarea

### 3. Invoice

Main document entity.

Fields – Header / Selection:

- SupplierCompanyId foreign key / select from My Companies (required)
- CustomerClientId foreign key / select from My Clients (required)

Basic details:

- InvoiceNumber textfield (auto-increment or manual, unique)
- InvoiceType select (Invoice / Proforma / Credit note / etc.) – default Invoice
- DateOfIssue datefield (default today)
- DateOfDelivery datefield (optional)
- DueDate datefield (calculated = DateOfIssue + DueDateDays from client)
- OrderNumber textfield (optional reference)
- ServiceOrSymbol textfield (constant symbol / variable symbol – Slovak banking)

Payment details:

- Currency select (EUR default, others possible)
- PaymentMethod select (bank transfer default, cash, card…)
- AlreadyPaid number (advance payment amount, default 0)
- AlreadyPaidCurrency select (same as Currency)
- DiscountPercent number (0–100, default 0) – total discount %
- DisplayMessage textarea (already paid message or custom text)

Additional / Notes:

- Language select (Slovak default)
- NoteAboveItems textarea
- NoteBeforeItems textarea (note before the items table)
- InternalNote textarea (not shown on PDF)
- IssuedBy textfield (from company default or override)

Invoice Items (repeatable rows):

- ItemDescription textarea (required)
- Unit textfield (ks, hod, m², etc.) – default "ks"
- Quantity number (default 1)
- PricePerUnit number (excl. VAT)
- VatRate select or number (0%, 10%, 20% default for SK)

Calculated (not stored directly):

- LineTotal = Quantity × PricePerUnit
- LineVat = LineTotal × VatRate / 100
- LineTotalWithVat = LineTotal + LineVat

Totals (calculated):

- Subtotal sum of LineTotal
- TotalVat sum of LineVat
- TotalWithVat Subtotal + TotalVat
- TotalDue TotalWithVat – AlreadyPaid

Other:

- Labels / Tags multi-select or tags input (optional)
- InvoiceStyle select (predefined templates – 5–6 options like classic, modern, D-style…)
- AlsoCreate checkboxes: Cash receipt, Delivery note, etc. (future phase)

Actions:

- Save → store invoice
- Save and show PDF → store + generate + open PDF

### 3. Template

- library: react-pdf
- generated from invoice fields
- QR code for payment (SEPA/IBAN): qrcode.react

## High-Level App Structure

Pages / Navigation:

- Home
  - some fancy homepage
- Dashboard / Invoices list
  - Table + New Invoice Button
    -Columns: InvoiceNumber, DateOfIssue, Company, Client, TotalWithVat, ActionsColumn (edit, delete, download PDF)
- My Companies
  - Table + New Company Button
    -Columns: Name, ActionsColumn (edit, delete)
- My Clients
  - Table + New Client Button
    -Columns: Name, ActionsColumn (edit, delete)
- Settings (empty for now)

Prioritize:

1. Company & Client CRUD
2. Invoice create + list + basic edit
3. PDF generation (one default template)

Additions for later:

4. Sequential invoice numbering with prefix/year
5. Statistics / overview (total issued, unpaid, per client)
6. Invoice templates
7. QR code for payment (SEPA/IBAN)

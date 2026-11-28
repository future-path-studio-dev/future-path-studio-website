# Supabase Row Level Security (RLS) Policy Proposal

**Project:** The Future Path Studio  
**Environment:** Development  
**Status:** Draft for team review  
**Related migration:** `20261127000000_initial_schema.sql`

## 1. Purpose

This document proposes access-control rules for the six database tables. These rules must be reviewed and approved before implementation.

## 2. Proposed access permissions

| Table | Public visitors | Authenticated users | Admin |
|---|---|---|---|
| profiles | No access | Own profile only | All profiles |
| services | Published services only | Published services only | Full access |
| resources | Published resources only | Published resources only | Full access |
| enquiries | Submit enquiry only | Submit enquiry; own records only if linked | Review and manage |
| consultation_requests | Submit request only | Own records only if linked | Review and manage |
| saved_resources | No access | Own saved resources only | Access as approved |

## 3. Security requirements

- Enable RLS on all six tables.
- Users must not access another user's private profile.
- Users must not change their own role to admin.
- Public visitors must only see published services and resources.
- Enquiry and consultation submissions must not expose other customers' information.
- Users must only manage their own saved resources.
- Administrative access must be restricted to verified administrators.
- Never expose the Supabase service-role key in frontend code.

## 4. Items requiring team approval

1. How will administrators be identified and verified?
2. Should authenticated users be allowed to view their own enquiries and consultation requests?
3. Should public visitors be allowed to submit enquiries without signing in?
4. Which profile fields can users update?
5. Should admins have full access to all six tables?

## 5. Implementation plan

After approval:

1. Finalise the RLS policy design.
2. Create a separate version-controlled SQL migration.
3. Apply it to the development Supabase project.
4. Test public, authenticated-user and administrator access.
5. Document test results.
6. Submit the implementation for team review.

**Important:** This document is a proposal only. No RLS policies have been applied to the database.
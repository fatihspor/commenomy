# Commenomy multiplayer backend

Supabase project: `ljvsbpufhpzkhrecmnpj` (separate from eUzman).

Applied migrations:
1. `multiplayer_foundation` – players, companies, production_sites and RLS.
2. `server_authoritative_company_production` – authenticated RPC `start_company(company_name)` and `collect_production(company)`.

## Current state
The database schema and RPC functions are deployed. A live multiplayer client, Google/Apple OAuth, trading, timed government elections, actual iOS Xcode project, and tested signed builds are not yet implemented.

## Security model
- Player profiles may only be inserted or updated by their owner.
- Company and production-site balances cannot be directly edited by mobile clients.
- Both economy RPC functions check `auth.uid()`; company production is restricted to its owner.
- Public RPC functions explicitly revoke access from `PUBLIC` and `anon`.
- Production accrues on collection based on server timestamps, rather than relying on a phone timer.

## Next steps
- Connect both mobile clients to Supabase Auth using a **publishable** key, never a service-role key.
- Build the shared world marketplace with transactional inventory/settlement and strict permissions.
- Configure Google and Apple OAuth providers.
- Create a full iOS Xcode project, and verify Android/iOS installations on actual devices.

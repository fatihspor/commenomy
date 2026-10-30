# Commenomy — Android account onboarding contract

## Required user journey
1. Welcome screen: **Google ile devam et** and **Apple ile devam et**.
2. Complete OAuth through Supabase Auth with Android deep-link redirect and PKCE.
3. After a valid session, look up `public.players` by the authenticated user id.
4. Existing player: resume the saved game; do **not** create a second profile.
5. New player: show **Oyuncu adını seç**. Accept 3–20 letters, digits or underscore; display errors returned by the backend.
6. Invoke Supabase RPC `register_player(p_display_name)` with the active user's JWT; never send a user id from the device.
7. Show **Şirketini kur** and invoke `start_company(company_name)` after successful player registration.
8. Resume the saved company on future sign-ins.

## Security and error handling
- OAuth client IDs and redirect URI must match provider and Supabase settings. Never commit client secrets or service-role keys to Android sources.
- Use the system browser / supported provider SDK. Do not implement a password collection page for Google/Apple.
- Handle OAuth cancellation, expired sessions, offline mode, name already taken, invalid name, and network retry.
- If registration returns a duplicate-name error, keep the user on the name screen.
- Avoid repeating `start_company` on a retry: first query existing companies for the current player.
- RLS and server RPC ownership checks are authoritative; the Android UI is not a security boundary.
- Store session tokens using secure Android storage supported by the selected auth SDK.
- Test on an actual Android device and verify the built APK is installable before publishing.

## Current implementation status
- Backend RPC `register_player(text)` exists, requires authentication and enforces case-insensitive unique names.
- Backend RPC `start_company(text)` exists.
- Google/Apple provider credentials, callback handling, Android UI integration and device tests remain **unverified**.

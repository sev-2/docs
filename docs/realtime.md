---
title: Realtime
---

# Realtime

Supabase allows the client to subscribe, listen, and broadcast messages to channels,
send the user's presence, and listen changes in database.
To learn more about it, read [Supabase Realtime](https://supabase.com/realtime).

Raiden already provide the realtime endpoints by default.
When you run the Raiden server, you can access the `/realtime` enpoints.

```
raiden.router: =========== Registered Route ===========
raiden.router:  GET
raiden.router: - /realtime/v1/websocket
raiden.router:  POST
raiden.router: - /realtime/v1/api/broadcast
```

You can use [Supabase Client](https://supabase.com/docs#client-libraries) to interact with realtime endpoints.

# Deployment

## Environment
Set production values for all variables in `.env.example`.

## Recommended Flow
1. Build apps:
   - `npm run build --prefix server`
   - `npm run build --prefix client`
   - `npm run build --prefix admin`
2. Run server with `npm run start --prefix server`.
3. Deploy client/admin as Next.js apps behind HTTPS.
4. Use managed MongoDB and secure network rules.

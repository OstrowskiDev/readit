# ================================
# ETAP 1: Dev Dependencies 
# ================================
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ================================
# ETAP 2: Application Build
# ================================
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXTAUTH_URL=https://readit.ostrowskidev.com
ENV NEXT_PUBLIC_APP_URL=https://readit.ostrowskidev.com
ENV NODE_ENV=production
# IMPORTANT! For development/local tests
# change above env vars to those below:
# ENV NEXTAUTH_URL=http://localhost:3000
# ENV NEXT_PUBLIC_APP_URL=http://localhost:3000
# ENV NODE_ENV=development

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ================================
# ETAP 3: Production Image 
# ================================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NEXTAUTH_URL=https://readit.ostrowskidev.com
ENV NEXT_PUBLIC_APP_URL=https://readit.ostrowskidev.com
ENV NODE_ENV=production

# IMPORTANT! For development/local tests
# change above env vars to those below:
# ENV NEXTAUTH_URL=http://localhost:3000
# ENV NEXT_PUBLIC_APP_URL=http://localhost:3000
# ENV NODE_ENV=development

ENV NEXT_TELEMETRY_DISABLED=1

# Create dedicated user to use instead of root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy minimal file setup and standalone serwer 
# (next.config.mjs output: 'standalone')
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]


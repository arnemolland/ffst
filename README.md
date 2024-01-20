# ffst

Opinionated baseline for building SaaS applications with zero friction.

> [!NOTE]
> This template is based on the incredible work of several authors:
> * Authentication: [Antonio Erdeljac's next-auth guide](https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide)
> * Design: [shadcn's Taxonomy](https://github.com/shadcn-ui/taxonomy)

## Features

* Next.js 14 (app directory)
* Nested layouts and layout groups
* Data fetching, caching and mutation
* Loading UI
* Route handlers
* Metadata files
* Server- and client components
* API routes
* Authentication using [**Auth.js**](https://authjs.dev)
* ORM and DB tools using [**Drizzle**](https://drizzle.team)
* Database using [**PostgreSQL**](https://www.postgresql.org)
* UI components built with [**shadcn/ui**](https://ui.shadcn.com)
* Payments using [**Lemon Squeezy**](https://lemonsqueezy.com)
* Analytics using [**Tinybird**](https://tinybird.co)
* Styled using [**Tailwind CSS**](https://tailwindcss.com)
* Validations using [**Zod**](https://zod.dev)
* Written in [**TypeScript**](https://https://www.typescriptlang.org)

## Running locally

1. Set up infrastructure:

```bash
kubectl apply -k recipes/k8s
```

2. Copy .env.example to .env.local (or .envrc) and update the variables:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
bun dev
```

## Roadmap

- [ ] Dynamic pricing
- [ ] Payment flow
- [ ] Turborepo(?)
- [ ] Org/team/enterprise support
- [ ] Role-based access control (RBAC)

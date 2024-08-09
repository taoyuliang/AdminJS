# How to recompile Typescript File?

When you install an NPM package, it is already built and compiled to JavaScript

> -npm install -g typescript
>
> -cd folder that contains a tsconfig.json
>
> -tsc or npx tsc

Done

Model supplier is ONE of ONE:MANY
model supplier {
  name     String? @db.VarChar
  password String? @db.VarChar
  id       Int     @id(map: "id") @default(autoincrement())
  company  String? @db.VarChar
  Log      Log[] // Prisma own syntax
}
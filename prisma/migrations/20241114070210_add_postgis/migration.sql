-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "s_routes" (
    "name" VARCHAR,
    "from" VARCHAR(3),
    "stop" VARCHAR,
    "to" VARCHAR(3),
    "effective_date" DATE DEFAULT '2024-11-01'::date,
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR,
    "ratesArr" JSON[],
    "airline" VARCHAR,
    "schedule_date" VARCHAR,
    "from_name" VARCHAR,
    "to_name" VARCHAR,

    CONSTRAINT "pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "supplier" (
    "name" VARCHAR,
    "password" VARCHAR,
    "id" SERIAL NOT NULL,
    "company" VARCHAR,

    CONSTRAINT "id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upload_file" (
    "s3Key" VARCHAR,
    "bucket" VARCHAR,
    "mime" VARCHAR,
    "comment" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "upload_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recordId" INTEGER NOT NULL,
    "recordTitle" VARCHAR(128),
    "difference" JSON,
    "action" VARCHAR(128) NOT NULL,
    "resource" VARCHAR(128) NOT NULL,
    "userId" VARCHAR(128) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "userId" VARCHAR NOT NULL,
    "email" VARCHAR,
    "password" VARCHAR,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maps" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "PK_dddaabaf432b881f9f6e13bf9bd" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "markers" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "location" geography(Point, 4326) NOT NULL,
    "map_id" BIGINT,

    CONSTRAINT "PK_05eb83870b9b88db9d4e949965c" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "session"("expire");

-- CreateIndex
CREATE INDEX "IDX_ac07a7a14b21f94b434b2c0f5e" ON "markers" USING GIST ("location");

-- CreateIndex
CREATE INDEX "IDX_d41685ccfdacf01c9be1e95510" ON "markers"("map_id");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "markers" ADD CONSTRAINT "FK_d41685ccfdacf01c9be1e955105" FOREIGN KEY ("map_id") REFERENCES "maps"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

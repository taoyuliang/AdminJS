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
    "map_id" BIGINT,
    "location2" geography NOT NULL,
    "location" JSONB NOT NULL,

    CONSTRAINT "PK_05eb83870b9b88db9d4e949965c" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_ac07a7a14b21f94b434b2c0f5e" ON "markers" USING GIST ("location2");

-- CreateIndex
CREATE INDEX "IDX_d41685ccfdacf01c9be1e95510" ON "markers"("map_id");

-- AddForeignKey
ALTER TABLE "markers" ADD CONSTRAINT "FK_d41685ccfdacf01c9be1e955105" FOREIGN KEY ("map_id") REFERENCES "maps"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

CREATE TABLE pokemon(
    id             SERIAL PRIMARY KEY,
    catchdate      TIMESTAMP NOT NULL,
    nickname       VARCHAR(64),
    "generationId" INTEGER,
    FOREIGN KEY ("generationId") REFERENCES generation(id)
)
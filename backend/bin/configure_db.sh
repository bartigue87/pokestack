#!/bin/bash

export PGPASSWORD='node_password'

echo "Configuring pokemonstackdb"

dropdb -U node_user pokemonstackdb
createdb -U node_user pokemonstackdb

psql -U node_user pokemonstackdb < ./bin/sql/generation.sql
psql -U node_user pokemonstackdb < ./bin/sql/pokemon.sql
psql -U node_user pokemonstackdb < ./bin/sql/trait.sql
psql -U node_user pokemonstackdb < ./bin/sql/pokemonTrait.sql

node ./bin/insertTraits.js
echo "pokemonstackdb configured"
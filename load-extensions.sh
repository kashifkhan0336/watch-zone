#!/bin/sh
createdb --username "$POSTGRES_USER" watchzone
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" supertokens <<EOF

create extension pg_trgm;
CREATE EXTENSION pg_notify;
select * FROM pg_extension;
EOF
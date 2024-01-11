import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'announcement',
    password: 'announcement',
    database: 'announcement',
    synchronize: true,
};

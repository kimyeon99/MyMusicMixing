
 export const OrmConfig = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1214",
    database: "MMM",
    migrationsTableName: "migrations",
    name: 'default',
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['src/migration/**/*{.ts,.js}'],
  };
  export default OrmConfig;
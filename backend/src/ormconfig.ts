import { DataSource } from "typeorm";

const source = new DataSource({
  type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1214',
    database: 'MMM',
    entities: ['./entify/*.ts'],
    synchronize: false,
    migrations: ['./migrations/*.ts'],
  });
  export default source

import mysql from "mysql2/promise";

const MYSQL_HOST = process.env.MYSQL_DB_HOST;
const MYSQL_PORT = process.env.MYSQL_DB_PORT;
const MYSQL_DATABASE = process.env.MYSQL_DB_DATABASE;
const MYSQL_USER = process.env.MYSQL_DB_USER;
const MYSQL_PASSWORD = process.env.MYSQL_DB_PASSWORD;

let connection = null;

export async function connectToDatabase() {
  //For PlanetSide Database Connection
  //connection = await mysql.createConnection(process.env.MYSQL_DB_URI);

  //For AWS RDS ( Amazon Server )
  connection = await mysql.createConnection({host: MYSQL_HOST, user: MYSQL_USER, database: MYSQL_DATABASE, password: MYSQL_PASSWORD, port: MYSQL_PORT});
  console.log("Trying to connect");
  return {
    db: connection,
  };
}

export function closeConnection() {
  if (connection) connection.end();
}

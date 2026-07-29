import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: '120.77.81.21',
  port: 3306,
  user: 'lock',
  password: 'cRyWG5XLbyRLL8zd',
  database: 'lock',
  waitForConnections: true,
  connectionLimit: 5,
  charset: 'utf8mb4',
})

export function db() {
  return pool
}

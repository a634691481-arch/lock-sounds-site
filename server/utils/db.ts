import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: '120.77.81.21',
  port: 3306,
  user: 'lock',
  password: 'cRyWG5XLbyRLL8zd',
  database: 'lock',
  connectionLimit: 5,
  charset: 'utf8mb4',
})

async function initEventsTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      event_type VARCHAR(32) NOT NULL,
      target_id VARCHAR(64) DEFAULT '',
      target_name VARCHAR(255) DEFAULT '',
      page_url VARCHAR(512) DEFAULT '',
      user_agent VARCHAR(512) DEFAULT '',
      ip VARCHAR(45) DEFAULT '',
      search_query VARCHAR(255) DEFAULT '',
      result_count INT DEFAULT -1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_type (event_type),
      INDEX idx_created (created_at),
      INDEX idx_target (target_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `)
}

initEventsTable().catch(console.error)

export function db() {
  return pool
}

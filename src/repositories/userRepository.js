import { pool } from '../db/pool.js';

const baseSelect = 'id, email, role, created_at, updated_at';

export const userRepository = {
  async create({ email, passwordHash }) {
    const result = await pool.query(
      `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING ${baseSelect}`,
      [email, passwordHash]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query(
      `SELECT id, email, role, password_hash FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query(`SELECT ${baseSelect} FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  }
};

import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function generateHash() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error('❌ ADMIN_PASSWORD is not defined in .env');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('✅ Hashed Password:', hashedPassword);
}

generateHash();

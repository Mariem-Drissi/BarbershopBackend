import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Admin } from './auth/admin.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const adminRepository = app.get<Repository<Admin>>(getRepositoryToken(Admin));

  // ✅ Get username and password from CLI arguments
  const args = process.argv.slice(2);
  const usernameArg = args.find(arg => arg.startsWith('--username='));
  const passwordArg = args.find(arg => arg.startsWith('--password='));

  if (!usernameArg || !passwordArg) {
    console.error('❌ Please provide --username and --password arguments.');
    await app.close();
    process.exit(1);
  }

  const username = usernameArg.split('=')[1];
  const plainPassword = passwordArg.split('=')[1];

  const existingAdmin = await adminRepository.findOne({ where: { username } });
  if (existingAdmin) {
    console.log('⚠️ Admin with this username already exists. Skipping...');
    await app.close();
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const admin = adminRepository.create({ username, password: hashedPassword });
  await adminRepository.save(admin);

  console.log('✅ Admin created successfully!');
  await app.close();
}

bootstrap();

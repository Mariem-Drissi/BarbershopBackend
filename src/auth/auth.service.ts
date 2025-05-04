import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<string | null> {
    const admin = await this.adminRepository.findOne({ where: { username } });
    if (admin && await bcrypt.compare(password, admin.password)) {
      const payload = { username: admin.username, sub: admin.id };
      return this.jwtService.sign(payload, {
        expiresIn: '2m',
      });
    }
    return null;
  }
}

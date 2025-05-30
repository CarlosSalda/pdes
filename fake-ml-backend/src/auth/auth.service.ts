import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role, User, UserDocument } from 'src/user/models/user.schema';

@Injectable()
export class AuthService {
  private readonly expiration = '8h';

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const { email, password } = registerDto;
    const exists = await this.userModel.findOne({ email });
    if (exists) throw new ConflictException('Email ya registrado');

    const user = new this.userModel({ email, password });
    await user.save();
    return 'Registro exitoso!';
  }

  async registerAdmin(registerDto: RegisterDto): Promise<string> {
    const { email, password } = registerDto;
    const exists = await this.userModel.findOne({ email });
    if (exists) throw new ConflictException('Email ya registrado');

    const user = new this.userModel({ email, password, role: Role.ADMIN });
    await user.save();
    return 'Registro exitoso!';
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (user.password !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.expiration,
    });
    return { token };
  }

  async getUser(token: string): Promise<User> {
    const payload: {
      email: string;
      role: string;
    } = this.jwtService.verify(token);
    const user = await this.userModel.findOne({ email: payload.email }).exec();
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return user;
  }

  async logout(token: string) {
    const payload: {
      email: string;
      role: string;
    } = this.jwtService.verify(token);
    const user = await this.userModel.findOne({ email: payload.email }).exec();
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return user;
  }
}

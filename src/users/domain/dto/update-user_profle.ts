import { PartialType } from '@nestjs/swagger';
import { CreateUserProfile } from './create-user_profile';

export class UpdateUserProfile extends PartialType(CreateUserProfile) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProfile } from './create-user_profile';

export class UpdateUserProfile extends PartialType(CreateUserProfile) {}

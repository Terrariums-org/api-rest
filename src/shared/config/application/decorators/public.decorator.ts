import { SetMetadata } from '@nestjs/common';
import { Decorators_KEYS } from '../../domain/decorators.key';

export const PublicAccess = () => SetMetadata(Decorators_KEYS.PUBLIC, true);

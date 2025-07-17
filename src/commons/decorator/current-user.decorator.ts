import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDto } from 'src/core/guards/current-user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CurrentUserDto => {
    const request = context.switchToHttp().getRequest();
    return request.user; // Assuming 'user' is attached to the request object
  },
);

import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Retrieves the request object from the HTTP execution context.
   * @param {ExecutionContext} context - The execution context containing request data.
   * @returns {Request} - Returns the request object for further handling.
   */
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  /**
   * Determines if the request can proceed based on the presence of a valid JWT.
   * Skips authentication if the route is annotated with `@SkipAuth`.
   * @param {ExecutionContext} context - The context in which the request is executed.
   * @returns {boolean} - Returns `true` if authentication is skipped or successful; otherwise, throws an exception.
   * @throws {BadRequestException} - Throws an exception if no access token is provided.
   */
  canActivate(context: ExecutionContext): any {
    const request = this.getRequest(context);
    const skip = this.reflector.get<string[]>('skipAuth', context.getHandler());

    // Skip auth check if route is annotated with @SkipAuth
    if (skip) {
      return true;
    }

    const accessToken = request.headers.authorization;
    if (!accessToken) {
      throw new UnauthorizedException('You do not have permission');
    }
    return super.canActivate(context);
  }

  /**
   * Handles the response based on authentication success or failure.
   * @param {any} err - The error thrown during authentication, if any.
   * @param {any} user - The user object, if authentication is successful.
   * @returns {any} - Returns the authenticated user object.
   * @throws {UnauthorizedException} - Throws an exception if authentication fails or the user is undefined.
   */
  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException('You do not have permission');
    }
    return user;
  }
}

export const SkipAuth = () => SetMetadata('skipAuth', true);

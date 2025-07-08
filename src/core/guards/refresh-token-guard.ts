import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('jwt-refresh') {
  /**
   * Retrieves the request object from the HTTP execution context.
   * @param {ExecutionContext} context - The execution context containing request data.
   * @returns {Request} - Returns the request object for further handling.
   */
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
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
      throw err || new UnauthorizedException('Token Expired');
    }
    return user;
  }
}

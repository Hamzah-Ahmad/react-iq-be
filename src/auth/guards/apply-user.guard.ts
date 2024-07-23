import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Useful guard to provide user property in public routes.
// More details here: https://stackoverflow.com/questions/63257879/get-current-user-in-nestjs-on-a-route-without-an-authguard
// Current user decorator will not work when @Public decorator is being used. So the ApplyUser decorator should be used.

@Injectable()
export class ApplyUser extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (user) return user;
    return null;
  }
}
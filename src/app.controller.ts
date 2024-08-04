import { Controller} from '@nestjs/common';
// import { Public } from './auth/decorators/public.decorator';
// import { Role, User } from './user/entities/User.entity';
// import { CurrentUser } from './auth/decorators/current-user.decorator';
// import { Roles } from './auth/decorators/roles.decorator';
// import { ApplyUser } from './auth/guards/apply-user.guard';
@Controller()
export class AppController {
  constructor() {}

  // @Public()
  // @UseGuards(ApplyUser)
  // @Get()
  // getPublic(@Req() request): string {
  //   console.log("Request User ==> ", request.user)
  //   return this.appService.getPublic();
  // }
  // @Get('/private')
  // getPrivate(@CurrentUser() user: User): string {
  //   console.log("User ==> ", user)
  //   return this.appService.getPrivate();
  // }
  // @Get('/profile')
  // getProfile(@CurrentUser() user: User): User {
  //   return this.appService.getProfile(user);
  // }
  // @Get('/adminOnly')
  // @Roles(Role.Admin)
  // getAdminOnly(@CurrentUser() user: User): string {
  //   return this.appService.getAdminOnly();
  // }
  // @Get('/modRoute')
  // @Roles(Role.Moderator)
  // getModRoute(@CurrentUser() user: User): string {
  //   return this.appService.getModRoute();
  // }
}

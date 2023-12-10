import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

// В модуле UsersModule, единственное необходимое изменние это добавить UsersService в массив экспорта (exports) декоратора @Module,
// так чтобы он был виден за пределами этого модуля (мы скоро будем использовать его в нашем AuthService).
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

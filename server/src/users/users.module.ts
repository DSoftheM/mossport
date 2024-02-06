import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SportsmenController } from './sportsmen.controller';
import { JournalsModule } from 'src/journals/journals.module';

// В модуле UsersModule, единственное необходимое изменние это добавить UsersService в массив экспорта (exports) декоратора @Module,
// так чтобы он был виден за пределами этого модуля (мы скоро будем использовать его в нашем AuthService).
@Module({
  imports: [JournalsModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [SportsmenController],
})
export class UsersModule {}

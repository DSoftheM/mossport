import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  // Todo: проверить, если удалить
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [DbController],
  providers: [DbService],
})
export class DbModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class DbService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) {}

  executeQuery(query: string) {
    console.log('query :>> ', query);
    return this.employeeRepository.query(query);
    return this.employeeRepository.find({ take: 3 });
  }
}

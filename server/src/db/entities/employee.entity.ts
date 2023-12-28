import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: true })
  first_name!: string;

  @Column({ type: 'varchar', nullable: true })
  last_name!: string;

  @Column({ type: 'varchar', nullable: true })
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  gender!: string;

  @Column({ type: 'varchar', nullable: true })
  date_of_birth!: Date;
}

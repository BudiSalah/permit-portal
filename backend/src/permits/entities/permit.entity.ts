import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

@Entity('permit_applications')
export class PermitApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  applicant_name: string;

  @Column()
  applicant_email: string;

  @Column()
  permit_type: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  application_status: ApplicationStatus;

  @CreateDateColumn()
  submitted_at: Date;
}

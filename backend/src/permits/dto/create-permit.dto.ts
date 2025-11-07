import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationStatus } from '../entities/permit.entity';

export class CreatePermitDto {
  @ApiProperty({
    description: 'Name of the applicant',
    example: 'Ahmed Al-Saud',
  })
  @IsString()
  @IsNotEmpty()
  applicant_name: string;

  @ApiProperty({
    description: 'Email address of the applicant',
    example: 'ahmed@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  applicant_email: string;

  @ApiProperty({
    description: 'Type of permit being requested',
    example: 'Building Permit',
  })
  @IsString()
  @IsNotEmpty()
  permit_type: string;

  @ApiPropertyOptional({
    description: 'Status of the application',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
    example: ApplicationStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  application_status?: ApplicationStatus;
}

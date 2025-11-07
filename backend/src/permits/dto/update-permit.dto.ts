import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationStatus } from '../entities/permit.entity';

export class UpdatePermitDto {
  @ApiPropertyOptional({
    description: 'Name of the applicant',
    example: 'Ahmed Al-Saud',
  })
  @IsOptional()
  @IsString()
  applicant_name?: string;

  @ApiPropertyOptional({
    description: 'Email address of the applicant',
    example: 'ahmed@example.com',
  })
  @IsOptional()
  @IsEmail()
  applicant_email?: string;

  @ApiPropertyOptional({
    description: 'Type of permit being requested',
    example: 'Building Permit',
  })
  @IsOptional()
  @IsString()
  permit_type?: string;

  @ApiPropertyOptional({
    description: 'Status of the application',
    enum: ApplicationStatus,
    example: ApplicationStatus.APPROVED,
  })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  application_status?: ApplicationStatus;
}

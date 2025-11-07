import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitsService } from './permits.service';
import { PermitsController } from './permits.controller';
import { PermitApplication } from './entities/permit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermitApplication])],
  controllers: [PermitsController],
  providers: [PermitsService],
  exports: [PermitsService],
})
export class PermitsModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermitApplication, ApplicationStatus } from './entities/permit.entity';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';

@Injectable()
export class PermitsService {
  constructor(
    @InjectRepository(PermitApplication)
    private readonly permitRepository: Repository<PermitApplication>,
  ) {}

  async create(createPermitDto: CreatePermitDto): Promise<PermitApplication> {
    const permit = this.permitRepository.create({
      ...createPermitDto,
      application_status:
        createPermitDto.application_status || ApplicationStatus.PENDING,
    });
    return await this.permitRepository.save(permit);
  }

  async findAll(): Promise<PermitApplication[]> {
    return await this.permitRepository.find({
      order: {
        submitted_at: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<PermitApplication> {
    const permit = await this.permitRepository.findOne({
      where: { id },
    });

    if (!permit) {
      throw new NotFoundException(`Permit application with ID ${id} not found`);
    }

    return permit;
  }

  async update(
    id: number,
    updatePermitDto: UpdatePermitDto,
  ): Promise<PermitApplication> {
    const permit = await this.findOne(id);

    Object.assign(permit, updatePermitDto);

    return await this.permitRepository.save(permit);
  }

  async remove(id: number): Promise<void> {
    const permit = await this.findOne(id);
    await this.permitRepository.remove(permit);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PermitsService } from './permits.service';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';

@ApiTags('Permits')
@Controller('permits')
export class PermitsController {
  constructor(private readonly permitsService: PermitsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new permit application' })
  @ApiResponse({
    status: 201,
    description: 'Permit application created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreatePermitDto })
  create(@Body() createPermitDto: CreatePermitDto) {
    return this.permitsService.create(createPermitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permit applications' })
  @ApiResponse({
    status: 200,
    description: 'List of all permit applications',
  })
  findAll() {
    return this.permitsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a permit application by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Permit application ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Permit application found',
  })
  @ApiResponse({ status: 404, description: 'Permit application not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permitsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a permit application' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Permit application ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Permit application updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Permit application not found' })
  @ApiBody({ type: UpdatePermitDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermitDto: UpdatePermitDto,
  ) {
    return this.permitsService.update(id, updatePermitDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a permit application' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Permit application ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Permit application deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Permit application not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permitsService.remove(id);
  }
}

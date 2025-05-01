import { Controller } from '@nestjs/common';
import { DbService } from './db.service';

@Controller()
export class DbController {
  constructor(private readonly dbService: DbService) {}
}

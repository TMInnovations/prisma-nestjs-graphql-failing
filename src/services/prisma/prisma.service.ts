import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const tries = 10;
const wait = 1 * 1000; // 1s

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });

    this.$on<any>('query', async (e: any) => {
      console.log(`${e.query} ${e.params}`);
    });
  }

  private readonly logger = new Logger(PrismaService.name);

  triesLeft: number = tries;

  async onModuleInit() {
    this.connect();
  }

  connect() {
    this.logger.log('Trying to connect to the database . . .');
    this.$connect()
      .then(() => {
        this.logger.log('Successfully connected to the database');
      })
      .catch(e => {
        throw new Error(
          'Database Connection could not be established. Possible Problem: ' +
            e?.message,
        );
      });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

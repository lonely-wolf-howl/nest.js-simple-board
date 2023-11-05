import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);

    await repository.insert([{}]);
  }
}

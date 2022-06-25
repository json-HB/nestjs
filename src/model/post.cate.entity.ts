import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { Category } from './cate.entity';
import { Post } from './post.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('post.id', 'id')
      .addSelect('post.name', 'name')
      .addSelect('category.name', 'categoryName')
      .from(Post, 'post')
      .leftJoin(Category, 'category', 'category.id = post.categoryId'),
})
export class PostCategory {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  categoryName: string;
}

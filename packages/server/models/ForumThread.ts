import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'forum_theme',
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: false,
})
export class ForumThread extends Model<ForumThread> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public override id: number | undefined

  @Column(DataType.TEXT)
  public name: string | undefined
}

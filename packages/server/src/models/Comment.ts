import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { IComment } from './types'

export const CommentModel: ModelAttributes<Model, IComment> = {
  id: {
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  },
  content: {
    type: DataType.STRING,
    allowNull: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'User',
    //   key: 'id'
    // }
  },
  parentId: {
    type: DataType.UUID,
    allowNull: true,
  },
  // parentCommentId: {
  //   type: DataType.UUID,
  // onDelete: 'CASCADE',
  // onUpdate: 'CASCADE',
  // references: {
  //   model: 'Topic',
  //   key: 'id',
  // },
  // },
  emojiHappyFace: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  emojiSadFace: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  emojiAngryFace: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  emojiLike: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  emojiDislike: {
    type: DataType.INTEGER,
    allowNull: true,
  },
}

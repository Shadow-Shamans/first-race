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
    field: 'user_id',
  },
  parentCommentId: {
    type: DataType.UUID,
    allowNull: true,
    field: 'parent_comment_id',
  },
  topicId: {
    type: DataType.INTEGER,
    field: 'topic_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  emojiHappyFace: {
    type: DataType.INTEGER,
    allowNull: false,
    field: 'emoji_happy_face',
  },
  emojiSadFace: {
    type: DataType.INTEGER,
    allowNull: false,
    field: 'emoji_sad_face',
  },
  emojiAngryFace: {
    type: DataType.INTEGER,
    allowNull: false,
    field: 'emoji_angry_face',
  },
  emojiLike: {
    type: DataType.INTEGER,
    allowNull: false,
    field: 'emoji_like',
  },
  emojiDislike: {
    type: DataType.INTEGER,
    allowNull: false,
    field: 'emoji_dislike',
  },
}

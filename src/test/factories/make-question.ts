import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  overrride: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      ...overrride,
    },
    id,
  )

  return question
}

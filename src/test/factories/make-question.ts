import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(overrride: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    content: 'Conteúdo da pergunta',
    title: 'Título da pergunta',
    slug: Slug.create('titulo-da-pergunta'),
    ...overrride,
  })

  return question
}

import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionComments } from '@/test/repositories/in-memory-question-comments'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionComments: InMemoryQuestionComments
let sut: CommentOnQuestionUseCase

describe('Comment On Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionComments = new InMemoryQuestionComments()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionComments,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Comentário para uma pergunta',
    })

    expect(inMemoryQuestionComments.items[0].content).toEqual(
      'Comentário para uma pergunta',
    )
  })
})

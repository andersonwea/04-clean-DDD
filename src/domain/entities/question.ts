import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"

interface QuestionProps {
  authorId: UniqueEntityId
  title: string
  content: string
  bestAnswerId?: UniqueEntityId
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {}
import { PrismaClient } from '@prisma/client'
import { type createNoteDTO } from './dto/notes.schema.ts'

export class NoteRepository {
  private prisma = new PrismaClient()

  async create(data: createNoteDTO) {
    const note = await this.prisma.note.create({
      data,
    })
    return note
  }

  async findDuplicateTitle(data: createNoteDTO) {
    const note = await this.prisma.note.count({
      where: {
        titulo: { startsWith: data.titulo }
      }
    })
    return note
  }
}
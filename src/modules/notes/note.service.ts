import type { readNoteDTO, createNoteDTO, updateNoteDTO } from './dto/notes.schema.ts'
import { NoteRepository } from './note.repository.ts'

export class NoteService {
  private repo = new NoteRepository()

  async create(data: createNoteDTO) {
    const duplicate = await this.repo.findDuplicateTitle(data)
    if (duplicate > 0){
      data.titulo = data.titulo + ' ('+ duplicate + ')'
    }

    const note = await this.repo.create(data)
    return note
  }

  async read(id: readNoteDTO) {
    const note = await this.repo.read(id)
  
    if (note === null){
      return "Nenhuma nota encontrada"
    }

    return note
  }
  
  async update(idNote: string ,data: updateNoteDTO) {
    return this.repo.update(idNote, data)
  }
}
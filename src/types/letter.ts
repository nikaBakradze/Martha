export type Letter = {
  id: string
  name: string
  message: string
  created_at: string
  updated_at: string
}

export type CreateLetterInput = {
  name: string
  message: string
}

export type UpdateLetterInput = CreateLetterInput & {
  id: string
  ownerToken: string
}

export type LettersResponse = {
  letters: Letter[]
}

export type CreateLetterResponse = {
  letter: Letter
  ownerToken: string
}

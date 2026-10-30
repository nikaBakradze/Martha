import { supabase, supabasePublishableKey, supabaseUrl } from './supabase'
import type {
  CreateLetterInput,
  CreateLetterResponse,
  Letter,
  LettersResponse,
  UpdateLetterInput,
} from '../types/letter'

const lettersEndpoint = supabaseUrl ? `${supabaseUrl}/functions/v1/letters-api` : ''
const tokensStorageKey = 'martha_letter_tokens'

type TokenStore = Record<string, string>

const getTokenStore = (): TokenStore => {
  try {
    const storedTokens = window.localStorage.getItem(tokensStorageKey)
    if (!storedTokens) return {}
    const parsedTokens: unknown = JSON.parse(storedTokens)
    if (!parsedTokens || typeof parsedTokens !== 'object' || Array.isArray(parsedTokens)) return {}
    return Object.entries(parsedTokens).reduce<TokenStore>((tokens, [id, token]) => {
      if (typeof token === 'string' && token.length > 0) tokens[id] = token
      return tokens
    }, {})
  } catch {
    return {}
  }
}

const saveToken = (id: string, token: string) => {
  const tokens = getTokenStore()
  tokens[id] = token
  window.localStorage.setItem(tokensStorageKey, JSON.stringify(tokens))
}

export const getOwnerToken = (id: string) => getTokenStore()[id]

export const removeOwnerToken = (id: string) => {
  const tokens = getTokenStore()
  delete tokens[id]
  window.localStorage.setItem(tokensStorageKey, JSON.stringify(tokens))
}

const request = async <T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', body?: object): Promise<T> => {
  if (!supabase || !supabasePublishableKey || !lettersEndpoint) {
    throw new Error('The letters service is not configured yet. Add the Supabase publishable key to .env.local.')
  }

  const response = await fetch(lettersEndpoint, {
    method,
    headers: {
      apikey: supabasePublishableKey,
      Authorization: `Bearer ${supabasePublishableKey}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    let message = `The letters service returned an error (${response.status}).`
    try {
      const errorBody: unknown = await response.json()
      if (errorBody && typeof errorBody === 'object' && 'error' in errorBody && typeof errorBody.error === 'string') {
        message = errorBody.error
      }
    } catch {
      // Keep the useful status-based message when the response is not JSON.
    }
    throw new Error(message)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export const getLetters = async (): Promise<Letter[]> => {
  const response = await request<LettersResponse>('GET')
  return response.letters
}

export const createLetter = async (input: CreateLetterInput): Promise<Letter> => {
  const response = await request<CreateLetterResponse>('POST', input)
  saveToken(response.letter.id, response.ownerToken)
  return response.letter
}

export const updateLetter = async (input: UpdateLetterInput): Promise<Letter> => {
  const response = await request<Letter | { letter: Letter }>('PATCH', input)
  return 'letter' in response ? response.letter : response
}

export const deleteLetter = async (id: string, ownerToken: string): Promise<void> => {
  await request('DELETE', { id, ownerToken })
  removeOwnerToken(id)
}

// Pure logic for the "Base Converter Arcade" mini-game (OCR 1.2 data representation).

export type ConversionKind = 'bin2den' | 'den2bin' | 'den2hex' | 'hex2den'

export interface ConverterChallenge {
  id: string
  kind: ConversionKind
  /** Human-readable instruction, e.g. "Convert this binary number to denary". */
  instruction: string
  /** The value to convert, already formatted for display. */
  given: string
  /** The base the player must answer in: "denary" | "binary" | "hex". */
  answerBase: string
  /** Normalised expected answer (lower-case, no spaces). */
  answer: string
}

const KINDS: ConversionKind[] = ['bin2den', 'den2bin', 'den2hex', 'hex2den']

function toBinary(n: number): string {
  return n.toString(2).padStart(8, '0')
}

function toHex(n: number): string {
  return n.toString(16).toUpperCase().padStart(2, '0')
}

let counter = 0

/** Generate the next random conversion challenge (default range 0–255). */
export function nextChallenge(maxValue = 255): ConverterChallenge {
  const kind = KINDS[Math.floor(Math.random() * KINDS.length)]
  const value = Math.floor(Math.random() * (maxValue + 1))
  counter += 1
  const id = `c${counter}`

  switch (kind) {
    case 'bin2den':
      return {
        id,
        kind,
        instruction: 'Convert this binary number to denary',
        given: toBinary(value),
        answerBase: 'denary',
        answer: String(value),
      }
    case 'den2bin':
      return {
        id,
        kind,
        instruction: 'Convert this denary number to 8-bit binary',
        given: String(value),
        answerBase: 'binary',
        answer: toBinary(value),
      }
    case 'den2hex':
      return {
        id,
        kind,
        instruction: 'Convert this denary number to hexadecimal',
        given: String(value),
        answerBase: 'hex',
        answer: toHex(value).toLowerCase(),
      }
    case 'hex2den':
      return {
        id,
        kind,
        instruction: 'Convert this hexadecimal number to denary',
        given: toHex(value),
        answerBase: 'denary',
        answer: String(value),
      }
    default:
      throw new Error(`Unknown conversion kind: ${kind as string}`)
  }
}

export function normaliseAnswer(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, '').replace(/^0x/, '')
}

/** Compare a player's input against the expected answer, tolerant of format. */
export function isCorrect(input: string, challenge: ConverterChallenge): boolean {
  const given = normaliseAnswer(input)
  if (!given) return false

  if (challenge.answerBase === 'binary') {
    const expected = normaliseAnswer(challenge.answer)
    if (given === expected) return true
    // Accept answers with or without leading zeros.
    return Number.parseInt(given, 2) === Number.parseInt(expected, 2)
  }

  if (challenge.answerBase === 'hex') {
    return Number.parseInt(given, 16) === Number.parseInt(challenge.answer, 16)
  }

  return Number.parseInt(given, 10) === Number.parseInt(challenge.answer, 10)
}

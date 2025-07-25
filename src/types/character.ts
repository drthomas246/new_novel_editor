export interface Character {
  id: string
  userId: string
  name: string
  description?: string
  personality: string
  role: string
  corePersonality: string
  actionPhilosophy: string
  scores: {
    base: number
    decision: number
    action: number
    relation: number
    value: number
  }
  isPublic: boolean
  imageUrl: string
  diagnosisResult?: string
}

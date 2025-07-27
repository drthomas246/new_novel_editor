import { NextResponse } from 'next/server'

const mockMyCharacters = [
  {
    id: '1',
    userId: '1',
    name: 'リリー',
    personality: '裏方で支える冷静慎重派',
    role: '影の参謀',
    corePersonality: '物静かで慎重的、直接的な対応を好まない性格',
    actionPhilosophy: '一匹狼で現実主義',
    scores: { base: 1, decision: 1, action: 1, relation: 1, value: 1 },
    isPublic: true,
    imageUrl: '/images/Lily.png',
  },
  {
    id: '2',
    userId: '1',
    name: 'カイン',
    personality: '周囲を見てバランスを取る人',
    role: '調整役',
    corePersonality: '少し引っ込み思案で少しせっかちな面があり、直接的な対応を好まない性格',
    actionPhilosophy: '一匹狼で現実主義',
    scores: { base: 2, decision: 3, action: 1, relation: 1, value: 1 },
    isPublic: false,
    imageUrl: '/images/Cain.png',
  },
  {
    id: '3',
    userId: '1',
    name: 'ミナ',
    personality: '明るく場を和ませる',
    role: 'ムードメーカー',
    corePersonality: '活動的で直感に従う、直接的な対応を好まない性格',
    actionPhilosophy: '自由主義で現実的な側面を考慮する',
    scores: { base: 4, decision: 4, action: 1, relation: 2, value: 2 },
    isPublic: true,
    imageUrl: '/images/Mina.png',
  },
]

export async function GET() {
  return NextResponse.json(mockMyCharacters)
}

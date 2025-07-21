import { Button } from "@/components/common/button";
import { Card, CardContent } from "@/components/common/card";
import personalityMap from "@/data/personalityMap.json";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const template = {
  base: [
    "みんなと話すのが好き",
    "初対面でも緊張しない",
    "イベントを楽しめる",
    "人と話すと元気になる",
    "孤独は苦手",
  ],
  decision: [
    "物事をよく考える",
    "慎重に計画する",
    "失敗を恐れる",
    "計画を練るのが好き",
    "即決は避けたい",
  ],
  action: [
    "新しいことに挑戦する",
    "困難でも進む",
    "失敗を恐れず行動する",
    "刺激を求める",
    "挑戦心が強い",
  ],
  relation: [
    "友達を大事にする",
    "人助けをする",
    "グループ行動が好き",
    "協調性がある",
    "みんなのことを考える",
  ],
  value: [
    "理想を追い求める",
    "夢を信じる",
    "正義感が強い",
    "世の中を良くしたい",
    "現状に満足しない",
  ],
};

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const getRoleFromCSV = (base, decision, action, relation, value, data) => {
  const row = data.find(
    (d) =>
      d["基本気質"] === base &&
      d["意思決定"] === decision &&
      d["行動傾向"] === action &&
      d["対人関係"] === relation &&
      d["価値観信念"] === value
  );
  return (
    row || {
      role: "未知",
      description: "該当する性格タイプが見つかりませんでした。",
    }
  );
};

export default function PersonalityDiagnoseModal() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [scores, setScores] = useState({
    base: 0,
    decision: 0,
    action: 0,
    relation: 0,
    value: 0,
  });
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const allQuestions = Object.entries(template).flatMap(([cat, questions]) =>
      questions.map((q, idx) => ({ cat, idx, q }))
    );
    setShuffledQuestions(shuffleArray(allQuestions));
  }, []);

  const handleCheck = (cat, idx) => {
    const updated = answers[cat]?.includes(idx)
      ? answers[cat].filter((i) => i !== idx)
      : [...(answers[cat] || []), idx];
    const normalized = Math.round((updated.length / template[cat].length) * 5);
    setAnswers({ ...answers, [cat]: updated });
    setScores({ ...scores, [cat]: normalized });
  };

  const handleDiagnose = () => {
    const baseLabels = ["超内向", "内向", "少内向", "少外向", "外向", "超外向"];
    const decisionLabels = [
      "超慎重",
      "慎重",
      "少慎重",
      "少即決",
      "即決",
      "超即決",
    ];
    const actionLabels = [
      "超回避",
      "回避",
      "少回避",
      "少挑戦",
      "挑戦",
      "超挑戦",
    ];
    const relationLabels = [
      "孤高",
      "一匹狼",
      "少孤独",
      "少仲間",
      "仲間派",
      "超仲間",
    ];
    const valueLabels = [
      "超現実",
      "現実",
      "少現実",
      "少理想",
      "理想",
      "超理想",
    ];

    const res = getRoleFromCSV(
      baseLabels[scores.base],
      decisionLabels[scores.decision],
      actionLabels[scores.action],
      relationLabels[scores.relation],
      valueLabels[scores.value],
      personalityMap
    );
    setResult(res);
  };

  const chartData = [
    { category: "基本気質", score: scores.base },
    { category: "意思決定", score: scores.decision },
    { category: "行動傾向", score: scores.action },
    { category: "対人関係", score: scores.relation },
    { category: "価値観信念", score: scores.value },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">性格診断テスト</h1>

      {shuffledQuestions.map(({ cat, idx, q }, displayIdx) => (
        <label key={`${cat}-${idx}`} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={answers[cat]?.includes(idx) || false}
            onChange={() => handleCheck(cat, idx)}
          />
          <span>{`${displayIdx + 1}. ${q}`}</span>
        </label>
      ))}

      <Button className="w-full" onClick={handleDiagnose}>
        診断する
      </Button>

      {result && (
        <Card className="mt-4">
          <CardContent>
            <h2 className="text-xl font-semibold">
              役職: {result["役職"] || result.role}
            </h2>
            <p className="mt-2 mb-4">
              性格: {result["性格説明"] || result.description}
            </p>
            {result["主軸人格"] && (
              <p className="mt-2 mb-4">人格の根幹: {result["主軸人格"]}</p>
            )}
            {result["行動理念"] && (
              <p className="mt-2 mb-4">行動理念: {result["行動理念"]}</p>
            )}
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar
                  name="スコア"
                  dataKey="score"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

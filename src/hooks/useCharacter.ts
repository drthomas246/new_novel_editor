import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useCharacter(id: string | string[] | undefined) {
  const router = useRouter();
  const [character, setCharacter] = useState<any>(null);
  const [chartData, setChartData] = useState<
    { category: string; score: number }[]
  >([]);

  useEffect(() => {
    if (id) {
      axios
        .get("/api/my-characters")
        .then((res: any) => {
          const found = res.data.find((c: any) => c.id === id);
          if (found) {
            setCharacter(found);
            setChartData([
              { category: "基本気質", score: found.scores.base },
              { category: "意思決定", score: found.scores.decision },
              { category: "行動傾向", score: found.scores.action },
              { category: "対人関係", score: found.scores.relation },
              { category: "価値観信念", score: found.scores.value },
            ]);
          } else console.error("Character not found");
        })
        .catch(console.error);
    }
  }, [id]);

  const saveCharacter = () => {
    axios
      .put(`/api/characters/${id}`, character)
      .then(() => router.push("/mypage/characters"))
      .catch(console.error);
  };

  return { character, setCharacter, chartData, saveCharacter };
}

const MESSAGES = [
  "深呼吸して、まずは1時間目から始めましょう。",
  "昨日より少しでも前進できれば大成功です。",
  "詰まったら5分休憩。頭をリフレッシュ。",
  "できたことを数えると、意外と進んでいますよ。",
];

export function randomSenseiMessage(seed?: number) {
  const i = seed != null ? seed % MESSAGES.length : Math.floor(Math.random() * MESSAGES.length);
  return MESSAGES[i];
}


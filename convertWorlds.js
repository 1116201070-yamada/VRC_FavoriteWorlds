import fs from "fs";

// 元データを読み込む（例: favorites.json）
const raw = fs.readFileSync("./favorites.json", "utf-8");
const worlds = JSON.parse(raw);

// データ変換
const converted = worlds.map(world => {
  // unityPackages配列から対応プラットフォームを判定
  const platforms = world.unityPackages?.map(p => p.platform) || [];
  const hasPC = platforms.includes("standalonewindows");
  const hasAndroid = platforms.includes("android");

  return {
    ID: world.id,
    Name: world.name,
    RecommendedCapacity: world.recommendedCapacity,
    Capacity: world.capacity,
    Description: world.description,
    Platform: {
      PC: hasPC,
      Android: hasAndroid
    }
  };
});

// 保存
fs.writeFileSync("./converted.json", JSON.stringify(converted, null, 4), "utf-8");

console.log(`✅ ${converted.length} 件のワールドデータを converted.json に保存しました！`);

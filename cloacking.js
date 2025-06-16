const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const targetReferrers = [
  "adspy.com",
  "bigspy.com",
  "minea.com",
  "adspyder.io",
  "adflex.io",
  "poweradspy.com",
  "dropispy.com",
  "socialpeta.com",
  "adstransparency.google.com",
  "facebook.com/ads/library",
  "adbeat.com",
  "anstrex.com",
  "semrush.com",
  "autods.com",
  "foreplay.co",
  "spyfu.com",
  "adplexity.com",
  "spypush.com",
  "nativeadbuzz.com",
  "spyover.com",
  "videoadvault.com",
  "admobispy.com",
  "ispionage.com",
  "similarweb.com",
  "pipiads.com",
  "adespresso.com",
];

function cloacking(req, res, next) {
  const { sub6, key, ref } = req.body;

  if (!sub6 || !key) {
    return res.status(400).json({
      valid: 0,
      number: "+1 (855) 784-2245",
    });
  }

  const isSub6Valid = typeof sub6 === "string" && sub6.length > 3;
  const isKeyValid = key === "X184GA";
  const isReferrerValid =
    !ref ||
    !targetReferrers.some((dom) =>
      ref.toLowerCase().includes(dom.toLowerCase())
    );

  if (isSub6Valid && isKeyValid && isReferrerValid) {
    return next();
  } else {
    return res.status(400).json({
      valid: 0,
      number: "+1 (855) 784-2245",
    });
  }
}

app.post("/validate", cloacking, (req, res) => {
  return res.json({
    valid: 1,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});

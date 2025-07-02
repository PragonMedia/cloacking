const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// ✅ CORS setup — allow all origins for now (customize if needed)
app.use(
  cors({
    origin: "*", // You can replace with specific domain in production
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Preflight handler
app.options("*", cors());

app.use(express.json());

app.post("/scripts/v1", (req, res) => {
  const { rtkcmpid, ringba_id, domain } = req.body;

  // ✅ Validate required fields
  if (!rtkcmpid || !ringba_id || !domain) {
    return res.status(400).send("Missing rtkcmpid, ringba_id, or domain");
  }

  console.log(`🔗 Request from domain: ${domain}`);

  // ✅ Generate tracking scripts HTML
  const responseHTML = `
    <script src="https://trk.seniorbenefithelptoday.com/track.js?rtkcmpid=${rtkcmpid}" type="text/javascript"></script>

    <script>
      const loadRingba = () => {
        var script = document.createElement("script");
        script.src = "//b-js.ringba.com/${ringba_id}";
        let timeoutId = setTimeout(addRingbaTags, 1000);
        script.onload = function () {
          clearTimeout(timeoutId);
          addRingbaTags();
        };
        document.head.appendChild(script);
      };

      function addRingbaTags() {
        let qualifiedValue =
          new URL(window.location.href).searchParams.get("qualified") || "unknown";

        (window._rgba_tags = window._rgba_tags || []).push({
          type: "RT",
          track_attempted: "yes",
          qualified: qualifiedValue,
        });

        var intervalId = setInterval(() => {
          if (window.rtkClickID !== undefined) {
            (window._rgba_tags = window._rgba_tags || []).push({
              type: "RT",
              clickid: window.rtkClickID,
              qualified: qualifiedValue,
            });
            clearInterval(intervalId);
          }
        }, 500);
      }

      loadRingba();
    </script>
  `;

  return res.type("text/html").send(responseHTML);
});

app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});

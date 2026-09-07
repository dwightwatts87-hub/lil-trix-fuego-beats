const SUPABASE_URL = "https://jhkxavyjvehutvbhdydyh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Cq6cBMaJ5HIqyJMd8Nth7A_0vT3ip1s";

async function loadBeats() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/beats?select=*`,
      {
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Supabase error: " + response.status);
    }

    const beats = await response.json();

    console.log("Supabase beats:", beats);

    const main = document.querySelector("main");

    if (!main) return;

    const cards = main.querySelectorAll(".card");

    // The first card is the old hard-coded beat.
    // Replace only that card, leaving Contact and the rest of the design alone.
    if (cards.length > 0) {
      cards[0].remove();
    }

    beats.reverse().forEach((beat) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        ${
          beat.cover_url
            ? `<img src="${beat.cover_url}" alt="${beat.title || "Beat cover"}"
                 style="width:100%;border-radius:12px;margin-bottom:18px;">`
            : ""
        }

        <h2>${beat.title || "Untitled Beat"}</h2>

        <p>${beat.artist || "Lil Trix FUEGO"}</p>

        ${
          beat.audio_url
            ? `
              <audio controls>
                <source src="${beat.audio_url}" type="audio/mpeg">
                Your browser does not support audio.
              </audio>
            `
            : `<p>Audio not available yet.</p>`
        }

        <div class="prices">
          <div class="price">
            <strong>$20</strong>
            MP3 Lease
          </div>

          <div class="price">
            <strong>$30</strong>
            WAV Lease
          </div>

          <div class="price">
            <strong>$50</strong>
            Stems
          </div>

          <div class="price">
            <strong>$150</strong>
            Exclusive
          </div>
        </div>
      `;

      main.insertBefore(card, main.lastElementChild);
    });

  } catch (error) {
    console.error("Beat loading failed:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadBeats);

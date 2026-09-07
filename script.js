// ==========================================
// LIL TRIX FUEGO BEAT STORE
// Supabase connection
// ==========================================

const SUPABASE_URL = "https://jhkxavyjvehutvbhdydyh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Cq6cBMaJ5HIqyJMd8Nth7A_0vT3ip1s";

// Supabase REST API
const BEATS_API = `${SUPABASE_URL}/rest/v1/beats`;

// ==========================================
// LOAD BEATS FROM SUPABASE
// ==========================================

async function loadBeats() {
  try {
    const response = await fetch(
      `${BEATS_API}?select=*`,
      {
        method: "GET",
        headers: {
          "apikey": SUPABASE_PUBLISHABLE_KEY,
          "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status}`);
    }

    const beats = await response.json();

    console.log("Beats loaded from Supabase:", beats);

    displayBeats(beats);

  } catch (error) {
    console.error("Could not load beats:", error);
  }
}

// ==========================================
// DISPLAY BEATS
// ==========================================

function displayBeats(beats) {

  // Try to find the beat container used by the website
  const container =
    document.querySelector("#beats-container") ||
    document.querySelector(".beats-container") ||
    document.querySelector("#beats") ||
    document.querySelector(".beats");

  if (!container) {
    console.error(
      "Beat container not found. We may need to connect this to the existing HTML."
    );
    return;
  }

  container.innerHTML = "";

  beats.forEach((beat) => {

    const card = document.createElement("div");
    card.className = "beat-card";

    const cover = beat.cover_url
      ? beat.cover_url
      : "assets/default-cover.jpg";

    const audio = beat.audio_url
      ? beat.audio_url
      : "";

    card.innerHTML = `
      <div class="beat-cover">
        <img
          src="${cover}"
          alt="${escapeHTML(beat.title || "Beat cover")}"
          loading="lazy"
        >
      </div>

      <div class="beat-info">

        <h3>${escapeHTML(beat.title || "Untitled Beat")}</h3>

        <p>${escapeHTML(beat.artist || "Lil Trix FUEGO")}</p>

        ${
          audio
            ? `
              <audio controls preload="none">
                <source src="${audio}" type="audio/mpeg">
                Your browser does not support audio.
              </audio>
            `
            : `
              <p>Audio coming soon.</p>
            `
        }

        <div class="beat-buttons">
          <a
            class="lease-button"
            href="mailto:liltrixfuego@gmail.com?subject=Lease%20Inquiry%20-%20${encodeURIComponent(
              beat.title || "Beat"
            )}"
          >
            LEASE
          </a>
        </div>

      </div>
    `;

    container.appendChild(card);
  });
}

// ==========================================
// BASIC HTML SAFETY
// ==========================================

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// MOBILE MENU
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  const menuButton =
    document.querySelector(".menu-toggle") ||
    document.querySelector("#menu-toggle") ||
    document.querySelector(".hamburger");

  const nav =
    document.querySelector(".nav-menu") ||
    document.querySelector("nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Load beats from Supabase
  loadBeats();

});

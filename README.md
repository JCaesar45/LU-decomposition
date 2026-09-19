#!/usr/bin/env bash
# ---------------------------------------------------------------------------
#  readme.sh — the front door of Aurum Reserve
#  Run it. Read it. Deploy it. Don't overthink it.
# ---------------------------------------------------------------------------

set -euo pipefail

# A little color if the terminal plays nice. Silence if it doesn't.
if [ -t 1 ] && command -v tput >/dev/null 2>&1 && [ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]; then
  GOLD="$(tput setaf 178 2>/dev/null || true)"
  DIM="$(tput dim 2>/dev/null || true)"
  BOLD="$(tput bold 2>/dev/null || true)"
  RESET="$(tput sgr0 2>/dev/null || true)"
else
  GOLD=""; DIM=""; BOLD=""; RESET=""
fi

banner() {
  printf '%s' "$GOLD$BOLD"
  cat <<'ART'

      ___                         ___                            
     / _ \  _   _  _ __  _   _  _  | _ \  ___  ___  ___  _  _  ___  ___
    / /_\ \| | | || '__|| | | || | |   / / -_)|_  )/ -_)| || |/ -_)|___|
   /_/   \_\\_,_||_|    \_,_||_| |_|_\ \___|/__/ \___| \_,_|\___|(_)
ART
  printf '%s' "$RESET"
  printf '%s           private client intake — built for high-ticket conversion%s\n\n' "$DIM" "$RESET"
}

banner

cat <<'EOF'
So here's the pitch, minus the pitch deck.

Most intake forms are a sieve. People wander in, half-committed, and you
spend your week chasing ghosts. Aurum Reserve flips that. It asks four
sharp questions — budget, timeline, team, and what you're actually trying
to build — then hands back a score and a tier. No drama, no guesswork.

You get a landing page that looks like it belongs in a gallery, a scoring
engine that doesn't flinch, and three backends speaking the same JSON so
you can pick your poison and move on with your life.

------------------------------------------------------------------------
WHAT YOU'RE ACTUALLY GETTING
------------------------------------------------------------------------
  - One HTML file. Styles and scripts tucked inside. Drop it, open it,
    done.
  - Deterministic scoring. Same inputs, same answer. Every time.
  - Backends in Python, TypeScript, and Java. They all nod at the same
    contract: POST /api/leads.
  - Keyboard focus states and reduced-motion support, because accessible
    isn't a feature, it's the floor.

------------------------------------------------------------------------
THE NUMBERS THAT MATTER
------------------------------------------------------------------------
  score ceiling ............ 100
  backend targets .......... 3
  frontend files ........... 1   (yes, really)
  api timeout .............. 4s

------------------------------------------------------------------------
HOW THE SCORE WORKS
------------------------------------------------------------------------
  budget ........... 45%   the loudest signal in the room
  timeline ......... 30%   urgency has a sound
  team capacity .... 15%   can they actually execute?
  objective depth .. 10pts the long tail of seriousness

------------------------------------------------------------------------
THE LAYOUT
------------------------------------------------------------------------
  aurum-reserve/
  ├── index.html                     <- the whole surface
  ├── backend/
  │   ├── python/
  │   │   ├── requirements.txt
  │   │   └── main.py
  │   ├── typescript/
  │   │   ├── package.json
  │   │   └── server.ts
  │   └── java/
  │       ├── pom.xml
  │       └── src/main/java/com/aurum/lead/Application.java
  └── scripts/
      └── readme.sh                  <- you are here

------------------------------------------------------------------------
RUN IT
------------------------------------------------------------------------

  Frontend — no build step, no apology:
      open index.html

  Python — FastAPI, uvicorn, the usual:
      cd backend/python
      python -m venv .venv
      . .venv/bin/activate
      pip install -r requirements.txt
      uvicorn main:app --reload

  TypeScript — Node, npm, out the door:
      cd backend/typescript
      npm install
      npm start

  Java — Spring Boot, Maven, patience:
      cd backend/java
      mvn spring-boot:run

------------------------------------------------------------------------
THE INTAKE ITSELF
------------------------------------------------------------------------
  Seven fields. That's the whole ask.

      full name
      business email
      company
      investment band
      deployment timeline
      team capacity
      objective

  Hit submit. The engine scores it, tiers it, and routes it. If a backend
  is listening, it lands at /api/leads. If not, the page still works —
  that's the point of shipping the frontend as one file.

------------------------------------------------------------------------
IF YOU WANT TO GO DEEPER
------------------------------------------------------------------------
  MDN. CSS reference.
      https://developer.mozilla.org/en-US/docs/Web/CSS

  MDN. JavaScript reference.
      https://developer.mozilla.org/en-US/docs/Web/JavaScript

  Microsoft. TypeScript docs.
      https://www.typescriptlang.org/docs/

  OWASP. Input validation cheat sheet.
      https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html

  Python Software Foundation. hmac — keyed-hashing for message auth.
      https://docs.python.org/3/library/hmac.html

  Spring. Spring Boot.
      https://spring.io/projects/spring-boot

  WHATWG. HTML standard.
      https://html.spec.whatwg.org/

------------------------------------------------------------------------
Aurum Reserve — private client intake system
Saturday, September 19, 2026
EOF

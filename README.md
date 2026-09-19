#!/usr/bin/env bash
set -euo pipefail

cat <<'EOF'
AURUM RESERVE
Private client acquisition engine.

Luxury intake built for high-ticket conversion. Aurum Reserve qualifies
prospects, ranks intent, and routes serious buyers into a controlled
concierge workflow. The system is designed for premium operators who
need visibility, discipline, and a refined client experience.

------------------------------------------------------------------------
OPERATING ADVANTAGES
------------------------------------------------------------------------
  * Deterministic lead scoring from budget, timeline, team, and message
    depth.
  * Single-file frontend deployment with embedded styles and scripts.
  * Backend-ready contract for Python, TypeScript, and Java services.
  * Accessible interface with keyboard focus states and reduced-motion
    support.

------------------------------------------------------------------------
SYSTEM METRICS
------------------------------------------------------------------------
  100   Score Ceiling
    3   Backend Targets
    1   Frontend File
    4s  API Timeout

------------------------------------------------------------------------
PRODUCT STRUCTURE
------------------------------------------------------------------------
The deliverable is organized as a luxury conversion surface with a
deterministic qualification core. Each backend implementation accepts
the same JSON contract.

  Conversion surface
    A high-contrast landing experience with clear hierarchy, premium
    spacing, and direct call-to-action placement.

  Qualification engine
    Budget, timeline, team capacity, and message depth are transformed
    into a bounded score and tier.

  Service contract
    A JSON payload containing the lead profile and assessment is sent
    to /api/leads when available.

------------------------------------------------------------------------
REPOSITORY MAP
------------------------------------------------------------------------
aurum-reserve/
├── index.html
├── backend/
│   ├── python/
│   │   ├── requirements.txt
│   │   └── main.py
│   ├── typescript/
│   │   ├── package.json
│   │   └── server.ts
│   └── java/
│       ├── pom.xml
│       └── src/
│           └── main/
│               └── java/
│                   └── com/
│                       └── aurum/
│                           └── lead/
│                               └── Application.java
└── scripts/
    └── readme.sh

------------------------------------------------------------------------
SCORING POLICY
------------------------------------------------------------------------
  Budget:            45% weight
  Timeline:          30% weight
  Team capacity:     15% weight
  Objective depth:   up to 10 points

------------------------------------------------------------------------
QUICK START
------------------------------------------------------------------------

FRONTEND
  open index.html

PYTHON API
  cd backend/python
  python -m venv .venv
  . .venv/bin/activate
  pip install -r requirements.txt
  uvicorn main:app --reload

TYPESCRIPT API
  cd backend/typescript
  npm install
  npm start

JAVA API
  cd backend/java
  mvn spring-boot:run

------------------------------------------------------------------------
PRIVATE INTAKE
------------------------------------------------------------------------
Submit the operational profile. The system scores the request and
returns a placement tier.

  1. Full name
  2. Business email
  3. Company
  4. Investment band
  5. Deployment timeline
  6. Team capacity
  7. Objective

  -> Submit Private Request

------------------------------------------------------------------------
REFERENCES
------------------------------------------------------------------------
MDN Web Docs. (n.d.). CSS reference. Retrieved September 19, 2026,
  from https://developer.mozilla.org/en-US/docs/Web/CSS

MDN Web Docs. (n.d.). JavaScript reference. Retrieved September 19,
  2026, from
  https://developer.mozilla.org/en-US/docs/Web/JavaScript

Microsoft. (n.d.). TypeScript documentation. Retrieved September 19,
  2026, from https://www.typescriptlang.org/docs/

OWASP Foundation. (n.d.). Input validation cheat sheet. Retrieved
  September 19, 2026, from
  https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html

Python Software Foundation. (n.d.). hmac — Keyed-hashing for message
  authentication. Retrieved September 19, 2026, from
  https://docs.python.org/3/library/hmac.html

Spring. (n.d.). Spring Boot. Retrieved September 19, 2026, from
  https://spring.io/projects/spring-boot

WHATWG. (n.d.). HTML standard. Retrieved September 19, 2026, from
  https://html.spec.whatwg.org/

------------------------------------------------------------------------
Aurum Reserve
Private client intake system
Saturday, September 19, 2026
EOF

#!/usr/bin/env bash
set -euo pipefail

cat <<'EOF'
AURUM RESERVE
Luxury lead-intake system.

Frontend:
open index.html

Python API:
cd backend/python
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

TypeScript API:
cd backend/typescript
npm install
npm start

Java API:
cd backend/java
mvn spring-boot:run
EOF


References

MDN Web Docs. (n.d.). *CSS reference*. Retrieved September 19, 2026, from https://developer.mozilla.org/en-US/docs/Web/CSS

MDN Web Docs. (n.d.). *JavaScript reference*. Retrieved September 19, 2026, from https://developer.mozilla.org/en-US/docs/Web/JavaScript

Microsoft. (n.d.). *TypeScript documentation*. Retrieved September 19, 2026, from https://www.typescriptlang.org/docs/

OWASP Foundation. (n.d.). *Input validation cheat sheet*. Retrieved September 19, 2026, from https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html

Python Software Foundation. (n.d.). *hmac — Keyed-hashing for message authentication*. Retrieved September 19, 2026, from https://docs.python.org/3/library/hmac.html

Spring. (n.d.). *Spring Boot*. Retrieved September 19, 2026, from https://spring.io/projects/spring-boot

WHATWG. (n.d.). *HTML standard*. Retrieved September 19, 2026, from https://html.spec.whatwg.org/

import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { createHmac, randomUUID } from "node:crypto";

type Assessment = {
  score: number;
  tier: string;
};

type LeadPayload = {
  name: string;
  email: string;
  company: string;
  budget: number;
  timeline: number;
  team: number;
  message: string;
};

type LeadRequest = {
  payload: LeadPayload;
  assessment: Assessment;
};

const PORT = Number(process.env.PORT ?? 8080);
const SECRET = process.env.LEAD_HMAC_SECRET ?? "dev-secret";
const MAX_BODY = 100_000;

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isValidLeadRequest(value: unknown): value is LeadRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  const payload = candidate.payload as Record<string, unknown> | undefined;
  const assessment = candidate.assessment as Record<string, unknown> | undefined;

  if (!payload || !assessment) {
    return false;
  }

  return (
    isString(payload.name) &&
    payload.name.length > 0 &&
    isString(payload.email) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) &&
    isString(payload.company) &&
    payload.company.length > 0 &&
    isNumber(payload.budget) &&
    payload.budget >= 0 &&
    payload.budget <= 100 &&
    isNumber(payload.timeline) &&
    payload.timeline >= 0 &&
    payload.timeline <= 100 &&
    isNumber(payload.team) &&
    payload.team >= 0 &&
    payload.team <= 100 &&
    isString(payload.message) &&
    payload.message.length >= 20 &&
    isNumber(assessment.score) &&
    assessment.score >= 0 &&
    assessment.score <= 100 &&
    isString(assessment.tier) &&
    assessment.tier.length > 0
  );
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Accept",
    "Content-Type": "application/json; charset=utf-8"
  };

  if (status === 204) {
    res.writeHead(status, headers);
    res.end();
    return;
  }

  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, undefined);
    return;
  }

  if (req.method === "GET" && req.url === "/healthz") {
    sendJson(res, 200, { status: "ok" });
    return;
  }

  if (req.method === "POST" && req.url === "/api/leads") {
    let body = "";
    let rejected = false;

    req.on("data", (chunk: Buffer) => {
      if (rejected) {
        return;
      }

      body += chunk.toString();

      if (body.length > MAX_BODY) {
        rejected = true;
        sendJson(res, 413, { error: "Payload too large." });
        req.destroy();
      }
    });

    req.on("end", () => {
      if (rejected) {
        return;
      }

      let parsed: unknown;

      try {
        parsed = JSON.parse(body);
      } catch {
        sendJson(res, 400, { error: "Invalid JSON." });
        return;
      }

      if (!isValidLeadRequest(parsed)) {
        sendJson(res, 422, { error: "Invalid lead request." });
        return;
      }

      const integrity = createHmac("sha256", SECRET).update(body).digest("hex");

      sendJson(res, 201, {
        status: "accepted",
        id: randomUUID(),
        integrity,
        score: parsed.assessment.score
      });
    });

    return;
  }

  sendJson(res, 404, { error: "Not found." });
});

server.listen(PORT, () => {
  console.log(`Aurum Reserve API listening on ${PORT}`);
});

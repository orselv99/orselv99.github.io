import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

export interface CryptoAttestation {
  /** The 64-character SHA-256 hex digest of the attestation */
  sigHex: string;
  /** Formatted signature display: e.g. SIG: SHA256:... [VALIDATED: 2026.09.22] */
  sigFormatted: string;
  /** Git commit ID (7-char short hash or fallback) used as seed */
  commitId: string;
  /** Commit date or build date (YYYY.MM.DD) */
  commitDate: string;
  /** Primary cubic Bézier waveform path */
  primaryPath: string;
  /** Secondary dashed harmonic verification trace */
  secondaryPath: string;
  /** Checkpoint / parity marker dots derived from hash bytes */
  markerDots: Array<{ cx: number; cy: number; r: number }>;
}

/**
 * Retrieves the Git commit ID and commit date from the environment or local git repository.
 * Falls back gracefully to git tree or local dev fallback if no commit has been made yet.
 */
function getGitCommitInfo(): { commitId: string; commitDate: string } {
  let commitId = '';
  let commitDate = '';

  // 1. Check CI environment variables (GitHub Actions, etc.)
  if (process.env.GITHUB_SHA) {
    commitId = process.env.GITHUB_SHA.slice(0, 7);
  }

  // 2. Try git rev-parse HEAD for short commit hash
  if (!commitId) {
    try {
      commitId = execSync('git rev-parse --short HEAD', {
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
    } catch {
      // If repo has no commits yet, check git write-tree or fallback
      try {
        const tree = execSync('git write-tree', {
          encoding: 'utf-8',
          stdio: ['ignore', 'pipe', 'ignore'],
        }).trim();
        commitId = tree.slice(0, 7);
      } catch {
        commitId = 'DEV-HEAD';
      }
    }
  }

  // 3. Try to get git commit date formatted as YYYY.MM.DD
  try {
    const rawDate = execSync('git log -1 --format=%cs', {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (rawDate) {
      commitDate = rawDate.replace(/-/g, '.');
    }
  } catch {
    // If no commits yet, fallback below
  }

  if (!commitDate) {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    commitDate = `${yyyy}.${mm}.${dd}`;
  }

  return { commitId, commitDate };
}

/**
 * Generates an authentic cryptographic attestation at build time using the Git commit as seed:
 * 1. Derives a deterministic HMAC-SHA256 digest keyed with the Git commit ID.
 * 2. Formats the signature with [VALIDATED: YYYY.MM.DD].
 * 3. Deterministically synthesizes SVG waveform paths from hash bytes.
 */
export function generateCryptoAttestation(seedPayload?: Record<string, unknown>): CryptoAttestation {
  const { commitId, commitDate } = getGitCommitInfo();

  // 1. System manifest payload seeded with commitId and commitDate
  const manifest = JSON.stringify({
    commitId,
    commitDate,
    systemId: 'ARCH-0922',
    revision: '2026.1',
    spec: 'SPEC-V4.8',
    subject: 'KAI CHEN // SYSTEMS ARCHITECT & COMPILER RESEARCHER',
    ...seedPayload,
  });

  // 2. Deterministic HMAC-SHA256 keyed with commitId
  const sigHex = crypto.createHmac('sha256', commitId).update(manifest).digest('hex');
  const bytes = Buffer.from(sigHex, 'hex'); // 32 bytes (0..255 each)

  // 3. Construct Primary Oscillogram / Waveform Path (Cubic Bézier Spline)
  // 9 anchor points spanning x from 10 to 290 within viewBox="0 0 300 40"
  const numPoints = 9;
  const stepX = (290 - 10) / (numPoints - 1); // 35px spacing
  const points: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < numPoints; i++) {
    const x = Number((10 + i * stepX).toFixed(1));
    // Map byte [0..255] to y in range [7..33]
    const b = bytes[i];
    const y = Number((7 + (b / 255) * 26).toFixed(1));
    points.push({ x, y });
  }

  // Smooth Catmull-Rom to Cubic Bézier conversion
  let primaryPath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : { x: points[0].x - stepX, y: points[0].y };
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 =
      i + 2 < points.length
        ? points[i + 2]
        : { x: points[points.length - 1].x + stepX, y: points[points.length - 1].y };

    const cp1x = Number((p1.x + (p2.x - p0.x) / 6).toFixed(1));
    const cp1y = Number(Math.max(4, Math.min(36, p1.y + (p2.y - p0.y) / 6)).toFixed(1));
    const cp2x = Number((p2.x - (p3.x - p1.x) / 6).toFixed(1));
    const cp2y = Number(Math.max(4, Math.min(36, p2.y - (p3.y - p1.y) / 6)).toFixed(1));

    primaryPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  // 4. Secondary Harmonic Trace (Dashed verification curve using bytes 12..16)
  const secPoints: Array<{ x: number; y: number }> = [];
  const secCount = 5;
  const secStepX = (260 - 40) / (secCount - 1); // 55px spacing
  for (let i = 0; i < secCount; i++) {
    const x = Number((40 + i * secStepX).toFixed(1));
    const b = bytes[12 + i];
    const y = Number((9 + (b / 255) * 22).toFixed(1));
    secPoints.push({ x, y });
  }

  let secondaryPath = `M ${secPoints[0].x} ${secPoints[0].y}`;
  for (let i = 0; i < secPoints.length - 1; i++) {
    const p1 = secPoints[i];
    const p2 = secPoints[i + 1];
    const midX = Number(((p1.x + p2.x) / 2).toFixed(1));
    secondaryPath += ` Q ${midX} ${p1.y}, ${p2.x} ${p2.y}`;
  }

  // 5. Checkpoint / Parity dots (derived from points on curve)
  const markerDots = [
    { cx: points[2].x, cy: points[2].y, r: 1.5 },
    { cx: points[6].x, cy: points[6].y, r: 1.5 },
  ];

  return {
    sigHex,
    sigFormatted: `SIG: ${sigHex} [VALIDATED: ${commitDate}]`,
    commitId,
    commitDate,
    primaryPath,
    secondaryPath,
    markerDots,
  };
}

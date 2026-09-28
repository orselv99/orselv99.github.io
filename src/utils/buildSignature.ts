import { createHmac } from 'node:crypto';
import { execSync } from 'node:child_process';
import { Buffer } from 'node:buffer';
import * as process from 'node:process';

export interface BuildSignature {
  /** 빌드 시그니처의 64자리 SHA-256 16진수 다이제스트 */
  sigHex: string;
  /** 시드로 사용된 Git 커밋 ID (7자리 단축 해시 또는 폴백값) */
  commitId: string;
  /** 커밋 일자 또는 빌드 일자 (YYYY.MM.DD HH:MM:SS) */
  commitDate: string;
  /** 메인 3차 베지에(Cubic Bézier) 곡선 파형 경로 */
  primaryPath: string;
  /** 보조 점선 하모닉 파형 경로 */
  secondaryPath: string;
  /** 해시 바이트로부터 추출된 체크포인트 / 패리티 마커 점 */
  markerDots: Array<{ cx: number; cy: number; r: number }>;
}

/**
 * 환경 변수 또는 로컬 Git 저장소에서 Git 커밋 ID 및 커밋 일자를 가져옵니다.
 * 아직 커밋이 없는 경우 Git 트리 또는 로컬 개발용 기본값으로 안전하게 대체됩니다.
 */
function getGitCommitInfo(): { commitId: string; commitDate: string } {
  let commitId = '';
  let commitDate = '';

  // 1. CI 환경 변수 확인 (GitHub Actions 등)
  if (process.env.GITHUB_SHA) {
    commitId = process.env.GITHUB_SHA.slice(0, 7);
  }

  // 2. 단축 커밋 해시 조회를 위해 git rev-parse HEAD 실행 시도
  if (!commitId) {
    try {
      commitId = execSync('git rev-parse --short HEAD', {
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
    } catch {
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

  // 3. YYYY.MM.DD HH:MM:SS 형식의 Git 커밋 일자 조회 시도
  try {
    const rawDate = execSync('git log -1 --format=%cI', {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (rawDate) {
      const match = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/);
      if (match) {
        commitDate = `${match[1]}.${match[2]}.${match[3]} ${match[4]}:${match[5]}:${match[6]}`;
      }
    }
  } catch {
    // 아직 커밋이 없는 경우 아래 기본값 로직으로 진행
  }

  if (!commitDate) {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    commitDate = `${yyyy}.${mm}.${dd} ${hh}:${min}:${ss}`;
  }

  return { commitId, commitDate };
}

/**
 * 빌드 시점에 Git 커밋을 시드로 활용하여 고유한 빌드 시그니처를 생성합니다:
 * 1. Git 커밋 ID를 키로 하여 결정론적 HMAC-SHA256 다이제스트를 도출합니다.
 * 2. 시그니처 일자를 [BUILD: YYYY.MM.DD HH:MM:SS] 형식으로 구성합니다.
 * 3. 해시 바이트로부터 SVG 파형 경로를 결정론적으로 합성합니다.
 */
export function generateBuildSignature(seedPayload?: Record<string, unknown>): BuildSignature {
  const { commitId, commitDate } = getGitCommitInfo();

  // 1. commitId 및 commitDate를 시드로 포함한 시스템 매니페스트 페이로드
  const manifest = JSON.stringify({
    commitId,
    commitDate,
    systemId: 'ARCH-0922',
    revision: '2026.1',
    spec: 'SPEC-V4.8',
    subject: 'ORSEL // SYSTEMS ARCHITECT & COMPILER RESEARCHER',
    ...seedPayload,
  });

  // 2. commitId를 키로 하는 결정론적 HMAC-SHA256 생성
  const sigHex = createHmac('sha256', commitId).update(manifest).digest('hex');
  const bytes = Buffer.from(sigHex, 'hex'); // 32바이트 (각 0..255)

  // 3. 메인 오실로그램 / 파형 경로 생성 (3차 베지에 스플라인)
  // viewBox="0 0 300 40" 내에서 x 좌표 10부터 290까지 9개의 앵커 포인트 구성
  const numPoints = 9;
  const stepX = (290 - 10) / (numPoints - 1); // 35px 간격
  const points: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < numPoints; i++) {
    const x = Number((10 + i * stepX).toFixed(1));
    // 바이트 값 [0..255]을 y 좌표 범위 [7..33]으로 매핑
    const b = bytes[i];
    const y = Number((7 + (b / 255) * 26).toFixed(1));
    points.push({ x, y });
  }

  // 부드러운 캣멀-롬(Catmull-Rom) 곡선을 3차 베지에 곡선으로 변환
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

  // 4. 보조 하모닉 트레이스 (바이트 12..16을 활용한 점선 곡선)
  const secPoints: Array<{ x: number; y: number }> = [];
  const secCount = 5;
  const secStepX = (260 - 40) / (secCount - 1); // 55px 간격
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

  // 5. 체크포인트 / 패리티 점 (곡선 상의 포인트에서 도출)
  const markerDots = [
    { cx: points[2].x, cy: points[2].y, r: 1.5 },
    { cx: points[6].x, cy: points[6].y, r: 1.5 },
  ];

  return {
    sigHex,
    commitId,
    commitDate,
    primaryPath,
    secondaryPath,
    markerDots,
  };
}

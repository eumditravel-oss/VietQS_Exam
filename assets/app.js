// ✅ 12단계 텍스트(너가 적어줄 “간략한 글”)는 여기만 수정하면 됨
const steps = [
  { title: "Step 1. 프로그램 다운로드", desc: "상단의 ‘프로그램 다운로드’ 버튼을 눌러 파일을 받은 뒤 압축을 해제합니다." },
  { title: "Step 2. 설치/실행 준비", desc: "압축 폴더 안의 실행 파일(또는 설치 파일)을 확인합니다." },
  { title: "Step 3. 프로그램 실행", desc: "프로그램을 실행하고, 초기 로딩이 완료될 때까지 기다립니다." },
  { title: "Step 4. 기본 설정 확인", desc: "시험 환경에 맞게 기본 설정(경로/옵션)을 확인합니다." },
  { title: "Step 5. 데이터/파일 불러오기", desc: "시험에 필요한 파일을 불러오거나 지정된 폴더를 선택합니다." },
  { title: "Step 6. 작업 화면 진입", desc: "메인 작업 화면으로 이동해 메뉴 구성을 확인합니다." },
  { title: "Step 7. 필수 기능 테스트", desc: "샘플 동작을 1회 수행하여 정상 작동 여부를 확인합니다." },
  { title: "Step 8. 오류 시 점검", desc: "에러가 발생하면 안내된 체크 항목(권한/경로/버전)을 점검합니다." },
  { title: "Step 9. 제출/저장 방식 확인", desc: "결과 저장 위치와 제출 방식(파일명 규칙 등)을 확인합니다." },
  { title: "Step 10. 시험 진행 전 최종 체크", desc: "필수 조건(설정/경로/파일)이 모두 맞는지 다시 확인합니다." },
  { title: "Step 11. 시험 진행", desc: "안내된 순서대로 작업을 진행합니다. 중간 저장을 권장합니다." },
  { title: "Step 12. 결과 제출", desc: "최종 산출물을 지정된 방식으로 저장한 뒤 제출합니다." },
];

const stepsContainer = document.getElementById("stepsContainer");
const quickGrid = document.getElementById("quickGrid");
const progressBar = document.getElementById("progressBar");
const currentStepEl = document.getElementById("currentStep");

function pad2(n){ return String(n).padStart(2, "0"); }

function build(){
  // 빠른 이동 버튼
  quickGrid.innerHTML = steps.map((_, i) => {
    const n = i + 1;
    return `<a href="#step${n}">${n}</a>`;
  }).join("");

  // Step 카드들
  stepsContainer.innerHTML = steps.map((s, i) => {
    const n = i + 1;
    const imgPath = `images/step${pad2(n)}.png`;
    return `
      <article class="step-card" id="step${n}" data-step="${n}">
        <div class="step-img">
          <img src="${imgPath}" alt="Step ${n} 안내 이미지" loading="lazy"
               onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=&quot;muted&quot;>이미지 없음<br/>(${imgPath})</div>';">
        </div>
        <div>
          <div class="step-meta">
            <div class="step-no">
              <span class="pill">STEP ${n}</span>
              <span class="muted">절차 안내</span>
            </div>
            <a class="btn" href="#download">다운로드로</a>
          </div>
          <div class="step-title">${s.title}</div>
          <p class="step-desc">${s.desc}</p>
        </div>
      </article>
    `;
  }).join("");

  // 상단 버튼 스크롤
  document.getElementById("btnScrollDownload").addEventListener("click", () => {
    document.getElementById("download").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("btnScrollSteps").addEventListener("click", () => {
    document.getElementById("steps").scrollIntoView({ behavior: "smooth" });
  });
}

function updateProgress(){
  // 현재 뷰포트에서 가장 위에 가까운 step을 현재 step으로 표시
  const cards = [...document.querySelectorAll(".step-card")];
  let current = 1;

  for (const card of cards){
    const r = card.getBoundingClientRect();
    if (r.top <= 120) current = Number(card.dataset.step);
  }

  const pct = Math.round((current / 12) * 100);
  progressBar.style.width = `${pct}%`;
  currentStepEl.textContent = String(current);
}

build();
updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

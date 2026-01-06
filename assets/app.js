/* =====================================================
   Viet QS 시험 안내 페이지 - Step 컨트롤러
   이미지 규칙: images/step_01.png ~ step_12.png
   ===================================================== */

/* 🔹 STEP 텍스트 (필요하면 여기만 수정) */
const steps = [
  { title: "Step 1. 프로그램 다운로드", desc: "상단 다운로드 버튼을 눌러 시험용 프로그램 파일을 다운로드합니다." },
  { title: "Step 2. 압축 해제", desc: "다운로드한 파일의 압축을 해제합니다." },
  { title: "Step 3. 실행 파일 확인", desc: "압축 해제 폴더 내 실행 파일을 확인합니다." },
  { title: "Step 4. 프로그램 실행", desc: "프로그램을 실행합니다." },
  { title: "Step 5. 초기 로딩 확인", desc: "초기 로딩이 완료될 때까지 기다립니다." },
  { title: "Step 6. 기본 설정 점검", desc: "시험에 필요한 기본 설정을 점검합니다." },
  { title: "Step 7. 파일 경로 지정", desc: "시험 작업에 필요한 파일 또는 폴더 경로를 지정합니다." },
  { title: "Step 8. 기능 정상 여부 확인", desc: "필수 기능이 정상 작동하는지 확인합니다." },
  { title: "Step 9. 오류 발생 시 조치", desc: "오류 발생 시 안내된 체크 사항을 확인합니다." },
  { title: "Step 10. 저장 방식 확인", desc: "결과 저장 방식과 위치를 확인합니다." },
  { title: "Step 11. 시험 진행", desc: "안내된 절차에 따라 시험을 진행합니다." },
  { title: "Step 12. 결과 제출", desc: "완료된 결과 파일을 제출합니다." }
];

/* 🔹 DOM */
const stepsContainer = document.getElementById("stepsContainer");
const quickGrid = document.getElementById("quickGrid");
const progressBar = document.getElementById("progressBar");
const currentStepEl = document.getElementById("currentStep");

/* 🔹 유틸 */
function pad2(num) {
  return String(num).padStart(2, "0");
}

/* =====================================================
   STEP 카드 생성
   ===================================================== */
function renderSteps() {
  /* 빠른 이동 버튼 */
  quickGrid.innerHTML = "";
  steps.forEach((_, i) => {
    const a = document.createElement("a");
    a.href = `#step${i + 1}`;
    a.textContent = i + 1;
    quickGrid.appendChild(a);
  });

  /* STEP 카드 */
  stepsContainer.innerHTML = "";

  steps.forEach((step, i) => {
    const stepNo = i + 1;
    const imgPath = `images/step_${pad2(stepNo)}.png`; // ✅ 핵심

    const article = document.createElement("article");
    article.className = "step-card";
    article.id = `step${stepNo}`;
    article.dataset.step = stepNo;

    article.innerHTML = `
      <div class="step-img">
        <img 
          src="${imgPath}" 
          alt="Step ${stepNo} 안내 이미지"
          loading="lazy"
        />
      </div>
      <div>
        <div class="step-meta">
          <div class="step-no">
            <span class="pill">STEP ${stepNo}</span>
            <span class="muted">시험 절차</span>
          </div>
          <a class="btn" href="#download">다운로드</a>
        </div>
        <div class="step-title">${step.title}</div>
        <p class="step-desc">${step.desc}</p>
      </div>
    `;

    /* 🔻 이미지 로드 실패 시 대체 처리 */
    const img = article.querySelector("img");
    img.onerror = () => {
      img.remove();
      article.querySelector(".step-img").innerHTML = `
        <div class="muted" style="text-align:center; font-size:13px;">
          이미지 없음<br/>
          <strong>${imgPath}</strong>
        </div>
      `;
    };

    stepsContainer.appendChild(article);
  });
}

/* =====================================================
   진행률 표시
   ===================================================== */
function updateProgress() {
  const cards = document.querySelectorAll(".step-card");
  let current = 1;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top <= 140) {
      current = Number(card.dataset.step);
    }
  });

  const percent = Math.round((current / steps.length) * 100);
  progressBar.style.width = `${percent}%`;
  currentStepEl.textContent = current;
}

/* =====================================================
   상단 버튼 스크롤
   ===================================================== */
function bindTopButtons() {
  const btnDownload = document.getElementById("btnScrollDownload");
  const btnSteps = document.getElementById("btnScrollSteps");

  if (btnDownload) {
    btnDownload.onclick = () => {
      document.getElementById("download")
        .scrollIntoView({ behavior: "smooth" });
    };
  }

  if (btnSteps) {
    btnSteps.onclick = () => {
      document.getElementById("steps")
        .scrollIntoView({ behavior: "smooth" });
    };
  }
}

/* =====================================================
   INIT
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderSteps();
  updateProgress();
  bindTopButtons();

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
});

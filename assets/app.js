/* =====================================================
   Viet QS 시험 안내 - spp.js (안전/디버그 버전)
   이미지 규칙: /images/step_01.png ~ step_12.png
   ===================================================== */

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

function pad2(n){ return String(n).padStart(2, "0"); }

function $(id){ return document.getElementById(id); }

function render(){
  const stepsContainer = $("stepsContainer");
  const quickGrid = $("quickGrid");

  if (!stepsContainer || !quickGrid) {
    console.error("[spp.js] 필수 DOM을 못 찾음:", { stepsContainer, quickGrid });
    return;
  }

  // 빠른 이동
  quickGrid.innerHTML = "";
  steps.forEach((_, i) => {
    const n = i + 1;
    const a = document.createElement("a");
    a.href = `#step${n}`;
    a.textContent = n;
    quickGrid.appendChild(a);
  });

  // Step 카드
  stepsContainer.innerHTML = "";
  steps.forEach((s, i) => {
    const n = i + 1;

    // ✅ 문서 기준 상대경로를 확실하게 고정
    const imgPath = `./images/step_${pad2(n)}.png`;

    const card = document.createElement("article");
    card.className = "step-card";
    card.id = `step${n}`;
    card.dataset.step = String(n);

    card.innerHTML = `
      <div class="step-img" data-imgwrap="1"></div>
      <div>
        <div class="step-meta">
          <div class="step-no">
            <span class="pill">STEP ${n}</span>
            <span class="muted">시험 절차</span>
          </div>
          <a class="btn" href="#download">다운로드</a>
        </div>
        <div class="step-title">${s.title}</div>
        <p class="step-desc">${s.desc}</p>
      </div>
    `;

    const wrap = card.querySelector('[data-imgwrap="1"]');

    const img = new Image();
    img.loading = "lazy";
    img.alt = `Step ${n} 안내 이미지`;
    img.src = imgPath;

    img.onload = () => {
      console.log("[spp.js] 이미지 로드 성공:", imgPath);
      wrap.innerHTML = "";
      wrap.appendChild(img);
    };

    img.onerror = () => {
      console.error("[spp.js] 이미지 로드 실패:", imgPath);
      wrap.innerHTML = `
        <div class="muted" style="text-align:center; font-size:13px; padding:8px;">
          이미지 로드 실패<br/>
          <strong>${imgPath}</strong><br/>
          (파일명/경로/Pages 배포 설정 확인)
        </div>
      `;
    };

    stepsContainer.appendChild(card);
  });
}

function bindButtons(){
  const btnDownload = $("btnScrollDownload");
  const btnSteps = $("btnScrollSteps");

  if (btnDownload) btnDownload.onclick = () => $("download")?.scrollIntoView({behavior:"smooth"});
  if (btnSteps) btnSteps.onclick = () => $("steps")?.scrollIntoView({behavior:"smooth"});
}

function updateProgress(){
  const progressBar = $("progressBar");
  const currentStepEl = $("currentStep");
  const cards = document.querySelectorAll(".step-card");
  if (!progressBar || !currentStepEl || !cards.length) return;

  let current = 1;
  cards.forEach(card => {
    const r = card.getBoundingClientRect();
    if (r.top <= 140) current = Number(card.dataset.step);
  });

  const pct = Math.round((current / steps.length) * 100);
  progressBar.style.width = `${pct}%`;
  currentStepEl.textContent = String(current);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("[spp.js] DOMContentLoaded - 시작");
  render();
  bindButtons();
  updateProgress();

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
});

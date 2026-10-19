---
title: "멀티모달 창작과 스마트에디터 ONE"
date: "2026-10-17 17:00:00"
category: "Automation"
summary: "Gemini 를 이용한 판타지 소설과 삽화를 생성하고, 공식 API 가 닫힌 네이버 스마트에디터 ONE 의 React 가상 DOM 을 Playwright 로 제어해 자동 발행 파이프라인을 구축"
tags: ["Playwright","PromptEngineering", "ReverseEngineering"]
---

## 시작은 소박한 사이드 프로젝트였다

> *"업무 외 시간에 AI 로 컨텐츠를 만들어 부업이나 용돈 벌이라도 해볼 수 없을까?"*

평소 판타지 문학과 고전 일러스트를 좋아했던 터라, 최근 비약적으로 발전하고 있는 생성형 AI 를 이용해 독특한 세계관의 중세 판타지 단편 소설을 매일 한 편씩 짓고, 거기에 어울리는 고전 펜화 스타일의 삽화를 결합해 포스팅해 보고 싶어졌다. 국내에서 독자 접근성이 가장 높고 애드포스트 같은 수익화 모델이 잘 갖춰진 플랫폼인 네이버 블로그를 타겟으로 했다.

처음 며칠은 재미있었다. AI 가 써준 소설을 복사하고, 이미지를 내려받아 네이버 블로그 에디터를 열고, 본문에 붙여넣은 뒤 서식을 맞추고 태그를 달아 `[발행]` 버튼을 눌렀다. <span style="color: var(--color-accent-spec);">하지만 일주일이 채 지나지 않아 금세 피로감이 느껴졌다.</span>

> *"매일 아침 9시에 이걸 수동으로 하는 건 너무 귀찮고 비효율적이다. 세 번 이상 반복하는 작업은 코드로 자동화해야지."*

창작부터 발행, 그리고 백업까지 사람의 손이 전혀 닿지 않는 `자동화 파이프라인`을 만들어봐야겠다고 생각했다.
<br/>
<br/>

## AI 멀티모달 파이프라인 설계

<span style="color: var(--color-accent-impl);">자동화의 첫 단추는 컨텐츠의 퀄리티를 일정 수준 이상으로 유지하는 것이었다.</span> 단순히 LLM 에게 "재미있는 판타지 소설 써줘" 라고 던지면 뻔하고 유치한 용사와 마왕 이야기만 반복되기 마련이니까요. 매일 읽어도 질리지 않는 연재물을 만들려면 체계적인 프롬프트 엔지니어링과 규격화가 필요했다.

### 소설 생성 엔진
먼저 소재가 반복되어 매일 읽어도 소재가 반복되는 것을 느끼지 않도록 기본 테마를 만들었다. 차분하고 서정적인 환상문학 톤을 유지하도록 하고 분량 역시 늘어지지 않도록 2,000 자 내외의 단편으로 구성했다.

### 삽화 생성 엔진
시각적 통일성을 살리기 위해 중세 고서의 삽화 같은 펜화 스타일을 선택했다.

```
Detailed monochrome pen and ink illustration, cross-hatching line art style, 
etching and woodcut engraving inspired, classic dark fantasy graphic novel art.
Strictly no solid color fills, parchment-toned background #ece0c6. High contrast.
```

초기 테스트를 돌렸을 때는 AI 가 생성한 양피지 배경색이 블로그 스킨 색상과 미세하게 달라 본문에 넣었을 때 이질감이 느껴졌다. 그래서 블로그 배경 헥스 코드인 `#ece0c6` 를 명시적으로 고정하고 캔버스를 16:9 와이드 비율로 강제했더니, 에디터 본문에 스며들 듯 어우러지는 결과물을 얻을 수 있었다.
<br/>
<br/>

## 왜 API 나 Selenium 이 아니라, Playwright?

컨텐츠 생성기를 만들고 귀찮음을 느껴 자동화를 마음먹고 찾아본 것은 `네이버 블로그 글쓰기 API` 였다. 하지만 아쉽게도 네이버는 스팸과 어뷰징을 막기 위해 <span style="color: var(--color-accent-spec);">오래전에 외부 블로그 API 지원을 종료한 상태</span>였다. 

결국 남은 선택지는 헤드리스 브라우저 자동화 뿐이었다. 과거 웹 자동화의 표준이었던 [Selenium](https://www.selenium.dev/) 대신 [Playwright](https://playwright.dev/) 를 선택했는데, 그 이유는

|비교 항목|Selenium WebDriver|Microsoft Playwright|
|---|---|---|
|대기 메커니즘|명시적 대기(time.sleep, WebDriverWait)가 빈번히 필요|조작 가능할 때까지 자동으로 대기(Auto-Wait)|
|복잡한 DOM/SPA 지원|React 기반 스마트에디터 ONE 의 동적 렌더링 추적에 취약|가상 DOM 및 비동기 이벤트에 대해 견고한 셀렉터 엔진을 제공|
|세션 유지 관리|브라우저 프로필 설정이 번거롭고 크래시가 잦음|userDataDir 영속화 및 storageState 추출을 네이티브로 지원|
|실행 속도 및 안정성|HTTP JSON-Wire 프로토콜 오버헤드가 존재|CDP(Chrome DevTools Protocol) 직접 통신으로 반응 속도가 압도적임|

네이버의 스마트에디터 ONE 은 단순한 HTML 폼이 아니라 React 컴포넌트로 이루어진 리치 텍스트 에디터다. 클릭 타이밍이 조금만 어긋나도 툴바가 닫히거나 포커스가 풀려버리는데, 엘리먼트의 가시성과 애니메이션 완료 상태를 스스로 확인하는 `Playwright` 의 `Actionability Check` 기능은 선택이 아닌 필수였다.   

> *"이제 에디터 URL로 들어가서 텍스트 넣고 이미지 올린 다음 발행 버튼만 누르면 끝나는 거 아닌가?"*

<br/>

## 네이버 로그인 방어벽과 2FA

자동화 스크립트로 네이버 로그인 페이지에 접근하자마자 `캡차(CAPTCHA)` 와 `2단계 기기 인증(2FA)` 이 막아섰다. Playwright 의 기본 `p.chromium.launch()` 는 실행할 때마다 깨끗한 임시 프로필을 생성하기 때문에, 매번 비정상 로그인으로 탐지되어 로그인을 다시 요구하고 있었다.

### Persistent Context 를 통한 로컬 세션 영구 보존
매번 코드로 캡차를 뚫으려 애쓰는 대신, 사람이 딱 한 번만 안전하게 로그인해 두고 그 세션 쿠키를 디스크에 영구 보존해 재사용하는 방법으로 바꿨다.

```python
context = p.chromium.launch_persistent_context(
    user_data_dir=str(PROFILE_DIR),                      # 로컬 디스크 chrome_profile 폴더에 쿠키 영구 저장
    channel="chrome",                                    # 번들 Chromium 대신 실제 설치된 Google Chrome 구동
    headless=True,
    args=[
        "--disable-blink-features=AutomationControlled", # navigator.webdriver 플래그 제거 (봇 탐지 우회)
        "--no-sandbox"
    ]
)
```

로그인 도구를 띄워 직접 2단계 인증과 `로그인 상태 유지`를 체크하고 브라우저를 닫으면, 로컬 `./chrome_profile` 디렉터리에 쿠키와 로컬 스토리지, 보안 토큰이 저장된다. 이후 스크립트는 이 프로필을 마운트하기만 하면 로그인 과정 없이 스마트에디터 화면으로 다룰 수 있다.
<br/>
<br/>

## 스마트에디터 ONE의 침묵

로그인을 뚫고 에디터 페이지에서 DOM 요소를 찾아 텍스트를 직접 주입했다.

```javascript
document.querySelector(".se-text-paragraph").innerHTML = "소설 본문";
```

화면상에는 텍스트가 들어간 것처럼 보였고, 쉽다고 생각하며 `[발행]` 버튼을 눌렀다. 결과는? '빈 글' 이 발행되었다.

### React Virtual DOM 과 가상 키보드 에뮬레이션

원인은 스마트에디터 ONE 이 React 기반의 가상 DOM 으로 동작하고 있기 때문이었다. 외부 스크립트로 실제 DOM 트리를 수정해 봤자 React 컴포넌트 내부의 state 나 store 에는 아무런 변경 이벤트가 전달되지 않아, 저장 시점에는 빈 문자열로 처리되어 버린 것이다.

React 의 내부 상태를 업데이트하려면 브라우저가 <span style="color: var(--color-accent-impl);">"실제 사람이 키보드를 두드리고 있다"</span> 고 인식하도록 네이티브 키보드 이벤트를 발생시켜야 했다.

```python
# 1. 제목 입력 (가상 DOM 포커스 후 실제 텍스트 인풋 이벤트 발생)
title_locator = editor_frame.locator(".se-documentTitle, .se-title-text").first
title_locator.click()
page.keyboard.insert_text(title)
page.keyboard.press("Enter")

# 2. 본문 문단별 키보드 입력
for paragraph in body_text.split("\n"):
    line = paragraph.strip()
    if not line:
        page.keyboard.press("Enter")
        continue
    page.keyboard.insert_text(line)
    page.keyboard.press("Enter")
    page.wait_for_timeout(30)  # 에디터 내부 버퍼 처리 지연 보장
```

`insert_text()` 와 `press("Enter")`를 조합하자, 문단 블록들이 실시간으로 가상 DOM 에 등록되었다.
<br/>
<br/>

## 서사 흐름에 맞춘 삽화 삽입과 마크다운 정제

네이버 블로그는 마크다운을 지원하지 않기 때문에, LLM 이 작성한 중간 포맷에 포함된 `###`, `**`, `>` 같은 문법 기호가 그대로 노출되면 글의 몰입을 심각하게 해친다.

정규식을 통해 모든 마크다운 기호를 정제하고, 삽화를 서사적 클라이맥스와 같이 가장 어울리는 위치에 `[삽화 삽입 위치]` 를 지정했다.

```python
# 1부 본문 타이핑 -> 툴바 사진 버튼을 통해 파일 선택기 주입 -> 2부 본문 타이핑
pic_btn = editor_frame.locator("button[data-name='image']").first
with page.expect_file_chooser() as fc_info:
    pic_btn.click()
file_chooser = fc_info.value
file_chooser.set_files(abs_image_path)

# 업로드 완료 대기 후 커서를 이미지 아래로 이동하여 후반부 작성
page.wait_for_timeout(6000)
page.keyboard.press("ArrowDown")
page.keyboard.press("Enter")
```

이렇게 1부 원고를 타이핑한 직후 파일 선택기를 가로채 삽화를 업로드하고, 커서를 자연스럽게 아래로 내려 2부 서사를 이어 적도록 구현했다.

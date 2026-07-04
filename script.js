document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('.nav-links a');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Teaser Presentation Slider Logic
  const slides = document.querySelectorAll('.slide');
  const progressBar = document.querySelector('.progress-bar');
  let currentSlide = 0;
  const slideDuration = 6500; // 6.5s per slide

  if (slides.length > 0) {
    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      slides[index].classList.add('active');

      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.transition = `width ${slideDuration}ms linear`;
          progressBar.style.width = '100%';
        }, 50);
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, slideDuration);
  }

  // Results table tab switcher
  const tabContainer = document.getElementById('resultTabs');
  if (tabContainer) {
    tabContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.table-tab');
      if (!btn) return;
      const tabId = btn.dataset.tab;

      // Toggle active tab button
      tabContainer.querySelectorAll('.table-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      // Toggle active panel
      document.querySelectorAll('.table-panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('panel-' + tabId);
      if (target) target.classList.add('active');
    });
  }

  // Interactive MedObvious quiz
  const quizSamples = [
    {
      id: 'v4_abd_ct_vs_chest_xray_10_det_mcq',
      version: 'v4',
      taskType: 'Detection MCQ',
      image: 'assets/quiz/v4_abd_ct_vs_chest_xray_10_grid.png',
      title: 'Anatomy mismatch',
      question: 'One panel belongs to a different anatomy group. Which position contains the outlier?',
      choices: [
        { value: 'A', label: 'A', detail: 'top-left' },
        { value: 'B', label: 'B', detail: 'top-right' },
        { value: 'C', label: 'C', detail: 'bottom-left' },
        { value: 'D', label: 'D', detail: 'bottom-right' },
        { value: 'E', label: 'E', detail: 'None' },
      ],
      correct: 'D',
      answerText: 'D - bottom-right',
      feedback: 'Bottom-right is the abdomen CT among chest X-rays.',
    },
    {
      id: 'v1_ct_vs_xray_1_ref_mcq',
      version: 'v1',
      taskType: 'Referring MCQ',
      image: 'assets/quiz/v1_ct_vs_xray_1_grid.png',
      title: 'Find the CT scan',
      question: 'One scan is the named anomaly in this 2x2 grid. Which position is it?',
      choices: [
        { value: 'A', label: 'A', detail: 'top-left' },
        { value: 'B', label: 'B', detail: 'top-right' },
        { value: 'C', label: 'C', detail: 'bottom-left' },
        { value: 'D', label: 'D', detail: 'bottom-right' },
        { value: 'E', label: 'E', detail: 'None' },
      ],
      correct: 'C',
      answerText: 'C - bottom-left',
      feedback: 'Bottom-left is the CT scan among the other images.',
    },
    {
      id: 'v3_mri_scan_1_det_mcq',
      version: 'v3',
      taskType: 'Detection MCQ',
      image: 'assets/quiz/v3_mri_scan_1_grid.png',
      title: 'Dense 3x3 search',
      question: 'This denser grid has one scan that does not match the rest. Which position contains the outlier?',
      choices: [
        { value: 'A', label: 'A', detail: 'top-left' },
        { value: 'B', label: 'B', detail: 'top-center' },
        { value: 'C', label: 'C', detail: 'top-right' },
        { value: 'D', label: 'D', detail: 'middle-left' },
        { value: 'E', label: 'E', detail: 'middle-center' },
        { value: 'F', label: 'F', detail: 'middle-right' },
        { value: 'G', label: 'G', detail: 'bottom-left' },
        { value: 'H', label: 'H', detail: 'bottom-center' },
        { value: 'I', label: 'I', detail: 'bottom-right' },
        { value: 'J', label: 'J', detail: 'None' },
      ],
      correct: 'B',
      answerText: 'B - top-center',
      feedback: 'Top-center is the MRI scan among the other panels in this 3x3 grid.',
    },
    {
      id: 'v1_ct_vs_xray_5_det_mcq',
      version: 'v1',
      taskType: 'Detection MCQ',
      image: 'assets/quiz/v1_ct_vs_xray_5_grid.png',
      title: 'Modality mismatch',
      question: 'One panel uses a different imaging modality from the others. Which position contains the outlier?',
      choices: [
        { value: 'A', label: 'A', detail: 'top-left' },
        { value: 'B', label: 'B', detail: 'top-right' },
        { value: 'C', label: 'C', detail: 'bottom-left' },
        { value: 'D', label: 'D', detail: 'bottom-right' },
        { value: 'E', label: 'E', detail: 'None' },
      ],
      correct: 'B',
      answerText: 'B - top-right',
      feedback: 'Top-right is the inconsistent scan in this 2x2 set.',
    },
    {
      id: 'v6_endo_vs_mri_6_det_mcq_neg',
      version: 'v6',
      taskType: 'Detection MCQ negative',
      image: 'assets/quiz/v6_endo_vs_mri_6_neg_grid.png',
      title: 'Clean 3x3 grid',
      question: 'This 3x3 case may or may not contain an outlier. What should be selected?',
      choices: [
        { value: 'A', label: 'A', detail: 'top-left' },
        { value: 'B', label: 'B', detail: 'top-center' },
        { value: 'C', label: 'C', detail: 'top-right' },
        { value: 'D', label: 'D', detail: 'middle-left' },
        { value: 'E', label: 'E', detail: 'middle-center' },
        { value: 'F', label: 'F', detail: 'middle-right' },
        { value: 'G', label: 'G', detail: 'bottom-left' },
        { value: 'H', label: 'H', detail: 'bottom-center' },
        { value: 'I', label: 'I', detail: 'bottom-right' },
        { value: 'J', label: 'J', detail: 'None' },
      ],
      correct: 'J',
      answerText: 'J - None',
      feedback: 'No panel is an outlier. Restraint matters: the correct action is to avoid inventing a difference.',
    },
    {
      id: 'v6_endo_vs_xray_13_det_mcq_neg',
      version: 'v6',
      taskType: 'Detection MCQ negative',
      image: 'assets/quiz/v6_endo_vs_xray_13_neg_grid.png',
      title: 'Clean 2x2 grid',
      question: 'If all panels are internally consistent, select None. What is the best answer here?',
      choices: [
        { value: 'A', label: 'A', detail: 'top-left' },
        { value: 'B', label: 'B', detail: 'top-right' },
        { value: 'C', label: 'C', detail: 'bottom-left' },
        { value: 'D', label: 'D', detail: 'bottom-right' },
        { value: 'E', label: 'E', detail: 'None' },
      ],
      correct: 'E',
      answerText: 'E - None',
      feedback: 'All panels are consistent. The benchmark rewards saying None when no outlier exists.',
    },
    {
      id: 'v3_mri_scan_0_vis_pos',
      version: 'v3',
      taskType: 'Visual Referring',
      image: 'assets/quiz/v3_mri_scan_0_vis_pos.png',
      title: 'Highlighted modality outlier',
      question: 'The red box highlights one scan in a dense 3x3 grid. Is the highlighted scan the clinical outlier?',
      choices: [
        { value: 'yes', label: 'Yes', detail: 'highlighted scan is the outlier' },
        { value: 'no', label: 'No', detail: 'highlighted scan is not the outlier' },
      ],
      correct: 'yes',
      answerText: 'Yes',
      feedback: 'Yes. The highlighted scan differs by modality from the surrounding panels.',
    },
    {
      id: 'v2_mri_scan_9_vis_pos',
      version: 'v2',
      taskType: 'Visual Referring',
      image: 'assets/quiz/v2_mri_scan_9_vis_pos.png',
      title: 'Verify the red box',
      question: 'The red box points to one panel. Is that highlighted panel the outlier?',
      choices: [
        { value: 'yes', label: 'Yes', detail: 'highlighted scan is the outlier' },
        { value: 'no', label: 'No', detail: 'highlighted scan is not the outlier' },
      ],
      correct: 'yes',
      answerText: 'Yes',
      feedback: 'Yes. The red box marks the scan that breaks the set consistency.',
    },
    {
      id: 'v1_xray_vs_mri_9_vis_neg',
      version: 'v1',
      taskType: 'Visual Referring negative',
      image: 'assets/quiz/v1_xray_vs_mri_9_vis_neg.png',
      title: 'Red box, clean panel',
      question: 'The red box highlights one scan. Is the highlighted scan the outlier?',
      choices: [
        { value: 'yes', label: 'Yes', detail: 'highlighted scan is the outlier' },
        { value: 'no', label: 'No', detail: 'highlighted scan is not the outlier' },
      ],
      correct: 'no',
      answerText: 'No',
      feedback: 'No. The highlighted panel is not the outlier, so restraint is the correct response.',
    },
    {
      id: 'v5_hw_2_vis_neg',
      version: 'v5',
      taskType: 'Visual Referring negative',
      image: 'assets/quiz/v5_hw_2_vis_neg.png',
      title: 'Do not over-call it',
      question: 'The red box highlights one scan. Is that highlighted scan the clinical outlier?',
      choices: [
        { value: 'yes', label: 'Yes', detail: 'highlighted scan is the outlier' },
        { value: 'no', label: 'No', detail: 'highlighted scan is not the outlier' },
      ],
      correct: 'no',
      answerText: 'No',
      feedback: 'No. The highlighted scan is consistent with the set; finding nothing is the right call.',
    },
  ];

  const quizRoot = document.getElementById('obviousQuiz');
  if (quizRoot) {
    const quizEls = {
      image: document.getElementById('quizImage'),
      bar: document.getElementById('quizProgressBar'),
      badge: document.getElementById('quizBadge'),
      counter: document.getElementById('quizCounter'),
      title: document.getElementById('quizTitle'),
      question: document.getElementById('quizQuestion'),
      meta: document.getElementById('quizMeta'),
      choices: document.getElementById('quizChoices'),
      feedback: document.getElementById('quizFeedback'),
      check: document.getElementById('quizCheck'),
      next: document.getElementById('quizNext'),
      reset: document.getElementById('quizReset'),
      score: document.getElementById('quizScore'),
    };

    const quizState = {
      index: 0,
      selected: null,
      locked: false,
      score: 0,
      answered: 0,
    };
    const quizInstruction = 'A clinical outlier may differ in modality, anatomy, pathology, or visible device-related findings.';

    function updateQuizScore() {
      quizEls.score.textContent = `Score: ${quizState.score}/${quizState.answered} answered`;
    }

    function setQuizFeedback(kind, text) {
      quizEls.feedback.hidden = false;
      quizEls.feedback.className = `quiz-feedback ${kind}`;
      quizEls.feedback.textContent = text;
    }

    function selectQuizAnswer(value) {
      if (quizState.locked) return;
      quizState.selected = value;
      quizEls.choices.querySelectorAll('.quiz-choice').forEach(btn => {
        const isSelected = btn.dataset.value === value;
        btn.classList.toggle('selected', isSelected);
        btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      });
    }

    function renderQuizSample() {
      const sample = quizSamples[quizState.index];
      quizState.selected = null;
      quizState.locked = false;

      quizEls.image.src = sample.image;
      quizEls.image.alt = `${sample.title} sample from ${sample.version}`;
      quizEls.badge.textContent = `${sample.version} · ${sample.taskType}`;
      quizEls.counter.textContent = `${quizState.index + 1}/${quizSamples.length}`;
      quizEls.title.textContent = sample.title;
      quizEls.question.textContent = `${quizInstruction} ${sample.question}`;
      quizEls.meta.textContent = sample.id;
      quizEls.bar.style.width = `${((quizState.index + 1) / quizSamples.length) * 100}%`;
      quizEls.feedback.hidden = true;
      quizEls.feedback.textContent = '';
      quizEls.next.disabled = true;
      quizEls.next.textContent = quizState.index === quizSamples.length - 1 ? 'Final sample' : 'Next sample';
      quizEls.check.disabled = false;

      quizEls.choices.innerHTML = '';
      sample.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'quiz-choice';
        btn.type = 'button';
        btn.dataset.value = choice.value;
        btn.setAttribute('aria-pressed', 'false');

        const main = document.createElement('span');
        main.className = 'choice-main';
        main.textContent = choice.label;

        const detail = document.createElement('span');
        detail.className = 'choice-sub';
        detail.textContent = choice.detail;

        const textWrap = document.createElement('span');
        textWrap.append(main, detail);
        btn.append(textWrap);
        btn.addEventListener('click', () => selectQuizAnswer(choice.value));
        quizEls.choices.append(btn);
      });

      updateQuizScore();
    }

    function checkQuizAnswer() {
      const sample = quizSamples[quizState.index];
      if (!quizState.selected) {
        setQuizFeedback('notice', 'Choose one answer before checking.');
        return;
      }

      quizState.locked = true;
      quizState.answered += 1;
      const isCorrect = quizState.selected === sample.correct;
      if (isCorrect) quizState.score += 1;

      quizEls.choices.querySelectorAll('.quiz-choice').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.value === sample.correct) btn.classList.add('correct');
        if (!isCorrect && btn.dataset.value === quizState.selected) btn.classList.add('wrong');
      });

      const finalLine = quizState.index === quizSamples.length - 1
        ? ` Final score: ${quizState.score}/${quizState.answered}.`
        : '';
      if (isCorrect) {
        setQuizFeedback('correct', `Correct. ${sample.feedback}${finalLine}`);
      } else {
        setQuizFeedback('wrong', `Not quite. Correct answer: ${sample.answerText}. ${sample.feedback}${finalLine}`);
      }

      quizEls.check.disabled = true;
      const isLastSample = quizState.index === quizSamples.length - 1;
      quizEls.next.disabled = isLastSample;
      if (isLastSample) quizEls.next.textContent = 'Quiz complete';
      updateQuizScore();
    }

    function goToNextQuizSample() {
      if (quizState.index >= quizSamples.length - 1) return;
      quizState.index += 1;
      renderQuizSample();
    }

    function resetQuiz() {
      quizState.index = 0;
      quizState.selected = null;
      quizState.locked = false;
      quizState.score = 0;
      quizState.answered = 0;
      renderQuizSample();
    }

    quizEls.check.addEventListener('click', checkQuizAnswer);
    quizEls.next.addEventListener('click', goToNextQuizSample);
    quizEls.reset.addEventListener('click', resetQuiz);
    renderQuizSample();
  }

});

/**
 * ZUNOKS CONSULTING — MAIN APPLICATION JAVASCRIPT
 * Handles all interactive components from the Figma component library:
 * - 04 · Founders Explorer
 * - 06 · Services Explorer
 * - 07 · Industries Accordion
 * - 12 · Workshop Carousel
 * - 14 · SWOT Diagnostic Test & Countdown Gauge
 * - Header Scroll & Mobile Nav
 * - Count-up Statistics
 * - Scroll Appear Animations (IntersectionObserver & View Timeline)
 */

import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFoundersExplorer();
  initServicesExplorer();
  initIndustriesAccordion();
  initWorkshopCarousel();
  initSwotDiagnostic();
  initCountUpAnimations();
  initScrollAppear();
  initVideoModal();
  initForms();
});

/* ==========================================================================
   1. HEADER & NAVIGATION
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  // Sticky background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      mobileBtn.classList.toggle('is-active', isOpen);
    });

    // Close drawer when clicking links
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileBtn.classList.remove('is-active');
      });
    });
  }
}

/* ==========================================================================
   2. FOUNDERS EXPLORER (COMPONENT SET · V7)
   ========================================================================== */
const foundersData = [
  {
    id: 'zulfikar',
    name: 'Zulfikar\nHyder',
    roleTag: 'CO-FOUNDER & MANAGING PARTNER',
    specialty: 'Leadership & Organisational Transformation',
    desc: 'Aligning HR with business priorities to enhance organisational capabilities.',
    cutout: '/assets/founder-zulfikar.png',
    statNum: '32+',
    statLabel: 'years in HR leadership',
    expertise: ['Strategy', 'Hiring and growing people', 'Big changes', 'Managing change'],
    highlights: [
      'Helped BAT and Coats change how their people lead and work',
      'Set up BRAC’s leadership academy to train its managers'
    ],
    previously: ['BAT', 'Coats', 'BRAC', 'Grameenphone']
  },
  {
    id: 'shahed',
    name: 'Quazi M.\nShahed',
    roleTag: 'CO-FOUNDER & PARTNER',
    specialty: 'HR Strategy & Organisational Design',
    desc: 'Aligning people strategy, organisational structure and talent management with business priorities.',
    cutout: '/assets/founder-shahed.png',
    statNum: '12',
    statLabel: 'years in factory and supply chain work at BAT',
    expertise: ['How teams are set up', 'HR planning', 'Finding senior leaders', 'Employer reputation'],
    highlights: [
      'Led HR for BAT across South Asia',
      'Guided Grameenphone through a major change'
    ],
    previously: ['BAT', 'Grameenphone', 'Telenor']
  },
  {
    id: 'nowshad',
    name: 'Matiul I.\nNowshad',
    roleTag: 'CO-FOUNDER & PARTNER',
    specialty: 'Leadership & Organisational Transformation',
    desc: 'Helping organisations navigate transformation, culture change and leadership development.',
    cutout: '/assets/founder-nowshad.png',
    statNum: '30',
    statLabel: 'years across three major industries',
    expertise: ['Mergers', 'Culture and change', 'Pay and performance', 'Board-level hiring'],
    highlights: [
      'Led HR when Hello Axiata and Latelz merged to form Smart Axiata',
      'Named a Top 50 HR Leader in Asia (2017)'
    ],
    previously: ['Robi Axiata', 'Smart Axiata', 'Airtel']
  },
  {
    id: 'khaled',
    name: 'Saifuddin M.\nKhaled',
    roleTag: 'CO-FOUNDER & PARTNER',
    specialty: 'Manufacturing & Operational Excellence',
    desc: 'Improving manufacturing performance through operational and supply chain excellence.',
    cutout: '/assets/founder-khaled.png',
    statNum: '30+',
    statLabel: 'years in global manufacturing & operations',
    expertise: ['Running operations well', 'Efficient factories', 'Buying and suppliers', 'Fixing slow processes'],
    highlights: [
      'Delivered BAT’s largest investment programme in Asia Pacific',
      'Built new factories at BATB and Reckitt Benckiser'
    ],
    previously: ['BAT', 'Reckitt', 'British American Tobacco']
  }
];

function initFoundersExplorer() {
  const tabs = document.querySelectorAll('.founder-tab-btn');
  const roleElem = document.getElementById('founder-role');
  const nameElem = document.getElementById('founder-name');
  const specialtyElem = document.getElementById('founder-specialty');
  const descElem = document.getElementById('founder-desc');
  const cutoutElem = document.getElementById('founder-cutout');
  const statNumElem = document.getElementById('founder-stat-num');
  const statLabelElem = document.getElementById('founder-stat-label');
  const expertiseWrap = document.getElementById('founder-expertise-tags');
  const highlightsWrap = document.getElementById('founder-highlights-list');
  const badgesWrap = document.getElementById('founder-prev-badges');

  if (!tabs.length || !nameElem) return;

  function setFounder(data) {
    // Cutout animation
    if (cutoutElem) {
      cutoutElem.style.opacity = '0';
      cutoutElem.style.transform = 'translateY(12px) scale(0.97)';
      setTimeout(() => {
        cutoutElem.src = data.cutout;
        cutoutElem.alt = data.name.replace('\n', ' ');
        cutoutElem.style.opacity = '1';
        cutoutElem.style.transform = 'translateY(0) scale(1)';
      }, 200);
    }

    if (roleElem) roleElem.textContent = data.roleTag;
    if (nameElem) nameElem.innerHTML = data.name.replace('\n', '<br>');
    if (specialtyElem) specialtyElem.textContent = data.specialty;
    if (descElem) descElem.textContent = data.desc;
    if (statNumElem) statNumElem.textContent = data.statNum;
    if (statLabelElem) statLabelElem.textContent = data.statLabel;

    if (expertiseWrap) {
      expertiseWrap.innerHTML = data.expertise
        .map(tag => `<span class="expertise-pill">${tag}</span>`)
        .join('');
    }

    if (highlightsWrap) {
      highlightsWrap.innerHTML = data.highlights
        .map(h => `<div class="highlight-row"><span class="check">✓</span><span>${h}</span></div>`)
        .join('');
    }

    if (badgesWrap) {
      badgesWrap.innerHTML = data.previously
        .map(p => `<span class="prev-badge">${p}</span>`)
        .join('');
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      setFounder(foundersData[index]);
    });
  });
}

/* ==========================================================================
   3. SERVICES EXPLORER (COMPONENT SET · V7)
   ========================================================================== */
const servicesData = [
  {
    id: 'strategic',
    name: 'Strategic Interventions',
    benefit: 'Smoother change, clearer direction',
    desc: 'Help with big decisions and big changes: mergers, new strategies and restructuring.',
    photo: '/assets/service-hands.jpg',
    included: ['Strategy formulation', 'Managing big changes', 'Mergers and splits', 'Restructuring teams']
  },
  {
    id: 'hr',
    name: 'Human Resources',
    benefit: 'Right people, fair pay, fewer exits',
    desc: 'Better ways to hire, pay, train and keep your people.',
    photo: '/assets/service-hands.jpg',
    included: ['Hiring and talent', 'Pay and performance', 'Company culture', 'HR policies and rules']
  },
  {
    id: 'gamified',
    name: 'Gamified Recruitment',
    benefit: 'Faster shortlists, better candidate experience',
    desc: 'Hire with online games that show how candidates really think and work.',
    photo: '/assets/featured-service.jpg',
    included: ['Game-based tests', 'Automatic scoring', 'Fit-for-role reports', 'Free trial demo']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Supply Chain',
    benefit: 'More output, less stock, safer sites',
    desc: 'Make more, waste less and keep your operating sites safe and reliable.',
    photo: '/assets/industry-01.jpg',
    included: ['Factory efficiency', 'Smoother production', 'Buying and suppliers', 'Fixing slow processes']
  },
  {
    id: 'search',
    name: 'Executive Search',
    benefit: 'Better senior hires',
    desc: 'Finding senior leaders and board members who fit your business and culture.',
    photo: '/assets/how-we-work.jpg',
    included: ['CEO and top-team search', 'Checking culture fit', 'Future leaders', 'Planning who comes next']
  },
  {
    id: 'coaching',
    name: 'Executive Coaching',
    benefit: 'Stronger leaders, lasting results',
    desc: 'One-to-one coaching and mentoring for leaders facing complex decisions.',
    photo: '/assets/voices-photo.jpg',
    included: ['One-to-one coaching', 'Mentoring programmes', 'Coaching for teams', 'Support on big decisions']
  },
  {
    id: 'shared',
    name: 'Shared Services',
    benefit: 'Lower admin cost, correct payroll',
    desc: 'We run your HR admin, payroll and systems so your internal team can focus on growth.',
    photo: '/assets/how-we-work.jpg',
    included: ['HR administration', 'Payroll services', 'HR software systems', 'Setting up a service centre']
  }
];

function initServicesExplorer() {
  const items = document.querySelectorAll('.service-nav-item');
  const benefitElem = document.getElementById('service-benefit');
  const titleElem = document.getElementById('service-title');
  const descElem = document.getElementById('service-desc');
  const includedWrap = document.getElementById('service-included-grid');
  const photoElem = document.getElementById('service-photo');

  if (!items.length || !titleElem) return;

  function setService(data) {
    if (benefitElem) benefitElem.textContent = data.benefit;
    if (titleElem) titleElem.textContent = data.name;
    if (descElem) descElem.textContent = data.desc;
    if (photoElem) photoElem.src = data.photo;

    if (includedWrap) {
      includedWrap.innerHTML = data.included
        .map(inc => `<div class="service-included-item">${inc}</div>`)
        .join('');
    }
  }

  items.forEach((item, index) => {
    const activate = () => {
      items.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
      setService(servicesData[index]);
    };

    item.addEventListener('click', activate);
    item.addEventListener('mouseenter', activate);
  });
}

/* ==========================================================================
   4. INDUSTRIES EXPLORER (ACCORDION COMPONENT SET · V7)
   ========================================================================== */
function initIndustriesAccordion() {
  const strips = document.querySelectorAll('.industry-strip');
  if (!strips.length) return;

  strips.forEach(strip => {
    strip.addEventListener('click', () => {
      if (strip.classList.contains('is-active')) return;
      strips.forEach(s => s.classList.remove('is-active'));
      strip.classList.add('is-active');
    });

    strip.addEventListener('mouseenter', () => {
      // On desktop wider than 992px, enable hover expansion
      if (window.innerWidth > 992) {
        strips.forEach(s => s.classList.remove('is-active'));
        strip.classList.add('is-active');
      }
    });
  });
}

/* ==========================================================================
   5. WORKSHOP GALLERY CAROUSEL (COMPONENT SET · V7)
   ========================================================================== */
const workshopSlides = [
  {
    num: '01  /  04',
    tag: 'UCB PLC  ·  HR OVERHAUL',
    title: 'Collaborating to evaluate roles better.',
    desc: 'A one-day workshop for 40 managers on writing job descriptions and judging how big each job is, so UCB can do it on its own.',
    format: 'One day · 40 managers',
    focus: 'Writing and grading job roles',
    ledBy: 'Matiul I. Nowshad, with Peggy Liew and Zeenat Zahir',
    photoA: '/assets/workshop-01.jpg',
    photoB: '/assets/workshop-01b.jpg',
    nextTag: 'NEXT · MARICO BANGLADESH'
  },
  {
    num: '02  /  04',
    tag: 'MARICO BANGLADESH  ·  LEADERSHIP',
    title: 'Growing future leaders.',
    desc: 'A two-day workshop for Marico’s rising leaders, mixing short lessons with hands-on practice.',
    format: 'Two days · 6–7 September',
    focus: 'Everyday leadership skills',
    ledBy: 'Quazi M. Shahed, Saifuddin M. Khaled',
    photoA: '/assets/workshop-02.jpg',
    photoB: '/assets/workshop-01b.jpg',
    nextTag: 'NEXT · EDOTCO BANGLADESH'
  },
  {
    num: '03  /  04',
    tag: 'EDOTCO BANGLADESH  ·  STRATEGIC LEADERSHIP',
    title: 'Building strategic leadership.',
    desc: 'An interactive leadership experience focused on strategic decisions, adaptability and real business challenges.',
    format: 'Interactive leadership simulation',
    focus: 'Strategic decision-making',
    ledBy: 'ZUNOKS × IIM Calcutta',
    photoA: '/assets/workshop-01.jpg',
    photoB: '/assets/workshop-04.jpg',
    nextTag: 'NEXT · ROBI'
  },
  {
    num: '04  /  04',
    tag: 'ROBI  ·  PEOPLE MANAGER EXCELLENCE',
    title: 'Helping managers lead better.',
    desc: 'Training 105 managers across four batches to strengthen leadership and team management skills.',
    format: '16–31 August · 4 batches',
    focus: '105 people managers',
    ledBy: 'Shahed Quazi and Matiul Nowshad',
    photoA: '/assets/workshop-04.jpg',
    photoB: '/assets/workshop-01b.jpg',
    nextTag: 'NEXT · UCB PLC'
  }
];

function initWorkshopCarousel() {
  let currentIndex = 0;
  const prevBtn = document.getElementById('workshop-prev');
  const nextBtn = document.getElementById('workshop-next');
  const counterElem = document.getElementById('workshop-counter');
  const tagElem = document.getElementById('workshop-tag');
  const titleElem = document.getElementById('workshop-title');
  const descElem = document.getElementById('workshop-desc');
  const formatElem = document.getElementById('workshop-format');
  const focusElem = document.getElementById('workshop-focus');
  const ledByElem = document.getElementById('workshop-ledby');
  const photoAElem = document.getElementById('workshop-photo-a');
  const photoBElem = document.getElementById('workshop-photo-b');

  if (!prevBtn || !nextBtn || !titleElem) return;

  function renderSlide(idx) {
    const s = workshopSlides[idx];
    if (counterElem) counterElem.textContent = s.num;
    if (tagElem) tagElem.textContent = s.tag;
    if (titleElem) titleElem.textContent = s.title;
    if (descElem) descElem.textContent = s.desc;
    if (formatElem) formatElem.textContent = s.format;
    if (focusElem) focusElem.textContent = s.focus;
    if (ledByElem) ledByElem.textContent = s.ledBy;

    if (photoAElem) {
      photoAElem.style.opacity = '0.3';
      setTimeout(() => {
        photoAElem.src = s.photoA;
        photoAElem.style.opacity = '1';
      }, 150);
    }
    if (photoBElem) {
      photoBElem.style.opacity = '0.3';
      setTimeout(() => {
        photoBElem.src = s.photoB;
        photoBElem.style.opacity = '1';
      }, 150);
    }
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + workshopSlides.length) % workshopSlides.length;
    renderSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % workshopSlides.length;
    renderSlide(currentIndex);
  });
}

/* ==========================================================================
   6. SWOT TEST DIAGNOSTIC WIDGET (COMPONENT SET · V7)
   ========================================================================== */
function initSwotDiagnostic() {
  let currentStep = 1;
  let timeLeft = 10;
  let timerInterval = null;
  const userAnswers = [];

  const timerDigit = document.getElementById('swot-countdown-digit');
  const stepLabel = document.getElementById('swot-step-label');
  const progressPct = document.getElementById('swot-progress-pct');
  const trackFill = document.getElementById('swot-track-fill');
  const questionElem = document.getElementById('swot-question-text');
  const optionsWrap = document.getElementById('swot-options-wrap');
  const quizView = document.getElementById('swot-quiz-step-view');
  const resultView = document.getElementById('swot-result-view');
  const resetBtn = document.getElementById('swot-reset-btn');
  const timerCaption = document.getElementById('swot-timer-caption');

  const questions = [
    {
      step: 1,
      stepText: 'STEP 1 OF 3',
      pct: '33%',
      question: 'How does your team feel today?',
      options: ['Skilled and settled', 'Growing fast', 'Stretched thin']
    },
    {
      step: 2,
      stepText: 'STEP 2 OF 3',
      pct: '67%',
      question: 'What slows you down most?',
      options: ['Finding the right people', 'Unclear roles and decisions', 'Costs and slow processes']
    },
    {
      step: 3,
      stepText: 'STEP 3 OF 3',
      pct: '100%',
      question: 'What is your top priority for next year?',
      options: ['Accelerating business growth', 'Reorganising leadership & culture', 'Process & factory efficiency']
    }
  ];

  // Animate the 19 SVG segments of the radial gauge
  function updateGaugeSegments(remainingSeconds) {
    // 19 segments mapped to 10 seconds: ratio = remainingSeconds / 10
    const activeCount = Math.round((remainingSeconds / 10) * 19);
    for (let i = 1; i <= 19; i++) {
      const seg = document.getElementById(`gauge-seg-${i}`);
      if (seg) {
        if (i <= activeCount) {
          seg.style.opacity = '1';
          seg.style.stroke = '#6CBE45';
        } else {
          seg.style.opacity = '0.15';
          seg.style.stroke = '#2A4D35';
        }
      }
    }
  }

  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    if (timerDigit) timerDigit.textContent = '10';
    updateGaugeSegments(10);

    timerInterval = setInterval(() => {
      timeLeft--;
      if (timerDigit) {
        timerDigit.textContent = timeLeft < 10 ? `0${timeLeft}` : `${timeLeft}`;
      }
      updateGaugeSegments(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        // Auto pick first option if time runs out
        handleAnswer(questions[currentStep - 1].options[0]);
      }
    }, 1000);
  }

  function renderStep(stepIndex) {
    const q = questions[stepIndex];
    if (stepLabel) stepLabel.textContent = q.stepText;
    if (progressPct) progressPct.textContent = q.pct;
    if (trackFill) trackFill.style.width = q.pct;
    if (questionElem) questionElem.textContent = q.question;

    if (optionsWrap) {
      optionsWrap.innerHTML = q.options
        .map((opt, i) => `
          <button class="swot-option-btn" data-answer="${opt}">
            <span>${opt}</span>
            <span style="color: var(--color-lime); font-size: 18px;">→</span>
          </button>
        `)
        .join('');

      optionsWrap.querySelectorAll('.swot-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          handleAnswer(btn.getAttribute('data-answer'));
        });
      });
    }

    startTimer();
  }

  function handleAnswer(answer) {
    userAnswers.push(answer);
    if (currentStep < 3) {
      currentStep++;
      renderStep(currentStep - 1);
    } else {
      showResults();
    }
  }

  function showResults() {
    clearInterval(timerInterval);
    if (timerDigit) timerDigit.textContent = '✓';
    if (timerCaption) timerCaption.textContent = 'Completed';
    updateGaugeSegments(19);

    if (quizView) quizView.style.display = 'none';
    if (resultView) resultView.classList.add('is-visible');

    // Tailor results based on selections
    const teamState = userAnswers[0] || 'Skilled and settled';
    const bottleneck = userAnswers[1] || 'Unclear roles and decisions';

    const sElem = document.getElementById('swot-result-s');
    const wElem = document.getElementById('swot-result-w');
    const oElem = document.getElementById('swot-result-o');
    const tElem = document.getElementById('swot-result-t');

    if (sElem) sElem.textContent = `High core capability: ${teamState}`;
    if (wElem) wElem.textContent = `Operational friction: ${bottleneck}`;
    if (oElem) oElem.textContent = 'Structured leadership alignment and capability transformation';
    if (tElem) tElem.textContent = 'Key talent disengagement if restructuring is delayed';
  }

  function resetQuiz() {
    currentStep = 1;
    userAnswers.length = 0;
    if (quizView) quizView.style.display = 'flex';
    if (resultView) resultView.classList.remove('is-visible');
    if (timerCaption) timerCaption.innerHTML = 'seconds left<br>to answer';
    renderStep(0);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetQuiz);
  }

  // Initial step setup
  if (quizView && optionsWrap) {
    renderStep(0);
  }
}

/* ==========================================================================
   7. COUNT-UP STATS ANIMATIONS
   ========================================================================== */
function initCountUpAnimations() {
  const statElements = document.querySelectorAll('[data-counter-target]');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10);
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const duration = 1500;
        const stepTime = 25;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = `${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${Math.floor(current)}${suffix}`;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  statElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   8. SCROLL APPEAR ANIMATIONS
   ========================================================================== */
function initScrollAppear() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    rootMargin: '100px 0px 100px 0px',
    threshold: 0.05
  });

  elements.forEach(el => observer.observe(el));

  // Immediate check for elements already in viewport
  requestAnimationFrame(() => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        el.classList.add('is-visible');
      }
    });
  });
}

/* ==========================================================================
   9. VIDEO MODAL
   ========================================================================== */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const trigger = document.getElementById('play-video-trigger');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !trigger) return;

  trigger.addEventListener('click', () => {
    modal.classList.add('is-open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      modal.classList.remove('is-open');
    }
  });
}

/* ==========================================================================
   10. FORMS & NEWSLETTER HANDLING
   ========================================================================== */
function initForms() {
  // Contact Partner Form
  const contactForm = document.getElementById('partner-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="padding: 2.5rem; text-align: center; background: rgba(108,190,69,0.15); border: 1px solid var(--color-lime); border-radius: var(--radius-md);">
            <div style="font-size: 3rem; color: var(--color-lime); margin-bottom: 0.75rem;">✓</div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 0.5rem; color: #FFFFFF;">Thank You.</h3>
            <p style="color: rgba(255,255,255,0.85); font-size: 16px;">A senior partner will review your message and reply within one working day.</p>
          </div>
        `;
      }, 700);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      btn.textContent = 'Subscribed ✓';
      btn.style.backgroundColor = 'var(--color-lime)';
      btn.disabled = true;
    });
  }

  // SWOT Email Send Form
  const swotForm = document.getElementById('swot-email-form');
  if (swotForm) {
    swotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = swotForm.querySelector('button');
      btn.textContent = 'Sent to your inbox ✓';
      btn.style.backgroundColor = 'var(--color-lime)';
      btn.disabled = true;
    });
  }
}

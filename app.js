/* ============================================================
   QeyasQuiz — Complete JavaScript (Single File ES Module)
   Firebase Modular v10 + Vanilla Router + i18n + Theme
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  runTransaction,
  Timestamp,
  writeBatch,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* ============================================================
   FIREBASE CONFIG
   ============================================================ */
const firebaseConfig = {
  apiKey: "AIzaSyAIPCI0ZaBabAQQAvT1CSh_Bt3HMPtx_VU",
  authDomain: "qeyasquiz.firebaseapp.com",
  projectId: "qeyasquiz",
  storageBucket: "qeyasquiz.firebasestorage.app",
  messagingSenderId: "918583547137",
  appId: "1:918583547137:web:78cef6533e33cd7e8ab700",
  measurementId: "G-KWV3BB5KES"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* ============================================================
   I18N
   ============================================================ */
const I18N = {
  en: {
    "nav.features": "Features",
    "nav.how": "How it works",
    "nav.security": "Security",
    "nav.signin": "Sign in",
    "nav.cta": "Create Your First Exam",
    "nav.dashboard": "Dashboard",
    "nav.exams": "My Exams",
    "nav.bank": "Question Bank",
    "nav.profile": "Profile",
    "nav.settings": "Settings",
    "nav.packages": "Packages",

    "hero.eyebrow": "EdTech Platform",
    "hero.title": "Create. Publish. Assess.",
    "hero.subtitle": "QeyasQuiz helps teachers create exams, deliver them securely, and grade with precision — all in one place.",
    "hero.cta": "Create Your First Exam",
    "hero.secondary": "Sign in with Google",
    "hero.point1": "Multiple exam forms",
    "hero.point2": "Automatic grading",
    "hero.point3": "Anti-cheat monitoring",

    "features.title": "Built for serious assessment",
    "features.subtitle": "Every tool a teacher needs, nothing they don't.",
    "features.f1.title": "Exam Builder",
    "features.f1.text": "Six question types, drag-and-drop ordering, and automatic total score calculation.",
    "features.f2.title": "Multiple Forms",
    "features.f2.text": "Create Form A, B, C — students receive a random form automatically on start.",
    "features.f3.title": "Server-Authoritative Timer",
    "features.f3.text": "Timing is calculated from trusted server timestamps. Device clock changes have no effect.",
    "features.f4.title": "Anti-Cheat Monitoring",
    "features.f4.text": "Tab switches, visibility changes and disconnects are logged for teacher review.",
    "features.f5.title": "Automatic Grading",
    "features.f5.text": "Multiple choice, true/false and complete questions are graded instantly. Essays stay manual.",
    "features.f6.title": "Analytics",
    "features.f6.text": "Average score, hardest questions, completion time and per-topic breakdown.",

    "how.title": "How it works",
    "how.subtitle": "From idea to result in three steps.",
    "how.s1.title": "Create",
    "how.s1.text": "Build your exam with multiple forms, images, timing, and access rules.",
    "how.s2.title": "Publish",
    "how.s2.text": "Share a secure link or QR code. Students open it and start instantly.",
    "how.s3.title": "Assess",
    "how.s3.text": "Objective questions grade automatically. Review, add feedback, and publish results.",

    "sec.title": "Secure by design",
    "sec.subtitle": "The frontend is never trusted. Every critical action is validated on the backend.",
    "sec.s1.title": "Server Timestamps",
    "sec.s1.text": "Exam timing and deadlines are enforced from trusted server time.",
    "sec.s2.title": "Ownership Rules",
    "sec.s2.text": "Teachers can only access their own exams, students, and results.",
    "sec.s3.title": "One Attempt Only",
    "sec.s3.text": "Duplicate attempts are blocked at the database level, not in the browser.",

    "cta.title": "Start assessing smarter today",
    "cta.subtitle": "Free to start. No credit card. Sign in with Google and publish your first exam in minutes.",
    "cta.primary": "Create Your First Exam",
    "cta.secondary": "Sign in with Google",

    "footer.about": "About",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.contact": "Contact",
    "footer.tagline": "Smart Exams. Better Assessment.",

    "login.title": "Welcome back",
    "login.subtitle": "Sign in to create exams, manage students, and publish results.",
    "login.google": "Continue with Google",
    "login.connecting": "Connecting…",
    "login.terms": "By continuing you agree to our",
    "login.termsLink": "Terms",
    "login.and": "and",
    "login.privacyLink": "Privacy Policy",

    "setup.title": "Complete your profile",
    "setup.subtitle": "This information appears on your exams and helps students identify you.",
    "setup.photo.title": "Profile picture",
    "setup.photo.change": "Change picture",
    "setup.photo.reset": "Use Google photo",
    "setup.photo.hint": "JPG, PNG or WebP. Max 2 MB.",
    "setup.identity.title": "Identity",
    "setup.username.label": "Username",
    "setup.username.hint": "3–24 characters. Letters, numbers, and underscore only.",
    "setup.fullName.label": "Full name",
    "setup.fullName.hint": "Shown to students on exam pages.",
    "setup.subjects.title": "Subjects",
    "setup.subjects.main": "Main subject",
    "setup.subjects.placeholder": "Select your main subject",
    "setup.subjects.custom": "Other",
    "setup.subjects.customLabel": "Subject name",
    "setup.subjects.additional": "Additional subjects (optional)",
    "setup.subjects.addPlaceholder": "Add a subject…",
    "setup.subjects.add": "Add",
    "setup.signout": "Sign out",
    "setup.cancel": "Cancel",
    "setup.submit": "Complete Setup",

    "dash.welcome.sub": "Here's what's happening with your exams.",
    "dash.recentExams": "Recent Exams",
    "dash.activity": "Recent Activity",

    "stat.totalExams": "Total Exams",
    "stat.activeExams": "Active Exams",
    "stat.submitted": "Submitted Students",
    "stat.waiting": "Waiting for Grading",

    "action.viewAll": "View all",
    "action.createExam": "Create Exam",
    "action.newExam": "New Exam",
    "action.prev": "Previous",
    "action.next": "Next",
    "action.cancel": "Cancel",
    "action.preview": "Preview",
    "action.publish": "Publish",
    "action.publishExam": "Publish Exam",
    "action.addQuestion": "Add Question",
    "action.addForm": "Add Form",
    "action.submit": "Submit",
    "action.submitExam": "Submit Exam",
    "action.goHome": "Go Home",
    "action.editProfile": "Edit",
    "action.deleteAccount": "Delete Account",
    "action.newQuestion": "New Question",

    "status.draft": "Draft",
    "status.scheduled": "Scheduled",
    "status.active": "Active",
    "status.grading": "Grading",
    "status.completed": "Completed",

    "filter.allStatus": "All statuses",
    "sort.newest": "Newest",
    "sort.oldest": "Oldest",
    "sort.updated": "Recently updated",
    "sort.submissions": "Most submissions",

    "empty.exams.title": "No exams yet",
    "empty.exams.text": "Create your first exam to get started.",
    "empty.bank.title": "No saved questions",
    "empty.bank.text": "Save questions from your exams to reuse them later.",
    "packages.title": "Packages",
    "packages.text": "Under development. Plans and pricing will be available soon.",

    "builder.newExam": "New Exam",
    "builder.step.info": "Info",
    "builder.step.questions": "Questions",
    "builder.step.forms": "Forms",
    "builder.step.settings": "Settings",
    "builder.info.title": "Exam information",
    "builder.info.name": "Exam name",
    "builder.info.subject": "Subject",
    "builder.info.selectSubject": "Select subject",
    "builder.info.grade": "Grade",
    "builder.info.selectGrade": "Select grade",
    "builder.info.custom": "Custom",
    "builder.info.customSubject": "Other",
    "builder.info.customGrade": "Custom",
    "builder.questions.title": "Questions",
    "builder.questions.total": "Total score:",
    "builder.forms.title": "Exam forms",
    "builder.forms.hint": "Students receive one random form when they start the exam.",
    "builder.settings.title": "Exam settings",
    "builder.settings.startAt": "Start at",
    "builder.settings.endAt": "End at",
    "builder.settings.duration": "Duration (minutes)",
    "builder.settings.attempts": "Attempts allowed",
    "builder.settings.attemptsHint": "One attempt per student.",
    "builder.settings.shuffle": "Shuffle question order per student",
    "builder.settings.accessCode": "Require access code",
    "builder.settings.accessCodeValue": "Access code",
    "builder.settings.fullscreen": "Require fullscreen during exam",
    "builder.settings.showResult": "Show score immediately after grading",
    "builder.settings.showCorrect": "Show correct answers after publishing",

    "exam.loading": "Loading exam…",
    "exam.connected": "Connected",
    "exam.navigator": "Questions",
    "exam.legend.answered": "Answered",
    "exam.legend.unanswered": "Unanswered",
    "exam.legend.current": "Current",
    "exam.offline": "Connection lost. Your answers are saved locally and will sync when you reconnect.",
    "exam.entry.studentName": "Your full name",
    "exam.entry.accessCode": "Access code",
    "exam.entry.start": "Confirm & Start",
    "exam.entry.foot": "Make sure your name is correct. Your exam will be submitted under this name.",
    "exam.resume.title": "Resume your exam?",
    "exam.resume.text": "You have an exam in progress. Your answers and remaining time have been preserved.",
    "exam.resume.continue": "Resume Exam",
    "exam.confirm.title": "Submit exam?",
    "exam.confirm.text": "Are you sure you want to submit your exam? You cannot make changes after submission.",
    "exam.update.title": "Exam Updated",
    "exam.update.text": "The teacher has updated this exam. Refresh to load the latest version. Your answers will be preserved.",
    "exam.update.refresh": "Refresh Exam",

    "result.loading": "Loading result…",
    "result.waiting": "Waiting for grading.",
    "result.feedback": "Teacher Feedback",
    "result.review": "Answer Review",
    "result.reviewSub": "See your answers alongside the correct answers.",

    "settings.appearance": "Appearance",
    "settings.light": "Light mode",
    "settings.dark": "Dark mode",
    "settings.auto": "System default",
    "settings.language": "Language",
    "profile.subjects": "Subjects",
    "profile.danger": "Danger zone",
    "profile.dangerText": "Deleting your account removes all your exams, students, and results permanently."
  },
  ar: {
    "nav.features": "المميزات",
    "nav.how": "كيف يعمل",
    "nav.security": "الأمان",
    "nav.signin": "تسجيل الدخول",
    "nav.cta": "أنشئ أول امتحان",
    "nav.dashboard": "الرئيسية",
    "nav.exams": "امتحاناتي",
    "nav.bank": "بنك الأسئلة",
    "nav.profile": "الملف الشخصي",
    "nav.settings": "الإعدادات",
    "nav.packages": "الباقات",

    "hero.eyebrow": "منصة تعليمية",
    "hero.title": "أنشئ. انشر. قيّم.",
    "hero.subtitle": "QeyasQuiz تساعد المعلمين على إنشاء الامتحانات، تسليمها بأمان، وتصحيحها بدقة — كل شيء في مكان واحد.",
    "hero.cta": "أنشئ أول امتحان",
    "hero.secondary": "الدخول بحساب Google",
    "hero.point1": "نماذج امتحان متعددة",
    "hero.point2": "تصحيح تلقائي",
    "hero.point3": "مراقبة ضد الغش",

    "features.title": "مبنية للتقييم الجاد",
    "features.subtitle": "كل أداة يحتاجها المعلم، بدون زيادات.",
    "features.f1.title": "منشئ الامتحانات",
    "features.f1.text": "ستة أنواع أسئلة، ترتيب بالسحب، وحساب تلقائي للدرجة الكلية.",
    "features.f2.title": "نماذج متعددة",
    "features.f2.text": "أنشئ نموذج A و B و C — يحصل الطالب على نموذج عشوائي عند البدء.",
    "features.f3.title": "مؤقت بوقت السيرفر",
    "features.f4.title": "مراقبة ضد الغش",
    "features.f5.title": "تصحيح تلقائي",
    "features.f6.title": "تحليلات",

    "how.title": "كيف يعمل",
    "how.subtitle": "من الفكرة إلى النتيجة في ثلاث خطوات.",
    "how.s1.title": "أنشئ",
    "how.s2.title": "انشر",
    "how.s3.title": "قيّم",

    "sec.title": "آمن بالتصميم",
    "sec.subtitle": "لا نثق أبدًا في الواجهة. كل إجراء حساس يُتحقق منه على السيرفر.",
    "sec.s1.title": "توقيت السيرفر",
    "sec.s2.title": "قواعد الملكية",
    "sec.s3.title": "محاولة واحدة فقط",

    "cta.title": "ابدأ التقييم الذكي اليوم",
    "cta.subtitle": "ابدأ مجانًا. بدون بطاقة. سجّل بحساب Google وانشر أول امتحان في دقائق.",
    "cta.primary": "أنشئ أول امتحان",
    "cta.secondary": "الدخول بحساب Google",

    "footer.about": "من نحن",
    "footer.privacy": "الخصوصية",
    "footer.terms": "الشروط",
    "footer.contact": "اتصل بنا",
    "footer.tagline": "امتحانات ذكية. تقييم أفضل.",

    "login.title": "مرحبًا بك",
    "login.subtitle": "سجّل الدخول لإنشاء امتحاناتك وإدارة طلابك ونشر النتائج.",
    "login.google": "المتابعة بحساب Google",
    "login.connecting": "جارٍ الاتصال…",
    "login.terms": "بالمتابعة أنت توافق على",
    "login.termsLink": "الشروط",
    "login.and": "و",
    "login.privacyLink": "سياسة الخصوصية",

    "setup.title": "أكمل ملفك الشخصي",
    "setup.subtitle": "هذه المعلومات تظهر في امتحاناتك وتساعد الطلاب على التعرف عليك.",
    "setup.photo.title": "الصورة الشخصية",
    "setup.photo.change": "تغيير الصورة",
    "setup.photo.reset": "استخدام صورة Google",
    "setup.photo.hint": "JPG أو PNG أو WebP. الحد الأقصى 2 ميجابايت.",
    "setup.identity.title": "الهوية",
    "setup.username.label": "اسم المستخدم",
    "setup.username.hint": "3–24 حرفًا. حروف وأرقام وشرطة سفلية فقط.",
    "setup.fullName.label": "الاسم الكامل",
    "setup.fullName.hint": "يظهر للطلاب في صفحات الامتحان.",
    "setup.subjects.title": "المواد",
    "setup.subjects.main": "المادة الأساسية",
    "setup.subjects.placeholder": "اختر مادتك الأساسية",
    "setup.subjects.custom": "آخر",
    "setup.subjects.customLabel": "اسم المادة",
    "setup.subjects.additional": "مواد إضافية (اختياري)",
    "setup.subjects.addPlaceholder": "أضف مادة…",
    "setup.subjects.add": "أضف",
    "setup.signout": "تسجيل الخروج",
    "setup.cancel": "إلغاء",
    "setup.submit": "إكمال الإعداد",

    "dash.welcome.sub": "هذا ما يحدث في امتحاناتك.",
    "dash.recentExams": "أحدث الامتحانات",
    "dash.activity": "النشاط الأخير",

    "stat.totalExams": "إجمالي الامتحانات",
    "stat.activeExams": "الامتحانات النشطة",
    "stat.submitted": "طلاب سلّموا",
    "stat.waiting": "بانتظار التصحيح",

    "action.viewAll": "عرض الكل",
    "action.createExam": "إنشاء امتحان",
    "action.newExam": "امتحان جديد",
    "action.prev": "السابق",
    "action.next": "التالي",
    "action.cancel": "إلغاء",
    "action.preview": "معاينة",
    "action.publish": "نشر",
    "action.publishExam": "نشر الامتحان",
    "action.addQuestion": "إضافة سؤال",
    "action.addForm": "إضافة نموذج",
    "action.submit": "تسليم",
    "action.submitExam": "تسليم الامتحان",
    "action.goHome": "الرئيسية",
    "action.editProfile": "تعديل",
    "action.deleteAccount": "حذف الحساب",
    "action.newQuestion": "سؤال جديد",

    "status.draft": "مسودة",
    "status.scheduled": "مجدول",
    "status.active": "نشط",
    "status.grading": "قيد التصحيح",
    "status.completed": "مكتمل",

    "filter.allStatus": "كل الحالات",
    "sort.newest": "الأحدث",
    "sort.oldest": "الأقدم",
    "sort.updated": "آخر تحديث",
    "sort.submissions": "الأكثر تسليمًا",

    "empty.exams.title": "لا توجد امتحانات بعد",
    "empty.exams.text": "أنشئ أول امتحان للبدء.",
    "empty.bank.title": "لا توجد أسئلة محفوظة",
    "empty.bank.text": "احفظ أسئلة من امتحاناتك لإعادة استخدامها لاحقًا.",
    "packages.title": "الباقات",
    "packages.text": "تحت التطوير. الخطط والأسعار ستكون متاحة قريبًا.",

    "builder.newExam": "امتحان جديد",
    "builder.step.info": "البيانات",
    "builder.step.questions": "الأسئلة",
    "builder.step.forms": "النماذج",
    "builder.step.settings": "الإعدادات",
    "builder.info.title": "بيانات الامتحان",
    "builder.info.name": "اسم الامتحان",
    "builder.info.subject": "المادة",
    "builder.info.selectSubject": "اختر المادة",
    "builder.info.grade": "الصف",
    "builder.info.selectGrade": "اختر الصف",
    "builder.info.custom": "مخصص",
    "builder.info.customSubject": "آخر",
    "builder.info.customGrade": "مخصص",
    "builder.questions.title": "الأسئلة",
    "builder.questions.total": "الدرجة الكلية:",
    "builder.forms.title": "نماذج الامتحان",
    "builder.forms.hint": "يحصل الطالب على نموذج عشوائي عند بدء الامتحان.",
    "builder.settings.title": "إعدادات الامتحان",
    "builder.settings.startAt": "يبدأ في",
    "builder.settings.endAt": "ينتهي في",
    "builder.settings.duration": "المدة (دقائق)",
    "builder.settings.attempts": "المحاولات المسموحة",
    "builder.settings.attemptsHint": "محاولة واحدة لكل طالب.",
    "builder.settings.shuffle": "خلط ترتيب الأسئلة لكل طالب",
    "builder.settings.accessCode": "طلب كود دخول",
    "builder.settings.accessCodeValue": "كود الدخول",
    "builder.settings.fullscreen": "طلب ملء الشاشة خلال الامتحان",
    "builder.settings.showResult": "إظهار الدرجة بعد التصحيح",
    "builder.settings.showCorrect": "إظهار الإجابات الصحيحة بعد النشر",

    "exam.loading": "جارٍ تحميل الامتحان…",
    "exam.connected": "متصل",
    "exam.navigator": "الأسئلة",
    "exam.legend.answered": "تمت الإجابة",
    "exam.legend.unanswered": "بدون إجابة",
    "exam.legend.current": "الحالي",
    "exam.offline": "فقد الاتصال. إجاباتك محفوظة محليًا وستتم المزامنة عند عودة الاتصال.",
    "exam.entry.studentName": "اسمك الكامل",
    "exam.entry.accessCode": "كود الدخول",
    "exam.entry.start": "تأكيد وبدء",
    "exam.entry.foot": "تأكد من صحة اسمك. سيتم تسليم امتحانك بهذا الاسم.",
    "exam.resume.title": "استئناف الامتحان؟",
    "exam.resume.text": "لديك امتحان جارٍ. تم حفظ إجاباتك والوقت المتبقي.",
    "exam.resume.continue": "استئناف",
    "exam.confirm.title": "تسليم الامتحان؟",
    "exam.confirm.text": "هل أنت متأكد؟ لا يمكنك التعديل بعد التسليم.",
    "exam.update.title": "تم تحديث الامتحان",
    "exam.update.text": "قام المعلم بتحديث الامتحان. حدّث الصفحة لتحميل النسخة الأحدث. إجاباتك ستبقى.",
    "exam.update.refresh": "تحديث الامتحان",

    "result.loading": "جارٍ تحميل النتيجة…",
    "result.waiting": "بانتظار التصحيح.",
    "result.feedback": "ملاحظات المعلم",
    "result.review": "مراجعة الإجابات",
    "result.reviewSub": "شاهد إجاباتك بجانب الإجابات الصحيحة.",

    "settings.appearance": "المظهر",
    "settings.light": "الوضع الفاتح",
    "settings.dark": "الوضع الداكن",
    "settings.auto": "افتراضي النظام",
    "settings.language": "اللغة",
    "profile.subjects": "المواد",
    "profile.danger": "منطقة الخطر",
    "profile.dangerText": "حذف الحساب يمسح كل امتحاناتك وطلابك ونتائجك نهائيًا."
  }
};

const LANG_KEY = "qeyasquiz.lang";
const THEME_KEY = "qeyasquiz.theme";

let currentLang = localStorage.getItem(LANG_KEY) || "en";
let currentTheme = localStorage.getItem(THEME_KEY) || "light";

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
}

function applyI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const attr = el.dataset.i18nAttr;
    const key = el.dataset.i18n;
    if (key) el.setAttribute(attr, t(key));
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  applyI18n();
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === lang);
  });
}

function setTheme(theme) {
  if (theme === "auto") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  currentTheme = theme;
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.dataset.theme = theme;
}

function toggleTheme() {
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

/* ============================================================
   UTILS
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  });
  children.forEach((c) => {
    if (c === null || c === undefined) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

function svgIcon(id, size = 18) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#i-${id}`);
  svg.appendChild(use);
  return svg;
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function uid(len = 12) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  for (let i = 0; i < len; i++) s += chars[arr[i] % chars.length];
  return s;
}

function fmtDate(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString(currentLang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function fmtRelative(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return currentLang === "ar" ? "الآن" : "just now";
  if (min < 60) return currentLang === "ar" ? `قبل ${min} دقيقة` : `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return currentLang === "ar" ? `قبل ${h} ساعة` : `${h}h ago`;
  const days = Math.floor(h / 24);
  return currentLang === "ar" ? `قبل ${days} يوم` : `${days}d ago`;
}

function normalizeUsername(u) {
  return String(u || "").trim().toLowerCase();
}

function validUsername(u) {
  return /^[a-zA-Z0-9_]{3,24}$/.test(u);
}

function toast(message, type = "info", timeout = 4000) {
  const stack = $("[data-toast-stack]");
  if (!stack) return;
  const iconMap = { success: "check-circle", error: "alert", warning: "alert", info: "info" };
  const node = el("div", { class: `toast toast-${type}`, role: "status" }, [
    (() => { const s = svgIcon(iconMap[type] || "info", 20); s.classList.add("toast-icon"); return s; })(),
    el("div", { class: "toast-body", text: message }),
    el("button", { class: "toast-close", type: "button", "aria-label": "Close", onclick: () => close() }, [svgIcon("x", 14)])
  ]);
  const close = () => {
    node.classList.add("is-out");
    setTimeout(() => node.remove(), 220);
  };
  node.querySelector(".toast-close").addEventListener("click", close);
  stack.appendChild(node);
  if (timeout) setTimeout(close, timeout);
}

function modal({ title, body, actions = [], onClose, className = "" }) {
  const host = $("[data-modal-host]") || document.body;
  const overlay = el("div", { class: "modal-overlay" });
  const box = el("div", { class: `modal ${className}`, role: "dialog", "aria-modal": "true" });
  const close = () => { overlay.remove(); onClose && onClose(); };
  if (title) box.appendChild(el("h2", { class: "modal-title", text: title }));
  if (body) {
    if (typeof body === "string") box.appendChild(el("p", { class: "modal-body mt-3", text: body }));
    else box.appendChild(body);
  }
  if (actions.length) {
    const foot = el("div", { class: "modal-foot" });
    actions.forEach((a) => {
      const b = el("button", {
        type: "button",
        class: `btn ${a.class || "btn-ghost"}`,
        text: a.label,
        onclick: async () => {
          if (a.onClick) {
            const res = await a.onClick();
            if (res === false) return;
          }
          if (a.keepOpen !== true) close();
        }
      });
      foot.appendChild(b);
    });
    box.appendChild(foot);
  }
  overlay.appendChild(box);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
  });
  host.appendChild(overlay);
  return { close, box };
}

function confirmDialog(message, { title = "Confirm", confirmLabel = "Confirm", danger = false } = {}) {
  return new Promise((resolve) => {
    modal({
      title,
      body: message,
      actions: [
        { label: t("action.cancel"), class: "btn-ghost", onClick: () => resolve(false) },
        { label: confirmLabel, class: danger ? "btn-danger" : "btn-primary", onClick: () => resolve(true) }
      ],
      onClose: () => resolve(false)
    });
  });
}

/* ============================================================
   ROUTER
   ============================================================ */
const ROUTES = {
  "/": "landing",
  "/login": "login",
  "/setup": "setup",
  "/app/dashboard": "app:dashboard",
  "/app/exams": "app:exams",
  "/app/builder": "app:builder",
  "/app/exam": "app:exam-details",
  "/app/grading": "app:grading",
  "/app/bank": "app:bank",
  "/app/profile": "app:profile",
  "/app/settings": "app:settings",
  "/app/packages": "app:packages",
  "/exam": "exam",
  "/result": "result"
};

let currentRoute = null;
const routeHandlers = {};

function onRoute(name, handler) {
  routeHandlers[name] = handler;
}

function navigate(path) {
  if (location.hash === "#" + path) { handleRoute(); return; }
  location.hash = "#" + path;
}

function handleRoute() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, qs] = raw.split("?");
  const params = new URLSearchParams(qs || "");
  const target = ROUTES[path] || "landing";

  // Hide all pages
  $$("[data-page]").forEach((p) => { p.hidden = true; });

  // Reset any view state
  if (target.startsWith("app:")) {
    const page = $('[data-page="app"]');
    page.hidden = false;
    const view = target.split(":")[1];
    $$("[data-view]").forEach((v) => { v.hidden = true; v.classList.remove("is-active"); });
    const viewEl = $(`[data-view="${view}"]`);
    if (viewEl) { viewEl.hidden = false; viewEl.classList.add("is-active"); }
    $$(".side-link").forEach((l) => l.classList.toggle("is-active", l.dataset.route === view));
    const titleMap = {
      dashboard: t("nav.dashboard"),
      exams: t("nav.exams"),
      builder: t("builder.newExam"),
      "exam-details": "Exam",
      grading: "Grading",
      bank: t("nav.bank"),
      profile: t("nav.profile"),
      settings: t("nav.settings"),
      packages: t("nav.packages")
    };
    const titleEl = $("[data-page-title]");
    if (titleEl) titleEl.textContent = titleMap[view] || "";
  } else {
    const page = $(`[data-page="${target}"]`);
    if (page) page.hidden = false;
  }

  currentRoute = target;
  const handler = routeHandlers[target];
  if (handler) Promise.resolve(handler(params)).catch((err) => {
    console.error("[route]", err);
    toast(currentLang === "ar" ? "حدث خطأ في تحميل الصفحة." : "Failed to load page.", "error");
  });

  window.scrollTo(0, 0);
}

/* ============================================================
   AUTH
   ============================================================ */
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

let currentUser = null;
let currentProfile = null;

async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") {
      throw new Error(currentLang === "ar" ? "تم إلغاء تسجيل الدخول." : "Sign in was cancelled.");
    }
    throw new Error(currentLang === "ar" ? "تعذّر تسجيل الدخول. حاول مرة أخرى." : "Could not sign in. Please try again.");
  }
}

async function signOutUser() {
  await fbSignOut(auth);
  currentUser = null;
  currentProfile = null;
  navigate("/login");
}

async function loadProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { uid, ...snap.data() } : null;
}

async function checkUsernameAvailability(username) {
  const normalized = normalizeUsername(username);
  const snap = await getDoc(doc(db, "usernames", normalized));
  return !snap.exists();
}

async function claimUsername(uid, username, profileData) {
  const normalized = normalizeUsername(username);
  const userRef = doc(db, "users", uid);
  const unameRef = doc(db, "usernames", normalized);

  await runTransaction(db, async (tx) => {
    const unameSnap = await tx.get(unameRef);
    if (unameSnap.exists()) {
      const owner = unameSnap.data().uid;
      if (owner !== uid) throw new Error("USERNAME_TAKEN");
    }
    tx.set(unameRef, { uid, createdAt: serverTimestamp() });
    tx.set(userRef, {
      uid,
      username,
      normalizedUsername: normalized,
      fullName: profileData.fullName,
      photoURL: profileData.photoURL || "",
      mainSubject: profileData.mainSubject,
      customMainSubject: profileData.customMainSubject || "",
      additionalSubjects: profileData.additionalSubjects || [],
      role: "teacher",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
  });
}

async function uploadProfileImage(uid, file) {
  if (!file) return "";
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("INVALID_TYPE");
  if (file.size > 2 * 1024 * 1024) throw new Error("TOO_LARGE");
  const path = `avatars/${uid}/${Date.now()}_${file.name}`;
  const sref = storageRef(storage, path);
  await uploadBytes(sref, file, { contentType: file.type });
  return await getDownloadURL(sref);
}

/* ============================================================
   AUTH STATE
   ============================================================ */
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (!user) {
    currentProfile = null;
    if (!["landing", "login", "exam", "result"].includes(currentRoute)) {
      navigate("/login");
    }
    return;
  }
  try {
    currentProfile = await loadProfile(user.uid);
  } catch { currentProfile = null; }

  const hasProfile = currentProfile && currentProfile.username;

  if (!hasProfile && currentRoute !== "setup" && currentRoute !== "exam" && currentRoute !== "result" && currentRoute !== "landing") {
    navigate("/setup");
    return;
  }

  if (hasProfile && currentRoute === "setup") {
    navigate("/app/dashboard");
    return;
  }

  if (hasProfile && currentRoute === "login") {
    navigate("/app/dashboard");
    return;
  }

  if (currentUser) {
    $$("[data-user-name]").forEach((e) => (e.textContent = currentProfile?.fullName || currentUser.displayName || ""));
    $$("[data-user-handle]").forEach((e) => (e.textContent = "@" + (currentProfile?.username || "")));
    $$("[data-user-avatar]").forEach((e) => (e.src = currentProfile?.photoURL || currentUser.photoURL || ""));
  }

  if (currentRoute && routeHandlers[currentRoute]) {
    const handler = routeHandlers[currentRoute];
    Promise.resolve(handler(new URLSearchParams())).catch(() => {});
  }
});

/* ============================================================
   PAGE: LANDING
   ============================================================ */
function initLanding() {
  document.querySelectorAll("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear()));

  // Smooth scroll for anchors
  $$('a[href^="#"]:not([href^="#/"])').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1 && $(id)) {
        e.preventDefault();
        $(id).scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* ============================================================
   PAGE: LOGIN
   ============================================================ */
function initLogin() {
  const btn = $("[data-google-signin]");
  const status = $("[data-auth-status]");
  const errBox = $("[data-auth-error]");
  const errText = $("[data-auth-error-text]");

  btn?.addEventListener("click", async () => {
    errBox.hidden = true;
    status.hidden = false;
    btn.classList.add("is-loading");
    try {
      await signInWithGoogle();
      // onAuthStateChanged will route
    } catch (err) {
      status.hidden = true;
      btn.classList.remove("is-loading");
      errBox.hidden = false;
      errText.textContent = err.message;
    }
  });
}

/* ============================================================
   PAGE: SETUP
   ============================================================ */
let setupState = {
  photoFile: null,
  customMain: "",
  additionalSubjects: []
};

function initSetup() {
  const form = $("[data-setup-form]");
  const usernameInput = $("[data-username-input]");
  const usernameStatus = $("[data-username-status]");
  const usernameError = $("[data-username-error]");
  const fullNameInput = $("[data-fullname-input]");
  const fullNameError = $("[data-fullname-error]");
  const mainSubjectSelect = $("[data-main-subject]");
  const customSubjectField = $("[data-custom-subject-field]");
  const customSubjectInput = $("[data-custom-subject]");
  const avatarPreview = $("[data-avatar-preview]");
  const avatarInput = $("[data-avatar-input]");
  const avatarPick = $("[data-avatar-pick]");
  const avatarReset = $("[data-avatar-reset]");
  const additionalPicker = $("[data-additional-subject-picker]");
  const addSubjectBtn = $("[data-add-subject]");
  const chips = $("[data-chips]");

  if (!form) return;

  // Prefill from Google
  if (currentUser) {
    if (currentUser.displayName) fullNameInput.value = currentUser.displayName;
    if (currentUser.photoURL) avatarPreview.src = currentUser.photoURL;
    const base = (currentUser.email || "").split("@")[0].replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20);
    if (base.length >= 3) usernameInput.value = base;
  }

  // Username check
  const checkUname = debounce(async () => {
    const val = usernameInput.value.trim();
    usernameError.hidden = true;
    usernameStatus.textContent = "";
    usernameStatus.className = "input-status";
    if (!val) return;
    if (!validUsername(val)) {
      usernameStatus.textContent = "";
      usernameError.hidden = false;
      usernameError.textContent = "3–24 characters. Letters, numbers, and underscore only.";
      return;
    }
    usernameStatus.textContent = "Checking…";
    usernameStatus.classList.add("is-checking");
    try {
      const available = await checkUsernameAvailability(val);
      usernameStatus.classList.remove("is-checking");
      if (available) {
        usernameStatus.textContent = currentLang === "ar" ? "متاح" : "Available";
        usernameStatus.classList.add("is-available");
      } else {
        usernameStatus.textContent = currentLang === "ar" ? "مأخوذ" : "Taken";
        usernameStatus.classList.add("is-taken");
      }
    } catch {
      usernameStatus.textContent = "";
    }
  }, 400);

  usernameInput?.addEventListener("input", checkUname);

  // Avatar
  avatarPick?.addEventListener("click", () => avatarInput.click());
  avatarInput?.addEventListener("change", () => {
    const f = avatarInput.files?.[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) { toast("Max 2 MB", "warning"); return; }
    setupState.photoFile = f;
    avatarPreview.src = URL.createObjectURL(f);
  });
  avatarReset?.addEventListener("click", () => {
    setupState.photoFile = null;
    avatarPreview.src = currentUser?.photoURL || "";
    if (avatarInput) avatarInput.value = "";
  });

  // Custom subject
  mainSubjectSelect?.addEventListener("change", () => {
    if (mainSubjectSelect.value === "custom") {
      customSubjectField.hidden = false;
      customSubjectInput.focus();
    } else {
      customSubjectField.hidden = true;
    }
  });

  // Additional subjects chips
  function renderChips() {
    if (!chips) return;
    chips.innerHTML = "";
    setupState.additionalSubjects.forEach((s, idx) => {
      const chip = el("span", { class: "chip" }, [
        document.createTextNode(s),
        el("button", {
          type: "button",
          class: "chip-remove",
          "aria-label": "Remove",
          onclick: () => { setupState.additionalSubjects.splice(idx, 1); renderChips(); }
        }, [svgIcon("x", 10)])
      ]);
      chips.appendChild(chip);
    });
  }

  addSubjectBtn?.addEventListener("click", () => {
    const v = additionalPicker?.value;
    if (!v || v === "custom") return;
    if (setupState.additionalSubjects.includes(v)) return;
    if (v === mainSubjectSelect.value) return;
    setupState.additionalSubjects.push(v);
    renderChips();
    additionalPicker.value = "";
  });

  // Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;

    const uname = usernameInput.value.trim();
    if (!validUsername(uname)) {
      usernameError.hidden = false;
      usernameError.textContent = "3–24 characters. Letters, numbers, and underscore only.";
      ok = false;
    }

    const fullName = fullNameInput.value.trim();
    if (fullName.length < 3) {
      fullNameError.hidden = false;
      fullNameError.textContent = "Please enter your full name.";
      ok = false;
    } else {
      fullNameError.hidden = true;
    }

    const mainSub = mainSubjectSelect.value;
    if (!mainSub) {
      toast(currentLang === "ar" ? "اختر مادة أساسية." : "Select a main subject.", "warning");
      ok = false;
    }

    if (!ok) return;

    const submitBtn = $("[data-submit]");
    submitBtn.classList.add("is-loading");
    try {
      let photoURL = currentUser?.photoURL || "";
      if (setupState.photoFile) {
        photoURL = await uploadProfileImage(currentUser.uid, setupState.photoFile);
      }
      const customMain = mainSub === "custom" ? customSubjectInput.value.trim() : "";
      if (mainSub === "custom" && !customMain) {
        toast("Enter subject name", "warning");
        submitBtn.classList.remove("is-loading");
        return;
      }
      await claimUsername(currentUser.uid, uname, {
        fullName,
        photoURL,
        mainSubject: mainSub,
        customMainSubject: customMain,
        additionalSubjects: setupState.additionalSubjects
      });
      currentProfile = await loadProfile(currentUser.uid);
      toast("Profile saved", "success");
      navigate("/app/dashboard");
    } catch (err) {
      submitBtn.classList.remove("is-loading");
      if (err.message === "USERNAME_TAKEN") {
        usernameError.hidden = false;
        usernameError.textContent = "Username already taken.";
        usernameStatus.textContent = currentLang === "ar" ? "مأخوذ" : "Taken";
        usernameStatus.className = "input-status is-taken";
      } else {
        toast(currentLang === "ar" ? "تعذّر حفظ البيانات." : "Could not save profile.", "error");
      }
    }
  });
}

/* ============================================================
   APP SHELL
   ============================================================ */
function initAppShell() {
  const loading = $("[data-app-loading]");
  const shell = $("[data-app-shell]");
  const sidebar = $("[data-sidebar]");
  const scrim = $("[data-sidebar-scrim]");
  const toggle = $("[data-sidebar-toggle]");

  const openSidebar = () => { sidebar.classList.add("is-open"); scrim.classList.add("is-open"); };
  const closeSidebar = () => { sidebar.classList.remove("is-open"); scrim.classList.remove("is-open"); };

  toggle?.addEventListener("click", openSidebar);
  scrim?.addEventListener("click", closeSidebar);
  $$(".side-link").forEach((l) => l.addEventListener("click", closeSidebar));

  setTimeout(() => {
    if (loading) loading.hidden = true;
    if (shell) shell.hidden = false;
  }, 300);
}

/* ============================================================
   FIRESTORE HELPERS
   ============================================================ */
function userExamsQuery(uid, limitN = 100) {
  return query(collection(db, "exams"), where("ownerId", "==", uid), orderBy("updatedAt", "desc"), limit(limitN));
}

async function listExams(uid, limitN = 100) {
  try {
    const snap = await getDocs(userExamsQuery(uid, limitN));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch { return []; }
}

async function getExam(examId) {
  const snap = await getDoc(doc(db, "exams", examId));
  return snap.exists() ? { id: examId, ...snap.data() } : null;
}

async function listAttempts(examId) {
  try {
    const snap = await getDocs(query(collection(db, "attempts"), where("examId", "==", examId)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch { return []; }
}

function computeStatus(exam) {
  if (!exam) return "draft";
  if (exam.status === "draft") return "draft";
  const now = Date.now();
  const start = exam.startAt?.toMillis ? exam.startAt.toMillis() : null;
  const end = exam.endAt?.toMillis ? exam.endAt.toMillis() : null;
  if (end && now > end) return "completed";
  if (start && now < start) return "scheduled";
  if (start && end && now >= start && now <= end) return "active";
  return exam.status || "draft";
}

/* ============================================================
   PAGE: DASHBOARD
   ============================================================ */
async function renderDashboard() {
  if (!currentProfile) return;

  const welcomeTitle = $("[data-welcome-title]");
  if (welcomeTitle) {
    const hour = new Date().getHours();
    const greeting = hour < 12
      ? (currentLang === "ar" ? "صباح الخير" : "Good morning")
      : (hour < 18 ? (currentLang === "ar" ? "مساء الخير" : "Good afternoon") : (currentLang === "ar" ? "مساء الخير" : "Good evening"));
    welcomeTitle.textContent = `${greeting}, ${currentProfile.fullName?.split(" ")[0] || ""}`;
  }

  const exams = await listExams(currentProfile.uid);

  const stats = {
    totalExams: exams.length,
    activeExams: exams.filter((e) => computeStatus(e) === "active").length,
    submittedStudents: 0,
    waitingGrading: 0
  };

  // Aggregate submitted
  try {
    for (const exam of exams.slice(0, 20)) {
      const atts = await listAttempts(exam.id);
      stats.submittedStudents += atts.filter((a) => a.status === "submitted" || a.status === "graded").length;
      stats.waitingGrading += atts.filter((a) => a.status === "submitted" && !a.gradedAt).length;
    }
  } catch {}

  $$("[data-stat]").forEach((e) => {
    const k = e.dataset.stat;
    e.textContent = String(stats[k] ?? 0);
  });

  // Recent exams
  const recentHost = $("[data-recent-exams]");
  if (recentHost) {
    recentHost.innerHTML = "";
    if (!exams.length) {
      recentHost.appendChild(el("div", { class: "empty" }, [
        el("h3", { text: t("empty.exams.title") }),
        el("p", { text: t("empty.exams.text") })
      ]));
    } else {
      exams.slice(0, 6).forEach((exam) => recentHost.appendChild(buildExamCard(exam)));
    }
  }

  // Activity
  const activityHost = $("[data-activity-list]");
  if (activityHost) {
    activityHost.innerHTML = "";
    const activities = exams.slice(0, 5).map((e) => ({
      icon: "clipboard",
      text: `${e.title || "Untitled"} — ${t("status." + computeStatus(e))}`,
      time: e.updatedAt || e.createdAt
    }));
    if (!activities.length) {
      activityHost.appendChild(el("div", { class: "empty" }, [el("p", { text: currentLang === "ar" ? "لا يوجد نشاط بعد." : "No activity yet." })]));
    } else {
      activities.forEach((a) => {
        activityHost.appendChild(el("div", { class: "activity-item" }, [
          el("div", { class: "activity-icon" }, [svgIcon(a.icon, 16)]),
          el("div", { class: "activity-body" }, [
            el("div", { class: "activity-text", text: a.text }),
            el("div", { class: "activity-time", text: fmtRelative(a.time) })
          ])
        ]));
      });
    }
  }
}

function buildExamCard(exam) {
  const status = computeStatus(exam);
  const card = el("article", { class: "card-brutal exam-card is-clickable tint-1" });

  const head = el("div", { class: "exam-card-head" }, [
    el("div", {}, [
      el("div", { class: "exam-card-title", text: exam.title || "Untitled" }),
      el("div", { class: "exam-card-sub", text: `${exam.subject || "—"} · ${exam.grade || "—"}` })
    ]),
    el("span", { class: `badge-brutal is-${status}`, text: t("status." + status) })
  ]);
  card.appendChild(head);

  const meta = el("div", { class: "exam-card-meta" });
  const formsCount = exam.forms?.length || 1;
  meta.appendChild(el("span", {}, [svgIcon("file-text", 14), document.createTextNode(`${exam.totalQuestions || 0} Q`)]));
  meta.appendChild(el("span", {}, [svgIcon("layers", 14), document.createTextNode(`${formsCount} forms`)]));
  meta.appendChild(el("span", {}, [svgIcon("timer", 14), document.createTextNode(`${exam.duration || 0} min`)]));
  card.appendChild(meta);

  const foot = el("div", { class: "exam-card-foot" }, [
    el("button", { class: "btn btn-primary btn-sm", type: "button", text: "Open" })
  ]);
  foot.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(`/app/exam?id=${exam.id}`);
  });
  card.appendChild(foot);

  card.addEventListener("click", () => navigate(`/app/exam?id=${exam.id}`));
  return card;
}

/* ============================================================
   PAGE: MY EXAMS
   ============================================================ */
let examsState = { all: [], filtered: [], status: "", sort: "newest", search: "", page: 1, pageSize: 12 };

async function renderMyExams() {
  const list = $("[data-exams-list]");
  const empty = $("[data-exams-empty]");
  const pag = $("[data-exams-pagination]");

  list.innerHTML = "";
  for (let i = 0; i < 3; i++) list.appendChild(el("div", { class: "sk-card" }, [
    el("div", { class: "skeleton sk-line sk-lg" }),
    el("div", { class: "skeleton sk-line sk-sm" }),
    el("div", { class: "skeleton sk-line" })
  ]));

  examsState.all = await listExams(currentProfile.uid);
  applyExamFilters();
}

function applyExamFilters() {
  const list = $("[data-exams-list]");
  const empty = $("[data-exams-empty]");
  const pag = $("[data-exams-pagination]");

  let arr = examsState.all.slice();

  if (examsState.status) arr = arr.filter((e) => computeStatus(e) === examsState.status);
  if (examsState.search) {
    const q = examsState.search.toLowerCase();
    arr = arr.filter((e) => (e.title || "").toLowerCase().includes(q) || (e.subject || "").toLowerCase().includes(q));
  }

  switch (examsState.sort) {
    case "oldest": arr.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)); break;
    case "updated": arr.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0)); break;
    case "submissions": arr.sort((a, b) => (b.submissionCount || 0) - (a.submissionCount || 0)); break;
    default: arr.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  }

  examsState.filtered = arr;
  const start = (examsState.page - 1) * examsState.pageSize;
  const pageItems = arr.slice(start, start + examsState.pageSize);

  list.innerHTML = "";
  if (!pageItems.length) {
    empty.hidden = false;
    pag.hidden = true;
    return;
  }
  empty.hidden = true;
  pageItems.forEach((exam) => list.appendChild(buildExamCard(exam)));

  const totalPages = Math.max(1, Math.ceil(arr.length / examsState.pageSize));
  if (totalPages > 1) {
    pag.hidden = false;
    const info = $("[data-page-info]");
    if (info) info.textContent = `${examsState.page} / ${totalPages}`;
  } else {
    pag.hidden = true;
  }
}

function initMyExamsFilters() {
  const search = $("[data-exam-search]");
  const statusSel = $("[data-exam-filter-status]");
  const sortSel = $("[data-exam-sort]");
  const prev = $("[data-page-prev]");
  const next = $("[data-page-next]");

  search?.addEventListener("input", debounce(() => {
    examsState.search = search.value.trim();
    examsState.page = 1;
    applyExamFilters();
  }, 250));

  statusSel?.addEventListener("change", () => {
    examsState.status = statusSel.value;
    examsState.page = 1;
    applyExamFilters();
  });

  sortSel?.addEventListener("change", () => {
    examsState.sort = sortSel.value;
    applyExamFilters();
  });

  prev?.addEventListener("click", () => { if (examsState.page > 1) { examsState.page--; applyExamFilters(); } });
  next?.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(examsState.filtered.length / examsState.pageSize));
    if (examsState.page < totalPages) { examsState.page++; applyExamFilters(); }
  });
}

/* ============================================================
   EXAM BUILDER
   ============================================================ */
let builderState = {
  examId: null,
  data: {
    title: "",
    subject: "",
    customSubject: "",
    grade: "",
    duration: 60,
    startAt: null,
    endAt: null,
    shuffleQuestions: false,
    requireAccessCode: false,
    accessCode: "",
    requireFullscreen: false,
    showResultImmediately: true,
    showCorrectAnswers: true,
    questions: [],
    forms: [{ id: "A", name: "Form A", questionIds: [] }]
  },
  currentForm: "A",
  currentStep: "info",
  dirty: false
};

async function renderBuilder(params) {
  const examId = params?.get("id");
  if (examId) {
    const exam = await getExam(examId);
    if (exam) {
      builderState.examId = examId;
      builderState.data = {
        ...builderState.data,
        ...exam
      };
      if (!builderState.data.questions) builderState.data.questions = [];
      if (!builderState.data.forms?.length) builderState.data.forms = [{ id: "A", name: "Form A", questionIds: [] }];
    }
  } else {
    builderState.examId = null;
  }
  renderBuilderUI();
}

function renderBuilderUI() {
  const d = builderState.data;

  const titleInput = $('[data-field="title"]');
  if (titleInput) titleInput.value = d.title || "";
  const subjSel = $('[data-field="subject"]');
  if (subjSel) subjSel.value = d.subject || "";
  const gradeSel = $('[data-field="grade"]');
  if (gradeSel) gradeSel.value = d.grade || "";

  const customSubj = $('[data-field="customSubject"]');
  if (customSubj) {
    customSubj.hidden = d.subject !== "custom";
    customSubj.value = d.customSubject || "";
  }

  const duration = $('[data-field="duration"]');
  if (duration) duration.value = d.duration || 60;
  const start = $('[data-field="startAt"]');
  if (start) start.value = d.startAt?.toDate ? toLocalInput(d.startAt.toDate()) : (d.startAt || "");
  const end = $('[data-field="endAt"]');
  if (end) end.value = d.endAt?.toDate ? toLocalInput(d.endAt.toDate()) : (d.endAt || "");

  const shuffle = $('[data-field="shuffleQuestions"]');
  if (shuffle) shuffle.checked = !!d.shuffleQuestions;
  const acc = $('[data-field="requireAccessCode"]');
  if (acc) acc.checked = !!d.requireAccessCode;
  const accField = $("[data-access-code-field]");
  if (accField) accField.hidden = !d.requireAccessCode;
  const accInput = $('[data-field="accessCode"]');
  if (accInput) accInput.value = d.accessCode || "";
  const fs = $('[data-field="requireFullscreen"]');
  if (fs) fs.checked = !!d.requireFullscreen;
  const sri = $('[data-field="showResultImmediately"]');
  if (sri) sri.checked = d.showResultImmediately !== false;
  const sca = $('[data-field="showCorrectAnswers"]');
  if (sca) sca.checked = d.showCorrectAnswers !== false;

  renderQuestionsList();
  renderFormsTabs();
  updateTotalScore();
  switchBuilderStep(builderState.currentStep);
}

function toLocalInput(date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

function fromLocalInput(v) {
  if (!v) return null;
  return Timestamp.fromDate(new Date(v));
}

function switchBuilderStep(step) {
  builderState.currentStep = step;
  $$(".builder-step").forEach((b) => b.classList.toggle("is-active", b.dataset.step === step));
  $$(".builder-panel").forEach((p) => { p.hidden = p.dataset.panel !== step; });
}

function updateTotalScore() {
  const total = builderState.data.questions.reduce((sum, q) => sum + (Number(q.score) || 0), 0);
  const el = $("[data-total-score]");
  if (el) el.textContent = String(total);
}

/* Questions */
function renderQuestionsList() {
  const host = $("[data-questions-list]");
  if (!host) return;
  host.innerHTML = "";
  const list = builderState.data.questions;
  if (!list.length) {
    host.appendChild(el("div", { class: "empty", style: "padding:var(--sp-8)" }, [
      el("p", { class: "text-muted", text: currentLang === "ar" ? "لا توجد أسئلة بعد. اضغط 'إضافة سؤال' للبدء." : "No questions yet. Click 'Add Question' to start." })
    ]));
    return;
  }
  list.forEach((q, idx) => host.appendChild(buildQuestionCard(q, idx)));
}

function buildQuestionCard(q, idx) {
  const card = el("div", { class: "question-card", "data-qid": q.id });

  const head = el("div", { class: "question-card-head" }, [
    el("div", { class: "question-card-num" }, [
      el("span", { text: String(idx + 1) }),
      el("span", { class: "question-type-badge", text: qTypeLabel(q.type) })
    ]),
    el("div", { class: "question-card-actions" }, [
      el("button", { class: "icon-btn", type: "button", title: "Duplicate", onclick: () => duplicateQuestion(q.id) }, [svgIcon("duplicate", 16)]),
      el("button", { class: "icon-btn", type: "button", title: "Delete", onclick: () => deleteQuestion(q.id) }, [svgIcon("trash", 16)])
    ])
  ]);
  card.appendChild(head);

  const body = el("div", { class: "question-body" });

  const qText = el("textarea", { class: "textarea", placeholder: currentLang === "ar" ? "نص السؤال…" : "Question text…", maxlength: "1000" });
  qText.value = q.text || "";
  qText.addEventListener("input", () => { q.text = qText.value; markDirty(); });
  body.appendChild(qText);

  if (["mcq", "mcq_just", "tf", "tf_just"].includes(q.type)) {
    const opts = el("div", { class: "question-options" });
    (q.options || []).forEach((opt, i) => {
      const row = el("div", { class: "option-row" });
      const radio = el("input", { type: "radio", name: "correct_" + q.id });
      radio.checked = q.correctIndex === i;
      radio.addEventListener("change", () => { q.correctIndex = i; markDirty(); });
      const lbl = el("span", { class: "option-label", text: String.fromCharCode(65 + i) });
      const input = el("input", { type: "text", class: "input", value: opt || "" });
      input.addEventListener("input", () => { q.options[i] = input.value; markDirty(); });
      const del = el("button", { class: "icon-btn", type: "button", onclick: () => {
        q.options.splice(i, 1);
        if (q.correctIndex === i) q.correctIndex = 0;
        else if (q.correctIndex > i) q.correctIndex--;
        markDirty();
        renderQuestionsList();
      } }, [svgIcon("x", 14)]);
      row.appendChild(radio);
      row.appendChild(lbl);
      row.appendChild(input);
      row.appendChild(del);
      opts.appendChild(row);
    });
    if (q.options?.length < 8) {
      opts.appendChild(el("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => {
        q.options = q.options || [];
        q.options.push("");
        markDirty();
        renderQuestionsList();
      } }, [svgIcon("plus", 14), document.createTextNode("Add option")]));
    }
    body.appendChild(opts);

    if (q.type === "mcq_just" || q.type === "tf_just") {
      const justBox = el("div", { class: "q-justification" }, [
        el("div", { class: "q-justification-label" }, [
          svgIcon("check-square", 14),
          document.createTextNode(currentLang === "ar" ? "يطلب تبريرًا (تصحيح يدوي)" : "Requires justification (manual grading)")
        ])
      ]);
      body.appendChild(justBox);
    }
  }

  if (q.type === "complete") {
    const ansBox = el("div", { class: "field" }, [
      el("label", { class: "field-label", text: currentLang === "ar" ? "الإجابة الصحيحة" : "Correct answer" })
    ]);
    const inp = el("input", { type: "text", class: "input", value: q.correctText || "" });
    inp.addEventListener("input", () => { q.correctText = inp.value; markDirty(); });
    ansBox.appendChild(inp);
    body.appendChild(ansBox);
  }

  if (q.type === "essay") {
    const modelBox = el("div", { class: "field" }, [
      el("label", { class: "field-label", text: currentLang === "ar" ? "الإجابة النموذجية" : "Model answer" })
    ]);
    const ta = el("textarea", { class: "textarea", maxlength: "2000" });
    ta.value = q.modelAnswer || "";
    ta.addEventListener("input", () => { q.modelAnswer = ta.value; markDirty(); });
    modelBox.appendChild(ta);
    body.appendChild(modelBox);
  }

  const scoreField = el("div", { class: "field" }, [
    el("label", { class: "field-label", text: currentLang === "ar" ? "الدرجة" : "Score" })
  ]);
  const scoreInput = el("input", { type: "number", class: "input", min: "0.5", step: "0.5", value: q.score || 1, style: "max-width:120px" });
  scoreInput.addEventListener("input", () => { q.score = Number(scoreInput.value) || 0; markDirty(); updateTotalScore(); });
  scoreField.appendChild(scoreInput);
  body.appendChild(scoreField);

  card.appendChild(body);
  return card;
}

function qTypeLabel(type) {
  const map = {
    mcq: "MCQ",
    mcq_just: "MCQ + Justify",
    tf: "True/False",
    tf_just: "T/F + Justify",
    complete: "Complete",
    essay: "Essay"
  };
  return map[type] || type;
}

function addQuestion(type = "mcq") {
  const q = {
    id: uid(10),
    type,
    text: "",
    options: type === "mcq" || type === "mcq_just" ? ["", "", "", ""] : [],
    correctIndex: 0,
    correctText: "",
    modelAnswer: "",
    score: 1
  };
  builderState.data.questions.push(q);
  markDirty();
  renderQuestionsList();
  updateTotalScore();
}

function duplicateQuestion(qid) {
  const orig = builderState.data.questions.find((q) => q.id === qid);
  if (!orig) return;
  const copy = JSON.parse(JSON.stringify(orig));
  copy.id = uid(10);
  const idx = builderState.data.questions.findIndex((q) => q.id === qid);
  builderState.data.questions.splice(idx + 1, 0, copy);
  markDirty();
  renderQuestionsList();
  updateTotalScore();
}

function deleteQuestion(qid) {
  builderState.data.questions = builderState.data.questions.filter((q) => q.id !== qid);
  builderState.data.forms.forEach((f) => {
    f.questionIds = (f.questionIds || []).filter((id) => id !== qid);
  });
  markDirty();
  renderQuestionsList();
  updateTotalScore();
}

/* Forms */
function renderFormsTabs() {
  const host = $("[data-forms-tabs]");
  if (!host) return;
  host.innerHTML = "";
  builderState.data.forms.forEach((f) => {
    const tab = el("button", { type: "button", class: `forms-tab ${builderState.currentForm === f.id ? "is-active" : ""}` }, [
      document.createTextNode(f.name),
      builderState.data.forms.length > 1
        ? el("span", { class: "forms-tab-remove", onclick: (e) => { e.stopPropagation(); removeForm(f.id); } }, [svgIcon("x", 12)])
        : null
    ]);
    tab.addEventListener("click", () => { builderState.currentForm = f.id; renderFormsTabs(); });
    host.appendChild(tab);
  });
}

function addForm() {
  const nextChar = String.fromCharCode(65 + builderState.data.forms.length);
  builderState.data.forms.push({ id: nextChar, name: `Form ${nextChar}`, questionIds: [] });
  builderState.currentForm = nextChar;
  markDirty();
  renderFormsTabs();
}

function removeForm(fid) {
  if (builderState.data.forms.length <= 1) return;
  builderState.data.forms = builderState.data.forms.filter((f) => f.id !== fid);
  if (builderState.currentForm === fid) builderState.currentForm = builderState.data.forms[0].id;
  markDirty();
  renderFormsTabs();
}

/* Auto-save */
function markDirty() {
  builderState.dirty = true;
  const saveState = $("[data-builder-save-state]");
  if (saveState) saveState.textContent = currentLang === "ar" ? "جارٍ الحفظ…" : "Saving…";
  autosaveBuilder();
}

const autosaveBuilder = debounce(async () => {
  if (!currentProfile) return;
  const d = builderState.data;
  if (!d.title.trim()) return;
  const payload = {
    ownerId: currentProfile.uid,
    title: d.title,
    subject: d.subject === "custom" ? d.customSubject : d.subject,
    grade: d.grade,
    duration: Number(d.duration) || 60,
    startAt: d.startAt?.toDate ? Timestamp.fromDate(d.startAt.toDate()) : null,
    endAt: d.endAt?.toDate ? Timestamp.fromDate(d.endAt.toDate()) : null,
    shuffleQuestions: !!d.shuffleQuestions,
    requireAccessCode: !!d.requireAccessCode,
    accessCode: d.requireAccessCode ? (d.accessCode || "") : "",
    requireFullscreen: !!d.requireFullscreen,
    showResultImmediately: d.showResultImmediately !== false,
    showCorrectAnswers: d.showCorrectAnswers !== false,
    questions: d.questions,
    forms: d.forms,
    totalQuestions: d.questions.length,
    status: d.status || "draft",
    updatedAt: serverTimestamp()
  };

  try {
    if (builderState.examId) {
      await updateDoc(doc(db, "exams", builderState.examId), payload);
    } else {
      payload.createdAt = serverTimestamp();
      const ref = await addDoc(collection(db, "exams"), payload);
      builderState.examId = ref.id;
      history.replaceState(null, "", `#/app/builder?id=${ref.id}`);
    }
    builderState.dirty = false;
    const saveState = $("[data-builder-save-state]");
    if (saveState) saveState.textContent = currentLang === "ar" ? "تم الحفظ" : "Saved";
  } catch (err) {
    console.error(err);
    const saveState = $("[data-builder-save-state]");
    if (saveState) saveState.textContent = currentLang === "ar" ? "فشل الحفظ" : "Save failed";
  }
}, 1200);

/* Publish */
async function publishExam() {
  const d = builderState.data;
  const errors = [];
  if (!d.title.trim()) errors.push(currentLang === "ar" ? "اسم الامتحان مطلوب" : "Exam name required");
  if (!d.subject) errors.push(currentLang === "ar" ? "المادة مطلوبة" : "Subject required");
  if (!d.grade) errors.push(currentLang === "ar" ? "الصف مطلوب" : "Grade required");
  if (!d.questions.length) errors.push(currentLang === "ar" ? "يجب إضافة سؤال واحد على الأقل" : "At least one question required");

  if (errors.length) {
    modal({
      title: `${errors.length} issue${errors.length > 1 ? "s" : ""}`,
      body: el("ul", { style: "padding-left:20px;line-height:1.9" }, errors.map((e) => el("li", { text: e }))),
      actions: [{ label: "OK", class: "btn-primary" }]
    });
    return;
  }

  modal({
    title: currentLang === "ar" ? "نشر الامتحان؟" : "Publish exam?",
    body: el("div", { class: "stack-sm" }, [
      el("div", { class: "row-between" }, [el("span", { text: "Title" }), el("strong", { text: d.title })]),
      el("div", { class: "row-between" }, [el("span", { text: "Questions" }), el("strong", { text: String(d.questions.length) })]),
      el("div", { class: "row-between" }, [el("span", { text: "Duration" }), el("strong", { text: d.duration + " min" })])
    ]),
    actions: [
      { label: t("action.cancel"), class: "btn-ghost" },
      { label: t("action.publish"), class: "btn-primary", onClick: async () => {
        try {
          if (!builderState.examId) {
            await autosaveBuilder();
          }
          if (!builderState.examId) throw new Error("No exam");
          await updateDoc(doc(db, "exams", builderState.examId), {
            status: "scheduled",
            publishedAt: serverTimestamp(),
            publicId: builderState.examId
          });
          toast(currentLang === "ar" ? "تم نشر الامتحان" : "Exam published", "success");
          navigate(`/app/exam?id=${builderState.examId}`);
        } catch (err) {
          console.error(err);
          toast(currentLang === "ar" ? "فشل النشر" : "Publish failed", "error");
        }
      }}
    ]
  });
}

function initBuilder() {
  // field listeners
  document.addEventListener("input", (e) => {
    const f = e.target.dataset?.field;
    if (!f) return;
    const d = builderState.data;
    if (f === "title" || f === "subject" || f === "customSubject" || f === "accessCode") {
      d[f] = e.target.value;
    } else if (f === "duration") {
      d[f] = Number(e.target.value) || 60;
    } else if (f === "startAt" || f === "endAt") {
      d[f] = fromLocalInput(e.target.value);
    }
    if (f === "subject") {
      const customSubj = $('[data-field="customSubject"]');
      if (customSubj) customSubj.hidden = e.target.value !== "custom";
    }
    markDirty();
  });

  document.addEventListener("change", (e) => {
    const f = e.target.dataset?.field;
    if (!f) return;
    const d = builderState.data;
    if (e.target.type === "checkbox") {
      d[f] = e.target.checked;
      if (f === "requireAccessCode") {
        const accField = $("[data-access-code-field]");
        if (accField) accField.hidden = !e.target.checked;
      }
    }
    markDirty();
  });

  $$(".builder-step").forEach((btn) => {
    btn.addEventListener("click", () => switchBuilderStep(btn.dataset.step));
  });

  $("[data-add-question]")?.addEventListener("click", () => {
    modal({
      title: currentLang === "ar" ? "اختر نوع السؤال" : "Choose question type",
      body: el("div", { class: "stack-sm" }, [
        qTypeBtn("mcq", "MCQ", "Multiple choice with one correct answer"),
        qTypeBtn("mcq_just", "MCQ + Justification", "Choice + written justification (manual grading)"),
        qTypeBtn("tf", "True / False", "Single true/false statement"),
        qTypeBtn("tf_just", "True / False + Justification", "T/F with written explanation"),
        qTypeBtn("complete", "Complete", "Fill in the blank"),
        qTypeBtn("essay", "Essay", "Long-form answer (manual grading)")
      ]),
      actions: [{ label: t("action.cancel"), class: "btn-ghost" }]
    });
  });

  function qTypeBtn(type, label, hint) {
    return el("button", { type: "button", class: "card", style: "text-align:left;cursor:pointer;padding:var(--sp-4)", onclick: () => {
      addQuestion(type);
      document.querySelector(".modal-overlay")?.remove();
    } }, [
      el("div", { class: "fw-semibold", text: label }),
      el("div", { class: "text-sm text-muted mt-1", text: hint })
    ]);
  }

  $("[data-add-form]")?.addEventListener("click", addForm);
  $("[data-builder-publish]")?.addEventListener("click", publishExam);
  $("[data-builder-cancel]")?.addEventListener("click", () => navigate("/app/exams"));
  $("[data-builder-preview]")?.addEventListener("click", () => {
    if (!builderState.examId) { toast(currentLang === "ar" ? "احفظ أولاً" : "Save first", "warning"); return; }
    window.open(`#/exam?id=${builderState.examId}&preview=1`, "_blank");
  });
}

/* ============================================================
   EXAM DETAILS (Teacher)
   ============================================================ */
async function renderExamDetails(params) {
  const examId = params?.get("id");
  if (!examId) { navigate("/app/exams"); return; }
  const host = $("[data-exam-details]");
  if (!host) return;
  host.innerHTML = "";

  const exam = await getExam(examId);
  if (!exam || exam.ownerId !== currentProfile.uid) {
    host.appendChild(el("div", { class: "empty" }, [el("p", { text: "Exam not found." })]));
    return;
  }

  const attempts = await listAttempts(examId);
  const status = computeStatus(exam);

  // Head
  host.appendChild(el("div", { class: "exam-details-head" }, [
    el("div", {}, [
      el("h2", { class: "exam-details-title", text: exam.title || "Untitled" }),
      el("div", { class: "exam-details-meta", text: `${exam.subject || ""} · ${exam.grade || ""} · ${exam.questions?.length || 0} Q · ${exam.duration || 0} min` })
    ]),
    el("div", { class: "row" }, [
      el("span", { class: `badge badge-${status}`, text: t("status." + status) }),
      el("button", { class: "btn btn-outline btn-sm", type: "button", onclick: () => navigate(`/app/builder?id=${examId}`), text: "Edit" }),
      el("button", { class: "btn btn-outline btn-sm", type: "button", onclick: () => shareExam(exam), text: "Share" })
    ])
  ]));

  // Tabs
  const tabs = el("div", { class: "exam-tabs" });
  const tabNames = ["students", "questions", "grading"];
  tabNames.forEach((n) => tabs.appendChild(el("button", { class: "exam-tab", type: "button", "data-tab": n, text: n })));
  host.appendChild(tabs);

  const content = el("div", {});
  host.appendChild(content);

  function showTab(name) {
    $$(".exam-tab", tabs).forEach((b) => b.classList.toggle("is-active", b.dataset.tab === name));
    content.innerHTML = "";
    if (name === "students") renderStudentsTab(content, exam, attempts);
    if (name === "questions") renderQuestionsTab(content, exam);
    if (name === "grading") renderGradingList(content, exam, attempts);
  }

  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".exam-tab");
    if (tab) showTab(tab.dataset.tab);
  });

  showTab("students");
}

function renderStudentsTab(host, exam, attempts) {
  if (!attempts.length) {
    host.appendChild(el("div", { class: "empty" }, [
      el("h3", { text: currentLang === "ar" ? "لا يوجد طلاب بعد" : "No submissions yet" }),
      el("p", { text: currentLang === "ar" ? "شارك رابط الامتحان للبدء." : "Share the exam link to get started." })
    ]));
    return;
  }
  const wrap = el("div", { class: "card" });
  const table = el("table", { class: "students-table" });
  table.innerHTML = `
    <thead><tr>
      <th>Student</th><th>Status</th><th>Started</th><th>Submitted</th><th>Score</th><th>Events</th>
    </tr></thead>`;
  const tbody = el("tbody");
  attempts.forEach((a) => {
    const tr = el("tr", {}, [
      el("td", { text: a.studentName || "—" }),
      el("td", {}, [el("span", { class: "badge badge-" + (a.status || "draft"), text: a.status || "—" })]),
      el("td", { text: fmtDate(a.startedAt) }),
      el("td", { text: a.submittedAt ? fmtDate(a.submittedAt) : "—" }),
      el("td", { text: a.score != null ? `${a.score} / ${exam.questions?.reduce((s, q) => s + (Number(q.score) || 0), 0) || 0}` : "—" }),
      el("td", { text: String((a.anticheatEvents || []).length) })
    ]);
    tr.style.cursor = "pointer";
    tr.addEventListener("click", () => navigate(`/app/grading?exam=${exam.id}&attempt=${a.id}`));
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrap.appendChild(table);
  host.appendChild(wrap);
}

function renderQuestionsTab(host, exam) {
  const list = exam.questions || [];
  if (!list.length) {
    host.appendChild(el("div", { class: "empty" }, [el("p", { text: "No questions." })]));
    return;
  }
  const wrap = el("div", { class: "stack" });
  list.forEach((q, i) => {
    wrap.appendChild(el("div", { class: "card" }, [
      el("div", { class: "row-between mb-2" }, [
        el("span", { class: "fw-semibold", text: `Q${i + 1} · ${qTypeLabel(q.type)}` }),
        el("span", { class: "badge badge-draft", text: `${q.score} pts` })
      ]),
      el("p", { text: q.text || "—" })
    ]));
  });
  host.appendChild(wrap);
}

function renderGradingList(host, exam, attempts) {
  const pending = attempts.filter((a) => a.status === "submitted" && !a.gradedAt);
  if (!pending.length) {
    host.appendChild(el("div", { class: "empty" }, [
      el("p", { text: currentLang === "ar" ? "لا يوجد ما ينتظر التصحيح." : "Nothing waiting for grading." })
    ]));
    return;
  }
  const wrap = el("div", { class: "stack" });
  pending.forEach((a) => {
    wrap.appendChild(el("div", { class: "card row-between" }, [
      el("div", {}, [
        el("div", { class: "fw-semibold", text: a.studentName }),
        el("div", { class: "text-sm text-muted", text: fmtDate(a.submittedAt) })
      ]),
      el("button", { class: "btn btn-primary btn-sm", type: "button", text: "Grade", onclick: () => navigate(`/app/grading?exam=${exam.id}&attempt=${a.id}`) })
    ]));
  });
  host.appendChild(wrap);
}

/* ============================================================
   GRADING (Teacher)
   ============================================================ */
async function renderGrading(params) {
  const examId = params?.get("exam");
  const attemptId = params?.get("attempt");
  const host = $("[data-grading-host]");
  if (!host) return;
  host.innerHTML = "";

  if (!examId || !attemptId) {
    host.appendChild(el("div", { class: "empty" }, [el("p", { text: "Missing exam or attempt." })]));
    return;
  }

  const exam = await getExam(examId);
  const attemptSnap = await getDoc(doc(db, "attempts", attemptId));
  if (!exam || !attemptSnap.exists()) {
    host.appendChild(el("div", { class: "empty" }, [el("p", { text: "Not found." })]));
    return;
  }
  const attempt = { id: attemptId, ...attemptSnap.data() };
  const questions = exam.questions || [];
  const answers = attempt.answers || {};
  const manualScores = attempt.manualScores || {};
  const feedback = attempt.feedback || {};
  const examFeedback = attempt.examFeedback || "";

  const totalPossible = questions.reduce((s, q) => s + (Number(q.score) || 0), 0);

  // Header
  host.appendChild(el("div", { class: "card grading-student-head" }, [
    el("div", {}, [
      el("h2", { text: attempt.studentName || "Student" }),
      el("p", { class: "text-muted text-sm", text: fmtDate(attempt.submittedAt) })
    ]),
    el("div", { class: "row" }, [
      el("span", { class: "badge badge-" + (attempt.status || "draft"), text: attempt.status || "—" }),
      el("button", { class: "btn btn-ghost btn-sm", type: "button", text: "Back", onclick: () => navigate(`/app/exam?id=${examId}`) })
    ])
  ]));

  // Answers list
  const list = el("div", { class: "grading-answers" });
  host.appendChild(list);

  questions.forEach((q, i) => {
    const a = answers[q.id] || {};
    const isObjective = ["mcq", "tf", "complete"].includes(q.type);
    const isManual = ["essay", "mcq_just", "tf_just"].includes(q.type);

    const card = el("div", { class: "grading-card" });
    card.appendChild(el("div", { class: "grading-question", text: `Q${i + 1} · ${q.text}` }));

    // Student answer
    const ansBlock = el("div", { class: "grading-answer-block" }, [
      el("strong", { text: currentLang === "ar" ? "إجابة الطالب" : "Student answer" })
    ]);
    if (q.type === "mcq" || q.type === "mcq_just") {
      const chosen = q.options?.[a.selectedIndex];
      ansBlock.appendChild(el("div", { text: chosen || "—" }));
    } else if (q.type === "tf" || q.type === "tf_just") {
      ansBlock.appendChild(el("div", { text: a.boolValue ? "True" : "False" }));
    } else if (q.type === "complete") {
      ansBlock.appendChild(el("div", { text: a.textValue || "—" }));
    } else if (q.type === "essay") {
      ansBlock.appendChild(el("div", { text: a.essayText || "—", style: "white-space:pre-wrap" }));
    }
    if (a.justification) {
      ansBlock.appendChild(el("div", { class: "mt-2", style: "white-space:pre-wrap" }, [
        el("strong", { text: currentLang === "ar" ? "التبرير" : "Justification" }),
        el("div", { text: a.justification })
      ]));
    }
    card.appendChild(ansBlock);

    // Correct answer
    if (isObjective) {
      const corBlock = el("div", { class: "grading-answer-block" }, [
        el("strong", { text: currentLang === "ar" ? "الإجابة الصحيحة" : "Correct answer" })
      ]);
      let correctText = "—";
      if (q.type === "mcq") correctText = q.options?.[q.correctIndex] || "—";
      if (q.type === "tf") correctText = q.correctBool ? "True" : "False";
      if (q.type === "complete") correctText = q.correctText || "—";
      corBlock.appendChild(el("div", { class: "grading-correct-answer", text: correctText }));
      card.appendChild(corBlock);
    }

    // Score input
    const scoreRow = el("div", { class: "grading-score-row" }, [
      el("span", { class: "text-sm fw-semibold", text: currentLang === "ar" ? "الدرجة:" : "Score:" })
    ]);
    const num = el("input", { type: "number", class: "input", min: "0", max: String(q.score || 1), step: "0.5" });
    num.value = isManual ? (manualScores[q.id] ?? 0) : (a.autoScore ?? 0);
    num.disabled = isObjective;
    scoreRow.appendChild(num);
    scoreRow.appendChild(el("span", { class: "text-sm text-muted", text: `/ ${q.score || 1}` }));
    card.appendChild(scoreRow);

    if (isManual) {
      const fbField = el("div", { class: "field mt-3" }, [
        el("label", { class: "field-label", text: currentLang === "ar" ? "ملاحظة" : "Feedback" })
      ]);
      const fbInput = el("input", { type: "text", class: "input", value: feedback[q.id] || "" });
      fbField.appendChild(fbInput);
      card.appendChild(fbField);
      manualScores[q.id] = Number(num.value) || 0;
      num.addEventListener("input", () => { manualScores[q.id] = Number(num.value) || 0; });
      feedback[q.id] = fbInput.value;
      fbInput.addEventListener("input", () => { feedback[q.id] = fbInput.value; });
    }

    list.appendChild(card);
  });

  // Exam feedback
  const examFb = el("div", { class: "card" }, [
    el("label", { class: "field-label mb-2", text: currentLang === "ar" ? "ملاحظات عامة" : "Overall feedback" })
  ]);
  const examFbTa = el("textarea", { class: "textarea" });
  examFbTa.value = examFeedback;
  examFb.appendChild(examFbTa);
  host.appendChild(examFb);

  // Save & publish
  const actions = el("div", { class: "card row-between" }, [
    el("div", {}, [
      el("div", { class: "text-sm text-muted", text: currentLang === "ar" ? "الدرجة الكلية" : "Total possible" }),
      el("div", { class: "fw-bold text-lg", text: `${totalPossible}` })
    ]),
    el("div", { class: "row" }, [
      el("button", { class: "btn btn-outline", type: "button", text: currentLang === "ar" ? "حفظ" : "Save grading", onclick: saveGrading }),
      el("button", { class: "btn btn-primary", type: "button", text: currentLang === "ar" ? "نشر النتيجة" : "Publish result", onclick: publishResult })
    ])
  ]);
  host.appendChild(actions);

  async function saveGrading() {
    try {
      const finalScore = computeFinalScore();
      await updateDoc(doc(db, "attempts", attemptId), {
        manualScores,
        feedback,
        examFeedback: examFbTa.value,
        score: finalScore,
        percentage: totalPossible ? Math.round((finalScore / totalPossible) * 100) : 0,
        gradedAt: serverTimestamp(),
        gradedBy: currentProfile.uid,
        status: "graded"
      });
      toast(currentLang === "ar" ? "تم الحفظ" : "Grading saved", "success");
    } catch (err) {
      console.error(err);
      toast("Save failed", "error");
    }
  }

  async function publishResult() {
    await saveGrading();
    try {
      await updateDoc(doc(db, "exams", examId), {
        resultPublishedAt: serverTimestamp()
      });
      toast(currentLang === "ar" ? "تم نشر النتيجة" : "Result published", "success");
      navigate(`/app/exam?id=${examId}`);
    } catch (err) {
      console.error(err);
      toast("Publish failed", "error");
    }
  }

  function computeFinalScore() {
    let total = 0;
    questions.forEach((q) => {
      const a = answers[q.id] || {};
      if (["essay", "mcq_just", "tf_just"].includes(q.type)) {
        total += Number(manualScores[q.id] || 0);
      } else {
        total += Number(a.autoScore || 0);
      }
    });
    return total;
  }
}

/* ============================================================
   SHARE EXAM
   ============================================================ */
function shareExam(exam) {
  const url = `${location.origin}${location.pathname}#/exam?id=${exam.id}`;
  modal({
    title: currentLang === "ar" ? "شارك الامتحان" : "Share exam",
    body: el("div", { class: "stack" }, [
      el("div", { class: "field" }, [
        el("label", { class: "field-label", text: "Exam link" }),
        el("div", { class: "row" }, [
          el("input", { class: "input flex-1", type: "text", readonly: "readonly", value: url }),
          el("button", { class: "btn btn-outline btn-sm", type: "button", text: "Copy", onclick: () => {
            navigator.clipboard.writeText(url);
            toast("Copied", "success");
          }})
        ])
      ])
    ]),
    actions: [{ label: "Close", class: "btn-primary" }]
  });
}

/* ============================================================
   PROFILE / SETTINGS / PACKAGES / BANK
   ============================================================ */
function renderProfile() {
  if (!currentProfile) return;
  $$("[data-profile-avatar]").forEach((e) => (e.src = currentProfile.photoURL || ""));
  $$("[data-profile-name]").forEach((e) => (e.textContent = currentProfile.fullName || ""));
  $$("[data-profile-handle]").forEach((e) => (e.textContent = "@" + (currentProfile.username || "")));
  $$("[data-profile-subject]").forEach((e) => (e.textContent = currentProfile.mainSubject || ""));

  const chips = $("[data-profile-subjects-chips]");
  if (chips) {
    chips.innerHTML = "";
    const all = [currentProfile.mainSubject, ...(currentProfile.additionalSubjects || [])].filter(Boolean);
    all.forEach((s) => chips.appendChild(el("span", { class: "chip", text: s })));
  }
}

function renderSettings() {
  const theme = localStorage.getItem(THEME_KEY) || "light";
  $$("[data-setting-theme]").forEach((r) => {
    r.checked = r.value === theme;
    r.addEventListener("change", () => { if (r.checked) setTheme(r.value); });
  });
  $$("[data-setting-lang]").forEach((r) => {
    r.checked = r.value === currentLang;
    r.addEventListener("change", () => { if (r.checked) setLang(r.value); });
  });
}

function renderPackages() {}

function renderBank() {
  const list = $("[data-bank-list]");
  const empty = $("[data-bank-empty]");
  if (!list) return;
  list.innerHTML = "";
  if (empty) empty.hidden = false;
}

/* ============================================================
   STUDENT EXAM
   ============================================================ */
const EXAM_STATE_KEY = (examId) => `qeyasquiz.attempt.${examId}`;
const EXAM_FP_KEY = "qeyasquiz.devicefp";

function getDeviceFp() {
  let fp = localStorage.getItem(EXAM_FP_KEY);
  if (!fp) {
    fp = uid(20);
    localStorage.setItem(EXAM_FP_KEY, fp);
  }
  return fp;
}

let examRuntime = null;

async function renderExam(params) {
  const examId = params?.get("id");
  const preview = params?.get("preview") === "1";

  const loading = $("[data-exam-loading]");
  const shell = $("[data-exam-shell]");
  const errorBox = $("[data-exam-error]");

  loading.hidden = false;
  shell.hidden = true;
  errorBox.hidden = true;

  if (!examId) {
    loading.hidden = true;
    errorBox.hidden = false;
    $("[data-exam-error-title]").textContent = "Missing exam";
    $("[data-exam-error-message]").textContent = "No exam ID provided.";
    return;
  }

  let exam;
  try {
    exam = await getExam(examId);
  } catch (err) {
    console.error(err);
  }

  if (!exam) {
    loading.hidden = true;
    errorBox.hidden = false;
    $("[data-exam-error-title]").textContent = "Exam not found";
    $("[data-exam-error-message]").textContent = "This exam is unavailable or has been removed.";
    return;
  }

  // If teacher preview
  if (preview && currentUser && currentProfile?.uid === exam.ownerId) {
    loading.hidden = true;
    shell.hidden = false;
    startExamRuntime(exam, { preview: true });
    return;
  }

  // Check exam timing
  const now = Date.now();
  const start = exam.startAt?.toMillis ? exam.startAt.toMillis() : null;
  const end = exam.endAt?.toMillis ? exam.endAt.toMillis() : null;
  if (start && now < start) {
    loading.hidden = true;
    errorBox.hidden = false;
    $("[data-exam-error-title]").textContent = "Exam not started";
    $("[data-exam-error-message]").textContent = `This exam opens on ${fmtDate(exam.startAt)}.`;
    return;
  }
  if (end && now > end) {
    loading.hidden = true;
    errorBox.hidden = false;
    $("[data-exam-error-title]").textContent = "Exam closed";
    $("[data-exam-error-message]").textContent = "This exam has ended.";
    return;
  }

  // Check existing attempt
  const existing = JSON.parse(localStorage.getItem(EXAM_STATE_KEY(examId)) || "null");
  if (existing && existing.attemptId) {
    try {
      const snap = await getDoc(doc(db, "attempts", existing.attemptId));
      if (snap.exists()) {
        const data = snap.data();
        if (data.status === "submitted" || data.status === "graded") {
          loading.hidden = true;
          sessionStorage.setItem("qeyasquiz.lastAttempt", existing.attemptId);
          navigate("/result");
          return;
        }
        // Resume
        loading.hidden = true;
        showResumeModal(exam, existing);
        return;
      }
    } catch {}
    localStorage.removeItem(EXAM_STATE_KEY(examId));
  }

  // Show entry
  loading.hidden = true;
  showEntryModal(exam);
}

function showEntryModal(exam) {
  const modal = $("[data-entry-modal]");
  const title = $("[data-entry-title]");
  const meta = $("[data-entry-meta]");
  const nameInput = $("[data-entry-name]");
  const nameError = $("[data-entry-name-error]");
  const codeField = $("[data-entry-code-field]");
  const codeInput = $("[data-entry-code]");
  const codeError = $("[data-entry-code-error]");
  const form = $("[data-entry-form]");
  const submit = $("[data-entry-submit]");

  const examMeta = exam.examMeta || exam;
  title.textContent = exam.title || "Exam";
  meta.innerHTML = "";
  const rows = [
    ["Teacher", exam.teacherName || exam.ownerName || "—"],
    ["Subject", exam.subject || "—"],
    ["Grade", exam.grade || "—"],
    ["Duration", (exam.duration || 0) + " min"]
  ];
  rows.forEach(([k, v]) => {
    meta.appendChild(el("div", { class: "row-between" }, [
      el("span", { text: k }),
      el("span", { text: v })
    ]));
  });
  codeField.hidden = !exam.requireAccessCode;

  modal.hidden = false;

  form.onsubmit = async (e) => {
    e.preventDefault();
    let ok = true;
    const name = nameInput.value.trim();
    if (name.length < 3) { nameError.hidden = false; nameError.textContent = "Please enter your full name."; ok = false; }
    else nameError.hidden = true;

    if (exam.requireAccessCode) {
      if (codeInput.value.trim() !== (exam.accessCode || "")) {
        codeError.hidden = false;
        codeError.textContent = "Invalid access code.";
        ok = false;
      } else codeError.hidden = true;
    }

    if (!ok) return;

    submit.classList.add("is-loading");
    try {
      const attempt = await createAttempt(exam, name);
      modal.hidden = true;
      const shell = $("[data-exam-shell]");
      shell.hidden = false;
      startExamRuntime(exam, { attempt });
    } catch (err) {
      console.error(err);
      submit.classList.remove("is-loading");
      toast(currentLang === "ar" ? "تعذّر بدء الامتحان" : "Could not start exam", "error");
    }
  };
}

async function createAttempt(exam, studentName) {
  const questions = exam.questions || [];
  const forms = exam.forms && exam.forms.length ? exam.forms : [{ id: "A", name: "Form A" }];
  const chosenForm = forms[Math.floor(Math.random() * forms.length)];

  let questionOrder = questions.map((q) => q.id);
  if (exam.shuffleQuestions) {
    for (let i = questionOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionOrder[i], questionOrder[j]] = [questionOrder[j], questionOrder[i]];
    }
  }

  const nowMs = Date.now();
  const durationMs = (Number(exam.duration) || 60) * 60 * 1000;
  const endLimit = exam.endAt?.toMillis ? exam.endAt.toMillis() : Infinity;
  const deadlineMs = Math.min(nowMs + durationMs, endLimit);

  const payload = {
    examId: exam.id,
    formId: chosenForm.id,
    studentName,
    deviceFp: getDeviceFp(),
    questionOrder,
    answers: {},
    manualScores: {},
    feedback: {},
    status: "in_progress",
    startedAt: serverTimestamp(),
    startedAtMs: nowMs,
    deadlineMs,
    anticheatEvents: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const ref = await addDoc(collection(db, "attempts"), payload);
  const attempt = { id: ref.id, ...payload, startedAtMs: nowMs, deadlineMs };
  localStorage.setItem(EXAM_STATE_KEY(exam.id), JSON.stringify({ attemptId: ref.id, examId: exam.id }));
  return attempt;
}

function showResumeModal(exam, existing) {
  const modal = $("[data-resume-modal]");
  modal.hidden = false;
  const btn = $("[data-resume-continue]");
  btn.onclick = async () => {
    modal.hidden = true;
    const shell = $("[data-exam-shell]");
    shell.hidden = false;
    const snap = await getDoc(doc(db, "attempts", existing.attemptId));
    if (!snap.exists()) { navigate("/exam?id=" + exam.id); return; }
    startExamRuntime(exam, { attempt: { id: existing.attemptId, ...snap.data() } });
  };
}

/* ============================================================
   EXAM RUNTIME
   ============================================================ */
function startExamRuntime(exam, opts) {
  const { attempt, preview = false } = opts;

  const questions = exam.questions || [];
  const byId = {};
  questions.forEach((q) => (byId[q.id] = q));

  const orderedIds = preview
    ? questions.map((q) => q.id)
    : (attempt.questionOrder || questions.map((q) => q.id));

  const state = {
    exam,
    attempt,
    preview,
    questions,
    byId,
    orderedIds,
    index: 0,
    answers: preview ? {} : (attempt.answers || {}),
    deadlineMs: preview ? Date.now() + (exam.duration || 60) * 60000 : attempt.deadlineMs,
    timerInterval: null,
    heartbeatInterval: null,
    lastAutosave: 0,
    dirty: false,
    submitted: false
  };

  examRuntime = state;

  // Watermark
  $("[data-watermark-teacher]").textContent = exam.teacherName || exam.ownerName || "";

  // Topbar
  $("[data-exam-title]").textContent = exam.title || "Exam";
  $("[data-exam-meta]").textContent = `${exam.subject || ""} · ${exam.grade || ""}`;

  // Nav
  renderNav();

  // Start
  showQuestion(0);
  startTimer();
  if (!preview) {
    startHeartbeat();
    startAnticheat();
    startAutosave();
  }

  // Events
  $("[data-prev]").onclick = () => { if (state.index > 0) showQuestion(state.index - 1); };
  $("[data-next]").onclick = () => { if (state.index < state.orderedIds.length - 1) showQuestion(state.index + 1); };
  $("[data-submit-exam]").onclick = () => confirmSubmit();
  $("[data-exam-fullscreen]").onclick = toggleFullscreen;
}

function renderNav() {
  const s = examRuntime;
  const list = $("[data-nav-list]");
  list.innerHTML = "";
  s.orderedIds.forEach((qid, i) => {
    const answered = isAnswered(s.answers[qid], s.byId[qid]);
    const li = el("button", {
      type: "button",
      class: `exam-nav-item ${answered ? "is-answered" : ""} ${i === s.index ? "is-current" : ""}`,
      text: String(i + 1),
      onclick: () => showQuestion(i)
    });
    list.appendChild(li);
  });
  const progress = $("[data-nav-progress]");
  if (progress) {
    const answered = s.orderedIds.filter((qid) => isAnswered(s.answers[qid], s.byId[qid])).length;
    progress.textContent = `${answered} / ${s.orderedIds.length}`;
  }
}

function isAnswered(a, q) {
  if (!a) return false;
  if (q.type === "mcq" || q.type === "mcq_just") return a.selectedIndex != null;
  if (q.type === "tf" || q.type === "tf_just") return a.boolValue != null;
  if (q.type === "complete") return !!a.textValue;
  if (q.type === "essay") return !!a.essayText;
  return false;
}

function showQuestion(idx) {
  const s = examRuntime;
  s.index = Math.max(0, Math.min(idx, s.orderedIds.length - 1));
  const qid = s.orderedIds[s.index];
  const q = s.byId[qid];
  const a = s.answers[qid] || {};

  const host = $("[data-question-host]");
  host.innerHTML = "";

  const header = el("div", { class: "q-header" }, [
    el("div", { class: "q-number" }, [
      el("span", { class: "q-number-badge", text: String(s.index + 1) }),
      el("span", { text: `/ ${s.orderedIds.length}` })
    ]),
    el("span", { class: "q-score", text: `${q.score || 1} pts` })
  ]);
  host.appendChild(header);

  host.appendChild(el("div", { class: "q-text", text: q.text }));

  if (q.imageUrl) {
    host.appendChild(el("img", { class: "q-image", src: q.imageUrl, alt: "" }));
  }

  const answers = { ...a };

  if (q.type === "mcq" || q.type === "mcq_just") {
    const optsWrap = el("div", { class: "q-options" });
    (q.options || []).forEach((opt, i) => {
      const isSel = answers.selectedIndex === i;
      const optEl = el("label", { class: `q-option ${isSel ? "is-selected" : ""}` }, [
        el("input", { type: "radio", name: "opt_" + q.id }),
        el("span", { class: "q-option-mark", text: String.fromCharCode(65 + i) }),
        el("span", { class: "q-option-text", text: opt })
      ]);
      optEl.querySelector("input").checked = isSel;
      optEl.querySelector("input").addEventListener("change", () => {
        answers.selectedIndex = i;
        saveAnswer(q.id, answers);
        renderNav();
        // re-render to update styling
        $$(".q-option", optsWrap).forEach((o) => o.classList.remove("is-selected"));
        optEl.classList.add("is-selected");
      });
      optsWrap.appendChild(optEl);
    });
    host.appendChild(optsWrap);

    if (q.type === "mcq_just") {
      host.appendChild(buildJustificationField(q, answers));
    }
  } else if (q.type === "tf" || q.type === "tf_just") {
    const wrap = el("div", { class: "q-truefalse" });
    [{ v: true, l: "True" }, { v: false, l: "False" }].forEach(({ v, l }) => {
      const isSel = answers.boolValue === v;
      const optEl = el("label", { class: `q-option ${isSel ? "is-selected" : ""}` }, [
        el("input", { type: "radio", name: "tf_" + q.id }),
        el("span", { class: "q-option-text", text: l })
      ]);
      optEl.querySelector("input").checked = isSel;
      optEl.querySelector("input").addEventListener("change", () => {
        answers.boolValue = v;
        saveAnswer(q.id, answers);
        renderNav();
        $$(".q-option", wrap).forEach((o) => o.classList.remove("is-selected"));
        optEl.classList.add("is-selected");
      });
      wrap.appendChild(optEl);
    });
    host.appendChild(wrap);

    if (q.type === "tf_just") {
      host.appendChild(buildJustificationField(q, answers));
    }
  } else if (q.type === "complete") {
    const input = el("input", { class: "q-complete-input", type: "text", placeholder: currentLang === "ar" ? "اكتب إجابتك…" : "Type your answer…" });
    input.value = answers.textValue || "";
    input.addEventListener("input", debounce(() => {
      answers.textValue = input.value;
      saveAnswer(q.id, answers);
      renderNav();
    }, 400));
    host.appendChild(input);
  } else if (q.type === "essay") {
    const ta = el("textarea", { class: "q-essay-textarea", placeholder: currentLang === "ar" ? "اكتب إجابتك…" : "Write your answer…" });
    ta.value = answers.essayText || "";
    ta.addEventListener("input", debounce(() => {
      answers.essayText = ta.value;
      saveAnswer(q.id, answers);
      renderNav();
    }, 500));
    host.appendChild(ta);
  }

  // Update progress
  updateProgress();
  renderNav();

  // Nav button state
  $("[data-prev]").disabled = s.index === 0;
  $("[data-next]").disabled = s.index === s.orderedIds.length - 1;
}

function buildJustificationField(q, answers) {
  const box = el("div", { class: "q-justification" }, [
    el("div", { class: "q-justification-label" }, [
      svgIcon("check-square", 14),
      document.createTextNode(currentLang === "ar" ? "التبرير (تصحيح يدوي)" : "Justification (manual grading)")
    ])
  ]);
  const ta = el("textarea", { class: "q-justification-textarea" });
  ta.value = answers.justification || "";
  ta.addEventListener("input", debounce(() => {
    answers.justification = ta.value;
    saveAnswer(q.id, answers);
  }, 500));
  box.appendChild(ta);
  box.appendChild(el("p", { class: "q-justification-hint", text: currentLang === "ar" ? "سيتم تصحيح هذا يدويًا." : "This will be manually graded." }));
  return box;
}

function saveAnswer(qid, answers) {
  const s = examRuntime;
  if (s.preview) return;
  s.answers[qid] = answers;
  s.dirty = true;
}

function updateProgress() {
  const s = examRuntime;
  const answered = s.orderedIds.filter((qid) => isAnswered(s.answers[qid], s.byId[qid])).length;
  const pct = s.orderedIds.length ? Math.round((answered / s.orderedIds.length) * 100) : 0;
  const bar = $("[data-progress-bar]");
  const text = $("[data-progress-text]");
  if (bar) bar.style.width = pct + "%";
  if (text) text.textContent = pct + "%";
}

/* Timer */
function startTimer() {
  const s = examRuntime;
  const elVal = $("[data-timer-value]");
  const elBox = $("[data-timer]");

  function tick() {
    const remaining = s.deadlineMs - Date.now();
    if (remaining <= 0) {
      elVal.textContent = "00:00:00";
      elBox.classList.add("is-critical");
      clearInterval(s.timerInterval);
      if (!s.preview) autoSubmit("time_up");
      return;
    }
    const hours = Math.floor(remaining / 3600000);
    const mins = Math.floor((remaining % 3600000) / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    elVal.textContent =
      String(hours).padStart(2, "0") + ":" +
      String(mins).padStart(2, "0") + ":" +
      String(secs).padStart(2, "0");

    elBox.classList.remove("is-warning", "is-critical");
    if (remaining < 60000) elBox.classList.add("is-critical");
    else if (remaining < 5 * 60000) elBox.classList.add("is-warning");
  }
  tick();
  s.timerInterval = setInterval(tick, 1000);
}

/* Autosave */
function startAutosave() {
  const s = examRuntime;
  s.autosaveInterval = setInterval(async () => {
    if (!s.dirty || s.submitted) return;
    if (!navigator.onLine) return;
    try {
      await updateDoc(doc(db, "attempts", s.attempt.id), {
        answers: s.answers,
        updatedAt: serverTimestamp()
      });
      s.dirty = false;
    } catch (err) {
      console.warn("Autosave failed", err);
    }
  }, 5000);
}

/* Heartbeat */
function startHeartbeat() {
  const s = examRuntime;
  s.heartbeatInterval = setInterval(async () => {
    if (s.submitted) return;
    if (!navigator.onLine) return;
    try {
      await updateDoc(doc(db, "attempts", s.attempt.id), {
        lastActiveAt: serverTimestamp(),
        connection: navigator.onLine
      });
    } catch {}
  }, 15000);
}

/* Anti-cheat */
function startAnticheat() {
  const s = examRuntime;

  function logEvent(type) {
    if (s.submitted) return;
    s.attempt.anticheatEvents = s.attempt.anticheatEvents || [];
    s.attempt.anticheatEvents.push({ type, at: Date.now() });
    updateDoc(doc(db, "attempts", s.attempt.id), {
      anticheatEvents: s.attempt.anticheatEvents
    }).catch(() => {});
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) logEvent("tab_hidden");
    else logEvent("tab_visible");
  });

  window.addEventListener("blur", () => logEvent("window_blur"));
  window.addEventListener("focus", () => logEvent("window_focus"));

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && s.exam.requireFullscreen) {
      logEvent("fullscreen_exit");
      toast(currentLang === "ar" ? "الرجاء العودة لملء الشاشة" : "Please return to fullscreen", "warning");
    }
  });

  window.addEventListener("offline", () => {
    logEvent("offline");
    const banner = $("[data-offline-banner]");
    if (banner) banner.hidden = false;
    const indicator = $("[data-connection-indicator]");
    if (indicator) indicator.classList.add("is-offline");
  });

  window.addEventListener("online", () => {
    logEvent("online");
    const banner = $("[data-offline-banner]");
    if (banner) banner.hidden = true;
    const indicator = $("[data-connection-indicator]");
    if (indicator) indicator.classList.remove("is-offline");
  });
}

/* Fullscreen */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.();
  }
}

/* Submit */
function confirmSubmit() {
  const s = examRuntime;
  const answered = s.orderedIds.filter((qid) => isAnswered(s.answers[qid], s.byId[qid])).length;
  const total = s.orderedIds.length;
  const unanswered = total - answered;

  const summary = $("[data-confirm-summary]");
  summary.innerHTML = "";
  summary.appendChild(el("div", { class: "row-between" }, [
    el("span", { text: currentLang === "ar" ? "تمت الإجابة" : "Answered" }),
    el("span", { text: `${answered} / ${total}` })
  ]));
  if (unanswered > 0) {
    summary.appendChild(el("div", { class: "row-between" }, [
      el("span", { text: currentLang === "ar" ? "بدون إجابة" : "Unanswered" }),
      el("span", { text: String(unanswered), style: "color:var(--warning-500)" })
    ]));
  }

  const modal = $("[data-confirm-submit-modal]");
  modal.hidden = false;

  $("[data-confirm-cancel]").onclick = () => { modal.hidden = true; };
  $("[data-confirm-submit]").onclick = () => { modal.hidden = true; manualSubmit(); };
}

async function manualSubmit() {
  await performSubmit("manual");
}

async function autoSubmit(reason) {
  const s = examRuntime;
  if (s.submitted) return;
  toast(currentLang === "ar" ? "تم تسليم الامتحان تلقائيًا" : "Exam auto-submitted", "warning");
  await performSubmit("auto", reason);
}

async function performSubmit(kind = "manual", reason = null) {
  const s = examRuntime;
  if (s.submitted) return;
  s.submitted = true;

  clearInterval(s.timerInterval);
  clearInterval(s.autosaveInterval);
  clearInterval(s.heartbeatInterval);

  // Compute auto scores
  const scored = computeAutoScores(s);
  const score = scored.total;
  const totalPossible = s.questions.reduce((sum, q) => sum + (Number(q.score) || 0), 0);
  const percentage = totalPossible ? Math.round((score / totalPossible) * 100) : 0;

  try {
    await updateDoc(doc(db, "attempts", s.attempt.id), {
      answers: s.answers,
      autoScore: score,
      score,
      percentage,
      totalPossible,
      status: kind === "auto" ? "submitted" : "submitted",
      submitKind: kind,
      submitReason: reason,
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    sessionStorage.setItem("qeyasquiz.lastAttempt", s.attempt.id);
    localStorage.removeItem(EXAM_STATE_KEY(s.exam.id));
    navigate("/result");
  } catch (err) {
    console.error(err);
    s.submitted = false;
    toast(currentLang === "ar" ? "فشل التسليم. حاول مرة أخرى." : "Submission failed. Please retry.", "error");
  }
}

function computeAutoScores(s) {
  let total = 0;
  s.questions.forEach((q) => {
    const a = s.answers[q.id] || {};
    let autoScore = 0;
    if (q.type === "mcq") {
      if (a.selectedIndex === q.correctIndex) autoScore = Number(q.score) || 0;
    } else if (q.type === "tf") {
      if (a.boolValue === q.correctBool) autoScore = Number(q.score) || 0;
    } else if (q.type === "complete") {
      const norm = (v) => String(v || "").trim().toLowerCase();
      if (norm(a.textValue) === norm(q.correctText)) autoScore = Number(q.score) || 0;
    }
    a.autoScore = autoScore;
    s.answers[q.id] = a;
    total += autoScore;
  });
  return { total };
}

/* ============================================================
   RESULT PAGE (Student)
   ============================================================ */
async function renderResult() {
  const loading = $("[data-result-loading]");
  const main = $("[data-result-main]");
  const attemptId = sessionStorage.getItem("qeyasquiz.lastAttempt");

  if (!attemptId) {
    loading.hidden = true;
    main.hidden = false;
    $("[data-result-exam-title]").textContent = currentLang === "ar" ? "لا يوجد امتحان" : "No exam";
    return;
  }

  let attempt, exam;
  try {
    const aSnap = await getDoc(doc(db, "attempts", attemptId));
    if (!aSnap.exists()) throw new Error("no attempt");
    attempt = { id: attemptId, ...aSnap.data() };
    exam = await getExam(attempt.examId);
  } catch {
    loading.hidden = true;
    main.hidden = false;
    $("[data-result-exam-title]").textContent = "Not found";
    return;
  }

  loading.hidden = true;
  main.hidden = false;

  const status = attempt.status || "submitted";
  const resultPublished = exam?.resultPublishedAt != null;

  $("[data-result-status]").textContent = status;
  $("[data-result-exam-title]").textContent = exam?.title || "Exam";
  $("[data-result-meta]").textContent = `${exam?.subject || ""} · ${exam?.grade || ""} · ${attempt.studentName || ""}`;

  const scoreBlock = $("[data-score-block]");
  const waitingBlock = $("[data-waiting-block]");
  const feedbackBlock = $("[data-feedback-block]");
  const reviewHead = $("[data-review-head]");
  const reviewHost = $("[data-result-review]");

  if (resultPublished && attempt.score != null) {
    scoreBlock.hidden = false;
    waitingBlock.hidden = true;
    $("[data-score-value]").textContent = String(attempt.score);
    $("[data-score-total]").textContent = `/ ${attempt.totalPossible || (exam?.questions?.reduce((s, q) => s + (Number(q.score) || 0), 0) || 0)}`;
    $("[data-score-percentage]").textContent = `${attempt.percentage || 0}%`;

    if (attempt.examFeedback) {
      feedbackBlock.hidden = false;
      $("[data-feedback-text]").textContent = attempt.examFeedback;
    }
  } else {
    scoreBlock.hidden = true;
    waitingBlock.hidden = false;
  }

  // Review (if allowed)
  if (resultPublished && exam?.showCorrectAnswers !== false && exam?.questions) {
    reviewHead.hidden = false;
    reviewHost.innerHTML = "";
    exam.questions.forEach((q, i) => {
      const a = attempt.answers?.[q.id] || {};
      const isCorrect = a.autoScore && a.autoScore >= (q.score || 1);
      const isWrong = a.autoScore === 0 && a.selectedIndex != null;
      const isPartial = !isCorrect && !isWrong && a.autoScore > 0;

      let cls = "";
      if (isCorrect) cls = "is-correct";
      else if (isWrong) cls = "is-wrong";
      else if (isPartial) cls = "is-partial";

      const card = el("div", { class: `review-card ${cls}` });
      const head = el("div", { class: "review-head" }, [
        el("div", { class: "review-num" }, [
          el("span", { class: "q-number-badge", text: String(i + 1) }),
          el("span", { text: qTypeLabel(q.type) })
        ]),
        el("span", { class: `review-score ${cls}`, text: `${a.autoScore || 0} / ${q.score || 1}` })
      ]);
      card.appendChild(head);
      card.appendChild(el("div", { class: "review-question", text: q.text }));

      const answers = el("div", { class: "review-answers" });

      let studentText = "—";
      let correctText = "—";

      if (q.type === "mcq" || q.type === "mcq_just") {
        studentText = a.selectedIndex != null ? q.options?.[a.selectedIndex] : "—";
        correctText = q.options?.[q.correctIndex] || "—";
      } else if (q.type === "tf" || q.type === "tf_just") {
        studentText = a.boolValue != null ? (a.boolValue ? "True" : "False") : "—";
        correctText = q.correctBool ? "True" : "False";
      } else if (q.type === "complete") {
        studentText = a.textValue || "—";
        correctText = q.correctText || "—";
      } else if (q.type === "essay") {
        studentText = a.essayText || "—";
        correctText = q.modelAnswer || "—";
      }

      answers.appendChild(el("div", { class: "review-answer is-wrong" }, [
        el("strong", { text: currentLang === "ar" ? "إجابتك" : "Your answer" }),
        el("div", { text: studentText, style: "white-space:pre-wrap" })
      ]));

      if (exam.showCorrectAnswers !== false) {
        answers.appendChild(el("div", { class: "review-answer is-correct" }, [
          el("strong", { text: currentLang === "ar" ? "الإجابة الصحيحة" : "Correct answer" }),
          el("div", { text: correctText, style: "white-space:pre-wrap" })
        ]));
      }

      if (a.justification) {
        answers.appendChild(el("div", { class: "review-answer" }, [
          el("strong", { text: currentLang === "ar" ? "تبريرك" : "Your justification" }),
          el("div", { text: a.justification, style: "white-space:pre-wrap" })
        ]));
      }

      card.appendChild(answers);
      reviewHost.appendChild(card);
    });
  }
}

/* ============================================================
   ROUTE REGISTRATION
   ============================================================ */
onRoute("landing", () => { initLanding(); });
onRoute("login", () => { initLogin(); });
onRoute("setup", () => { initSetup(); });
onRoute("app:dashboard", async () => { await renderDashboard(); });
onRoute("app:exams", async () => { await renderMyExams(); });
onRoute("app:builder", async (p) => { await renderBuilder(p); });
onRoute("app:exam-details", async (p) => { await renderExamDetails(p); });
onRoute("app:grading", async (p) => { await renderGrading(p); });
onRoute("app:bank", () => { renderBank(); });
onRoute("app:profile", () => { renderProfile(); });
onRoute("app:settings", () => { renderSettings(); });
onRoute("app:packages", () => { renderPackages(); });
onRoute("exam", async (p) => { await renderExam(p); });
onRoute("result", async () => { await renderResult(); });

/* ============================================================
   GLOBAL EVENTS
   ============================================================ */
document.addEventListener("click", (e) => {
  const themeBtn = e.target.closest("[data-theme-toggle]");
  if (themeBtn) { toggleTheme(); return; }

  const langBtn = e.target.closest("[data-lang]");
  if (langBtn) { setLang(langBtn.dataset.lang); return; }

  const goLogin = e.target.closest("[data-go-login]");
  if (goLogin) { navigate(currentUser ? "/app/dashboard" : "/login"); return; }

  const signout = e.target.closest("[data-signout]");
  if (signout) { signOutUser(); return; }

  const createExam = e.target.closest("[data-create-exam]");
  if (createExam) { navigate("/app/builder"); return; }
});

window.addEventListener("hashchange", handleRoute);
window.addEventListener("online", () => {
  const banner = $("[data-offline-banner]");
  if (banner) banner.hidden = true;
});
window.addEventListener("offline", () => {
  const banner = $("[data-offline-banner]");
  if (banner) banner.hidden = false;
});

/* ============================================================
   THEME MEDIA QUERY
   ============================================================ */
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (localStorage.getItem(THEME_KEY) === "auto") setTheme("auto");
});

/* ============================================================
   INIT
   ============================================================ */
(function init() {
  setTheme(currentTheme);
  setLang(currentLang);
  initAppShell();
  initBuilder();
  initMyExamsFilters();
  handleRoute();
})();

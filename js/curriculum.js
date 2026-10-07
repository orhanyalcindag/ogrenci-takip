/**
 * curriculum.js - Akıllı Sınıf Defteri ve Otomatik Yıllık Plan Yönetim Modülü
 * Meslek Lisesi Öğrenci Takip ve Laboratuvar Notlandırma Uygulaması
 */

// MEB Çalışma Takvimi Referans Hafta Verileri (2024-2025 ve genel eğitim öğretim takvimi)
const ACADEMIC_WEEKS_SCHEDULE = [
    // --- 1. DÖNEM (18 Hafta) ---
    { week: 1, term: 1, start: '2024-09-09', end: '2024-09-13', label: '09 - 13 Eylül 2024' },
    { week: 2, term: 1, start: '2024-09-16', end: '2024-09-20', label: '16 - 20 Eylül 2024' },
    { week: 3, term: 1, start: '2024-09-23', end: '2024-09-27', label: '23 - 27 Eylül 2024' },
    { week: 4, term: 1, start: '2024-09-30', end: '2024-10-04', label: '30 Eylül - 04 Ekim 2024' },
    { week: 5, term: 1, start: '2024-10-07', end: '2024-10-11', label: '07 - 11 Ekim 2024' },
    { week: 6, term: 1, start: '2024-10-14', end: '2024-10-18', label: '14 - 18 Ekim 2024' },
    { week: 7, term: 1, start: '2024-10-21', end: '2024-10-25', label: '21 - 25 Ekim 2024' },
    { week: 8, term: 1, start: '2024-10-28', end: '2024-11-01', label: '28 Ekim - 01 Kasım 2024 (29 Ekim)' },
    { week: 9, term: 1, start: '2024-11-04', end: '2024-11-08', label: '04 - 08 Kasım 2024' },
    // 11 - 15 Kasım: 1. Dönem Ara Tatili
    { week: 10, term: 1, start: '2024-11-18', end: '2024-11-22', label: '18 - 22 Kasım 2024' },
    { week: 11, term: 1, start: '2024-11-25', end: '2024-11-29', label: '25 - 29 Kasım 2024' },
    { week: 12, term: 1, start: '2024-12-02', end: '2024-12-06', label: '02 - 06 Aralık 2024' },
    { week: 13, term: 1, start: '2024-12-09', end: '2024-12-13', label: '09 - 13 Aralık 2024' },
    { week: 14, term: 1, start: '2024-12-16', end: '2024-12-20', label: '16 - 20 Aralık 2024' },
    { week: 15, term: 1, start: '2024-12-23', end: '2024-12-27', label: '23 - 27 Aralık 2024' },
    { week: 16, term: 1, start: '2024-12-30', end: '2025-01-03', label: '30 Aralık 2024 - 03 Ocak 2025' },
    { week: 17, term: 1, start: '2025-01-06', end: '2025-01-10', label: '06 - 10 Ocak 2025' },
    { week: 18, term: 1, start: '2025-01-13', end: '2025-01-17', label: '13 - 17 Ocak 2025 (1. Dönem Sonu)' },
    // 20 - 31 Ocak: Yarıyıl Tatili

    // --- 2. DÖNEM (18 Hafta) ---
    { week: 19, term: 2, start: '2025-02-03', end: '2025-02-07', label: '03 - 07 Şubat 2025 (2. Dönem Başı)' },
    { week: 20, term: 2, start: '2025-02-10', end: '2025-02-14', label: '10 - 14 Şubat 2025' },
    { week: 21, term: 2, start: '2025-02-17', end: '2025-02-21', label: '17 - 21 Şubat 2025' },
    { week: 22, term: 2, start: '2025-02-24', end: '2025-02-28', label: '24 - 28 Şubat 2025' },
    { week: 23, term: 2, start: '2025-03-03', end: '2025-03-07', label: '03 - 07 Mart 2025' },
    { week: 24, term: 2, start: '2025-03-10', end: '2025-03-14', label: '10 - 14 Mart 2025' },
    { week: 25, term: 2, start: '2025-03-17', end: '2025-03-21', label: '17 - 21 Mart 2025' },
    { week: 26, term: 2, start: '2025-03-24', end: '2025-03-28', label: '24 - 28 Mart 2025' },
    // 31 Mart - 04 Nisan: 2. Dönem Ara Tatili
    { week: 27, term: 2, start: '2025-04-07', end: '2025-04-11', label: '07 - 11 Nisan 2025' },
    { week: 28, term: 2, start: '2025-04-14', end: '2025-04-18', label: '14 - 18 Nisan 2025' },
    { week: 29, term: 2, start: '2025-04-21', end: '2025-04-25', label: '21 - 25 Nisan 2025 (23 Nisan)' },
    { week: 30, term: 2, start: '2025-04-28', end: '2025-05-02', label: '28 Nisan - 02 Mayıs 2025 (1 Mayıs)' },
    { week: 31, term: 2, start: '2025-05-05', end: '2025-05-09', label: '05 - 09 Mayıs 2025' },
    { week: 32, term: 2, start: '2025-05-12', end: '2025-05-16', label: '12 - 16 Mayıs 2025 (19 Mayıs)' },
    { week: 33, term: 2, start: '2025-05-19', end: '2025-05-23', label: '19 - 23 Mayıs 2025' },
    { week: 34, term: 2, start: '2025-05-26', end: '2025-05-30', label: '26 - 30 Mayıs 2025' },
    { week: 35, term: 2, start: '2025-06-02', end: '2025-06-06', label: '02 - 06 Haziran 2025' },
    { week: 36, term: 2, start: '2025-06-09', end: '2025-06-13', label: '09 - 13 Haziran 2025 (Yıl Sonu)' }
];

// Tatil Aralıkları
const HOLIDAY_RANGES = [
    { name: '1. Dönem Ara Tatili', start: '2024-11-09', end: '2024-11-17' },
    { name: 'Yarıyıl Tatili (15 Tatil)', start: '2025-01-18', end: '2025-02-02' },
    { name: '2. Dönem Ara Tatili & Ramazan Bayramı', start: '2025-03-29', end: '2025-04-06' }
];

class CurriculumManager {
    constructor() {
        this.selectedCourseId = 'crs_wtug';
        this.selectedDate = new Date().toISOString().slice(0, 10);
        this.selectedWeekNumber = 1;
        this.planFilterTerm = 'all'; // 'all', '1', '2'
        
        // İlk açılışta güncel haftayı belirle
        this.initCurrentWeek();
    }

    initCurrentWeek() {
        const info = this.getWeekInfoFromDate(this.selectedDate);
        if (info && info.week) {
            this.selectedWeekNumber = info.week;
        } else {
            this.selectedWeekNumber = 8; // Örnek dönem ortası varsayılanı
        }
    }

    /**
     * Verilen tarihe göre eğitim haftası ve tatil durumunu döndürür
     */
    getWeekInfoFromDate(dateStr) {
        if (!dateStr) dateStr = new Date().toISOString().slice(0, 10);
        const target = new Date(dateStr + 'T00:00:00');

        // Önce tatil kontrolü yap
        for (const h of HOLIDAY_RANGES) {
            const hStart = new Date(h.start + 'T00:00:00');
            const hEnd = new Date(h.end + 'T23:59:59');
            if (target >= hStart && target <= hEnd) {
                return {
                    isHoliday: true,
                    holidayName: h.name,
                    week: null,
                    label: h.name
                };
            }
        }

        // Hafta eşleşmesi ara
        for (const w of ACADEMIC_WEEKS_SCHEDULE) {
            const wStart = new Date(w.start + 'T00:00:00');
            // Cuma gününden pazar gününe kadar aynı haftanın kapsamında değerlendir
            const wEnd = new Date(w.end + 'T23:59:59');
            wEnd.setDate(wEnd.getDate() + 2); // Hafta sonunu da bu haftaya dahil et

            if (target >= wStart && target <= wEnd) {
                return {
                    isHoliday: false,
                    week: w.week,
                    term: w.term,
                    label: w.label,
                    start: w.start,
                    end: w.end
                };
            }
        }

        // Eğer takvim aralığının dışındaysa en yakın haftayı yaklaşık oranla veya 1. haftayı ver
        const firstStart = new Date(ACADEMIC_WEEKS_SCHEDULE[0].start);
        if (target < firstStart) {
            return {
                isHoliday: false,
                isOutOfRange: true,
                week: 1,
                term: 1,
                label: 'Ders Yılı Başlangıcı (1. Hafta)',
                message: 'Seçilen tarih eğitim yılı başlangıcından öncedir.'
            };
        }

        return {
            isHoliday: false,
            isOutOfRange: true,
            week: 36,
            term: 2,
            label: 'Ders Yılı Sonu (36. Hafta)',
            message: 'Seçilen tarih eğitim yılı sonrasındadır.'
        };
    }

    /**
     * Seçili dersin belirtilen haftadaki müfredat verisini getirir
     */
    getCourseWeekData(courseId, weekNumber) {
        const crs = MEB_CURRICULUM[courseId];
        if (!crs || !crs.weeks) return null;
        return crs.weeks.find(w => w.week === parseInt(weekNumber, 10)) || null;
    }

    /**
     * Mevcut ders ve haftayı değiştirir
     */
    setCourse(courseId) {
        if (MEB_CURRICULUM[courseId]) {
            this.selectedCourseId = courseId;
        }
    }

    setWeek(weekNumber) {
        const w = parseInt(weekNumber, 10);
        if (w >= 1 && w <= 36) {
            this.selectedWeekNumber = w;
            // Hafta değişince ilgili haftanın pazartesi tarihini seç
            const sched = ACADEMIC_WEEKS_SCHEDULE.find(s => s.week === w);
            if (sched) this.selectedDate = sched.start;
        }
    }

    setDate(dateStr) {
        this.selectedDate = dateStr;
        const info = this.getWeekInfoFromDate(dateStr);
        if (info && info.week) {
            this.selectedWeekNumber = info.week;
        }
    }
}

// Global yönetici nesnesi
const curriculum = new CurriculumManager();


// ==========================================
// ARAYÜZ OLUŞTURMA VE GÖRÜNÜM İŞLEVLERİ
// ==========================================

function renderCurriculumView() {
    const container = document.getElementById('view-curriculum');
    if (!container) return;

    // 1. Üst Kontrol & Filtre Çubuğunu Oluştur
    const course = MEB_CURRICULUM[curriculum.selectedCourseId] || MEB_CURRICULUM['crs_wtug'];
    const weekData = curriculum.getCourseWeekData(curriculum.selectedCourseId, curriculum.selectedWeekNumber);
    const weekInfo = ACADEMIC_WEEKS_SCHEDULE.find(s => s.week === curriculum.selectedWeekNumber) || {};

    const coursesDropdownOptions = Object.values(MEB_CURRICULUM).map(c => 
        `<option value="${c.id}" ${c.id === curriculum.selectedCourseId ? 'selected' : ''}>${escapeHtml(c.name)} (${escapeHtml(c.code)}) - ${escapeHtml(c.gradeLevel)}</option>`
    ).join('');

    const weekOptions = ACADEMIC_WEEKS_SCHEDULE.map(w => 
        `<option value="${w.week}" ${w.week === curriculum.selectedWeekNumber ? 'selected' : ''}>${w.week}. Hafta (${w.label})</option>`
    ).join('');

    // Günün sınıf defteri kartı içeriği
    let defterCardHtml = '';
    if (weekData) {
        defterCardHtml = `
            <div class="defter-card">
                <div class="defter-card-header">
                    <div class="defter-header-title">
                        <span class="defter-badge-week">🗓️ ${weekData.term}. Dönem • ${weekData.week}. Hafta</span>
                        <span class="defter-badge-dates">${escapeHtml(weekInfo.label || '')}</span>
                        <span class="defter-badge-hours">⏱️ Haftalık ${course.hoursPerWeek} Saat</span>
                    </div>
                    <div class="defter-header-actions">
                        <button class="btn btn-primary" onclick="copyDefterOutcomeText()" title="Sınıf defteri metnini panoya kopyala">
                            📋 Defter Metnini Kopyala
                        </button>
                    </div>
                </div>

                <div class="defter-card-body">
                    <!-- Ders & Ünite -->
                    <div class="defter-info-row">
                        <div class="defter-unit-tag">${escapeHtml(weekData.unit)}</div>
                        <h3 class="defter-topic-title">${escapeHtml(weekData.topic)}</h3>
                    </div>

                    <!-- SINIF DEFTERİNE YAZILACAK RESMİ KAZANIM CÜMLESİ -->
                    <div class="defter-outcome-box" id="defterOutcomeBox">
                        <div class="outcome-box-label">
                            <span>✍️ Sınıf Defterine Yazılacak Metin (Kazanım)</span>
                            <span class="outcome-box-hint">Fiziksel deftere veya e-müfredata yapıştırmaya hazırdır</span>
                        </div>
                        <div class="outcome-text" id="defterOutcomeText">
                            ${escapeHtml(weekData.outcome)}
                        </div>
                    </div>

                    <!-- ÖNERİLEN LABORATUVAR UYGULAMASI VE RUBRİK -->
                    <div class="defter-practice-box">
                        <div class="practice-box-header">
                            <div>
                                <span class="practice-badge">🧪 Önerilen Laboratuvar Görevi</span>
                                <h4 style="margin: 0.35rem 0 0 0; font-size: 1rem; color: var(--text);">${escapeHtml(weekData.suggestedPractice)}</h4>
                            </div>
                            <button class="btn btn-secondary btn-sm" onclick="createAssignmentFromCurriculum('${curriculum.selectedCourseId}', ${weekData.week})">
                                🚀 Bu Konudan Uygulama Görevi Aç
                            </button>
                        </div>
                        <div class="practice-rubric-note">
                            <strong>📊 Örnek Değerlendirme Kriteri (Rubrik):</strong> ${escapeHtml(weekData.criteria)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        defterCardHtml = `
            <div class="empty-state">
                <div class="empty-state-icon">🏖️</div>
                <h3>Tatil veya Ara Dönem</h3>
                <p>Seçilen tarih aralığında resmi eğitim-öğretim haftası bulunmamaktadır.</p>
            </div>
        `;
    }

    // 36 Haftalık Yıllık Plan Tablosu
    const planRows = course.weeks
        .filter(w => {
            if (curriculum.planFilterTerm === '1') return w.term === 1;
            if (curriculum.planFilterTerm === '2') return w.term === 2;
            return true;
        })
        .map(w => {
            const isCurrent = w.week === curriculum.selectedWeekNumber;
            const sched = ACADEMIC_WEEKS_SCHEDULE.find(s => s.week === w.week) || {};

            return `
                <tr class="${isCurrent ? 'row-current-week' : ''}">
                    <td style="text-align: center; font-weight: 800;">
                        ${isCurrent ? '<span class="current-week-indicator">👉 ' + w.week + '</span>' : w.week}
                    </td>
                    <td style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); width: 140px;">
                        ${escapeHtml(sched.label || '')}
                    </td>
                    <td style="font-weight: 700; color: var(--primary); font-size: 0.85rem; width: 180px;">
                        ${escapeHtml(w.unit)}
                    </td>
                    <td style="font-weight: 600; font-size: 0.88rem; width: 200px;">
                        ${escapeHtml(w.topic)}
                    </td>
                    <td style="font-size: 0.85rem; line-height: 1.45; color: var(--text);">
                        ${escapeHtml(w.outcome)}
                    </td>
                    <td style="font-size: 0.82rem; color: var(--text-muted); width: 220px;">
                        ${escapeHtml(w.suggestedPractice)}
                    </td>
                    <td style="text-align: right; width: 120px;" class="no-print">
                        <button class="btn btn-outline btn-sm" onclick="selectWeekDirectly(${w.week})" title="Bu haftayı seç">
                            👁️ Seç
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

    const html = `
        <!-- ÜST KONTROL BAR VE TARİH SEÇİCİ -->
        <div class="action-bar no-print">
            <div class="filter-group" style="flex-wrap: wrap; gap: 1rem; align-items: flex-end;">
                <div class="filter-item">
                    <label class="filter-label" for="curriculumCourseSelect">1. Bilişim Dersi Seçin</label>
                    <select id="curriculumCourseSelect" class="form-select" onchange="handleCurriculumCourseChange(this.value)" style="min-width: 280px;">
                        ${coursesDropdownOptions}
                    </select>
                </div>

                <div class="filter-item">
                    <label class="filter-label" for="curriculumDateInput">2. Tarih Seçin (Otomatik Hafta Eşleşir)</label>
                    <input type="date" id="curriculumDateInput" class="form-input" value="${curriculum.selectedDate}" onchange="handleCurriculumDateChange(this.value)">
                </div>

                <div class="filter-item">
                    <label class="filter-label" for="curriculumWeekSelect">3. Veya Doğrudan Hafta Seçin</label>
                    <div style="display: flex; gap: 0.35rem; align-items: center;">
                        <button class="btn btn-outline btn-sm" onclick="stepCurriculumWeek(-1)" title="Önceki Hafta">◀</button>
                        <select id="curriculumWeekSelect" class="form-select" onchange="handleCurriculumWeekChange(this.value)" style="min-width: 170px;">
                            ${weekOptions}
                        </select>
                        <button class="btn btn-outline btn-sm" onclick="stepCurriculumWeek(1)" title="Sonraki Hafta">▶</button>
                        <button class="btn btn-secondary btn-sm" onclick="jumpToTodayCurriculum()" title="Bugünün Tarihine Git">📍 Bugün</button>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 0.6rem; align-items: flex-end;">
                <button class="btn btn-primary btn-sm" onclick="printOfficialCurriculumPlan()">
                    🖨️ Yıllık Planı Yazdır / PDF
                </button>
            </div>
        </div>

        <!-- 1. GÜNÜN / SEÇİLİ HAFTANIN SINIF DEFTERİ KART BÖLÜMÜ -->
        <div style="margin-bottom: 2rem;">
            ${defterCardHtml}
        </div>

        <!-- 2. TAM 36 HAFTALIK RESMİ YILLIK ÇERÇEVE PLAN TABLOSU -->
        <div class="card">
            <div class="card-header no-print">
                <div class="card-title-group">
                    <h2>📊 36 Haftalık MEB Yıllık Çerçeve Planı</h2>
                    <p><strong>${escapeHtml(course.name)}</strong> dersine ait tüm eğitim-öğretim yılı konuları ve haftalık resmi kazanımları.</p>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <div class="segmented-control">
                        <button class="segment-btn ${curriculum.planFilterTerm === 'all' ? 'active' : ''}" onclick="setCurriculumTermFilter('all')">Tüm Yıl</button>
                        <button class="segment-btn ${curriculum.planFilterTerm === '1' ? 'active' : ''}" onclick="setCurriculumTermFilter('1')">1. Dönem</button>
                        <button class="segment-btn ${curriculum.planFilterTerm === '2' ? 'active' : ''}" onclick="setCurriculumTermFilter('2')">2. Dönem</button>
                    </div>
                </div>
            </div>

            <!-- YAZDIRMA İÇİN MEB RESMİ ÜST BAŞLIK ALANI -->
            <div class="print-only meb-official-header" style="margin-bottom: 1.5rem; display: none;">
                <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.75rem;">
                    <h2 style="font-size: 1.15rem; margin: 0; text-transform: uppercase;">T.C. MİLLÎ EĞİTİM BAKANLIĞI</h2>
                    <h3 style="font-size: 1rem; margin: 0.25rem 0;" id="printSchoolName">${escapeHtml(db.getSettings().schoolName || '')}</h3>
                    <h4 style="font-size: 0.95rem; margin: 0; font-weight: normal;">
                        Bilişim Teknolojileri Alanı - ${escapeHtml(course.name)} Dersi Yıllık Planı
                    </h4>
                    <p style="font-size: 0.8rem; margin: 0.35rem 0 0 0;">
                        ${escapeHtml(db.getSettings().academicYear || '2024 - 2025')} Eğitim Öğretim Yılı | Haftalık Ders Saati: ${course.hoursPerWeek} Saat
                    </p>
                </div>
            </div>

            <div class="card-body">
                <div class="grading-table-wrapper">
                    <table class="data-table curriculum-table">
                        <thead>
                            <tr>
                                <th style="width: 50px; text-align: center;">Hafta</th>
                                <th style="width: 140px;">Tarih Aralığı</th>
                                <th style="width: 180px;">Öğrenme Birimi</th>
                                <th style="width: 200px;">Konu</th>
                                <th>Sınıf Defterine Yazılacak Kazanım</th>
                                <th style="width: 220px;">Önerilen Lab Uygulaması</th>
                                <th style="text-align: right; width: 120px;" class="no-print">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${planRows}
                        </tbody>
                    </table>
                </div>

                <!-- YAZDIRMA İÇİN İMZA ALANI -->
                <div class="print-only" style="margin-top: 2rem; display: none; justify-content: space-between; padding: 0 2rem;">
                    <div style="text-align: center;">
                        <p style="font-weight: bold; margin-bottom: 2.5rem;">${escapeHtml(db.getSettings().teacherName || 'Ders Öğretmeni')}</p>
                        <p style="font-size: 0.85rem;">Bilişim Teknolojileri Öğretmeni</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="font-weight: bold; margin-bottom: 2.5rem;">UYGUNDUR<br>.... / .... / 2024</p>
                        <p style="font-size: 0.85rem;">Okul Müdürü</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// Olay Yöneticileri (Event Handlers)
function handleCurriculumCourseChange(courseId) {
    curriculum.setCourse(courseId);
    renderCurriculumView();
}

function handleCurriculumDateChange(dateStr) {
    curriculum.setDate(dateStr);
    renderCurriculumView();
}

function handleCurriculumWeekChange(weekNumber) {
    curriculum.setWeek(weekNumber);
    renderCurriculumView();
}

function stepCurriculumWeek(delta) {
    const nextWeek = curriculum.selectedWeekNumber + delta;
    if (nextWeek >= 1 && nextWeek <= 36) {
        curriculum.setWeek(nextWeek);
        renderCurriculumView();
    }
}

function selectWeekDirectly(weekNumber) {
    curriculum.setWeek(weekNumber);
    renderCurriculumView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function jumpToTodayCurriculum() {
    curriculum.setDate(new Date().toISOString().slice(0, 10));
    renderCurriculumView();
}

function setCurriculumTermFilter(term) {
    curriculum.planFilterTerm = term;
    renderCurriculumView();
}

// Sınıf defteri metnini panoya kopyalama
function copyDefterOutcomeText() {
    const textEl = document.getElementById('defterOutcomeText');
    if (!textEl) return;

    const textToCopy = textEl.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('📋 Sınıf defteri kazanımı panoya kopyalandı!', 'success');
        }).catch(() => {
            fallbackCopy(textToCopy);
        });
    } else {
        fallbackCopy(textToCopy);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast('📋 Sınıf defteri kazanımı panoya kopyalandı!', 'success');
    } catch (e) {
        alert('Metin kopyalanamadı, lütfen elle kopyalayın: ' + text);
    }
    document.body.removeChild(textArea);
}

// Plandaki konudan doğrudan laboratuvar notlandırma görevi oluşturma
function createAssignmentFromCurriculum(courseId, weekNumber) {
    const weekData = curriculum.getCourseWeekData(courseId, weekNumber);
    if (!weekData) return;

    // Sistemde kayıtlı derslerde bu ders koduna veya adına uyan var mı kontrol et
    const curCourseMeta = MEB_CURRICULUM[courseId];
    const registeredCourses = db.getCourses();
    let targetCourse = registeredCourses.find(c => 
        (c.code && curCourseMeta.code && c.code.toLowerCase() === curCourseMeta.code.toLowerCase()) ||
        c.name.toLowerCase().includes(curCourseMeta.name.toLowerCase()) ||
        curCourseMeta.name.toLowerCase().includes(c.name.toLowerCase())
    );

    // Eğer ders henüz tanımlı değilse otomatik ekle
    if (!targetCourse) {
        targetCourse = db.saveCourse({
            name: curCourseMeta.name,
            code: curCourseMeta.code,
            description: curCourseMeta.description
        });
        showToast(`"${curCourseMeta.name}" dersi sisteme eklendi!`, 'info');
    }

    // Modal penceresini bu bilgilerle önceden doldur ve aç
    openNewAssignmentModal(targetCourse.id);

    // Form alanlarını doldur
    setTimeout(() => {
        const titleInput = document.getElementById('assignmentTitleInput');
        const criteriaInput = document.getElementById('assignmentCriteriaInput');
        const descInput = document.getElementById('assignmentDescInput');

        if (titleInput) titleInput.value = `${weekData.week}. Hafta: ${weekData.topic}`;
        if (criteriaInput) criteriaInput.value = weekData.criteria;
        if (descInput) descInput.value = `GÖREV: ${weekData.suggestedPractice}\n\nKAZANIM: ${weekData.outcome}`;
    }, 100);
}

// Yıllık Planı MEB Standartlarında Yazdırma
function printOfficialCurriculumPlan() {
    window.print();
}

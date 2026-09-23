/**
 * app.js - Uygulama Arayüz, Kimlik Doğrulama ve Etkileşim Yöneticisi
 * Meslek Lisesi Öğrenci Takip ve Notlandırma Uygulaması
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupNavigation();
    setupModals();
    setupEventListeners();

    // İlk açılışta hiç ders yoksa örnek verileri yükle
    if (db.getCourses().length === 0 && db.getClasses().length === 0) {
        db.loadSampleData();
    }

    // Oturum Kontrolü (Giriş Yapılmış mı?)
    checkAuthStatus();
}

// ==========================================
// 0. KİMLİK DOĞRULAMA (AUTH) İŞLEMLERİ
// ==========================================

function checkAuthStatus() {
    const loginScreen = document.getElementById('loginScreen');
    const isLoggedIn = db.isLoggedIn();

    if (isLoggedIn) {
        if (loginScreen) loginScreen.classList.add('hidden');
        renderHeaderInfo();
        renderAllViews();
    } else {
        if (loginScreen) loginScreen.classList.remove('hidden');
        // Giriş alanına odaklan
        setTimeout(() => {
            const userInput = document.getElementById('loginUsername');
            if (userInput) userInput.focus();
        }, 100);
    }
}

function handleLoginSubmit() {
    const user = document.getElementById('loginUsername').value;
    const pass = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginErrorMsg');

    if (db.authenticate(user, pass)) {
        if (errorEl) errorEl.style.display = 'none';
        document.getElementById('loginScreen').classList.add('hidden');
        renderHeaderInfo();
        renderAllViews();
        showToast('Başarıyla giriş yapıldı. İyi dersler!', 'success');
    } else {
        if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = 'Kullanıcı adı veya şifre hatalı!';
        }
        showToast('Giriş başarısız! Kullanıcı adı veya şifre hatalı.', 'error');
    }
}

function fillDefaultLogin() {
    const userInput = document.getElementById('loginUsername');
    const passInput = document.getElementById('loginPassword');
    if (userInput) userInput.value = 'admin';
    if (passInput) passInput.value = '1234';
    const errorEl = document.getElementById('loginErrorMsg');
    if (errorEl) errorEl.style.display = 'none';
    showToast('Varsayılan bilgiler dolduruldu.', 'info');
}

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🔒';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

function handleLogout() {
    if (confirm('Oturumu kapatmak istediğinize emin misiniz?')) {
        db.logout();
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) loginScreen.classList.remove('hidden');
        document.getElementById('loginPassword').value = '';
        showToast('Oturum kapatıldı.', 'info');
    }
}

function handleChangePasswordSubmit() {
    const newUsername = document.getElementById('settingUsername').value.trim();
    const currentPass = document.getElementById('settingCurrentPass').value;
    const newPass = document.getElementById('settingNewPass').value;

    const result = db.changePassword(currentPass, newPass, newUsername);
    if (result.success) {
        showToast(result.message, 'success');
        document.getElementById('settingCurrentPass').value = '';
        document.getElementById('settingNewPass').value = '';
        renderHeaderInfo();
    } else {
        showToast(result.message, 'error');
    }
}


// ==========================================
// 1. ÜST BİLGİ & SEKME NAVİGASYONU
// ==========================================

function renderHeaderInfo() {
    const settings = db.getSettings();
    const currentUser = db.getCurrentUser();

    const schoolEl = document.getElementById('headerSchoolName');
    const teacherEl = document.getElementById('headerTeacherName');
    const currentUserNameEl = document.getElementById('headerCurrentUserName');
    const avatarEl = document.getElementById('headerAvatar');

    if (schoolEl) schoolEl.textContent = settings.schoolName || 'Mesleki ve Teknik Anadolu Lisesi';
    if (teacherEl) teacherEl.textContent = settings.teacherName ? `${settings.teacherName} - ${settings.department}` : (settings.department || 'Bilişim Teknolojileri');
    
    const displayUser = currentUser ? currentUser.username : (settings.teacherName || 'admin');
    if (currentUserNameEl) currentUserNameEl.textContent = displayUser;
    if (avatarEl) avatarEl.textContent = displayUser.charAt(0).toUpperCase();

    // Ayarlar sekmesindeki kullanıcı adını doldur
    const settingUser = document.getElementById('settingUsername');
    if (settingUser) settingUser.value = displayUser;
}

function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetView = tab.dataset.view;
            switchView(targetView);
        });
    });
}

function switchView(viewId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.view === viewId);
    });

    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.toggle('active', view.id === viewId);
    });

    if (viewId === 'view-grading') {
        populateGradingSelectors();
        renderGradingTable();
    } else if (viewId === 'view-matrix') {
        populateMatrixSelectors();
        renderMatrixTable();
    } else if (viewId === 'view-courses') {
        renderCoursesView();
    } else if (viewId === 'view-classes') {
        renderClassesView();
    } else if (viewId === 'view-students') {
        renderStudentsView();
    } else if (viewId === 'view-assignments') {
        renderAssignmentsView();
    } else if (viewId === 'view-settings') {
        renderSettingsView();
    }
}

function renderAllViews() {
    populateGradingSelectors();
    renderGradingTable();
    updateTabBadges();
}

function updateTabBadges() {
    const courses = db.getCourses();
    const classes = db.getClasses();
    const students = db.getStudents();
    const assignments = db.getAssignments();

    const courseBadge = document.getElementById('badgeCourseCount');
    const classBadge = document.getElementById('badgeClassCount');
    const studentBadge = document.getElementById('badgeStudentCount');
    const assignmentBadge = document.getElementById('badgeAssignmentCount');

    if (courseBadge) courseBadge.textContent = courses.length;
    if (classBadge) classBadge.textContent = classes.length;
    if (studentBadge) studentBadge.textContent = students.length;
    if (assignmentBadge) assignmentBadge.textContent = assignments.length;
}


// ==========================================
// 2. HIZLI NOTLANDIRMA EKRANI (GRADING VIEW)
// ==========================================

function populateGradingSelectors() {
    const courseSelect = document.getElementById('gradingCourseSelect');
    const classSelect = document.getElementById('gradingClassSelect');
    if (!courseSelect || !classSelect) return;

    const courses = db.getCourses();
    const classes = db.getClasses();

    const currentCourseId = courseSelect.value || (courses[0] ? courses[0].id : '');
    courseSelect.innerHTML = courses.map(c => 
        `<option value="${c.id}" ${c.id === currentCourseId ? 'selected' : ''}>${escapeHtml(c.name)} ${c.code ? `(${escapeHtml(c.code)})` : ''}</option>`
    ).join('');

    const currentClassId = classSelect.value || (classes[0] ? classes[0].id : '');
    classSelect.innerHTML = classes.map(c => 
        `<option value="${c.id}" ${c.id === currentClassId ? 'selected' : ''}>${escapeHtml(c.name)}</option>`
    ).join('');

    updateGradingAssignmentOptions();
}

function updateGradingAssignmentOptions() {
    const courseSelect = document.getElementById('gradingCourseSelect');
    const classSelect = document.getElementById('gradingClassSelect');
    const assignmentSelect = document.getElementById('gradingAssignmentSelect');
    if (!assignmentSelect) return;

    const courseId = courseSelect ? courseSelect.value : null;
    const classId = classSelect ? classSelect.value : null;

    const assignments = db.getAssignments(courseId, classId);
    if (assignments.length === 0) {
        assignmentSelect.innerHTML = '<option value="">-- Bu Derse Ait Uygulama Yok --</option>';
    } else {
        assignmentSelect.innerHTML = assignments.map((a, idx) => 
            `<option value="${a.id}" ${idx === 0 ? 'selected' : ''}>${escapeHtml(a.title)} (${a.date || 'Tarihsiz'})</option>`
        ).join('');
    }
}

function renderGradingTable() {
    const courseSelect = document.getElementById('gradingCourseSelect');
    const classSelect = document.getElementById('gradingClassSelect');
    const assignmentSelect = document.getElementById('gradingAssignmentSelect');
    const container = document.getElementById('gradingTableContainer');
    const statsContainer = document.getElementById('gradingStatsContainer');

    if (!courseSelect || !classSelect || !assignmentSelect || !container) return;

    const courseId = courseSelect.value;
    const classId = classSelect.value;
    const assignmentId = assignmentSelect.value;

    if (!courseId) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <h3>Lütfen Bir Ders Tanımlayın veya Seçin</h3>
                <p>Not girişi yapabilmek için önce bir ders oluşturmalısınız.</p>
                <button class="btn btn-primary" onclick="openCourseModal()">➕ Yeni Ders Ekle</button>
            </div>
        `;
        if (statsContainer) statsContainer.innerHTML = '';
        return;
    }

    if (!classId) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🏫</div>
                <h3>Lütfen Bir Sınıf Seçin</h3>
                <button class="btn btn-primary" onclick="openClassModal()">➕ Yeni Sınıf Ekle</button>
            </div>
        `;
        if (statsContainer) statsContainer.innerHTML = '';
        return;
    }

    if (!assignmentId) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <h3>Bu Derse Ait Uygulama Bulunmuyor</h3>
                <p>Seçili ders için henüz bir laboratuvar uygulaması eklemediniz.</p>
                <button class="btn btn-primary" onclick="openNewAssignmentModal('${courseId}', '${classId}')">➕ Bu Derse Uygulama Ekle</button>
            </div>
        `;
        if (statsContainer) statsContainer.innerHTML = '';
        return;
    }

    const students = db.getStudents(classId);
    const assignment = db.getAssignment(assignmentId);

    if (students.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👥</div>
                <h3>Bu Sınıfta Kayıtlı Öğrenci Yok</h3>
                <p>Seçtiğiniz sınıfa henüz öğrenci eklemediniz. e-Okul veya Excel'den hızlıca kopyalayabilirsiniz.</p>
                <button class="btn btn-primary" onclick="openBulkStudentModal('${classId}')">📋 Toplu Öğrenci Ekle</button>
            </div>
        `;
        if (statsContainer) statsContainer.innerHTML = '';
        return;
    }

    let gradedCount = 0;
    let totalScore = 0;

    const tableRows = students.map((std, index) => {
        const grade = db.getGrade(assignmentId, std.id) || { score: '', status: 'pending', note: '' };
        
        const hasScore = grade.score !== '' && grade.score !== null && grade.score !== undefined;
        if (hasScore) {
            gradedCount++;
            totalScore += Number(grade.score);
        }

        let scoreClass = '';
        if (hasScore) {
            const num = Number(grade.score);
            if (num >= 85) scoreClass = 'score-high';
            else if (num >= 70) scoreClass = 'score-mid';
            else if (num >= 50) scoreClass = 'score-low';
            else scoreClass = 'score-fail';
        }

        return `
            <tr data-student-id="${std.id}">
                <td style="width: 50px; text-align: center; color: var(--text-muted);">${index + 1}</td>
                <td style="width: 100px;">
                    <span class="student-no-badge">${escapeHtml(std.number)}</span>
                </td>
                <td class="student-name-cell">
                    ${escapeHtml(std.name)} ${escapeHtml(std.surname)}
                </td>
                <td style="width: 230px;">
                    <div class="score-input-wrapper">
                        <input type="number" 
                               class="score-input ${scoreClass}" 
                               id="score_${std.id}" 
                               data-student-id="${std.id}"
                               data-index="${index}"
                               min="0" 
                               max="${assignment ? assignment.maxScore || 100 : 100}" 
                               value="${grade.score !== undefined && grade.score !== null ? grade.score : ''}" 
                               placeholder="-"
                               autocomplete="off">
                        <div class="quick-score-pills">
                            <button type="button" class="pill-btn" onclick="setQuickScore('${std.id}', 100)">100</button>
                            <button type="button" class="pill-btn" onclick="setQuickScore('${std.id}', 85)">85</button>
                            <button type="button" class="pill-btn" onclick="setQuickScore('${std.id}', 70)">70</button>
                            <button type="button" class="pill-btn pill-absent" title="Gelmedi / Yapmadı" onclick="setQuickScore('${std.id}', 0, 'absent')">G</button>
                        </div>
                    </div>
                </td>
                <td style="width: 160px;">
                    <select class="form-select form-select-sm" 
                            id="status_${std.id}" 
                            data-student-id="${std.id}"
                            onchange="onStatusChange('${std.id}')">
                        <option value="submitted" ${grade.status === 'submitted' ? 'selected' : ''}>✅ Teslim Etti</option>
                        <option value="incomplete" ${grade.status === 'incomplete' ? 'selected' : ''}>⚠️ Eksik Yaptı</option>
                        <option value="late" ${grade.status === 'late' ? 'selected' : ''}>⏳ Geç Teslim</option>
                        <option value="absent" ${grade.status === 'absent' ? 'selected' : ''}>❌ G (Gelmedi)</option>
                        <option value="pending" ${(!grade.status || grade.status === 'pending') ? 'selected' : ''}>⏳ Bekliyor</option>
                    </select>
                </td>
                <td>
                    <input type="text" 
                           class="form-input form-input-sm" 
                           id="note_${std.id}" 
                           data-student-id="${std.id}"
                           value="${escapeHtml(grade.note || '')}" 
                           placeholder="Öğretmen notu..."
                           onchange="onNoteChange('${std.id}')"
                           style="width: 100%;">
                </td>
            </tr>
        `;
    }).join('');

    const classAverage = gradedCount > 0 ? (totalScore / gradedCount).toFixed(1) : 0;
    const successRate = gradedCount > 0 ? Math.round((students.filter(s => {
        const g = db.getGrade(assignmentId, s.id);
        return g && g.score >= 50;
    }).length / gradedCount) * 100) : 0;

    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon-wrapper stat-icon-blue">👥</div>
                    <div class="stat-info">
                        <div class="stat-value">${students.length}</div>
                        <div class="stat-label">Toplam Öğrenci</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon-wrapper stat-icon-green">📝</div>
                    <div class="stat-info">
                        <div class="stat-value">${gradedCount} / ${students.length}</div>
                        <div class="stat-label">Not Girilen</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon-wrapper stat-icon-purple">🎯</div>
                    <div class="stat-info">
                        <div class="stat-value">${classAverage}</div>
                        <div class="stat-label">Uygulama Ortalaması</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon-wrapper stat-icon-amber">📊</div>
                    <div class="stat-info">
                        <div class="stat-value">%${successRate}</div>
                        <div class="stat-label">Başarı Oranı (>=50)</div>
                    </div>
                </div>
            </div>
        `;
    }

    let criteriaHtml = '';
    if (assignment && (assignment.criteria || assignment.description)) {
        criteriaHtml = `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-md); padding: 0.8rem 1.1rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem;">
                <div>
                    <strong>📌 Kriterler / Açıklama:</strong> 
                    <span style="color: #166534;">${escapeHtml(assignment.criteria || assignment.description)}</span>
                </div>
                <div style="font-weight: 800; color: #15803d; white-space: nowrap; margin-left: 1rem;">
                    Maks: ${assignment.maxScore || 100} Puan
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        ${criteriaHtml}
        <div class="grading-table-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="width: 50px; text-align: center;">#</th>
                        <th style="width: 100px;">No</th>
                        <th>Öğrenci Adı Soyadı</th>
                        <th style="width: 230px;">Puan (0-100)</th>
                        <th style="width: 160px;">Durum</th>
                        <th>Öğretmen Görüşü / Notu</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    `;

    setupGradingInputKeyEvents();
}

function setupGradingInputKeyEvents() {
    const inputs = Array.from(document.querySelectorAll('.score-input'));
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === 'ArrowDown') {
                e.preventDefault();
                const next = inputs[index + 1];
                if (next) {
                    next.focus();
                    next.select();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = inputs[index - 1];
                if (prev) {
                    prev.focus();
                    prev.select();
                }
            } else if (e.key.toLowerCase() === 'g') {
                e.preventDefault();
                const studentId = input.dataset.studentId;
                setQuickScore(studentId, 0, 'absent');
                const next = inputs[index + 1];
                if (next) {
                    next.focus();
                    next.select();
                }
            }
        });

        input.addEventListener('change', () => {
            saveScoreFromInput(input);
        });

        input.addEventListener('blur', () => {
            saveScoreFromInput(input);
        });
    });
}

function saveScoreFromInput(input) {
    const studentId = input.dataset.studentId;
    const assignmentId = document.getElementById('gradingAssignmentSelect').value;
    if (!assignmentId || !studentId) return;

    let val = input.value.trim();
    let score = null;
    let status = document.getElementById(`status_${studentId}`).value;

    if (val !== '') {
        score = parseInt(val, 10);
        if (isNaN(score)) score = 0;
        if (score < 0) score = 0;
        if (score > 100) score = 100;
        input.value = score;

        if (status === 'pending' || status === 'absent') {
            status = 'submitted';
            document.getElementById(`status_${studentId}`).value = 'submitted';
        }
    }

    const note = document.getElementById(`note_${studentId}`).value.trim();
    db.saveGrade(assignmentId, studentId, { score, status, note });
    updateScoreInputStyling(input, score);
    renderGradingStatsOnly();
}

function setQuickScore(studentId, score, status = 'submitted') {
    const assignmentId = document.getElementById('gradingAssignmentSelect').value;
    if (!assignmentId) return;

    const input = document.getElementById(`score_${studentId}`);
    const statusSelect = document.getElementById(`status_${studentId}`);
    const noteInput = document.getElementById(`note_${studentId}`);

    if (input) input.value = score;
    if (statusSelect) statusSelect.value = status;

    db.saveGrade(assignmentId, studentId, {
        score: score,
        status: status,
        note: noteInput ? noteInput.value.trim() : ''
    });

    if (input) updateScoreInputStyling(input, score);
    renderGradingStatsOnly();
    showToast(`Not kaydedildi: ${score}`, 'success');
}

function onStatusChange(studentId) {
    const assignmentId = document.getElementById('gradingAssignmentSelect').value;
    const status = document.getElementById(`status_${studentId}`).value;
    const scoreInput = document.getElementById(`score_${studentId}`);
    const noteInput = document.getElementById(`note_${studentId}`);

    if (status === 'absent' && scoreInput) {
        scoreInput.value = '0';
    }

    const score = scoreInput && scoreInput.value !== '' ? parseInt(scoreInput.value, 10) : null;
    db.saveGrade(assignmentId, studentId, { score, status, note: noteInput ? noteInput.value.trim() : '' });
    if (scoreInput) updateScoreInputStyling(scoreInput, score);
    renderGradingStatsOnly();
}

function onNoteChange(studentId) {
    const assignmentId = document.getElementById('gradingAssignmentSelect').value;
    const note = document.getElementById(`note_${studentId}`).value.trim();
    const scoreInput = document.getElementById(`score_${studentId}`);
    const statusSelect = document.getElementById(`status_${studentId}`);

    const score = scoreInput && scoreInput.value !== '' ? parseInt(scoreInput.value, 10) : null;
    const status = statusSelect ? statusSelect.value : 'submitted';
    db.saveGrade(assignmentId, studentId, { score, status, note });
}

function updateScoreInputStyling(input, score) {
    input.classList.remove('score-high', 'score-mid', 'score-low', 'score-fail');
    if (score !== null && score !== undefined && score !== '') {
        const num = Number(score);
        if (num >= 85) input.classList.add('score-high');
        else if (num >= 70) input.classList.add('score-mid');
        else if (num >= 50) input.classList.add('score-low');
        else input.classList.add('score-fail');
    }
}

function renderGradingStatsOnly() {
    const classId = document.getElementById('gradingClassSelect').value;
    const assignmentId = document.getElementById('gradingAssignmentSelect').value;
    if (!classId || !assignmentId) return;

    const students = db.getStudents(classId);
    let gradedCount = 0;
    let totalScore = 0;

    students.forEach(s => {
        const g = db.getGrade(assignmentId, s.id);
        if (g && g.score !== '' && g.score !== null && g.score !== undefined) {
            gradedCount++;
            totalScore += Number(g.score);
        }
    });

    const classAverage = gradedCount > 0 ? (totalScore / gradedCount).toFixed(1) : 0;
    const successRate = gradedCount > 0 ? Math.round((students.filter(s => {
        const g = db.getGrade(assignmentId, s.id);
        return g && g.score >= 50;
    }).length / gradedCount) * 100) : 0;

    const statsContainer = document.getElementById('gradingStatsContainer');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon-wrapper stat-icon-blue">👥</div>
                    <div class="stat-info">
                        <div class="stat-value">${students.length}</div>
                        <div class="stat-label">Toplam Öğrenci</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon-wrapper stat-icon-green">📝</div>
                    <div class="stat-info">
                        <div class="stat-value">${gradedCount} / ${students.length}</div>
                        <div class="stat-label">Not Girilen</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon-wrapper stat-icon-purple">🎯</div>
                    <div class="stat-info">
                        <div class="stat-value">${classAverage}</div>
                        <div class="stat-label">Uygulama Ortalaması</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon-wrapper stat-icon-amber">📊</div>
                    <div class="stat-info">
                        <div class="stat-value">%${successRate}</div>
                        <div class="stat-label">Başarı Oranı (>=50)</div>
                    </div>
                </div>
            </div>
        `;
    }
}


// ==========================================
// 3. NOT ÇİZELGESİ VE RAPORLAR (MATRIX VIEW)
// ==========================================

function populateMatrixSelectors() {
    const courseSelect = document.getElementById('matrixCourseSelect');
    const classSelect = document.getElementById('matrixClassSelect');
    if (!courseSelect || !classSelect) return;

    const courses = db.getCourses();
    const classes = db.getClasses();

    const currentCourseId = courseSelect.value || (courses[0] ? courses[0].id : '');
    courseSelect.innerHTML = courses.map(c => 
        `<option value="${c.id}" ${c.id === currentCourseId ? 'selected' : ''}>${escapeHtml(c.name)} ${c.code ? `(${escapeHtml(c.code)})` : ''}</option>`
    ).join('');

    const currentClassId = classSelect.value || (classes[0] ? classes[0].id : '');
    classSelect.innerHTML = classes.map(c => 
        `<option value="${c.id}" ${c.id === currentClassId ? 'selected' : ''}>${escapeHtml(c.name)}</option>`
    ).join('');
}

function renderMatrixTable() {
    const courseSelect = document.getElementById('matrixCourseSelect');
    const classSelect = document.getElementById('matrixClassSelect');
    const container = document.getElementById('matrixTableContainer');
    if (!courseSelect || !classSelect || !container) return;

    const courseId = courseSelect.value;
    const classId = classSelect.value;

    if (!courseId || !classId) {
        container.innerHTML = '<div class="empty-state"><h3>Lütfen Ders ve Sınıf Seçin</h3></div>';
        return;
    }

    const course = db.getCourse(courseId);
    const cls = db.getClass(classId);
    const students = db.getStudents(classId);
    const assignments = db.getAssignments(courseId, classId);
    const settings = db.getSettings();

    if (students.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Bu sınıfta kayıtlı öğrenci bulunmuyor.</h3></div>';
        return;
    }

    if (assignments.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Bu derse henüz uygulama eklenmemiş.</h3></div>';
        return;
    }

    const printHeaderHtml = `
        <div class="print-only-header">
            <h2>T.C. MİLLÎ EĞİTİM BAKANLIĞI</h2>
            <h3>${escapeHtml(settings.schoolName || 'Mesleki ve Teknik Anadolu Lisesi')}</h3>
            <h3>UYGULAMA VE LABORATUVAR DEĞERLENDİRME ÇİZELGESİ</h3>
            <div class="print-meta-grid">
                <div><strong>Eğitim Öğretim Yılı:</strong> ${escapeHtml(settings.academicYear || '2024-2025')}</div>
                <div><strong>Alan / Dal:</strong> ${escapeHtml(settings.department || 'Bilişim Teknolojileri')}</div>
                <div><strong>Ders Adı:</strong> ${escapeHtml(course ? course.name : '-')}</div>
                <div><strong>Sınıfı:</strong> ${escapeHtml(cls ? cls.name : '')}</div>
            </div>
        </div>
    `;

    const assignmentHeaders = assignments.map((a, i) => 
        `<th class="matrix-score-cell" title="${escapeHtml(a.title)} (${a.date || ''})">
            <div>Uyg.${i + 1}</div>
            <div style="font-size: 0.68rem; font-weight: normal; color: var(--text-muted);">${escapeHtml(a.date || '')}</div>
        </th>`
    ).join('');

    let classTotalScore = 0;
    let classTotalCount = 0;

    const rowsHtml = students.map((std, index) => {
        let stdTotalScore = 0;
        let stdGradedCount = 0;

        const scoreCells = assignments.map(a => {
            const grade = db.getGrade(a.id, std.id);
            if (grade && grade.score !== '' && grade.score !== null && grade.score !== undefined) {
                const score = Number(grade.score);
                stdTotalScore += score;
                stdGradedCount++;
                classTotalScore += score;
                classTotalCount++;

                let badgeColor = '#0f172a';
                if (score >= 85) badgeColor = '#15803d';
                else if (score >= 70) badgeColor = '#1d4ed8';
                else if (score >= 50) badgeColor = '#b45309';
                else badgeColor = '#b91c1c';

                return `<td class="matrix-score-cell" style="font-weight: 800; color: ${badgeColor};">${score}</td>`;
            } else if (grade && grade.status === 'absent') {
                return `<td class="matrix-score-cell" style="color: #dc2626; font-weight: bold;">G</td>`;
            } else {
                return `<td class="matrix-score-cell" style="color: var(--text-light);">-</td>`;
            }
        }).join('');

        const studentAvg = stdGradedCount > 0 ? (stdTotalScore / stdGradedCount).toFixed(1) : '-';

        return `
            <tr>
                <td style="width: 40px; text-align: center;">${index + 1}</td>
                <td style="width: 80px;"><span class="student-no-badge">${escapeHtml(std.number)}</span></td>
                <td class="student-name-cell">${escapeHtml(std.name)} ${escapeHtml(std.surname)}</td>
                ${scoreCells}
                <td class="matrix-avg">${studentAvg}</td>
            </tr>
        `;
    }).join('');

    const assignmentAverages = assignments.map(a => {
        let sum = 0;
        let count = 0;
        students.forEach(s => {
            const g = db.getGrade(a.id, s.id);
            if (g && g.score !== '' && g.score !== null && g.score !== undefined) {
                sum += Number(g.score);
                count++;
            }
        });
        const avg = count > 0 ? (sum / count).toFixed(1) : '-';
        return `<td class="matrix-score-cell" style="font-weight: 800; background: #f8fafc;">${avg}</td>`;
    }).join('');

    const generalClassAvg = classTotalCount > 0 ? (classTotalScore / classTotalCount).toFixed(1) : '-';

    const printSignaturesHtml = `
        <div class="print-signatures">
            <div class="signature-box">
                <div>${escapeHtml(settings.teacherName || 'Ders Öğretmeni')}</div>
                <div style="font-size: 8pt; color: #555;">Ders Öğretmeni</div>
                <div class="signature-line">İmza</div>
            </div>
            <div class="signature-box">
                <div>Okul Müdürü</div>
                <div style="font-size: 8pt; color: #555;">Uygundur</div>
                <div class="signature-line">İmza / Mühür</div>
            </div>
        </div>
    `;

    container.innerHTML = `
        ${printHeaderHtml}
        <div class="grading-table-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="width: 40px; text-align: center;">#</th>
                        <th style="width: 80px;">No</th>
                        <th>Öğrenci Adı Soyadı</th>
                        ${assignmentHeaders}
                        <th class="matrix-score-cell" style="width: 90px; background: #f1f5f9;">ORTALAMA</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
                <tfoot>
                    <tr style="border-top: 2px solid var(--border); font-weight: bold;">
                        <td colspan="3" style="text-align: right; background: #f8fafc;">UYGULAMA ORTALAMALARI:</td>
                        ${assignmentAverages}
                        <td class="matrix-avg" style="background: #e2e8f0; font-size: 1rem; color: var(--primary);">${generalClassAvg}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        ${printSignaturesHtml}
    `;
}

function exportMatrixToCSV() {
    const courseSelect = document.getElementById('matrixCourseSelect');
    const classSelect = document.getElementById('matrixClassSelect');
    if (!courseSelect || !classSelect) return;

    const courseId = courseSelect.value;
    const classId = classSelect.value;
    const course = db.getCourse(courseId);
    const cls = db.getClass(classId);
    const students = db.getStudents(classId);
    const assignments = db.getAssignments(courseId, classId);

    if (!cls || students.length === 0) {
        showToast('Dışa aktarılacak veri bulunamadı!', 'warning');
        return;
    }

    let csv = '\uFEFF';
    const headerCols = ['Sıra No', 'Okul No', 'Adı', 'Soyadı'];
    assignments.forEach(a => headerCols.push(a.title.replace(/;/g, ' ')));
    headerCols.push('Ortalama');
    csv += headerCols.join(';') + '\r\n';

    students.forEach((std, index) => {
        const row = [index + 1, std.number, std.name, std.surname];
        let total = 0;
        let count = 0;
        assignments.forEach(a => {
            const g = db.getGrade(a.id, std.id);
            if (g && g.score !== '' && g.score !== null && g.score !== undefined) {
                row.push(g.score);
                total += Number(g.score);
                count++;
            } else if (g && g.status === 'absent') {
                row.push('G');
            } else {
                row.push('');
            }
        });
        row.push(count > 0 ? (total / count).toFixed(1) : '');
        csv += row.join(';') + '\r\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeCourse = course ? course.name.replace(/\s+/g, '_') : 'Ders';
    a.download = `${safeCourse}_${cls.name}_Not_Cizelgesi_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Excel/CSV dosyası başarıyla indirildi!', 'success');
}


// ==========================================
// 4. DERS YÖNETİMİ (COURSES VIEW)
// ==========================================

function renderCoursesView() {
    const container = document.getElementById('coursesListContainer');
    if (!container) return;

    const courses = db.getCourses();
    if (courses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <h3>Henüz Ders Tanımlanmamış</h3>
                <p>Verdiğiniz dersleri (Örn: Web Tabanlı Uygulama Geliştirme, Programlama Temelleri) ekleyerek başlayın.</p>
                <button class="btn btn-primary" onclick="openCourseModal()">➕ Yeni Ders Ekle</button>
            </div>
        `;
        return;
    }

    const cardsHtml = courses.map(crs => {
        const assignments = db.getAssignments(crs.id);

        return `
            <div class="card" style="margin-bottom: 1rem;">
                <div class="card-header">
                    <div class="card-title-group" style="display: flex; align-items: center; gap: 0.75rem;">
                        ${crs.code ? `<span class="course-badge">${escapeHtml(crs.code)}</span>` : ''}
                        <div>
                            <h2>${escapeHtml(crs.name)}</h2>
                            <p>${escapeHtml(crs.description || 'Açıklama girilmedi')}</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary btn-sm" onclick="openCourseModal('${crs.id}')">✏️ Düzenle</button>
                        <button class="btn btn-outline btn-sm" onclick="confirmDeleteCourse('${crs.id}')" style="color: var(--danger);">🗑️ Sil</button>
                    </div>
                </div>
                <div class="card-body" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <span style="font-size: 1.35rem; font-weight: 800; color: var(--accent);">${assignments.length}</span>
                        <span style="font-size: 0.82rem; color: var(--text-muted); display: block; font-weight: 600;">Tanımlı Uygulama Görevi</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-primary btn-sm" onclick="openNewAssignmentModal('${crs.id}')">➕ Bu Derse Uygulama Ekle</button>
                        <button class="btn btn-outline btn-sm" onclick="goToCourseGrading('${crs.id}')">📝 Not Girişine Git</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = cardsHtml;
    updateTabBadges();
}

function goToCourseGrading(courseId) {
    const courseSelect = document.getElementById('gradingCourseSelect');
    if (courseSelect) {
        courseSelect.value = courseId;
        updateGradingAssignmentOptions();
    }
    switchView('view-grading');
}

function openCourseModal(courseId = null) {
    const titleEl = document.getElementById('courseModalTitle');
    const idInput = document.getElementById('courseIdInput');
    const nameInput = document.getElementById('courseNameInput');
    const codeInput = document.getElementById('courseCodeInput');
    const descInput = document.getElementById('courseDescInput');

    if (courseId) {
        const crs = db.getCourse(courseId);
        if (crs) {
            titleEl.textContent = 'Dersi Düzenle';
            idInput.value = crs.id;
            nameInput.value = crs.name;
            codeInput.value = crs.code || '';
            descInput.value = crs.description || '';
        }
    } else {
        titleEl.textContent = 'Yeni Ders Ekle';
        idInput.value = '';
        nameInput.value = '';
        codeInput.value = '';
        descInput.value = '';
    }

    openModal('courseModal');
}

function saveCourseFromModal() {
    const id = document.getElementById('courseIdInput').value;
    const name = document.getElementById('courseNameInput').value.trim();
    const code = document.getElementById('courseCodeInput').value.trim();
    const description = document.getElementById('courseDescInput').value.trim();

    if (!name) {
        showToast('Lütfen ders adını girin!', 'warning');
        return;
    }

    db.saveCourse({ id: id || undefined, name, code, description });
    closeModal('courseModal');
    renderCoursesView();
    populateGradingSelectors();
    populateMatrixSelectors();
    showToast('Ders başarıyla kaydedildi!', 'success');
}

function confirmDeleteCourse(courseId) {
    const crs = db.getCourse(courseId);
    if (!crs) return;
    if (confirm(`"${crs.name}" dersini ve bu derse bağlı tüm uygulama ve notları silmek istediğinize emin misiniz?`)) {
        db.deleteCourse(courseId);
        renderCoursesView();
        populateGradingSelectors();
        populateMatrixSelectors();
        showToast('Ders silindi!', 'info');
    }
}


// ==========================================
// 5. SINIF YÖNETİMİ (CLASSES VIEW)
// ==========================================

function renderClassesView() {
    const container = document.getElementById('classesListContainer');
    if (!container) return;

    const classes = db.getClasses();
    if (classes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🏫</div>
                <h3>Henüz Sınıf Eklenmemiş</h3>
                <p>İlk sınıfınızı ekleyerek öğrencilerinizi tanımlamaya başlayabilirsiniz.</p>
                <button class="btn btn-primary" onclick="openClassModal()">➕ Yeni Sınıf Ekle</button>
            </div>
        `;
        return;
    }

    const cardsHtml = classes.map(cls => {
        const studentCount = db.getStudents(cls.id).length;

        return `
            <div class="card" style="margin-bottom: 1rem;">
                <div class="card-header">
                    <div class="card-title-group">
                        <h2>${escapeHtml(cls.name)}</h2>
                        <p>${escapeHtml(cls.description || 'Laboratuvar/Açıklama belirtilmemiş')}</p>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary btn-sm" onclick="openClassModal('${cls.id}')">✏️ Düzenle</button>
                        <button class="btn btn-outline btn-sm" onclick="confirmDeleteClass('${cls.id}')" style="color: var(--danger);">🗑️ Sil</button>
                    </div>
                </div>
                <div class="card-body" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <span style="font-size: 1.35rem; font-weight: 800; color: var(--primary);">${studentCount}</span>
                        <span style="font-size: 0.82rem; color: var(--text-muted); display: block; font-weight: 600;">Kayıtlı Öğrenci</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-outline btn-sm" onclick="openBulkStudentModal('${cls.id}')">📋 Toplu Öğrenci Ekle</button>
                        <button class="btn btn-outline btn-sm" onclick="openStudentModal(null, '${cls.id}')">➕ Tek Öğrenci</button>
                        <button class="btn btn-primary btn-sm" onclick="goToClassGrading('${cls.id}')">📝 Not Ver</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = cardsHtml;
    updateTabBadges();
}

function goToClassGrading(classId) {
    const classSelect = document.getElementById('gradingClassSelect');
    if (classSelect) {
        classSelect.value = classId;
        updateGradingAssignmentOptions();
    }
    switchView('view-grading');
}

function openClassModal(classId = null) {
    const titleEl = document.getElementById('classModalTitle');
    const idInput = document.getElementById('classIdInput');
    const nameInput = document.getElementById('classNameInput');
    const descInput = document.getElementById('classDescInput');

    if (classId) {
        const cls = db.getClass(classId);
        if (cls) {
            titleEl.textContent = 'Sınıfı Düzenle';
            idInput.value = cls.id;
            nameInput.value = cls.name;
            descInput.value = cls.description || '';
        }
    } else {
        titleEl.textContent = 'Yeni Sınıf Ekle';
        idInput.value = '';
        nameInput.value = '';
        descInput.value = '';
    }

    openModal('classModal');
}

function saveClassFromModal() {
    const id = document.getElementById('classIdInput').value;
    const name = document.getElementById('classNameInput').value.trim();
    const description = document.getElementById('classDescInput').value.trim();

    if (!name) {
        showToast('Lütfen sınıf adını girin (Örn: 11-A Bilişim)', 'warning');
        return;
    }

    db.saveClass({ id: id || undefined, name, description });
    closeModal('classModal');
    renderClassesView();
    populateGradingSelectors();
    populateMatrixSelectors();
    showToast('Sınıf başarıyla kaydedildi!', 'success');
}

function confirmDeleteClass(classId) {
    const cls = db.getClass(classId);
    if (!cls) return;
    if (confirm(`"${cls.name}" sınıfını ve bu sınıfa ait tüm öğrencileri silmek istediğinize emin misiniz?`)) {
        db.deleteClass(classId);
        renderClassesView();
        populateGradingSelectors();
        populateMatrixSelectors();
        showToast('Sınıf silindi!', 'info');
    }
}


// ==========================================
// 6. ÖĞRENCİ YÖNETİMİ (STUDENTS VIEW)
// ==========================================

function renderStudentsView() {
    const classFilter = document.getElementById('studentClassFilter');
    const searchInput = document.getElementById('studentSearchInput');
    const container = document.getElementById('studentsListContainer');
    if (!classFilter || !container) return;

    const classes = db.getClasses();
    const currentFilter = classFilter.value;

    classFilter.innerHTML = '<option value="">-- Tüm Sınıflar --</option>' + classes.map(c => 
        `<option value="${c.id}" ${c.id === currentFilter ? 'selected' : ''}>${escapeHtml(c.name)}</option>`
    ).join('');

    const classId = classFilter.value;
    const searchTerm = (searchInput ? searchInput.value : '').toLowerCase().trim();

    let students = db.getStudents(classId || null);

    if (searchTerm) {
        students = students.filter(s => 
            s.number.includes(searchTerm) || 
            s.name.toLowerCase().includes(searchTerm) || 
            (s.surname && s.surname.toLowerCase().includes(searchTerm))
        );
    }

    if (students.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👥</div>
                <h3>Öğrenci Bulunamadı</h3>
                <p>Kriterlere uygun öğrenci bulunamadı. Yeni öğrenci ekleyebilir veya toplu aktarım yapabilirsiniz.</p>
                <div style="display: flex; gap: 0.5rem; justify-content: center;">
                    <button class="btn btn-primary" onclick="openStudentModal()">➕ Tek Öğrenci Ekle</button>
                    <button class="btn btn-secondary" onclick="openBulkStudentModal('${classId || ''}')">📋 Toplu Öğrenci Ekle</button>
                </div>
            </div>
        `;
        return;
    }

    const rowsHtml = students.map((std, index) => {
        const cls = db.getClass(std.classId);
        return `
            <tr>
                <td style="width: 50px; text-align: center;">${index + 1}</td>
                <td style="width: 100px;"><span class="student-no-badge">${escapeHtml(std.number)}</span></td>
                <td class="student-name-cell">${escapeHtml(std.name)}</td>
                <td>${escapeHtml(std.surname || '')}</td>
                <td><span class="status-badge" style="background: #f1f5f9; color: var(--text-main);">${escapeHtml(cls ? cls.name : 'Sınıfsız')}</span></td>
                <td style="text-align: right; width: 140px;">
                    <button class="btn btn-secondary btn-sm" onclick="openStudentModal('${std.id}')">✏️</button>
                    <button class="btn btn-outline btn-sm" onclick="confirmDeleteStudent('${std.id}')" style="color: var(--danger);">🗑️</button>
                </td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <div class="grading-table-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="width: 50px; text-align: center;">#</th>
                        <th style="width: 100px;">Okul No</th>
                        <th>Adı</th>
                        <th>Soyadı</th>
                        <th>Sınıfı</th>
                        <th style="text-align: right; width: 140px;">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    `;

    updateTabBadges();
}

function openStudentModal(studentId = null, preselectedClassId = null) {
    const titleEl = document.getElementById('studentModalTitle');
    const idInput = document.getElementById('studentIdInput');
    const classSelect = document.getElementById('studentModalClassSelect');
    const numberInput = document.getElementById('studentNumberInput');
    const nameInput = document.getElementById('studentNameInput');
    const surnameInput = document.getElementById('studentSurnameInput');

    const classes = db.getClasses();
    classSelect.innerHTML = classes.map(c => 
        `<option value="${c.id}">${escapeHtml(c.name)}</option>`
    ).join('');

    if (studentId) {
        const std = db.getStudent(studentId);
        if (std) {
            titleEl.textContent = 'Öğrenciyi Düzenle';
            idInput.value = std.id;
            classSelect.value = std.classId;
            numberInput.value = std.number;
            nameInput.value = std.name;
            surnameInput.value = std.surname || '';
        }
    } else {
        titleEl.textContent = 'Yeni Öğrenci Ekle';
        idInput.value = '';
        if (preselectedClassId) {
            classSelect.value = preselectedClassId;
        } else {
            const currentClassFilter = document.getElementById('studentClassFilter').value;
            if (currentClassFilter) classSelect.value = currentClassFilter;
        }
        numberInput.value = '';
        nameInput.value = '';
        surnameInput.value = '';
    }

    openModal('studentModal');
}

function saveStudentFromModal() {
    const id = document.getElementById('studentIdInput').value;
    const classId = document.getElementById('studentModalClassSelect').value;
    const number = document.getElementById('studentNumberInput').value.trim();
    const name = document.getElementById('studentNameInput').value.trim();
    const surname = document.getElementById('studentSurnameInput').value.trim();

    if (!classId) {
        showToast('Lütfen bir sınıf seçin!', 'warning');
        return;
    }
    if (!number || !name) {
        showToast('Okul numarası ve öğrenci adı zorunludur!', 'warning');
        return;
    }

    db.saveStudent({ id: id || undefined, classId, number, name, surname });
    closeModal('studentModal');
    renderStudentsView();
    showToast('Öğrenci başarıyla kaydedildi!', 'success');
}

function confirmDeleteStudent(studentId) {
    const std = db.getStudent(studentId);
    if (!std) return;
    if (confirm(`${std.number} - ${std.name} ${std.surname} adlı öğrenciyi silmek istediğinize emin misiniz?`)) {
        db.deleteStudent(studentId);
        renderStudentsView();
        showToast('Öğrenci silindi!', 'info');
    }
}

// TOPLU ÖĞRENCİ AKTARIMI
function openBulkStudentModal(preselectedClassId = '') {
    const classSelect = document.getElementById('bulkStudentClassSelect');
    const textArea = document.getElementById('bulkStudentText');

    const classes = db.getClasses();
    classSelect.innerHTML = classes.map(c => 
        `<option value="${c.id}" ${c.id === preselectedClassId ? 'selected' : ''}>${escapeHtml(c.name)}</option>`
    ).join('');

    textArea.value = '';
    document.getElementById('bulkPreviewContainer').innerHTML = '';
    openModal('bulkStudentModal');
}

function previewBulkStudents() {
    const rawText = document.getElementById('bulkStudentText').value;
    const previewContainer = document.getElementById('bulkPreviewContainer');
    const parsed = parseStudentText(rawText);

    if (parsed.length === 0) {
        previewContainer.innerHTML = '<div style="color: var(--danger); font-size: 0.85rem;">Geçerli öğrenci verisi bulunamadı. Lütfen "No Ad Soyad" formatında yapıştırın.</div>';
        return;
    }

    const rows = parsed.slice(0, 5).map(p => 
        `<tr><td>${escapeHtml(p.number)}</td><td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.surname)}</td></tr>`
    ).join('');

    previewContainer.innerHTML = `
        <div style="font-size: 0.85rem; margin-top: 0.75rem;">
            <strong>${parsed.length} öğrenci algılandı.</strong> (İlk 5 örnek):
            <table class="data-table" style="margin-top: 0.5rem;">
                <thead><tr><th>No</th><th>Ad</th><th>Soyad</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function saveBulkStudents() {
    const classId = document.getElementById('bulkStudentClassSelect').value;
    const rawText = document.getElementById('bulkStudentText').value;

    if (!classId) {
        showToast('Lütfen bir sınıf seçin!', 'warning');
        return;
    }

    const studentList = parseStudentText(rawText);
    if (studentList.length === 0) {
        showToast('Eklenecek öğrenci bulunamadı!', 'warning');
        return;
    }

    const count = db.bulkAddStudents(classId, studentList);
    closeModal('bulkStudentModal');
    renderStudentsView();
    showToast(`${count} öğrenci başarıyla sınıfa eklendi!`, 'success');
}

function parseStudentText(text) {
    const lines = text.split('\n');
    const results = [];

    lines.forEach(line => {
        const clean = line.trim();
        if (!clean) return;

        if (clean.includes('\t')) {
            const parts = clean.split('\t').map(p => p.trim()).filter(p => p);
            if (parts.length >= 2) {
                results.push({ number: parts[0], name: parts[1], surname: parts[2] || '' });
                return;
            }
        }

        if (clean.includes(',') || clean.includes(';')) {
            const separator = clean.includes(';') ? ';' : ',';
            const parts = clean.split(separator).map(p => p.trim()).filter(p => p);
            if (parts.length >= 2) {
                results.push({ number: parts[0], name: parts[1], surname: parts[2] || '' });
                return;
            }
        }

        const parts = clean.split(/\s+/);
        if (parts.length >= 2) {
            const number = parts[0];
            const surname = parts.length > 2 ? parts[parts.length - 1] : '';
            const name = parts.slice(1, parts.length > 2 ? -1 : undefined).join(' ');
            results.push({ number, name, surname });
        }
    });

    return results;
}


// ==========================================
// 7. UYGULAMA / GÖREV YÖNETİMİ (ASSIGNMENTS)
// ==========================================

function renderAssignmentsView() {
    const courseFilter = document.getElementById('assignmentCourseFilter');
    const container = document.getElementById('assignmentsListContainer');
    if (!courseFilter || !container) return;

    const courses = db.getCourses();
    const currentFilter = courseFilter.value;

    courseFilter.innerHTML = '<option value="">-- Tüm Dersler --</option>' + courses.map(c => 
        `<option value="${c.id}" ${c.id === currentFilter ? 'selected' : ''}>${escapeHtml(c.name)} ${c.code ? `(${escapeHtml(c.code)})` : ''}</option>`
    ).join('');

    const courseId = courseFilter.value;
    const assignments = db.getAssignments(courseId || null);

    if (assignments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <h3>Uygulama Bulunamadı</h3>
                <p>Henüz bu derse ait bir uygulama görevi eklenmemiş.</p>
                <button class="btn btn-primary" onclick="openNewAssignmentModal('${courseId || ''}')">➕ Yeni Uygulama Görevi Ekle</button>
            </div>
        `;
        return;
    }

    const cardsHtml = assignments.map(a => {
        const course = db.getCourse(a.courseId);
        const cls = a.classId ? db.getClass(a.classId) : null;
        const grades = db.getGradesForAssignment(a.id);
        const gradedCount = Object.values(grades).filter(g => g.score !== '' && g.score !== null && g.score !== undefined).length;

        return `
            <div class="card" style="margin-bottom: 1rem;">
                <div class="card-header">
                    <div class="card-title-group">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                            <span class="course-badge">${escapeHtml(course ? (course.code || course.name) : 'Genel')}</span>
                            ${cls ? `<span class="status-badge" style="background: #f1f5f9; color: var(--text-main);">${escapeHtml(cls.name)}</span>` : '<span class="status-badge" style="background: #eff6ff; color: var(--primary);">Tüm Sınıflar</span>'}
                        </div>
                        <h2>${escapeHtml(a.title)}</h2>
                        <p>Tarih: ${escapeHtml(a.date || 'Belirtilmedi')} &bull; Maks. Puan: ${a.maxScore || 100}</p>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary btn-sm" onclick="openNewAssignmentModal('${a.courseId}', '${a.classId || ''}', '${a.id}')">✏️ Düzenle</button>
                        <button class="btn btn-outline btn-sm" onclick="confirmDeleteAssignment('${a.id}')" style="color: var(--danger);">🗑️ Sil</button>
                    </div>
                </div>
                <div class="card-body">
                    ${a.description ? `<p style="margin-bottom: 0.5rem; color: var(--text-main); font-size: 0.88rem;">${escapeHtml(a.description)}</p>` : ''}
                    ${a.criteria ? `<div style="font-size: 0.82rem; color: #166534; background: #f0fdf4; padding: 0.4rem 0.75rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem;"><strong>Kriterler:</strong> ${escapeHtml(a.criteria)}</div>` : ''}
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
                        <div style="font-size: 0.82rem; color: var(--text-muted);">
                            Not Girilen: <strong>${gradedCount}</strong> öğrenci
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="goToAssignmentGradingDirect('${a.courseId}', '${a.classId || ''}', '${a.id}')">📝 Bu Uygulamaya Not Ver</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = cardsHtml;
    updateTabBadges();
}

function goToAssignmentGradingDirect(courseId, classId, assignmentId) {
    const courseSelect = document.getElementById('gradingCourseSelect');
    const classSelect = document.getElementById('gradingClassSelect');
    const assignmentSelect = document.getElementById('gradingAssignmentSelect');

    if (courseSelect && courseId) courseSelect.value = courseId;
    if (classSelect && classId) classSelect.value = classId;
    updateGradingAssignmentOptions();
    if (assignmentSelect && assignmentId) assignmentSelect.value = assignmentId;

    switchView('view-grading');
}

function openNewAssignmentModal(preselectedCourseId = '', preselectedClassId = '', assignmentId = null) {
    const titleEl = document.getElementById('assignmentModalTitle');
    const idInput = document.getElementById('assignmentIdInput');
    const courseSelect = document.getElementById('assignmentModalCourseSelect');
    const classSelect = document.getElementById('assignmentModalClassSelect');
    const nameInput = document.getElementById('assignmentTitleInput');
    const dateInput = document.getElementById('assignmentDateInput');
    const maxScoreInput = document.getElementById('assignmentMaxScoreInput');
    const descInput = document.getElementById('assignmentDescInput');
    const criteriaInput = document.getElementById('assignmentCriteriaInput');

    const courses = db.getCourses();
    courseSelect.innerHTML = courses.map(c => 
        `<option value="${c.id}" ${c.id === preselectedCourseId ? 'selected' : ''}>${escapeHtml(c.name)} ${c.code ? `(${escapeHtml(c.code)})` : ''}</option>`
    ).join('');

    const classes = db.getClasses();
    classSelect.innerHTML = '<option value="">-- Tüm Sınıflara Açık --</option>' + classes.map(c => 
        `<option value="${c.id}" ${c.id === preselectedClassId ? 'selected' : ''}>${escapeHtml(c.name)}</option>`
    ).join('');

    if (assignmentId) {
        const a = db.getAssignment(assignmentId);
        if (a) {
            titleEl.textContent = 'Uygulamayı Düzenle';
            idInput.value = a.id;
            courseSelect.value = a.courseId;
            classSelect.value = a.classId || '';
            nameInput.value = a.title;
            dateInput.value = a.date || '';
            maxScoreInput.value = a.maxScore || 100;
            descInput.value = a.description || '';
            criteriaInput.value = a.criteria || '';
        }
    } else {
        titleEl.textContent = 'Yeni Uygulama Ekle';
        idInput.value = '';
        nameInput.value = '';
        dateInput.value = new Date().toISOString().slice(0, 10);
        maxScoreInput.value = '100';
        descInput.value = '';
        criteriaInput.value = '';
    }

    openModal('assignmentModal');
}

function saveAssignmentFromModal() {
    const id = document.getElementById('assignmentIdInput').value;
    const courseId = document.getElementById('assignmentModalCourseSelect').value;
    const classId = document.getElementById('assignmentModalClassSelect').value;
    const title = document.getElementById('assignmentTitleInput').value.trim();
    const date = document.getElementById('assignmentDateInput').value;
    const maxScore = parseInt(document.getElementById('assignmentMaxScoreInput').value, 10) || 100;
    const description = document.getElementById('assignmentDescInput').value.trim();
    const criteria = document.getElementById('assignmentCriteriaInput').value.trim();

    if (!courseId) {
        showToast('Lütfen bir ders seçin!', 'warning');
        return;
    }
    if (!title) {
        showToast('Uygulama adı zorunludur!', 'warning');
        return;
    }

    db.saveAssignment({ id: id || undefined, courseId, classId, title, date, maxScore, description, criteria });
    closeModal('assignmentModal');
    renderAssignmentsView();
    populateGradingSelectors();
    populateMatrixSelectors();
    showToast('Uygulama başarıyla kaydedildi!', 'success');
}

function confirmDeleteAssignment(assignmentId) {
    const a = db.getAssignment(assignmentId);
    if (!a) return;
    if (confirm(`"${a.title}" uygulamasını ve girilen notları silmek istediğinize emin misiniz?`)) {
        db.deleteAssignment(assignmentId);
        renderAssignmentsView();
        populateGradingSelectors();
        populateMatrixSelectors();
        showToast('Uygulama silindi!', 'info');
    }
}


// ==========================================
// 8. AYARLAR VE YEDEKLEME (SETTINGS VIEW)
// ==========================================

function renderSettingsView() {
    const settings = db.getSettings();
    document.getElementById('settingSchoolName').value = settings.schoolName || '';
    document.getElementById('settingTeacherName').value = settings.teacherName || '';
    document.getElementById('settingDepartment').value = settings.department || '';
    document.getElementById('settingAcademicYear').value = settings.academicYear || '';
}

function saveSettingsFromForm() {
    const newSettings = {
        schoolName: document.getElementById('settingSchoolName').value.trim(),
        teacherName: document.getElementById('settingTeacherName').value.trim(),
        department: document.getElementById('settingDepartment').value.trim(),
        academicYear: document.getElementById('settingAcademicYear').value.trim()
    };

    db.updateSettings(newSettings);
    renderHeaderInfo();
    showToast('Okul ve öğretmen bilgileri güncellendi!', 'success');
}

function exportDatabaseJSON() {
    const jsonStr = db.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ogrenci_Not_Takip_Yedek_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Tüm veritabanı yedeği indirildi!', 'success');
}

function importDatabaseJSON(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            db.importAllData(e.target.result);
            renderHeaderInfo();
            renderAllViews();
            showToast('Yedek başarıyla geri yüklendi!', 'success');
        } catch (err) {
            alert('Geçersiz yedek dosyası: ' + err.message);
        }
    };
    reader.readAsText(file);
    fileInput.value = '';
}

function loadSampleDataPrompt() {
    if (confirm('Örnek verileri yüklemek istediğinize emin misiniz? (Mevcut verilerinizin üzerine yazılacaktır)')) {
        db.loadSampleData();
        renderHeaderInfo();
        renderAllViews();
        showToast('Örnek veriler başarıyla yüklendi!', 'success');
    }
}

function resetAllDataPrompt() {
    if (confirm('TÜM veritabanını sıfırlamak istediğinize emin misiniz? Tüm dersler, sınıflar, öğrenciler ve notlar silinecektir!')) {
        db.resetAllData();
        renderHeaderInfo();
        renderAllViews();
        showToast('Tüm sistem sıfırlandı!', 'info');
    }
}


// ==========================================
// 9. MODAL VE EVENT LİSTENERS
// ==========================================

function setupModals() {
    document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) modal.classList.remove('active');
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
}

function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('active');
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('active');
}

function setupEventListeners() {
    // Not Girişi Seçicileri
    const gradingCourseSelect = document.getElementById('gradingCourseSelect');
    if (gradingCourseSelect) {
        gradingCourseSelect.addEventListener('change', () => {
            updateGradingAssignmentOptions();
            renderGradingTable();
        });
    }

    const gradingClassSelect = document.getElementById('gradingClassSelect');
    if (gradingClassSelect) {
        gradingClassSelect.addEventListener('change', () => {
            updateGradingAssignmentOptions();
            renderGradingTable();
        });
    }

    const gradingAssignmentSelect = document.getElementById('gradingAssignmentSelect');
    if (gradingAssignmentSelect) {
        gradingAssignmentSelect.addEventListener('change', () => {
            renderGradingTable();
        });
    }

    // Matris Seçicileri
    const matrixCourseSelect = document.getElementById('matrixCourseSelect');
    if (matrixCourseSelect) {
        matrixCourseSelect.addEventListener('change', () => {
            renderMatrixTable();
        });
    }

    const matrixClassSelect = document.getElementById('matrixClassSelect');
    if (matrixClassSelect) {
        matrixClassSelect.addEventListener('change', () => {
            renderMatrixTable();
        });
    }

    // Öğrenci Filtreleri
    const studentClassFilter = document.getElementById('studentClassFilter');
    if (studentClassFilter) {
        studentClassFilter.addEventListener('change', () => {
            renderStudentsView();
        });
    }

    const studentSearchInput = document.getElementById('studentSearchInput');
    if (studentSearchInput) {
        studentSearchInput.addEventListener('input', () => {
            renderStudentsView();
        });
    }

    // Uygulama Filtreleri
    const assignmentCourseFilter = document.getElementById('assignmentCourseFilter');
    if (assignmentCourseFilter) {
        assignmentCourseFilter.addEventListener('change', () => {
            renderAssignmentsView();
        });
    }
}

function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.remove(); }, 300);
    }, 3000);
}

function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

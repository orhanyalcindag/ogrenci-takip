/**
 * storage.js - Veri Depolama, Kimlik Doğrulama ve Yönetim Modülü
 * Meslek Lisesi Öğrenci Takip ve Notlandırma Uygulaması
 */

const STORAGE_KEY = 'meslek_lise_not_sistemi_v2';
const SESSION_KEY = 'meslek_lise_auth_session';

// Varsayılan Veri Yapısı
const DEFAULT_DATA = {
    auth: {
        username: 'admin',
        password: '1234'
    },
    settings: {
        schoolName: 'Mesleki ve Teknik Anadolu Lisesi',
        teacherName: 'Orhan Hoca',
        academicYear: '2024 - 2025',
        department: 'Bilişim Teknolojileri Alanı'
    },
    courses: [],     // Dersler: [{ id, name, code, description, createdAt }]
    classes: [],     // Sınıflar: [{ id, name, description, createdAt }]
    students: [],    // Öğrenciler: [{ id, classId, number, name, surname, createdAt }]
    assignments: [], // Uygulamalar: [{ id, courseId, classId, title, date, maxScore, criteria, description, createdAt }]
    grades: {}       // Notlar: { [assignmentId_studentId]: { score, status, note, updatedAt } }
};

class StorageService {
    constructor() {
        this.data = this.loadData();
    }

    loadData() {
        try {
            // Önce v2 anahtarını dene
            let raw = localStorage.getItem(STORAGE_KEY);
            // Eğer v2 yoksa eski v1 verisini migrate et
            if (!raw) {
                const oldRaw = localStorage.getItem('meslek_lise_not_sistemi_v1');
                if (oldRaw) {
                    const oldData = JSON.parse(oldRaw);
                    raw = JSON.stringify(this.migrateV1toV2(oldData));
                    localStorage.setItem(STORAGE_KEY, raw);
                }
            }

            if (!raw) {
                return JSON.parse(JSON.stringify(DEFAULT_DATA));
            }

            const parsed = JSON.parse(raw);
            return {
                auth: { ...DEFAULT_DATA.auth, ...(parsed.auth || {}) },
                settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) },
                courses: parsed.courses || [],
                classes: parsed.classes || [],
                students: parsed.students || [],
                assignments: parsed.assignments || [],
                grades: parsed.grades || {}
            };
        } catch (e) {
            console.error('Veri yüklenirken hata oluştu:', e);
            return JSON.parse(JSON.stringify(DEFAULT_DATA));
        }
    }

    migrateV1toV2(oldData) {
        const newData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        if (oldData.settings) newData.settings = { ...newData.settings, ...oldData.settings };
        if (oldData.classes) newData.classes = oldData.classes;
        if (oldData.students) newData.students = oldData.students;
        if (oldData.grades) newData.grades = oldData.grades;

        // Eski sınıflardaki courseName'leri Derslere dönüştür
        const courseMap = {};
        if (oldData.classes) {
            oldData.classes.forEach(c => {
                const courseName = c.courseName || 'Genel Meslek Dersi';
                if (!courseMap[courseName]) {
                    const crsId = 'crs_' + Math.random().toString(36).substr(2, 6);
                    courseMap[courseName] = crsId;
                    newData.courses.push({
                        id: crsId,
                        name: courseName,
                        code: courseName.substring(0, 4).toUpperCase(),
                        description: 'Otomatik aktarılan ders'
                    });
                }
            });
        }

        // Eski uygulamaları bu derslerle bağla
        if (oldData.assignments) {
            newData.assignments = oldData.assignments.map(a => {
                const cls = newData.classes.find(c => c.id === a.classId);
                const cName = cls ? (cls.courseName || 'Genel Meslek Dersi') : 'Genel Meslek Dersi';
                const crsId = courseMap[cName] || (newData.courses[0] ? newData.courses[0].id : '');
                return {
                    ...a,
                    courseId: crsId
                };
            });
        }

        return newData;
    }

    saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
            return true;
        } catch (e) {
            console.error('Veri kaydedilirken hata oluştu:', e);
            alert('Tarayıcı hafızası dolu veya veri kaydedilemedi!');
            return false;
        }
    }

    // --- KİMLİK DOĞRULAMA (AUTH) ---
    authenticate(username, password) {
        if (!this.data.auth) {
            this.data.auth = { ...DEFAULT_DATA.auth };
        }
        const validUser = this.data.auth.username.trim().toLowerCase();
        const inputUser = (username || '').trim().toLowerCase();
        const validPass = this.data.auth.password.trim();
        const inputPass = (password || '').trim();

        if (inputUser === validUser && inputPass === validPass) {
            const session = {
                username: this.data.auth.username,
                loggedInAt: new Date().toISOString()
            };
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
            return true;
        }
        return false;
    }

    isLoggedIn() {
        try {
            const session = sessionStorage.getItem(SESSION_KEY);
            return !!session;
        } catch (e) {
            return false;
        }
    }

    getCurrentUser() {
        try {
            const session = sessionStorage.getItem(SESSION_KEY);
            return session ? JSON.parse(session) : null;
        } catch (e) {
            return null;
        }
    }

    logout() {
        sessionStorage.removeItem(SESSION_KEY);
    }

    changePassword(currentPass, newPass, newUsername = null) {
        if (this.data.auth.password !== currentPass.trim()) {
            return { success: false, message: 'Mevcut şifrenizi hatalı girdiniz!' };
        }
        if (!newPass || newPass.trim().length < 3) {
            return { success: false, message: 'Yeni şifre en az 3 karakter olmalıdır!' };
        }

        this.data.auth.password = newPass.trim();
        if (newUsername && newUsername.trim()) {
            this.data.auth.username = newUsername.trim();
        }
        this.saveData();

        // Oturumu da güncelle
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
            username: this.data.auth.username,
            loggedInAt: new Date().toISOString()
        }));

        return { success: true, message: 'Kullanıcı bilgileri ve şifre başarıyla güncellendi!' };
    }

    // --- AYARLAR ---
    getSettings() {
        return this.data.settings;
    }

    updateSettings(newSettings) {
        this.data.settings = { ...this.data.settings, ...newSettings };
        this.saveData();
    }

    // --- DERSLER (COURSES) ---
    getCourses() {
        return this.data.courses || [];
    }

    getCourse(id) {
        return (this.data.courses || []).find(c => c.id === id);
    }

    saveCourse(course) {
        if (!this.data.courses) this.data.courses = [];
        if (!course.id) {
            course.id = 'crs_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
            course.createdAt = new Date().toISOString();
            this.data.courses.push(course);
        } else {
            const index = this.data.courses.findIndex(c => c.id === course.id);
            if (index !== -1) {
                this.data.courses[index] = { ...this.data.courses[index], ...course, updatedAt: new Date().toISOString() };
            }
        }
        this.saveData();
        return course;
    }

    deleteCourse(id) {
        this.data.courses = (this.data.courses || []).filter(c => c.id !== id);
        // Bu derse bağlı uygulamaları ve notları temizle
        const assignmentIdsToRemove = this.data.assignments.filter(a => a.courseId === id).map(a => a.id);
        this.data.assignments = this.data.assignments.filter(a => a.courseId !== id);

        const newGrades = {};
        for (const [key, val] of Object.entries(this.data.grades)) {
            const [aId] = key.split('_');
            if (!assignmentIdsToRemove.includes(aId)) {
                newGrades[key] = val;
            }
        }
        this.data.grades = newGrades;
        this.saveData();
    }

    // --- SINIFLAR (CLASSES) ---
    getClasses() {
        return this.data.classes || [];
    }

    getClass(id) {
        return (this.data.classes || []).find(c => c.id === id);
    }

    saveClass(cls) {
        if (!this.data.classes) this.data.classes = [];
        if (!cls.id) {
            cls.id = 'cls_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
            cls.createdAt = new Date().toISOString();
            this.data.classes.push(cls);
        } else {
            const index = this.data.classes.findIndex(c => c.id === cls.id);
            if (index !== -1) {
                this.data.classes[index] = { ...this.data.classes[index], ...cls, updatedAt: new Date().toISOString() };
            }
        }
        this.saveData();
        return cls;
    }

    deleteClass(id) {
        this.data.classes = (this.data.classes || []).filter(c => c.id !== id);
        // Bu sınıfa bağlı öğrencileri ve notlarını temizle
        const studentIdsToRemove = this.data.students.filter(s => s.classId === id).map(s => s.id);
        this.data.students = this.data.students.filter(s => s.classId !== id);

        // Bu sınıfa özel uygulamaları temizle
        const assignmentIdsToRemove = this.data.assignments.filter(a => a.classId === id).map(a => a.id);
        this.data.assignments = this.data.assignments.filter(a => a.classId !== id);

        // Notları temizle
        const newGrades = {};
        for (const [key, val] of Object.entries(this.data.grades)) {
            const [aId, sId] = key.split('_');
            if (!studentIdsToRemove.includes(sId) && !assignmentIdsToRemove.includes(aId)) {
                newGrades[key] = val;
            }
        }
        this.data.grades = newGrades;
        this.saveData();
    }

    // --- ÖĞRENCİLER (STUDENTS) ---
    getStudents(classId = null) {
        if (classId) {
            return (this.data.students || [])
                .filter(s => s.classId === classId)
                .sort((a, b) => parseInt(a.number, 10) - parseInt(b.number, 10) || a.name.localeCompare(b.name, 'tr'));
        }
        return this.data.students || [];
    }

    getStudent(id) {
        return (this.data.students || []).find(s => s.id === id);
    }

    saveStudent(student) {
        if (!this.data.students) this.data.students = [];
        if (!student.id) {
            student.id = 'std_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
            student.createdAt = new Date().toISOString();
            this.data.students.push(student);
        } else {
            const index = this.data.students.findIndex(s => s.id === student.id);
            if (index !== -1) {
                this.data.students[index] = { ...this.data.students[index], ...student };
            }
        }
        this.saveData();
        return student;
    }

    bulkAddStudents(classId, studentList) {
        let addedCount = 0;
        if (!this.data.students) this.data.students = [];
        studentList.forEach(item => {
            if (!item.number || !item.name) return;
            const existing = this.data.students.find(s => s.classId === classId && s.number.trim() === item.number.trim());
            if (existing) {
                existing.name = item.name.trim();
                existing.surname = (item.surname || '').trim();
            } else {
                this.data.students.push({
                    id: 'std_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                    classId: classId,
                    number: item.number.trim(),
                    name: item.name.trim(),
                    surname: (item.surname || '').trim(),
                    createdAt: new Date().toISOString()
                });
                addedCount++;
            }
        });
        this.saveData();
        return addedCount;
    }

    deleteStudent(id) {
        this.data.students = (this.data.students || []).filter(s => s.id !== id);
        const newGrades = {};
        for (const [key, val] of Object.entries(this.data.grades)) {
            const [, sId] = key.split('_');
            if (sId !== id) {
                newGrades[key] = val;
            }
        }
        this.data.grades = newGrades;
        this.saveData();
    }

    // --- UYGULAMALAR (ASSIGNMENTS) ---
    getAssignments(courseId = null, classId = null) {
        let list = this.data.assignments || [];
        if (courseId) {
            list = list.filter(a => a.courseId === courseId);
        }
        if (classId) {
            list = list.filter(a => !a.classId || a.classId === classId);
        }
        return list.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0) || a.title.localeCompare(b.title, 'tr'));
    }

    getAssignment(id) {
        return (this.data.assignments || []).find(a => a.id === id);
    }

    saveAssignment(assignment) {
        if (!this.data.assignments) this.data.assignments = [];
        if (!assignment.id) {
            assignment.id = 'asg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
            assignment.createdAt = new Date().toISOString();
            this.data.assignments.push(assignment);
        } else {
            const index = this.data.assignments.findIndex(a => a.id === assignment.id);
            if (index !== -1) {
                this.data.assignments[index] = { ...this.data.assignments[index], ...assignment };
            }
        }
        this.saveData();
        return assignment;
    }

    deleteAssignment(id) {
        this.data.assignments = (this.data.assignments || []).filter(a => a.id !== id);
        const newGrades = {};
        for (const [key, val] of Object.entries(this.data.grades)) {
            const [aId] = key.split('_');
            if (aId !== id) {
                newGrades[key] = val;
            }
        }
        this.data.grades = newGrades;
        this.saveData();
    }

    // --- NOTLANDIRMA (GRADES) ---
    getGrade(assignmentId, studentId) {
        const key = `${assignmentId}_${studentId}`;
        return this.data.grades[key] || null;
    }

    saveGrade(assignmentId, studentId, gradeData) {
        const key = `${assignmentId}_${studentId}`;
        if (!this.data.grades[key]) {
            this.data.grades[key] = {};
        }
        this.data.grades[key] = {
            ...this.data.grades[key],
            ...gradeData,
            updatedAt: new Date().toISOString()
        };
        this.saveData();
        return this.data.grades[key];
    }

    getGradesForAssignment(assignmentId) {
        const result = {};
        for (const [key, val] of Object.entries(this.data.grades)) {
            if (key.startsWith(assignmentId + '_')) {
                const studentId = key.split('_')[1];
                result[studentId] = val;
            }
        }
        return result;
    }

    // --- DIŞA / İÇE AKTARMA (BACKUP & RESTORE) ---
    exportAllData() {
        return JSON.stringify(this.data, null, 2);
    }

    importAllData(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            if (!parsed.classes || !parsed.students) {
                throw new Error('Geçersiz yedek dosyası formatı!');
            }
            this.data = {
                auth: { ...DEFAULT_DATA.auth, ...(parsed.auth || {}) },
                settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) },
                courses: parsed.courses || [],
                classes: parsed.classes || [],
                students: parsed.students || [],
                assignments: parsed.assignments || [],
                grades: parsed.grades || {}
            };
            this.saveData();
            return true;
        } catch (e) {
            console.error('İçe aktarma hatası:', e);
            throw e;
        }
    }

    resetAllData() {
        this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
        this.saveData();
    }

    // --- ÖRNEK VERİ YÜKLEME ---
    loadSampleData() {
        const sample = {
            auth: {
                username: 'admin',
                password: '1234'
            },
            settings: {
                schoolName: 'Atatürk Mesleki ve Teknik Anadolu Lisesi',
                teacherName: 'Orhan Hoca',
                academicYear: '2024 - 2025 Eğitim Öğretim Yılı',
                department: 'Bilişim Teknolojileri Alanı'
            },
            courses: [
                {
                    id: 'crs_wtug',
                    name: 'Web Tabanlı Uygulama Geliştirme',
                    code: 'WTÜG',
                    description: 'HTML5, CSS3, JavaScript ve Modern Web Teknolojileri',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'crs_prog',
                    name: 'Programlama Temelleri',
                    code: 'PROG',
                    description: 'Algoritmalar, Değişkenler, Döngüler ve Fonksiyonlar',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'crs_grafik',
                    name: 'Grafik ve Canlandırma',
                    code: 'GRAF',
                    description: 'Görsel Tasarım, UI/UX, Vektör Çizim ve Animasyon',
                    createdAt: new Date().toISOString()
                }
            ],
            classes: [
                {
                    id: 'cls_11a',
                    name: '11-A Bilişim',
                    description: 'Web Programcılığı Dalı (Laboratuvar 1)',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'cls_11b',
                    name: '11-B Bilişim',
                    description: 'Ağ İşletmenliği Dalı (Laboratuvar 2)',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'cls_10a',
                    name: '10-A Bilişim',
                    description: 'Bilişim Temel Alan Eğitimi',
                    createdAt: new Date().toISOString()
                }
            ],
            students: [
                { id: 'std_1', classId: 'cls_11a', number: '101', name: 'Ali', surname: 'Yılmaz' },
                { id: 'std_2', classId: 'cls_11a', number: '105', name: 'Ayşe', surname: 'Demir' },
                { id: 'std_3', classId: 'cls_11a', number: '112', name: 'Mehmet', surname: 'Kaya' },
                { id: 'std_4', classId: 'cls_11a', number: '124', name: 'Zeynep', surname: 'Çelik' },
                { id: 'std_5', classId: 'cls_11a', number: '135', name: 'Emre', surname: 'Öztürk' },
                { id: 'std_6', classId: 'cls_11a', number: '142', name: 'Fatma', surname: 'Aydın' },
                { id: 'std_7', classId: 'cls_11a', number: '158', name: 'Burak', surname: 'Şahin' },
                { id: 'std_8', classId: 'cls_11a', number: '166', name: 'Elif', surname: 'Koç' },
                { id: 'std_9', classId: 'cls_11a', number: '173', name: 'Can', surname: 'Yıldız' },
                { id: 'std_10', classId: 'cls_11a', number: '180', name: 'Selin', surname: 'Arslan' },
                // 11-B Öğrencileri
                { id: 'std_30', classId: 'cls_11b', number: '301', name: 'Oğuzhan', surname: 'Polat' },
                { id: 'std_31', classId: 'cls_11b', number: '305', name: 'Büşra', surname: 'Yavuz' },
                // 10-A Öğrencileri
                { id: 'std_20', classId: 'cls_10a', number: '201', name: 'Yusuf', surname: 'Korkmaz' },
                { id: 'std_21', classId: 'cls_10a', number: '208', name: 'Merve', surname: 'Güneş' }
            ],
            assignments: [
                {
                    id: 'asg_1',
                    courseId: 'crs_wtug',
                    classId: '', // Tüm sınıflara açık veya ortak
                    title: 'Uygulama 1: HTML5 Form ve Tablo Tasarımı',
                    date: '2024-10-15',
                    maxScore: 100,
                    description: 'Öğrenci kayıt formu, input tipleri (email, date, tel), select ve tablo yerleşimi.',
                    criteria: 'Form elemanları: 40p | Tablo düzeni: 30p | Validasyon: 30p'
                },
                {
                    id: 'asg_2',
                    courseId: 'crs_wtug',
                    classId: '',
                    title: 'Uygulama 2: CSS Flexbox ve Responsive Düzen',
                    date: '2024-10-22',
                    maxScore: 100,
                    description: 'Ürün kartları veya profil kartlarının Flexbox ile responsive olarak dizilmesi.',
                    criteria: 'Flex düzeni: 40p | Responsive uyum: 30p | Görsel tasarım: 30p'
                },
                {
                    id: 'asg_3',
                    courseId: 'crs_wtug',
                    classId: '',
                    title: 'Uygulama 3: JavaScript Dinamik Hesaplayıcı',
                    date: '2024-11-05',
                    maxScore: 100,
                    description: 'Dört işlem yapabilen temel arayüzlü dinamik hesap makinesi.',
                    criteria: 'Çalışma mantığı: 50p | Arayüz: 25p | Hata kontrolleri: 25p'
                },
                {
                    id: 'asg_4',
                    courseId: 'crs_prog',
                    classId: 'cls_10a',
                    title: 'Uygulama 1: Algoritma ve Akış Şeması',
                    date: '2024-10-10',
                    maxScore: 100,
                    description: 'Klavyeden girilen sayının tek/çift olduğunu bulan algoritma ve akış diyagramı.',
                    criteria: 'Algoritma mantığı: 50p | Akış şeması doğruluğu: 50p'
                }
            ],
            grades: {
                'asg_1_std_1': { score: 95, status: 'submitted', note: 'Eksiksiz ve temiz kod' },
                'asg_1_std_2': { score: 100, status: 'submitted', note: 'Çok başarılı tasarım' },
                'asg_1_std_3': { score: 70, status: 'submitted', note: 'Tablo çerçeveleri eksik' },
                'asg_1_std_4': { score: 85, status: 'submitted', note: 'İyi' },
                'asg_1_std_5': { score: 0, status: 'absent', note: 'Derse gelmedi' },
                'asg_1_std_6': { score: 90, status: 'submitted', note: 'Başarılı' },
                'asg_1_std_7': { score: 60, status: 'incomplete', note: 'Form butonları çalışmıyor' },
                'asg_1_std_8': { score: 85, status: 'submitted', note: 'İyi' },
                'asg_1_std_9': { score: 75, status: 'submitted', note: 'Validasyonlar eksik' },
                'asg_1_std_10': { score: 90, status: 'submitted', note: 'Gayet güzel' },

                'asg_2_std_1': { score: 90, status: 'submitted', note: 'Flexbox düzgün' },
                'asg_2_std_2': { score: 95, status: 'submitted', note: 'Responsive harika' },
                'asg_2_std_3': { score: 80, status: 'submitted', note: 'Mobilde taşma var' },
                'asg_2_std_4': { score: 85, status: 'submitted', note: 'İyi' }
            }
        };

        this.data = sample;
        this.saveData();
    }
}

const db = new StorageService();

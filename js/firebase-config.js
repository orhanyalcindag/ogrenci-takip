/**
 * firebase-config.js - Firebase Firestore Bulut Senkronizasyon Modülü
 * Meslek Lisesi Öğrenci Takip ve Notlandırma Uygulaması
 */

let firebaseApp = null;
let firestoreDb = null;
let isFirebaseConnected = false;

// Firebase SDK'larını dinamik olarak yükle
async function loadFirebaseSDK() {
    if (window.firebaseLoaded) return true;
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js');
        const { getFirestore, doc, setDoc, getDoc, onSnapshot } = await import('https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js');
        
        window.fb = {
            initializeApp,
            getFirestore,
            doc,
            setDoc,
            getDoc,
            onSnapshot
        };
        window.firebaseLoaded = true;
        return true;
    } catch (e) {
        console.warn('Firebase SDK dinamik yüklenemedi (çevrimdışı modda çalışılıyor):', e);
        return false;
    }
}

// Firebase Başlatma
async function initFirebase() {
    const config = db.getFirebaseConfig();

    if (!config || !config.apiKey || !config.projectId) {
        setCloudStatus(false, 'Çevrimdışı / Yerel Mod');
        return false;
    }

    try {
        setCloudStatus(null, '☁️ Buluta Bağlanılıyor...');
        const sdkOk = await loadFirebaseSDK();
        if (!sdkOk) {
            setCloudStatus(false, 'Çevrimdışı Mod (İnternet Yok)');
            return false;
        }

        if (!firebaseApp) {
            firebaseApp = window.fb.initializeApp(config);
            firestoreDb = window.fb.getFirestore(firebaseApp);
        }

        // İlk açılışta buluttan verileri çekmeyi 6 saniye zaman aşımı ile dene
        const syncPromise = syncDataFromFirebase();
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('TIMEOUT_INIT')), 6000)
        );

        const syncSuccess = await Promise.race([syncPromise, timeoutPromise]);

        if (syncSuccess) {
            isFirebaseConnected = true;
            setCloudStatus(true, '☁️ Bulut Canlı Senkronize');
            listenToFirebaseChanges();
            return true;
        } else {
            isFirebaseConnected = false;
            setCloudStatus(false, 'Bulut Beklemede (Firestore Açılmalı)');
            return false;
        }
    } catch (e) {
        console.warn('Firebase başlatma durumu:', e);
        isFirebaseConnected = false;
        if (e.message === 'TIMEOUT_INIT') {
            setCloudStatus(false, 'Bulut Beklemede (Firestore Açılmalı)');
        } else {
            setCloudStatus(false, 'Çevrimdışı Mod');
        }
        return false;
    }
}

// Durum Rozetini Güncelle
function setCloudStatus(status, text) {
    const badge = document.getElementById('cloudStatusBadge');
    if (!badge) return;

    if (status === true) {
        badge.innerHTML = `<span class="status-online-dot"></span> ${text}`;
        badge.style.color = 'var(--success)';
        badge.style.background = 'var(--success-light)';
        badge.style.borderColor = 'var(--success-border)';
    } else if (status === false) {
        badge.innerHTML = `<span style="width:8px; height:8px; border-radius:50%; background:#f59e0b; display:inline-block;"></span> ${text}`;
        badge.style.color = '#92400e';
        badge.style.background = '#fef3c7';
        badge.style.borderColor = '#fde68a';
    } else {
        badge.innerHTML = `<span style="width:8px; height:8px; border-radius:50%; background:#6366f1; display:inline-block;"></span> ${text}`;
        badge.style.color = 'var(--primary)';
        badge.style.background = 'var(--primary-light)';
        badge.style.borderColor = 'rgba(99, 102, 241, 0.2)';
    }
}

// Buluta Veri Gönderme (Debounced)
let syncTimeout = null;
window.syncDataToFirebase = function(data) {
    if (!isFirebaseConnected || !firestoreDb) return;

    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(async () => {
        try {
            const docRef = window.fb.doc(firestoreDb, 'not_sistemi', 'ana_veritabani');
            const payload = {
                settings: data.settings || {},
                courses: data.courses || [],
                classes: data.classes || [],
                students: data.students || [],
                assignments: data.assignments || [],
                grades: data.grades || {},
                cleaningLogs: data.cleaningLogs || [],
                users: data.users || [],
                lastUpdated: new Date().toISOString()
            };
            
            await Promise.race([
                window.fb.setDoc(docRef, payload),
                new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_SYNC')), 7000))
            ]);
            
            console.log('Veriler Firebase Firestore bulutuna başarıyla kaydedildi.');
            setCloudStatus(true, '☁️ Bulut Senkronize (Az Önce)');
        } catch (e) {
            console.error('Firebase senkronizasyon hatası:', e);
            setCloudStatus(false, 'Buluta Yazılamadı');
        }
    }, 1000); // 1 saniye debounce
};

// Buluttan Veri Çekme
async function syncDataFromFirebase() {
    if (!firestoreDb) return false;
    try {
        const docRef = window.fb.doc(firestoreDb, 'not_sistemi', 'ana_veritabani');
        const docSnap = await window.fb.getDoc(docRef);

        if (docSnap && docSnap.exists()) {
            const cloudData = docSnap.data();
            console.log('Buluttan veri alındı:', cloudData);
            
            if (cloudData.courses || cloudData.classes) {
                db.data.settings = { ...db.data.settings, ...(cloudData.settings || {}) };
                db.data.courses = cloudData.courses || [];
                db.data.classes = cloudData.classes || [];
                db.data.students = cloudData.students || [];
                db.data.assignments = cloudData.assignments || [];
                db.data.grades = cloudData.grades || {};
                db.data.cleaningLogs = cloudData.cleaningLogs || [];
                if (cloudData.users && cloudData.users.length > 0) {
                    db.data.users = cloudData.users;
                }
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(db.data));
                
                if (typeof renderAllViews === 'function') renderAllViews();
                if (typeof renderHeaderInfo === 'function') renderHeaderInfo();
            }
            return true;
        } else {
            // Bulutta henüz döküman yoksa mevcut yerel veriyi buluta yükle
            window.syncDataToFirebase(db.data);
            return true;
        }
    } catch (e) {
        console.error('Buluttan veri çekilemedi:', e);
        return false;
    }
}

// Canlı Değişiklikleri Dinleme (Realtime sync)
function listenToFirebaseChanges() {
    if (!isFirebaseConnected || !firestoreDb) return;
    try {
        const docRef = window.fb.doc(firestoreDb, 'not_sistemi', 'ana_veritabani');
        window.fb.onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const cloudData = docSnap.data();
                if (cloudData.lastUpdated && (!db.data.lastUpdated || cloudData.lastUpdated > db.data.lastUpdated)) {
                    db.data.courses = cloudData.courses || [];
                    db.data.classes = cloudData.classes || [];
                    db.data.students = cloudData.students || [];
                    db.data.assignments = cloudData.assignments || [];
                    db.data.grades = cloudData.grades || {};
                    db.data.cleaningLogs = cloudData.cleaningLogs || [];
                    if (cloudData.users && cloudData.users.length > 0) {
                        db.data.users = cloudData.users;
                    }
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(db.data));
                    if (typeof renderAllViews === 'function') renderAllViews();
                }
            }
        });
    } catch (e) {
        console.warn('Realtime dinleyici kurulamadı:', e);
    }
}

// Bağlantı Testi Fonksiyonu (Ayarlar Ekranı İçin)
async function testFirebaseConnectionWithConfig(cfg) {
    try {
        const sdkOk = await loadFirebaseSDK();
        if (!sdkOk) throw new Error('Firebase SDK kütüphaneleri yüklenemedi. Lütfen internet bağlantınızı kontrol edin.');

        const tempAppName = 'testApp_' + Date.now();
        const tempApp = window.fb.initializeApp(cfg, tempAppName);
        const tempDb = window.fb.getFirestore(tempApp);
        const testRef = window.fb.doc(tempDb, '_connection_test', 'ping');

        // Zaman aşımı koruması (6 saniye) - Database oluşturulmamışsa kilitlenmeyi önler
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('TIMEOUT_FIRESTORE_NOT_READY')), 6000)
        );

        await Promise.race([
            window.fb.setDoc(testRef, { test: true, time: new Date().toISOString() }),
            timeoutPromise
        ]);

        return { success: true };
    } catch (e) {
        if (e.message === 'TIMEOUT_FIRESTORE_NOT_READY') {
            return {
                success: false,
                isNotProvisioned: true,
                error: 'Firestore veritabanına bağlanılamadı (Zaman Aşımı). Firebase Console üzerinde henüz "Firestore Database" oluşturulmamış veya yanıt vermiyor.'
            };
        }
        if (e.code === 'permission-denied' || (e.message && e.message.toLowerCase().includes('permission'))) {
            return {
                success: false,
                isPermissionDenied: true,
                error: 'Erişim engellendi (Güvenlik Kuralı Engeli). Firebase Console Kurallarında okuma/yazma izni verilmemiş.'
            };
        }
        return { success: false, error: e.message || 'Bağlantı kurulamadı.' };
    }
}

// Sayfa yüklendiğinde Firebase başlatmayı dene
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initFirebase();
    }, 500);
});

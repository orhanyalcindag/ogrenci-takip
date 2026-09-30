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
    const statusDot = document.getElementById('cloudStatusBadge');

    if (!config || !config.apiKey || !config.projectId) {
        setCloudStatus(false, 'Çevrimdışı / Yerel Mod');
        return false;
    }

    try {
        const sdkOk = await loadFirebaseSDK();
        if (!sdkOk) {
            setCloudStatus(false, 'Çevrimdışı Mod');
            return false;
        }

        if (!firebaseApp) {
            firebaseApp = window.fb.initializeApp(config);
            firestoreDb = window.fb.getFirestore(firebaseApp);
        }

        isFirebaseConnected = true;
        setCloudStatus(true, '☁️ Bulut Canlı Senkronize');

        // İlk açılışta buluttan verileri çek
        await syncDataFromFirebase();

        // Gerçek zamanlı değişiklikleri dinle (Real-time listener)
        listenToFirebaseChanges();

        return true;
    } catch (e) {
        console.error('Firebase bağlantı hatası:', e);
        setCloudStatus(false, 'Bulut Hatası (Yerel Mod)');
        return false;
    }
}

// Durum Rozetini Güncelle
function setCloudStatus(isOnline, text) {
    const badge = document.getElementById('cloudStatusBadge');
    if (!badge) return;

    if (isOnline) {
        badge.innerHTML = `<span class="status-online-dot"></span> ${text}`;
        badge.style.color = 'var(--success)';
        badge.style.background = 'var(--success-light)';
        badge.style.borderColor = 'var(--success-border)';
    } else {
        badge.innerHTML = `<span style="width:8px; height:8px; border-radius:50%; background:#94a3b8; display:inline-block;"></span> ${text}`;
        badge.style.color = 'var(--text-muted)';
        badge.style.background = '#f1f5f9';
        badge.style.borderColor = 'var(--border)';
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
            // Güvenlik ve temizlik: auth bilgilerini bulutta saklarken sadece geçerli veriyi gönder
            const payload = {
                settings: data.settings || {},
                courses: data.courses || [],
                classes: data.classes || [],
                students: data.students || [],
                assignments: data.assignments || [],
                grades: data.grades || {},
                cleaningLogs: data.cleaningLogs || [],
                lastUpdated: new Date().toISOString()
            };
            await window.fb.setDoc(docRef, payload);
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
    if (!isFirebaseConnected || !firestoreDb) return false;
    try {
        const docRef = window.fb.doc(firestoreDb, 'not_sistemi', 'ana_veritabani');
        const docSnap = await window.fb.getDoc(docRef);

        if (docSnap.exists()) {
            const cloudData = docSnap.data();
            console.log('Buluttan veri alındı:', cloudData);
            
            // Eğer buluttaki veri geçerliyse yerel veritabanına aktar
            if (cloudData.courses || cloudData.classes) {
                db.data.settings = { ...db.data.settings, ...(cloudData.settings || {}) };
                db.data.courses = cloudData.courses || [];
                db.data.classes = cloudData.classes || [];
                db.data.students = cloudData.students || [];
                db.data.assignments = cloudData.assignments || [];
                db.data.grades = cloudData.grades || {};
                db.data.cleaningLogs = cloudData.cleaningLogs || [];
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(db.data));
                
                // UI Tazele
                if (typeof renderAllViews === 'function') renderAllViews();
                if (typeof renderHeaderInfo === 'function') renderHeaderInfo();
            }
            return true;
        } else {
            // Bulutta henüz veri yoksa mevcut yerel veriyi buluta ilk kez yükle
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
                // Sadece başka bir cihazdan güncelleme geldiyse yereli tazele
                if (cloudData.lastUpdated && (!db.data.lastUpdated || cloudData.lastUpdated > db.data.lastUpdated)) {
                    db.data.courses = cloudData.courses || [];
                    db.data.classes = cloudData.classes || [];
                    db.data.students = cloudData.students || [];
                    db.data.assignments = cloudData.assignments || [];
                    db.data.grades = cloudData.grades || {};
                    db.data.cleaningLogs = cloudData.cleaningLogs || [];
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
        if (!sdkOk) throw new Error('Firebase kütüphaneleri yüklenemedi. İnternet bağlantınızı kontrol edin.');

        const tempApp = window.fb.initializeApp(cfg, 'testApp_' + Date.now());
        const tempDb = window.fb.getFirestore(tempApp);
        const testRef = window.fb.doc(tempDb, '_connection_test', 'ping');
        await window.fb.setDoc(testRef, { test: true, time: new Date().toISOString() });
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message || 'Bağlantı kurulamadı.' };
    }
}

// Sayfa yüklendiğinde Firebase başlatmayı dene
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initFirebase();
    }, 500);
});

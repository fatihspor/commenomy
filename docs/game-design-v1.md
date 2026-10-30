# COMMENOMY — Oyun Tasarım Belgesi v1.0
## Vizyon
7/24 çalışan, Android ve iOS oyuncularının aynı dünyayı paylaştığı; üretim, ticaret, lojistik, finans ve demokratik kararların birbirini etkilediği adil bir ekonomi simülasyonu. Eğlenceli ama manipülatif olmayan ilerleme. Gerçek para ile güç satışı yok.

## Hikâye: Yeni Ekonomi Cumhuriyeti
Devlet ekonomiyi yeniden yapılandırıyor. İlk arsalar devletin, devlet belirli aralıklarla arsa ihaleleri düzenliyor. Başlangıçta İstanbul, Ankara ve İzmir üretim ve ticaret merkezleri. Her oyuncu küçük bir girişimci olarak başlar. Devletin seçimle belirlenen 30 gerçek günlük hükümeti arsa arzı, kamu projeleri, vergi ve banka faizleri üzerinde karar verir. Maden/taş/kum işletme ruhsatları arsa mülkiyetinden ayrıdır.

## Oyuncunun ilk 15 dakikası
1. İsim seç, Google/Apple hesabıyla giriş (entegrasyon henüz tamamlanmadı).
2. Şehir seç; şehirlerin lojistik, kira ve talep farklarını gör.
3. Rehberli başlangıç: küçük işletme ve ilk üretim hattı.
4. İlk üretim partisi: kapasite, hammadde, depo alanı ve son kullanım tarihi.
5. Fiyat belirleyip satış emri oluştur; nakliye masrafı dahil net kârı önceden göster.
6. Günlük görev değil, isteğe bağlı iş hedefi: ilk satış, ilk yatırım, ilk kamu ihalesi.

## Ana oyun döngüsü
Talebi incele → üretim planla → hammadde/enerji/işçilik öde → parti bazlı ürün üret → depola veya kiralık depoya taşı → fiyatla → sanal vatandaş/oyuncu/devlete sat → nakliye öde → kâr/zarar → yatırım.
Her kaynak ve işlem sunucu yetkili; cihaz saati/yerel depolama ekonomik gerçeklik kaynağı olamaz.

## Sanal vatandaş ekonomisi
Her şehirde nüfus, gelir endeksi, işsizlik, ürün bazlı günlük temel tüketim, fiyat esnekliği ve sınırlı harcama bütçesi.
Talep = nüfus × kişi başı ihtiyaç × gelir etkisi × fiyat esnekliği; arzdan bağımsız talep tavanı.
Alım motoru toplam vatandaş bütçesini aşamaz; aynı ürünün pahalı/ucuz ve kaliteli alternatiflerini değerlendirir.
Devlet yalnızca bütçeli kamu projeleri için alım yapar. Oyuncu şirketleri ara mal ve yatırım malı satın alır.
Tüm vatandaş satışlarında para arzı ve vergi dengesi izlenir.

## Üretim ve stok
Her tesis: ürün türü, saatlik hız, günlük üst sınır, üretim maliyeti, enerji/işçilik/hammadde ihtiyacı, şehir, kendi deposu, kiralık depo.
Üretim her gerçek gün için ayrı hesaplanır; depo dolarsa durur. Stok parti bazında: üretim tarihi, SKT, miktar, maliyet.
Önce SKT'si en yakın uygun parti satılır (FEFO); tarihi geçen ürün satışa ve hacze konu olamaz.
Üretim, satış, kiralama, haciz ve bozulma aynı parti defterinde atomik işlenmelidir; özet stok tek başına doğruluk kaynağı değildir.
Soğuk zincir ve depolama türleri sonraki fazda.

## Nakliye
Şehir-şehir tarife: sabit ücret + miktar × birim ücret; sevkiyat süresi, kapasite ve gecikme riski.
Ödeme öncesi alıcıya toplam maliyet gösterilir. Satış, teslimat ve depo alanı atomik ve tutarlı şekilde işlenir.
İlk sürümde İstanbul, Ankara, İzmir. Yeni şehirler nüfus/oyuncu yoğunluğu ve ekonomi sağlığına göre açılır.

## Devlet Bankası
Teminat: doğrulanmış varlıklar + serbest nakit - borçlar; borç alınmış nakit yeniden teminat sayılamaz.
Politika başlangıcı: yıllık %12, azami 90 gerçek gün, net teminatın %40'ı (denge testi değerleri).
Kredi verme, faiz tahakkuku, ödeme ve gecikme yalnızca güvenli sunucu işlemleriyle.
Vade öncesi uyarı, gecikme uyarısı, şeffaf hesap dökümü.
Haciz: yalnızca doğrulanmış, satılabilir, rezerve edilmemiş ve SKT'si geçmemiş partiler. Birim haciz değeri = doğrulanmış üretim maliyetinin %50'si. Borçtan aynı işlemde düşülür, haciz kaydı tutulur.
Haciz otomasyonu **kapalı** kalmalı; parti bazlı muhasebe ve testler bitmeden etkinleştirilmemeli. Hacizden önce kullanıcıya anlaşılır uyarı verilir.

## Yönetim ve seçim
30 gerçek günlük hükümet dönemi. Oyuncular politikalarını sayısal vaatlerle sunar: kamu yatırımı, vergi, faiz, maden ruhsatı sayısı, arsa ihalesi arzı.
Kamu bütçesi sınırlıdır. Seçim ve kamu harcaması kayıtları denetlenebilir; oy manipülasyonu, çoklu hesap ve içeriden bilgi suiistimaline karşı koruma.

## Oyuncu psikolojisi ve adalet
Yeni başlayan için basit arayüz; ileri oyuncu için derin analiz. Kararların sonuçları önceden anlaşılır.
Bildirimler yalnızca anlamlı olaylarda ve kullanıcı kontrolünde. Kaçırma korkusu yaratan zorunlu günlük giriş serileri yok.
Çevrimdışı ilerleme sınırlı ve öngörülebilir. Tekelleşme karşıtı arsa/ruhsat arzı, bot ve çoklu hesap kontrolleri.
İflas bir çıkmaz değil: yeniden yapılandırma ve yeni küçük işletme fırsatı.

## Ana ekran bilgi mimarisi
Ana sayfa: şirket bakiyesi, net varlık, günlük üretim, doluluk, siparişler, kritik uyarılar.
Sekmeler: Şirketim / Pazar / Harita / Devlet / Banka.
Şirketim: tesisler, üretim, stok partileri, depolar, işçiler.
Pazar: al-sat, fiyat grafiği, nakliye ve net kâr.
Devlet: ihaleler, bütçe, seçimler, kanunlar.
Banka: limit, faiz, borçlar, ödeme takvimi, hacizler.
Renkler erişilebilir, metinler kısa, sayı biçimleri tutarlı, önemli işlemlerde onay ve geri bildirim.

## Teknik teslimat ve kabul kriterleri
Faz A: tek kaynaklı parti muhasebesi, idempotent işlemler, SKT imhası, üretim maliyeti; birim/entegrasyon testleri.
Faz B: gerçek talep bütçesi, devlet ihaleleri, sevkiyat ve atomik teslimat; çift harcama ve yarış koşulu testleri.
Faz C: banka teminatı, faiz ve güvenli haciz; başarısız işlem geri alma testleri.
Faz D: Google/Apple Auth, Android/iOS ekranları, cihazlar arası senkronizasyon, APK/IPA kurulum testleri.
Faz E: küçük ölçekli beta, ekonomi telemetrisi, yük ve güvenlik testleri, dengeleme.
Bir özellik yalnızca SQL fonksiyonu oluşturulduğu için 'oyunda hazır' sayılmaz; gerçek istemci bağlantısı ve uçtan uca test gerekir.

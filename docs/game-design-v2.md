# COMMENOMY — Ana Oyun Tasarım Belgesi v2.0
**Durum:** Ürün tasarımı ve uygulanma ölçütleri  
**Platform hedefi:** Önce Android; aynı oyun kurallarıyla ileride iOS  
**İlk oynanabilir sürüm:** Tek insan oyuncu + simülasyon tarafından yönetilen şirketler, vatandaşlar ve devlet  
**Oyun dili ve para birimi:** Türkçe, oyun içi TL  
**Günlük dünya saati:** Europe/Istanbul, her gün 03.00'te otomatik dönem kapanışı

Bu belge, Commenomy için bugüne kadar kararlaştırılan oyun deneyimini tek yerde toplar. Buradaki kurallar ürün hedefidir; henüz oyunda bulunmayan özellikler uygulanmış sayılmaz. Sayısal ekonomi değerleri test ortamında ayarlanabilir olmalı ve dengeleme testleriyle kesinleştirilmelidir.

## 1. Oyun fikri ve oyuncuya verilen söz

Commenomy, oyuncunun küçük bir işletmeyle başlayıp üretim, mağazacılık, tarım, madencilik, lojistik, gayrimenkul ve finans kararlarıyla büyüdüğü, yaşayan bir ülke ekonomisi simülasyonudur. Üretim ve tüketim gerçek zamanlı akar; oyuncu her an oyuna girip karar verir, günlük ekonomi 03.00 Türkiye saatinde otomatik kapanır ve yenilenir.

Oyuncu tek bir girişimci olarak başlar. İlk sürümde dünyada kontrol edilen tek insan oyuncudur; diğer işletmeler, müşteriler, çalışanlar, konut üreticileri, tedarikçiler, bankalar ve devlet simülasyon aktörleridir. Rakip şirketler fiyat, ihale ve büyüme kararları alır; dünya boş görünmez. Çok oyunculu ortak dünya sonraki aşamadır, ancak veri ve ekonomi kuralları buna engel olmayacak biçimde tasarlanır.

**Oyuncunun ana hedefi:** Kârlı, dayanıklı ve itibarlı bir şirketler grubu kurmak. Zenginlik tek başarı ölçüsü değildir; hizmet kalitesi, istihdam, üretim, pazar payı, verimlilik ve kamu projelerinin tamamlanması da ilerlemeyi gösterir.

**İlkeler**
- Oyun içi para ile gerçek para birbirine karışmaz; gerçek parayla rekabet avantajı satılmaz.
- Oyuncuya maliyet, vade, risk ve net sonuç işlem onayından önce gösterilir.
- Kaybetme ve iflas oyunu kilitlemez; borç yapılandırma ve küçük ölçekte yeniden başlama yolu bulunur.
- Zorunlu günlük giriş serileri, yanıltıcı süre sayaçları ve kaçırma korkusu yaratan ödüller kullanılmaz.
- Cihaz saati ekonomik gerçeği belirlemez. Sunucu saati ve kayıtlı işlemler belirler.

## 2. Dünya, şehirler ve zaman

### 2.1 Başlangıç dünyası

İlk ekonomi haritası İstanbul, Ankara ve İzmir'i içerir. Her şehirde:
- nüfus, gelir ve işsizlik seviyesi;
- ürün ve hizmetlere göre talep;
- mağaza caddeleri ve müşteri trafiği;
- kira, arsa ve işçilik düzeyleri;
- sanayi bölgeleri, depo alanları ve ulaşım bağlantıları;
- kamu hizmetleri ve konut arzı bulunur.

Şehirler yalnızca arka plan rengi değildir: aynı ürüne talep, kira, satış fiyatı, çalışan bulma kolaylığı ve nakliye maliyeti şehirden şehre değişir. Yeni şehirler, mevcut ekonomi ve teknik kapasite hazır olduğunda açılır.

### 2.2 Harita ve arazi kullanımı

Ticari mağaza yerleri ile sanayi arazileri farklı pazarlar olarak yönetilir.

- **Ticaret caddeleri:** Cadde 1 en prestijli, müşteri trafiği ve satış potansiyeli en yüksek, kirası da en yüksek yerdir. Daha alt caddelerde kira düşer; trafik, müşteri profili ve alınabilecek fiyat da farklılaşır. Her caddede sanal halkın alışveriş eğilimi ve rakip yoğunluğu ayrı hesaplanır.
- **Sanayi bölgeleri:** Fabrika ve büyük depolar şehir merkezinden uzakta yer alır. Devlet yeni sanayi bölgesi açtığında uygun büyüklükte arsaları etaplar halinde ihaleye çıkarır. Sonraki bölgeler daha uzakta olabilir; düşük arsa bedeli nakliye ve personel ulaşım maliyetini artırabilir.
- **Kırsal alan:** Tarla ve maden ruhsatı yerel kaynağa, verimliliğe ve ulaşım ağına bağlıdır. Tarla şirket varlığı olarak görünür; maden ruhsatı araziden ayrı bir işletme hakkıdır.
- **Parsel özellikleri:** Konum, alan (m²), imar kullanımı, altyapı, giriş-çıkış, kapasite, kira veya ihale bedeli ve ulaşım maliyeti açıkça gösterilir.
- **Dönüştürme:** Uygun imar izni bulunan bir mağaza/depo yerini diğer kullanım türüne çevirmek bedel ve 2 oyun günü sürer. Bu sırada varlık kapalı kalır; içerideki stok önce taşınmalı veya satılmalıdır. Fabrikaya dönüşüm ayrı sanayi izni ve yeterli alan ister. İmarın izin vermediği kullanım satın alma ekranında teklif edilemez.

Yeni arazi arzını devlet yönetir. Arzın tükenmesi kalıcı bir kilit yaratmaz; sonraki ihale tarihleri ve planlanan kapasite oyuncuya gösterilir.

### 2.3 Gerçek zaman ve günlük kapanış

Bir oyun günü 03.00–02.59 Türkiye saati arasındadır. Her gün saat 03.00'te sunucu:
1. Önceki güne ait üretim, satış, sevkiyat ve siparişleri kesinleştirir.
2. Ücret, kira, enerji, kredi ve mevduat faizlerini muhasebeleştirir.
3. Vatandaşların gelir, tüketim, konut ihtiyacı ve işgücü güncellemesini yapar.
4. Ürün stoklarının raf ömrünü ve bozulmayı işler.
5. Devlet bütçesi, ihaleler, pazar fiyatları ve haber akışını günceller.
6. Yeni günün üretim ve satış kapasitelerini açar.

Kesin sıralama ve işlemler tek bir dönem kaydına bağlanır; tekrar çalıştırma aynı ödemeyi iki kez yapmaz. Oyuncu çevrimdışıyken de dünya ilerler. Telefonu açık tutmak veya ekrana dokunmak gerekmez. Oyuncu son girişten bu yana olanları anlaşılır faaliyet dökümünde görür. İlk sürümün test ayarında bir düğme ile günü ilerletmek gerekiyorsa bu yalnızca test modunda bulunur; normal oyunda elle gün atlatma yoktur.

## 3. Yeni oyuncu akışı ve ana oyun döngüsü

### İlk 15 dakika
1. Oyuncu şirket adını ve görünümünü belirler; ilk sürüm tek oyunculu testte misafir/yerel başlangıç kullanılabilir. Hesap ve cihazlar arası eşitleme daha sonra eklenir.
2. Başlangıç şehrini ve ulaşılabilir küçük iş modelini seçer; farklar kısa ve somut biçimde gösterilir.
3. Rehber, şirket kasası ile kişisel/net varlık ayrımını, bir mağaza veya küçük üretim varlığını kurmayı anlatır.
4. Oyuncu tedarikçi/üreticiden ürün veya hammadde alır; stok kapasitesini ve toplam maliyeti görür.
5. Mağazada satış fiyatını belirler veya üretime iş emri verir.
6. İlk satıştan sonra gelir, ürün maliyeti, vergi ve kalan stok anlaşılır bir işlem fişinde gösterilir.

Rehber oyuncuyu kısa zamanda gerçek bir karara ulaştırır; bütün ekranları zorunlu turla gezdirmez.

### Temel döngü

**Pazar ve talebi incele → yer/varlık seç → tedarik et veya üret → personel, enerji ve lojistiği yönet → stokla → fiyat belirle → vatandaşa, şirkete ya da devlete sat → kâr-zarar ve nakdi değerlendir → büyüt veya çeşitlendir.**

Her işlem için önce **miktar, birim maliyet, toplam tutar, tahmini teslim/üretim zamanı, nakliye ve beklenen net sonuç** gösterilir. İşlemden sonra makbuz/olay kaydı oluşur.

## 4. Şirket ve varlık yönetimi

### 4.1 Şirketim tek merkez

Mağazalar, fabrikalar, depolar, ocaklar, tarlalar ve devamında inşaat projeleri ayrı ana sekmelerde parçalanmaz. Hepsi **Şirketim** ekranının varlıklarıdır. Ana sayfada şirketin kasası, borcu, tahmini net varlığı, bugünkü gelir/gideri, çalışan sayısı, stok değeri ve dikkat gerektiren işler görünür.

Şirket varlık listesi tür filtresi ve şehir filtresiyle sunulur. Her kartta ad, konum, faaliyet durumu, gelir/gider, kapasite kullanımı ve bekleyen işlem görünür. Bir karta basınca yalnızca o varlığın yönetim ekranı açılır. Şirketin tüm varlıkları ve nakit görünümü bir üst düzeyde de izlenir.

Varlık durumları açık ve farklı renklerle gösterilir: faal, kurulumda, dönüşümde, kapalı, bakımda, stok bekliyor veya ödeme riski.

### 4.2 İşletme kurma

Kullanıcı uygun araziyi kiralar veya ihaleden satın alır, kurulum/ruhsat/ekipman maliyetini öder, sonra işletmeyi açar. Arayüz başlamadan önce toplam başlangıç maliyetini, aylık/günlük sabit gideri, kapasiteyi ve gerekli çalışan sayısını özetler.

Bir varlığı kapatmak gelecekteki değişken gideri durdurur; kira, borç ve varlık bakımından kalan zorunlu yükler açıkça gösterilir. Satış/devretme, kapatma ve yeniden açma geçmişi muhasebe defterinde saklanır.

## 5. Üretim, kaynaklar ve tedarik zinciri

### 5.1 Üretim tesisleri

Fabrika ürün reçetesine göre hammadde, işçilik, enerji, makine kapasitesi ve üretim süresi kullanır. Her fabrikanın:
- günlük/parti kapasitesi ve vardiya planı;
- üretim hattı ve reçetesi;
- çalışan ihtiyacı ve ücretleri;
- enerji/diğer girdi tüketimi;
- bakım ve arıza durumu;
- kendi stok alanı ve bağlı depoları bulunur.

Üretim parti halinde kaydedilir; ürün, miktar, üretim zamanı, birim maliyet, kalite ve varsa son kullanma tarihi saklanır. Günlük üretim miktarı zamana yayılır ve ürün partisi planlanan saatte tamamlanır. Oyuncu üretimi başlatabilir, durdurabilir veya sıradaki ürünü değiştirebilir; başlamış partinin tükettiği girdi geri gelmez. Stok yeri doluysa üretim durur ve uyarı verir, taşan stok görünmez biçimde silinmez.

### 5.2 Sektörel yapılar

- **Fabrikalar:** İşlenmiş tüketim ve ara mallarını reçete ile üretir. Hammadde bulunabilirliği ve talep, vardiya/kapasite kararlarını etkiler.
- **Depolar:** Genel, kuru, soğuk veya tehlikeli maddeye uygun depolama türleri ilerleme aşamasına göre sunulur. Alan m²/raf/palet kapasitesi, doluluk, kira ve elleçleme ücreti vardır. Depo üretmez ve satmaz; ürünleri lokasyonlar arasında tutar.
- **Maden/taş ocakları:** Ocak sahibi olmak için devlet ruhsatı ve uygun sanayi/kaynak sahası gerekir. Taş, kum, maden gibi kaynaklarda rezerv, günlük çıkarma kotası, ekipman, çalışan, enerji ve taşıma maliyeti bulunur. Rezerv sınırlıdır; yeni saha ve ruhsatlar devletçe ihaleye çıkarılır.
- **Tarlalar:** Tarla, şirket varlığıdır ve tarımsal faaliyet ekranı vardır. Ürün seçimi, tohum/girdi, ekim, bakım, sulama, mevsim, hasat süresi ve verim görünür. Hasat anında ürün partisi depoya aktarılır; depo yoksa hasat öncesi kapasite uyarısı verilir. İleri aşamada hava ve hastalık riski eklenebilir; ilk oynanabilir sürümde öngörülebilir, anlaşılır mevsim döngüsü yeterlidir.
- **Sanal işletmeler:** Rakip ve tedarikçi firmalar da bu sektörlerde faaliyet gösterir. Oyuncu sektöre girmese bile ilgili girdileri pazardan satın alabilir.

Ürün zincirleri adım adım açılır; erken oyunda oyuncu her sektörü aynı anda yönetmeye zorlanmaz. Örnek: ocaktan taş/kum → fabrikada yapı malzemesi → sanal/oyuncu inşaat şirketi → konut ve yeni nüfus → mağaza müşterileri. Tarımdan gıda → işleme/soğuk depolama → mağaza → hane tüketimi zinciri.

### 5.3 Stok defteri ve bozulma

Stok miktarının kaynağı ürün partileri ve hareket defteridir; ekrandaki toplam stok bunların özetidir. Alım, üretim, transfer, satış, iade, fire, bozulma ve haciz ayrı hareket olarak kaydedilir. Stok birden fazla depoda tutuluyorsa lokasyon bazında gösterilir.

Raf ömrü olan mallarda **son kullanma tarihi en yakın parti önce çıkar (FEFO)**. Depolama koşulları bozulmayı etkiler. SKT'si geçen ürün satılamaz ve kredi teminatına sayılamaz; imha kaydı ve varsa imha ücreti gösterilir.

## 6. Pazar, mağaza ve sipariş deneyimi

### 6.1 Ürün satın alma / tedarikçi listesi

**Ürün Al** düğmesi mağaza ya da şirket içinde ilgili varlığın satın alma bağlamından tedarikçi/üretici listesine gider; aynı sayfada kalıp hiçbir şey değiştirmemesi kabul edilemez. Liste seçili ürün, kategori ve teslimat konumuna göre uygun satıcıları gösterir. Her satıcı kartında satıcı adı, ürün, birim fiyat, mevcut satıcı stoğu, teslim süresi, mesafe/nakliye bedeli, kalite ve varsa minimum sipariş açıkça yer alır.

Satıcı kartı altındaki sipariş alanında:
- Miktar/adet alanı başlangıçta boş gelir; otomatik rakam yazılmaz.
- Girilen miktar mevcut satıcı stoğunu veya alıcının boş kapasitesini aşamaz.
- Birim fiyat ürün bilgisidir; kullanıcıdan yanlışlıkla satıcı fiyatı uydurması istenmez.
- Ara toplam, nakliye, toplam ödeme, teslim zamanı ve sipariş sonrası tahmini stok alanı miktar girilince hesaplanır.
- **Sipariş Ver** düğmesi aynı satıcı/ürün kartının altında, miktar ve toplamın hemen sonrasında bulunur.
- Bir satıcıdan verilen sipariş başka satıcıların kartını veya siparişini etkilemez. Farklı satıcılardan ayrı ayrı sipariş verilebilir.
- Sipariş onaylanınca para rezerve/çekilir ve sipariş durumuna bağlanır; tamamlanana kadar aynı tutar ikinci kez harcanamaz.
- Pazar o oyun modunda kapalıysa işlevsiz kontrol ve uzun açıklama yerine ilgili satın alma bölümü kaldırılır veya açıkça “şu an kullanılamıyor” durumuyla kapatılır.

### 6.2 Mağaza ve satış

Mağazada satış fiyatını oyuncu belirler. Cadde trafiği, fiyat, rakip fiyat/stokları ve talep simülasyonu anlık değerlendirerek her ürün için günlük tahmini satış adedini ve yaklaşık birim satış aralığını gösterir. Tahmin, fiyat veya konum değişince yenilenir. Gerçek satış zaman içinde gerçekleşir: örneğin tahmin 8 kg/gün ise yaklaşık her 3 saatte 1 kg satılır. Her tam satışta stoktan ürün düşer, satış bedeli aynı anda şirket kasasına eklenir. Ürün kalmazsa satış saati birikmez; yeni stok gelince satış sayacı yeniden çalışır. Satış fiyatını oyuncu belirler; fiyat, yer ve talep yalnızca satış tahminini ve hızını etkiler.

Mağaza ekranı kısa ve işletme odaklıdır: günlük satış, gelir, gider, raf/depo kapasitesi, ürünler, fiyatlar ve siparişler. Her ürün kartında ürün adına yakın yerde **ortalama birim alış maliyeti** ile **satış fiyatı** ayrı, aynı birim üzerinden gösterilir. Ortalama maliyet; alış bedeli ve nakliye dahil gelen ürün partilerinden ağırlıklı ortalama olarak hesaplanır. Henüz alış geçmişi olmayan eski kayıt veya ürünlerde değer tahmini olarak işaretlenir. Maliyet ile satış fiyatı arasındaki fark, tahmini birim marjı anlamayı sağlar. Her ürün satırında oyuncunun elindeki miktar ile toplam kapasite birlikte görünür: **“30 / 50 kg” = elde 30 kg, kapasite 50 kg**. Bu bilgi ürün başlığının hemen üstünde veya altında, belirgin biçimde görünür. Toplam mağaza doluluğu da ürün listesinin yakınında gösterilir.

Oyuncu ürünün satış fiyatını belirler; fiyat önerisi rakipler, ürün maliyeti, cadde trafiği, kalite ve şehir talebiyle karşılaştırılır. Oyuncunun fiyatı ve önerilen fiyat yan yana, tahmini satış hızı ve brüt/net marjla gösterilir. Fiyat rakiplerden yüksekse satışın yavaşlaması açıklanır; satış garantisi verilmez.

Vatandaş alışverişi mağazadan stok azaltıp geliri **şirket kasasına** yazar. “Her müşteriye tek tek sat” şeklinde tekrar eden manuel tıklama yoktur. Satışlar gün içinde veya gün sonu talep dilimlerinde simülasyonla gerçekleşir; ürün ve satış raporu sonradan incelenebilir. Hangi satışın hangi ürünü ve hangi partiyi azalttığı izlenebilir.

### 6.3 Siparişler ve pazar tipleri

- Oyuncu tedarikçiden satın alma emri verir; teslimat süresince sipariş “hazırlanıyor/yolda” görünür.
- Oyuncu stoktan satış emri, toptan satış teklifi veya kamu ihalesi teklifi verebilir.
- Kamu mal alım ihalesinde ilan edilen ürün ve miktar sabittir; oyuncu yalnızca birim TL fiyatı verir. Teklif anında tam ihale miktarı rezerve edilir; stok yetmiyorsa teklif verilemez.
- Oyuncular arası açık pazar daha sonra gelir; ilk sürümde simülasyon işletmeleriyle çalışır.
- İlanı veya teklifleri sonuçlanmamış pazar özelliği kapalıysa, ölü bağlantı ve gereksiz açıklama gösterilmez.
- Aynı stok iki farklı satışta rezerve edilirse çift satışa izin verilmez.

## 7. Sanal halk, emek ve konut

### 7.1 Vatandaşların ekonomideki rolü

Her şehir nüfus ve hane gruplarına ayrılır. Gruplar gelir düzeyi, meslek, bütçe ve ürün tercihleri bakımından farklılaşır. Vatandaşlar:
- oyuncu ve sanal işletmelerde işe girer;
- ücret ve varsa işsizlik geliri alır;
- gıda, günlük ürün ve hizmet satın alır;
- konut kiralar veya edinir;
- nüfus artışı ve göç yoluyla şehir talebini değiştirir.

Talep yalnızca üretimden türetilmez; nüfus, gelir, ihtiyaç miktarı, kalite tercihi ve fiyata duyarlılık üzerinden hesaplanır. Hanelerin bütçesi sınırlıdır. Vatandaş motoru var olmayan para üretmez; ücret, gelir transferi ve tanımlı ekonomik kaynaklar bütçeye kaydedilir. Gerçekçi ayrıntı, oynanabilirliği boğmamalı; oyuncuya sonuçlar toplam talep ve anlaşılır pazar raporu olarak gösterilir.

### 7.2 İşgücü ve ücret

İşletme başına gerekli ve mevcut çalışan, boş kadro, günlük ücret toplamı ve verimlilik görünür. Ücret düşükse işe alım ve devamlılık zorlaşır; çok yüksek ücret maliyeti artırır. Nitelik gerektiren işler için eğitim/işe alım havuzu sonraki aşamada kullanılabilir. Fabrika ve mağaza sayısı arttıkça istihdam ve yan hizmet talebi artar.

Günlük ücret şirket kasasından otomatik düşer, işlem kaydı ve vade uyarısı oluşturur. Çalışan eksikliği kapasiteyi düşürür; sistem eksik personeli varmış gibi üretim yapmaz.

### 7.3 Konut ve inşaat şirketleri

Oyuncunun günlük yönetiminden ayrı olarak, simülasyonun yönettiği inşaat şirketleri konut projeleri üretir. Bu şirketler proje için arsa, işçilik, çimento, taş/kum, demir ve diğer yapı malzemelerini pazardan satın alır. Böylece oyuncu malzeme sağlarsa gerçek bir sanal alıcı talebi oluşur. Kamu altyapı ve konut projeleri de yalnızca onaylanmış bütçesi ölçüsünde alım yapar.

Şehirde işler ve nüfus arttıkça konut talebi doğar. Konut arzı yetersizse kira ve göç baskısı artar; yeterli konut açıldığında nüfus ve tüketim büyüyebilir. Fazla arz boş konut ve proje zararına yol açabilir. İnşaat süreci, malzeme tedariki, teslim tarihi, işçilik ve doluluk durumuyla izlenir. Oyuncu ileride inşaat şirketi kurabilir; ilk sürümde oyuncu temel ekonomik döngüyü sanal şirketleri gözleyerek öğrenir.

## 8. Rekabet ve simülasyon işletmeleri

Simülasyon şirketleri dekor değildir; her birinin sektör, şehir, sermaye, kapasite, personel, fiyat ve amaçları vardır. Üretim yapar, teklif verir, mağaza açar, işçi talep eder, hammadde satın alır ve gerektiğinde küçülür. Şirket davranışı deterministik ama oyuncunun kolayca sömüremeyeceği günlük tohumla yürütülür; aynı dönem kapanışının tekrar çalışması aynı sonucu üretir.

Rakipler farklı profiller taşır: düşük maliyetli büyük üretici, kaliteli uzman marka, yerel mağazacı, yeni girişimci ve inşaat/tedarik firması. Oyuncu rakiplerin kamuya açık fiyat, stok/arz ve pazar payı göstergelerini görür; gizli mali tabloları görmez. Tek oyunculu beta aynı zamanda tüm ana döngüleri çevrimdışı denemek için kullanılabilir. Test oyuncusu dünyada tek insandır; NPC rakipler çok oyunculu kullanıcı taklidi olarak değil, kuralları belli ekonomik aktörler olarak çalışır.

## 9. Banka, mevduat, kredi ve borç

Banka ekranı şirket kasasından ayrı bir finans görünümü sunar. Banka devlet/simülasyon kuruluşudur; ilk sürümde gerçek banka hesabına veya gerçek para transferine bağlanmaz.

### 9.1 Vadeli mevduat

Oyuncu şirketindeki kullanılabilir oyun içi parayı faiz kazanması için bankaya yatırabilir. Açık hesapta tutar, faiz oranı, başlangıç/vade tarihi, tahmini brüt ve net getiri, vergi/kesinti, vade sonunda ödenecek toplam ve erken çekim koşulu görünür. Onaydan sonra ana para “bankadaki mevduat” olarak ayrılır; aynı para alışveriş, ihale veya başka hesapta kullanılamaz.

Mevduat vadeleri ve oranları hükümet/merkez bankası politikası ve ekonomik koşullara bağlıdır. Faiz gerçek zamanlı ilerler; gün kapanışında tahakkuk eder. Vade bittiğinde ana para ve faiz şirketin seçtiği hesaba aktarılır veya yenileme tercihi varsa yeni dönem açılır. Erken çekimde önceden gösterilen faiz kaybı uygulanır; gizli ceza yoktur. Mevduat oranı ile enflasyon/ürün fiyatı gelişimi karşılaştırılır, böylece nominal faiz tek başına yanıltıcı büyüme gibi sunulmaz.

### 9.2 Krediler ve teminat

Kredi limiti, şirketin doğrulanmış varlıkları, öz kaynağı, nakit akışı ve mevcut borçlarıyla belirlenir. Borçla alınmış nakit ikinci kez teminat sayılamaz. Kullanıcı çekebileceği tutar, faiz, toplam geri ödeme, taksit/vade ve gecikme sonucu onaydan önce görür. Borç ve faiz tahakkuku her gün muhasebeleştirilir; ödeme planı ve yaklaşan vade uyarısı bulunur.

İlk dengeleme değerleri ürün kodunda sabitlenmez; oran, vade, teminat katsayısı ve kredi kuralları ayarlanabilir ekonomi parametreleridir. Kredi otomatik verilmez; kötü nakit akışı büyütülmeden görünür.

### 9.3 Gecikme ve yeniden yapılandırma

Gecikmede aşamalı uyarı ve yapılandırma imkânı vardır. Haciz otomatik ve sessiz biçimde başlamaz. Önce vade, tutar ve yapılandırma seçeneği gösterilir. Yetkili haciz yalnızca doğrulanmış, satılabilir, rezerve edilmemiş ve bozulmamış stok/varlık üzerinde çalışır; değerleme, borçtan düşüm ve haciz kaydı aynı işlem olarak yapılır. Haciz oranı ve koşulu oyuncuya önceden bildirilir. İflas/yeniden yapılandırma son seçenek olarak şirketi tamamen kullanılamaz hale getirmez.

## 10. Devlet, ihaleler ve kamu ekonomisi

Devlet; imar ve arazi arzını, sanayi bölgelerini, ruhsatları, vergi ve faiz politikasını, kamu bütçesi ve satın almalarını yönetir. Devlet sınırsız alıcı veya para kaynağı değildir. Her kamu projesinin bütçesi, ürün ihtiyacı, teslim takvimi ve yeterlilik şartı vardır.

### 10.1 Arsa ve ruhsat ihaleleri
- Devlet mağaza arsalarını, sanayi parsellerini, depo arsalarını ve tarımsal/kaynak haklarını ayrı ihaleye çıkarır.
- İhale kartında konum, m², imar, başlangıç bedeli, teminat, son zaman, kullanım şartı ve karşılaştırılabilir yerler gösterilir.
- Sanayi bölgesi açılması devlet kararıdır; parseller belirlenen etapta sırayla satışa çıkar.
- Teklif önce oyuncunun kullanılabilir nakdini/teminatını kontrol eder. İhalede ayrılan para başka yerde harcanamaz.
- İhale sonunda sonuç, kazanan bedel, kaybedenlere iade edilen teminat ve sonraki arz tarihi kayda geçer.
- Tek oyunculu sürümde NPC teklifleri şirket finansı ve arazi ihtiyacıyla tutarlı, tekrar üretilebilir biçimde hesaplanır.

### 10.2 Kamu alımı ve yapım ihaleleri

Her mal alım ihalesi belirli bir **ürün/hizmet** ve **tam sipariş miktarı** için açılır. İlan kartında ürün adı, kalite/standart, toplam adet veya ölçü birimi (ör. kg, ton, adet), teslim yeri, son teklif zamanı, teslim son tarihi, devletin ayırdığı toplam bütçe, kabul şartları ve değerlendirme ölçütü görünür. Oyuncu teklif vermeden önce ihalenin ne istediğini ve bu miktarın kendi teslim edilebilir stokuyla karşılanıp karşılanmadığını görür.

**Teklif ve stok rezervasyonu:**
1. Oyuncu yalnızca birim fiyatını (TL/ürün birimi) girer. Sistem toplam teklif bedelini otomatik olarak **birim fiyat × ihale miktarı** şeklinde hesaplar ve teklif onayından önce gösterir. Adet/miktar oyuncunun değiştireceği bir alan değildir; ihalenin tam miktarı için teklif verilir.
2. Teklif gönderilirken sistem, aynı ürün ve kalite için teslimata uygun, bozulmamış ve başka işlem için ayrılmamış stok miktarını sunucu tarafında kontrol eder. Uygun serbest stok ihale miktarından azsa teklif gönderilmez; gereken, uygun ve serbest miktarlar kullanıcıya açıklanır.
3. Teklif kabul edilip kaydedildiği anda, ihale miktarının tamamı tek bir atomik işlemle **ihale için rezerve** edilir. Son anda stok azaldıysa teklif ve rezervasyon birlikte başarısız olur. İki eşzamanlı işlem aynı stoğu rezerve edemez.
4. Rezerve miktar mağazada satılamaz; başka ihaleye teklif edilemez; tedarik siparişine, üretim tüketimine, stok transferine, teminat hesabına veya başka bir satışa konu edilemez. Şirket ekranında toplam stoktan ayrı olarak “serbest / ihalede rezerve” gösterilir.
5. Teklif, ihale sonucu açıklanana kadar kesin ve bağlayıcıdır; aynı teklifin yinelenen gönderimi yeni rezerv oluşturmaz. NPC rakipler de kendi gerçek stok ve bütçe kapasiteleri içinde teklif verir.

**Sonuç ve teslimat:**
- Oyuncu ihaleyi kaybederse rezerve miktar sonuç kesinleştiği anda serbest stoğa döner. İhale iptal edilir, bütçesi kaldırılır veya sonuçlandırılamazsa da stok serbest bırakılır; olay kaydı oluşur.
- Oyuncu kazanırsa rezerv, kamu sözleşmesine bağlanır ve teslim edilecek stok olur. Oyuncu ihalede yazan süre içinde tam miktarı belirtilen teslim noktasına sevk eder. Ürün kabul edilince sözleşme tamamlanır ve ödeme şirket kasasına geçer: kabul edilen miktar × teklif edilen birim fiyat, ilan edilen vergi/kesintiler varsa dökümüyle birlikte. Teslim ve kabulden önce tutar alacak olarak gösterilebilir, harcanabilir kasa gibi gösterilemez.
- Eksik miktar, geç teslim, kalite reddi ve sözleşme cezası tekliften önce açıkça belirtilir. Kabul edilmeyen ürün için ödeme yapılmaz; uygulanacak düzeltme/ceza şartları sözleşmede görünür. İhale miktarı bölünerek kısmi teklif verilemez.
- Raf ömrü olan ürünler, son kullanma tarihi teslim ve kabul için yeterli süre bırakmıyorsa uygun stok sayılmaz. Farklı depolardaki uygun stok, ihale ilanının teslim şartları ve sevkiyat kabiliyeti karşılanıyorsa birlikte rezerve edilebilir.

Oyuncu kamu yapım ve mal alım ihalelerine uygunluk şartlarını sağlayınca katılır. Kazanan yalnızca en düşük fiyatla seçilmek zorunda değildir; fiyat, kalite ve teslim kabiliyeti açık değerlendirme ağırlıklarıyla puanlanır. Sözleşme, stok/üretim kapasitesi, teslim kilometre taşları ve ödemeleri izlenebilir biçimde kaydeder.

### 10.3 Seçilmiş hükümet ve politika

Tam dünya aşamasında hükümet belirli aralıklarla seçimle değişir; tasarım başlangıç hedefi 30 gerçek günlük dönemdir. Adaylar kamu bütçesi, sanayi bölgesi açma, arsa ve ruhsat arzı, vergi, faiz ve altyapı hakkında sayısal vaat verir. Oy, seçim takvimi ve sonuçlar denetlenebilir kayda yazılır. Çoklu hesap, bot ve oy satın alma önlemleri gerekir. İlk oynanabilir sürümde bu sistem kapalıysa sahte seçim ekranı gösterilmez; çalışan basit devlet yönetimiyle arsa, izin ve kamu projesi akışı denenir.

## 11. Fiyatlar, para akışı ve muhasebe

Ürün fiyatı arz, talep, stok, maliyet, kalite ve rakip davranışından etkilenir. Tek bir oyuncu kısa sürede fiyatı sınırsız yükseltemez; arz fazlası olduğunda fiyat baskısı ve stok taşıma maliyeti oluşur. Vatandaş bütçesi ve şirket/ihale bütçesi alımları sınırlar. Devlet desteği, vergi, kredi ve mevduat faizi ekonomide ayrı kaynak/kullanım kayıtlarıyla izlenir; para yaratımı veya silinmesi tasarımda görünmez kalmaz.

Her şirket için gelir tablosu ve nakit akışı:
- satış geliri, ürün maliyeti ve brüt kâr;
- ücret, kira, enerji, bakım, nakliye, vergi ve faiz;
- işletme kârı, net kâr ve nakit değişimi;
- stok, sabit varlık, mevduat, kredi ve borç;
- ödenmemiş sipariş, ihale teminatı ve rezerve edilmiş para.

“Muhasebe” ekranı sade toplamlarla başlar; satıra dokununca işlem detayı görülür. İşlem geçmişi silinmez. Raporlarda dönem ve şirket/varlık filtresi vardır. Satış geliri ile kâr birbirine karıştırılmaz; nakit olmayan stok değeri kasada para gibi gösterilmez.

## 12. Görsel tasarım ve ekran akışı

### 12.1 Görsel dil
Mevcut Commenomy logosu korunur. Ekranlar ferah, canlı, okunaklı ve oyuna devam etme isteği veren ama bilgi kalabalığı yaratmayan biçimde tasarlanır. Koyu lacivert zemin ve açık metin üzerine sınırlı, tutarlı renk kullanılır. Durum rengi tek başına anlam taşımamalı; simge ve metinle desteklenmelidir.

Başlangıç renk eşlemesi:
- Şirketim / genel yönetim: mavi
- Mağaza / ticaret geliri: parlak yeşil
- Pazar / alım-satım: turuncu
- Arazi / ihale: mor
- Ocak / kaynak: toprak-kahve
- Tarla / tarım: açık doğal yeşil
- Banka / mevduat: yeşil
- Devlet / kamu işlemleri: kırmızı

### 12.2 Ana gezinme ve Şirketim

Ana gezinmede beş ana alan bulunur: **Şirketim, Pazar, Şehir, Devlet, Banka**. Mağazalar, fabrikalar, depolar, ocaklar, tarlalar ve projeler **Şirketim** içindeki varlık türleridir; birbirinden kopuk ana sekmeler değildir. Şirketim ana görünümü önce toplam resmi, sonra varlık kartlarını sunar.

Ekran sınırında belirgin üst özet ile içerik bölümü görsel olarak ayrılır. Telefonda temel eylemler başparmakla ulaşılabilir konumda ve büyük dokunma hedefleriyle verilir. Form alanları boş başlar; örnek değer, girilmemiş gerçek işlem miktarı gibi görünmez.

### 12.3 Temel ekranlar
- **Ana özet:** kasa, borç, net varlık, dönem özeti, uyarılar ve hızlı devam.
- **Şirketim:** varlık listesi/filtre, personel, siparişler ve şirket muhasebesi.
- **Mağaza:** ürün ve stok doluluğu, tedarikçiler, sipariş verme, fiyat ve satış raporu.
- **Fabrika:** reçete, girdi, personel, kapasite, üretim takvimi, depo bağlantısı.
- **Depo:** lokasyon, kapasite/doluluk, stok transferi, kira ve depo türü.
- **Ocak:** ruhsat/rezerv, üretim kotası, makine, işçi ve sevkiyat.
- **Tarla:** ürün, ekim ve hasat takvimi, girdi, verim ve ürün partileri.
- **Pazar:** ürün fiyat/arz/talep, üretici ve siparişler; yalnızca çalışan pazar işlevleri.
- **Şehir/harita:** cadde, sanayi bölgesi, parsel, mesafe ve büyüme.
- **Devlet:** arsa/ruhsat ihalesi, ürün alım ve yapım ihaleleri, bütçe, politika ve (açık olduğunda) seçim.
- **Banka:** vadeli mevduat, kredi, borç, taksit ve faiz dökümü.

Ekran başlığı altında bir cümlelik bağlamsal açıklama yeterlidir. Kullanım dışı sistemi açıklayan uzun metin, tekrar eden yönerge veya boş çalışan buton bırakılmaz.

### 12.4 Bildirim ve hata geri bildirimi

Bildirimler işe yarar olaylar içindir: sipariş teslimi, üretimin durması, stok bozulma riski, ödeme vadesi, ihale sonucu, hasat zamanı, depo doluluğu, olağan dışı zarar. Kullanıcı bildirim sıklığını kontrol edebilir.

Her işlem başarısında ekranda doğrulama ve işlem kaydı, başarısızlığında neden ve düzeltilebilir sonraki adım görünür. Örn. “Depoda 8 kg boş yer var; bu sipariş 12 kg” gibi. Teknik hata kodu oyun metni olarak gösterilmez.

## 13. Teknik ve ekonomi bütünlüğü ilkeleri

- Sunucu saati ve sunucu yetkili ekonomi; yerel cihaz saati, hızlandırma veya değiştirilmiş APK ekonomik kaynak oluşturamaz.
- Para, ürün partisi, ihale teminatı, kamu ihalesi için rezerve edilen ürün miktarı ve sipariş rezervleri aynı işlem günlüğünde atomik tutulur.
- Önemli istekler idempotenttir; yeniden gönderme aynı alım/satım/ödeme işlemini iki kere yapmaz.
- Oyuncu yalnızca kendi şirket verisini değiştirebilir. Simülasyon şirketlerini ve devlet kayıtlarını istemci doğrudan düzenleyemez.
- Yetki denetimleri yalnızca arayüz gizlemesine dayanmaz; sunucuda uygulanır.
- Ekrandaki kasa/stoğun kaynağı kayıt defteridir, güvenilmeyen cihaz önbelleği değildir.
- Çevrimdışı modda son bilinen dünya okunabilir; ekonomik kararlar sunucuya ulaşıp doğrulanana dek kesinleşmiş gibi gösterilmez.
- Android beta veri sıfırlaması açıkça onaylanır ve yedek/oyun kaydı durumu anlatılır.
- Gizlilik: zorunlu olmayan kişisel bilgi toplanmaz. Hesap bağlama, eşitleme ve silme akışı daha sonra eklenirken net biçimde açıklanır.

## 14. Geliştirme sırası

### Faz 0 — Doğru çalışan tek oyunculu ekonomik çekirdek
- Gerçek zamanlı gün ve 03.00 kapanış simülasyonu (test saatini ayarlama yalnızca test yapılandırmasında).
- Oyuncu şirketi, başlangıç sermayesi, mağaza, ürün listesi ve şirket kasası.
- Tedarikçi listesi, boş miktar alanı, satıcı/ürün bazında sipariş ve sipariş takibi.
- Stok kapasitesi, parti hareketleri, vatandaş satışı, ürün fiyatı ve gelir/gider fişi.
- Sabit ürün ve miktar içeren kamu alım ihalesi; birim fiyat teklifi, yeterli stok kontrolü ve teklif anında tam miktar rezervasyonu.
- Basit ama aktif sanal rakipler ve vatandaş talebi.
- Yerel testte dünyada tek insan oyuncu.

### Faz 1 — Üretim ve fiziksel ağ
- Fabrika, üretim reçetesi, çalışan, enerji ve parti bazlı üretim.
- Depo, kapasite ve lokasyonlar arası transfer.
- Sanayi bölgesi ve arsa ihalesi.
- Ocak, ruhsat, kaynak rezervi ve temel tarla/hasat döngüsü.
- Şirketim ekranında tüm varlıkları birlikte görme.

### Faz 2 — Şehir ve yaşayan nüfus
- İstihdam, ücret, işsizlik, gelir grupları ve hane tüketimi.
- Sanal inşaat şirketleri, malzeme siparişi, konut projesi ve konut talebi.
- Şehir büyümesi, caddeler, ticari trafik ve yer bazlı kira/satış farkları.
- Fiyat, arz, talep ve enflasyon telemetrisiyle dengeleme.

### Faz 3 — Finans ve devlet
- Vadeli oyun içi mevduat ve günlük faiz tahakkuku.
- Teminatlı kredi, geri ödeme, uyarı ve yeniden yapılandırma.
- Kamu mal alımı/yapım ihalesi ve denetlenebilir sonuç.
- Vergi, politika, devlet bütçesi ve seçimler (oy çok oyunculu olacaksa).

### Faz 4 — Kalıcı çevrimiçi dünya
- Hesapla giriş, sunucu eşitleme, yedek ve cihazlar arası devam.
- Oyuncular arası pazar ve güvenli transfer/işlem defteri.
- İstismar, çoklu hesap, ekonomi güvenliği ve yük testleri.
- iOS istemcisi; aynı ekonomik kurallar ve veri modeli.
- Kontrollü beta, ekonomi ölçümü ve kademeli bölge açılışı.

Fazların sırası tasarım bütünlüğünü korur. Oyuncuya henüz çalışmayan bir Faz özelliği tamamlanmış gibi sunulmaz.

## 15. Kabul ölçütleri

Bir sistem “hazır” sayılmadan aşağıdaki ilgili koşullar karşılanır:

### Gün döngüsü
- Oyun Türkiye saatine göre 03.00'te yeni güne geçer; uygulama kapalıyken de işler.
- Aynı günlük kapanış yeniden çalıştırılırsa çift maaş, faiz, vergi, üretim veya nüfus değişimi olmaz.
- Oyuncu son kapanış özetini açıp neden-sonuç ilişkisini görür.

### Satın alma ve mağaza
- “Ürün Al” tedarikçi listesini açar.
- Her üreticinin kartı kendi ürün/stok/fiyatını ve kendine bağlı boş miktar alanı ile sipariş düğmesini gösterir.
- Miktar girilmeden sipariş verilemez; girilince stok, depo yeri, ara toplam, nakliye ve toplam doğru hesaplanır.
- Kamu ihale kartı ürünün tam ihale miktarını ve birimini gösterir; teklif alanı birim fiyatı **TL** olarak ister ve toplam sözleşme teklifini otomatik hesaplar.
- Kamu ihalesi teklifi, uygun serbest stok tam miktarı karşılamıyorsa reddedilir; teklif gönderildiği anda tam miktar rezerv edilir.
- Bekleyen teklifin rezervi başka satış, sipariş, üretim veya ihaleye kullanılamaz; kaybedilen/iptal edilen ihalede serbest bırakılır.
- Kazanan teklifin rezervi teslimat stokuna dönüşür; kamu malı teslim edilip kabul edildiğinde sözleşme bedeli şirket kasasına geçer.
- Bir ürün partisinin eşzamanlı satış ve ihale teklifinde iki kez rezerve edilmesi mümkün olmaz.
- Eş zamanlı siparişler nakit ve kapasiteyi aşamaz.
- Başarılı NPC satışında mağaza stoku doğru azalır, şirket kasası doğru artar ve rapor oluşur.
- Her ürün kartı aynı ölçü biriminde ortalama alış maliyeti ile satış fiyatını ayrı gösterir; gerçek alışlarda nakliye dahil ağırlıklı ortalama güncellenir, geçmişi olmayan ürün maliyeti tahmini olarak işaretlenir.
- Tahmini günlük satış adedi, oyuncu satış fiyatı değişince anlık yenilenir ve cadde/rakip/talep modelini kullanır.
- Stok varken öngörülen zaman dolunca ürün miktarı azalır ve satış bedeli şirket kasasına eklenir; uygulama arka plandayken geçen süre tekrar açılışta uzlaştırılır.
- Günlük 03.00 kapanışı, gün boyunca zaten kaydedilmiş satışları yeniden satmaz.
- “30 / 50 kg” ifadesi eldeki stok ve kapasiteyi doğru anlatır.

### Üretim ve stok
- Girdi yok, çalışan eksik, kapasite dolu veya depo doluysa üretim doğru biçimde engellenir/durur ve neden bildirilir.
- Üretim, transfer, satış, iade, bozulma ve haciz toplam miktarı parti defteriyle tutarlıdır.
- Tarihi geçen ürün satılmaz; FEFO uygulanır.

### Yer, ihaleler ve dönüşüm
- Cadde 1'in müşteri trafiği ve kirası diğer caddelerden dengeleme parametreleriyle farklıdır.
- Sanayi bölgesi şehir merkezinden ayrı görünür ve nakliye etkisi hesaplanır.
- Arsa ihalesinde teklif kaybedilince ayrılan para iade edilir; kazanılınca ödeme ve parsel sahipliği tek seferde kaydedilir.
- Kamu ürün ihalesi ilanında ürün, tam miktar ve birim açıkça görünür; teklif alanı birim fiyatı TL olarak ister ve toplamı miktarla çarparak gösterir.
- Serbest, uygun stok ihale miktarından azsa teklif reddedilir. Teklif kaydedildiği an stok miktarının tamamı atomik olarak kilitlenir; başka satış veya ihalede kullanılamaz.
- Kamu ihalesi kaybedilince veya iptal edilince stok serbest kalır. Kazanılınca ürün teslimat için tutulur; kabulden sonra sözleşme bedeli şirket kasasına ödenir.
- Aynı partiyi eşzamanlı iki işlem rezerve edemez; stok kontrolü sunucu tarafında ve atomik yapılır.
- Dönüşüm 2 oyun gününde tamamlanır; varlık bu aralıkta kullanılamaz.

### Tarla, ocak, nüfus ve inşaat
- Tarla şirket varlığı olarak Şirketim'de görünür; ekim/hasat takvimi, girdi ve stok hareketi izlenir.
- Ocak üretimi ruhsat ve rezerv olmadan gerçekleşmez; ruhsat araziyle karıştırılmaz.
- Çalışan talebi, ücret gideri ve kapasiteyle bağlıdır.
- Sanal inşaat şirketi malzeme satın aldığında oyuncu için gerçek stok/gelir işlemi oluşur; proje bütçesini aşan sonsuz kamu alımı yoktur.
- Konut arzı ve nüfus değişimi mağaza talebine etkisini ekonomi raporunda gösterir.

### Banka ve muhasebe
- Mevduat ana parası vade boyunca harcanabilir kasadan ayrılır; faiz doğru günlerde ve tek kez işler.
- Erken çekim ve vade sonu net tutarı onaydan önce gösterilen kuralla eşleşir.
- Kredi toplam geri ödeme, borç bakiyesi, faiz ve nakit akışı birbiriyle tutarlıdır.
- Kullanıcı borçla aldığı parayı ikinci kez teminat gösteremez.
- Haciz otomatik değildir; onay/uyarı, uygun parti, değerleme ve muhasebe kaydı test edilmeden açılmaz.
- Gelir, kâr, nakit ve stok değeri ayrı kavramlar olarak doğru gösterilir.

### İstemci ve teslimat
- Android uygulama ilgili temel ekranları gerçek veriyle açar; çalışmayan sekme ve buton kalmaz.
- Hata mesajı kullanıcıya anlaşılırdır; ekranı yenileme veya tekrar deneme çift işleme yol açmaz.
- Kurulum paketi APK olarak doğrulanır; dosya imzası/bütünlüğü kontrol edilir ve mümkün olan gerçek Android emülatörü/cihazında yükleme-açılış akışı doğrulanır.
- Bir özelliğin veritabanı tablosu veya maketi bulunması tek başına tamamlanma kanıtı değildir; kullanıcı akışı, yetki, ekonomi kaydı ve kabul ölçütü birlikte çalışmalıdır.

## 16. Dengeleme ve kapsam dışı kalan kararlar

Ekonomi oranları; faiz, vergi, ücret, kira, talep esnekliği, taşıma tarifesi, üretim verimi, ihale NPC teklifleri ve kredi sınırı merkezi ayarlanabilir parametreler olmalıdır. Başlangıç değerleri kısa ekonomik simülasyonlar ve oyuncu testleriyle ayarlanır. Oyuncu lehine/alehine kritik değerlerin ekranda açıklaması bulunur.

İlk sürümde kapsam dışı veya sonraya bırakılanlar: gerçek para ile ödeme/ödül, oyuncular arası gerçek değerli varlık ticareti, zorunlu reklam, canlı gerçek dünya verisiyle fiyat belirleme, sınırsız çevrimdışı para üretimi ve oyuncunun her sanal vatandaşı tek tek yönetmesi. Bu sınırlar temel ekonomi loop'unu küçültmez; oynanabilir ve doğrulanabilir bir beta çıkarır.

**Kısa özet:** Önce kullanıcı tek bir şirket ekranından mağaza ve diğer varlıklarını yönetebilmeli; ürün siparişini doğru üreticiye, doğru miktarla vermeli; üretim ve vatandaş satışları stok ile şirket kasasını otomatik ve tutarlı değiştirmeli. Ardından arazi, fabrika, depo, tarla, ocak, çalışanlar, konut, kamu ihaleleri ve banka faizi aynı günlük ekonomi kapanışına bağlanmalı. Tek oyunculu beta, bu dünyada insan oyuncunun yalnızca kendisi olduğu fakat karşısında çalışan simülasyon şirketleri bulunduğu test sürümüdür.

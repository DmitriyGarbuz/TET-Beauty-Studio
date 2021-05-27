function main() {

    function getLastCellWithData() {
        var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1aIeDv6_IGsPMh_-zGMKKFknC6vA94Nx35cpnTxk-QC8/edit?usp=sharing';
        var SHEET_NAME = 'coffe_mashine';
        var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
        var sheet = ss.getSheetByName(SHEET_NAME);
        var startRow = 2;
        var startColumn = 1;
        var numRows = 2;
        var numColumns = 5;

        for (var i = 2; i > 0; i++) {
            numRows = i;
            startRow = i;
            var lastRow = sheet.getSheetValues(startRow, startColumn, numRows, numColumns);
            var row = lastRow[0];
            var groupName = row[0];
            var url = row[1];
            var key = row[2];
            var keyRus = row[3];
            if (groupName !== "") {
                getAlladGroups(groupName, url, key, keyRus);
            } else { return }

        }
    }
    function getAlladGroups(a, u, k, kr) {
        var respounce = false;// если такая группа уже есть то false если нет то true
        var adGroupIterator = AdsApp.adGroups()
            .withCondition('CampaignName = "store.octotower.com - (Кофеварки) [НЧ] Поиск Киев"')
            .get();
        //Logger.log('Total adGroups found : ' + adGroupIterator.totalNumEntities());
        while (adGroupIterator.hasNext()) {
            var adGroup = adGroupIterator.next();
            // Logger.log('AdGroup Name: ' + adGroup.getName());
            if (adGroup.getName() === a) {
                respounce = false;

                return addAdGroup(respounce, a, u, k, kr);
            } else {
                respounce = true;

            }
        }
        return addAdGroup(respounce, a, u, k, kr);
    }

    function addAdGroup(r, a, u, k, kr) {
        var utm_kiyv = '{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=kavovarki_poisk_nch_kiev(id={campaignid})&utm_content={creative}&utm_term={keywords}';
        var utm_ua = '{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=kavovarki_poisk_nch_ukraine(id={campaignid})&utm_content={creative}&utm_term={keywords}';
        //Logger.log(r+' '+a);
        if (r === true) {
            var campaignIterator = AdsApp.campaigns()
                .withCondition('Name = "store.octotower.com - (Кофеварки) [НЧ] Поиск Киев"')
                .get();
            if (campaignIterator.hasNext()) {
                var campaignKyiv = "store.octotower.com - (Кофеварки) [НЧ] Поиск Киев";
                var campaign = campaignIterator.next();
                var adGroupOperation = campaign.newAdGroupBuilder()
                    .withName(a)
                    .withCpc(4.0)
                    .build();
                addExpandedTextAd(a, u, utm_kiyv, campaignKyiv);
                addKeyword(a, k, kr, campaignKyiv);
            }
            var campaignIterator2 = AdsApp.campaigns()
                .withCondition('Name = "store.octotower.com - (Кофеварки) [НЧ] Поиск Украина"')
                .get();
            if (campaignIterator2.hasNext()) {
                var campaignUa = "store.octotower.com - (Кофеварки) [НЧ] Поиск Украина";
                var campaign2 = campaignIterator2.next();
                var adGroupOperation2 = campaign2.newAdGroupBuilder()
                    .withName(a)
                    .withCpc(3.0)
                    .build();
                addExpandedTextAd(a, u, utm_ua, campaignUa);
                addKeyword(a, k, kr, campaignUa);
            }
        } else {
            Logger.log(a + ' - Такая группа уже существует');
        }

    }

    function addExpandedTextAd(name, url, utm, CampaignName) {
        var campaignIterator = AdsApp.campaigns()
            .withCondition('Name =  "' + CampaignName + '"')
            .get();
        if (campaignIterator.hasNext()) {
            var campaign = campaignIterator.next();
            var adGroupIterator = campaign.adGroups()
                .withCondition('Name = "' + name + '"')
                .get();
            Logger.log(adGroupIterator);
            if (adGroupIterator.hasNext()) {
                var adGroup = adGroupIterator.next();
                adGroup.newAd().expandedTextAdBuilder()
                    .withHeadlinePart1('Купуй Кавоварку')
                    .withHeadlinePart2(name)
                    .withHeadlinePart3('Доставка по Україні')
                    .withDescription1('Зручний спосіб оплати та доставки. Обирай якісне обладнання вже сьогодні!')
                    .withDescription2('Тільки потрібні речі для домашного користування та всього сегменту HoReCa.')
                    .withPath1('Кавоварки')
                    .withPath2('в OCTO store')
                    .withFinalUrl(url)
                    .withTrackingTemplate(utm)
                    .build();
                ////////////////////////////////////////////////////////////////// Ad 2 ////////////////////////////////////////////////////////////////////////////////////
                adGroup.newAd().expandedTextAdBuilder()
                    .withHeadlinePart1(name)
                    .withHeadlinePart2('Купити Київ')
                    .withHeadlinePart3('Кавоварки у OCTO store')
                    .withDescription1('Жити не можеш без кави? У нас лише найкраші моделі кавоварок.')
                    .withDescription2('StoreOcto - це потрібні для тебе Обладнання та Аксесуари для Кави.')
                    .withPath1('якісно_вигідно')
                    .withPath2('вже_сьогодні')
                    .withFinalUrl(url)
                    .withTrackingTemplate(utm)
                    .build();
                ////////////////////////////////////////////////////////////////// Ad 3 ////////////////////////////////////////////////////////////////////////////////////
                adGroup.newAd().expandedTextAdBuilder()
                    .withHeadlinePart1(name)
                    .withHeadlinePart2('Купуй Сьогодні')
                    .withHeadlinePart3('З OCTO store це просто')
                    .withDescription1('Доставка чи самовивіз, готівка чи карта, в OCTO store можливо все!')
                    .withDescription2('Велике різноманіття обладнання, інвентарю, спеціального одягу, посуду та кави.')
                    .withPath1('кавоварка')
                    .withPath2('професійна')
                    .withFinalUrl(url)
                    .withTrackingTemplate(utm)
                    .build();
                ////////////////////////////////////////////////////////////////// Ad 4 ////////////////////////////////////////////////////////////////////////////////////
                adGroup.newAd().expandedTextAdBuilder()
                    .withHeadlinePart1(name)
                    .withHeadlinePart2('Замовляй Зараз')
                    .withHeadlinePart3('OCTO store = Якість')
                    .withDescription1('Приходь до нас у шоу-рум або замовляй у інтернет-магазині якісне обладнання.')
                    .withDescription2('Хорека 360 - магазин тільки потрібних товарів. Обирай StoreOcto.')
                    .withPath1('купуй_вигідно')
                    .withPath2('вже_сьогодні')
                    .withFinalUrl(url)
                    .withTrackingTemplate(utm)
                    .build();
                ////////////////////////////////////////////////////////////////// Ad Responsive ////////////////////////////////////////////////////////////////////////////////////
                adGroup.newAd().responsiveSearchAdBuilder()
                    .withHeadlines([
                        { text: name, pinning: "HEADLINE_1" },
                        { text: "Є  в Магазині", pinning: "HEADLINE_2" },
                        { text: "Доставка по Україні", pinning: "HEADLINE_2" },
                        { text: "Замовляй Зараз", pinning: "HEADLINE_2" },
                        { text: "Інтернет Магазин Київ", pinning: "HEADLINE_2" },
                        { text: "Купуй Сьогодні", pinning: "HEADLINE_2" },
                        { text: "З OCTO store це просто", pinning: "HEADLINE_3" },
                        { text: "OCTO store = Якість", pinning: "HEADLINE_3" },
                        { text: "Потрібний стор OCTO store", pinning: "HEADLINE_3" },
                        { text: "Store.OCTOtower.сom", pinning: "HEADLINE_3" },
                        { text: "Шоурум OCTO store", pinning: "HEADLINE_3" },
                        { text: "Товари сегменту HoReCa", pinning: "HEADLINE_3" }
                    ])
                    .withDescriptions([
                        'Зручний спосіб оплати та доставки. Обирай якісне обладнання вже сьогодні!',
                        'Тільки потрібні речі для домашного користування та всього сегменту HoReCa.',
                        'Велике різноманіття обладнання, інвентарю, спеціального одягу, посуду та кави.',
                        'Приходь до нас у шоу-рум або замовляй у інтернет-магазині якісне обладнання.'
                    ])
                    .withPath1("замовити")
                    .withPath2("вже_сьогодні")
                    .withFinalUrl(url)
                    .withTrackingTemplate(utm)
                    .build();
                Logger.log("Ads worked");
            }
        }
    }

    function addKeyword(name, key, keyRus, campaignName) {
        var arr1 = key.split(" ");
        var arr2 = keyRus.split(" ");
        var modif1
        var modif2
        function modification(arr1, arr2) {
            for (var i = 0; i < arr1.length; i += 1) {
                arr1[i] = '+' + arr1[i];
            }
            modif1 = arr1.join(' ');
            for (var i = 0; i < arr2.length; i += 1) {
                arr2[i] = '+' + arr2[i];
            }
            modif2 = arr2.join(' ');
        }
        modification(arr1, arr2);
        var key1 = modif1;
        var key2 = modif2;
        var key3 = modif1 + ' +Kупить';
        var key4 = modif2 + ' +Kупить';
        var key5 = modif1 + ' +Заказать';
        var key6 = modif2 + ' +Заказать';

        var campaignIterator = AdsApp.campaigns()
            .withCondition('Name =  "' + campaignName + '"')
            .get();
        if (campaignIterator.hasNext()) {
            var campaign = campaignIterator.next();
            var adGroupIterator = campaign.adGroups()
                .withCondition('Name = "' + name + '"')
                .get();
            if (adGroupIterator.hasNext()) {
                var adGroup = adGroupIterator.next();
                adGroup.newKeywordBuilder()
                    .withText(key1)
                    .build();
                adGroup.newKeywordBuilder()
                    .withText(key2)
                    .build();
                adGroup.newKeywordBuilder()
                    .withText(key3)
                    .build();
                adGroup.newKeywordBuilder()
                    .withText(key4)
                    .build();
                adGroup.newKeywordBuilder()
                    .withText(key5)
                    .build();
                adGroup.newKeywordBuilder()
                    .withText(key6)
                    .build();
                Logger.log("key worked");
            }
        }
    }
    getLastCellWithData();

}
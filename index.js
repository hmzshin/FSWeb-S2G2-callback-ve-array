const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

// function Finaller(arr) {
//   return arr.filter((arrObje) => arrObje["Stage"] === "Final");
// }

// console.log("görev2:", Finaller(fifaData)[0]);
function Finaller(fifaData) {
  const finalMatches = fifaData.filter((match) => match.Stage === "Final");
  return finalMatches;
}
console.log("Görev 2: ", Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arr, fonksiyonFinaller) {
  const finaller = fonksiyonFinaller(arr);
  const yillar = finaller.map((obje) => obje.Year);
  return yillar;
}
console.log("Görev3 :", Yillar(fifaData, Finaller));

// Kendime Notlar :Görev Üç te dizi uzunluğu aynı kaldığı ve dizinin her bir indexi için işlem yaptığımızdan dolayı .map() fonksiyonunu kullandık.
// Kendime Notlar :map fonksiyonu bizim for döngüsü ile yapacağımız işlemi yapıyor. bu şekilde düşünüp sanki for döngüsü içerisine yazıyormuş gibi kodlarımız yazmamız gerekiyor.

// console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(arr, fonksiyonFinaller) {
  const finaller = fonksiyonFinaller(arr);
  const winners = finaller.map((obje) => {
    if (obje["Home Team Goals"] > obje["Away Team Goals"]) {
      obje["Win conditions"] = obje["Home Team Name"];
    } else if (obje["Home Team Goals"] < obje["Away Team Goals"]) {
      obje["Win conditions"] = obje["Away Team Name"];
    } else {
    }
    return obje["Win conditions"];
  });

  return winners;
}
console.log("Görev4: ", Kazananlar(fifaData, Finaller));
/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(
  arr,
  fonksiyonFinaller,
  fonksiyonYillar,
  fonksiyonKazananlar
) {
  const finaller = fonksiyonFinaller(arr);
  const yillar = fonksiyonYillar(arr, fonksiyonFinaller);
  const kazananlar = fonksiyonKazananlar(arr, fonksiyonFinaller);

  const ekranaYazdır = [];
  for (let i = 0; i < finaller.length; i++) {
    ekranaYazdır.push(
      `${yillar[i]} yılında, ${kazananlar[i]} dünya kupasını kazandı!`
    );
  }

  return ekranaYazdır;
}

console.log(
  "görev5 :",
  YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar)
);

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(fonksiyonFinaller) {
  const finaller = fonksiyonFinaller;
  const genelToplam = finaller.reduce((toplam, obje) => {
    return toplam + obje["Home Team Goals"] + obje["Away Team Goals"];
  }, 0);

  const ortalama = (genelToplam / finaller.length).toFixed(2);
  return ortalama;
}

// console.log("görev6: ", OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};

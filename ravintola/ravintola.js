const Ravintola = function () {
  this.alkuruoat = [
    { ruoka: 'Tomaattikeitto', hinta: 4 },
    { ruoka: 'Leipä', hinta: 2 },
    { ruoka: 'Vihersalaatti', hinta: 3 },
    { ruoka: 'Salsa', hinta: 3 },
  ];
  this.paaruoat = [
    { ruoka: 'Kalakeitto', hinta: 6 },
    { ruoka: 'Makaroonilaatikko', hinta: 5 },
    { ruoka: 'Kasvispihvi', hinta: 7 },
    { ruoka: 'Kanasalaatti', hinta: 6 },
  ];
  this.jalkiruoat = [
    { ruoka: 'Hedelmäsalaatti', hinta: 4 },
    { ruoka: 'Jäätelö', hinta: 3 },
    { ruoka: 'Pulla', hinta: 2 },
    { ruoka: 'Donitsi', hinta: 3 },
  ];
  this.juomat = [
    { ruoka: 'Tee', hinta: 2 },
    { ruoka: 'Kahvi', hinta: 2 },
    { ruoka: 'Maito', hinta: 1 },
    { ruoka: 'Mehu', hinta: 2 },
  ];

  this.paikkojenMaara = 15;
  this.paikat = undefined;
};

/**
 * Alustaa ravintolan paikat false-arvoilla.
 * @return {boolean[]}
 */
Ravintola.prototype.generoiPaikat = function () {
  this.paikat = new Array(this.paikkojenMaara).fill(false);
  return this.paikat;
};

/**
 * Varaa ilmoitetun määrän paikkoja, jos tilaa on.
 * @param {number} [varauksenMaara=1]
 * @return {boolean}
 */
Ravintola.prototype.varaaPaikat = function (varauksenMaara = 1) {
  if (!Array.isArray(this.paikat)) {
    this.generoiPaikat();
  }

  const vapaatPaikat = this.paikat.filter((p) => p === false).length;

  if (vapaatPaikat < varauksenMaara) {
    return false;
  }

  let varattu = 0;
  for (let i = 0; i < this.paikat.length; i++) {
    if (this.paikat[i] === false && varattu < varauksenMaara) {
      this.paikat[i] = true;
      varattu++;
    }
  }
  return true;
};

Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  const onnistui = this.varaaPaikat(asiakkaidenMaara);

  if (!onnistui) {
    throw new Error('Ravintola on täynnä.');
  }

  const tilaukset = [];
  for (let i = 0; i < asiakkaidenMaara; i++) {
    tilaukset.push(
      this.tilaaAteria(
        Math.random() < 0.5,
        Math.random() < 0.5,
        Math.random() < 0.5
      )
    );
  }
  return tilaukset;
};

Ravintola.prototype.tilaaAteria = function (ottaaAlku, ottaaJalki, ottaaJuoma) {
  const ruoat = [];
  ruoat.push(this.palautaTaulukonSatunnainenArvo(this.paaruoat));

  if (ottaaAlku)
    ruoat.push(this.palautaTaulukonSatunnainenArvo(this.alkuruoat));
  if (ottaaJalki)
    ruoat.push(this.palautaTaulukonSatunnainenArvo(this.jalkiruoat));
  if (ottaaJuoma) ruoat.push(this.palautaTaulukonSatunnainenArvo(this.juomat));

  return { summa: this.laskeLasku(ruoat), ruoat };
};

Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * Laskee aterian hinnan oliotaulukosta.
 * @param {object[]} valitutRuoat
 * @return {number}
 */
Ravintola.prototype.laskeLasku = function (valitutRuoat) {
  if (!Array.isArray(valitutRuoat)) throw new TypeError();
  return valitutRuoat.reduce((summa, kohde) => summa + kohde.hinta, 0);
};

const ravintola = new Ravintola();
export default ravintola;

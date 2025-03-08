class MV_DigitalITT extends BaseInstrument {
    constructor() {
      super();
    }
    get ["templateID"]() {
      return 'DigitalITT';
    }
    ["connectedCallback"]() {
      super.connectedCallback();
      super.connectedCallback();
      this.Display = this.getChildById("content");
      this.textElemThousands = this.getChildById("thousands");
      this.textElemHundreds = this.getChildById("hundreds");
      this.textElemTens = this.getChildById("tens");
      this.textElemOnes = this.getChildById("ones");
    }
    ["disconnectedCallback"]() {
      super.disconnectedCallback();
    }
    ['isMainBusAvailable']() {
      var _0x4b824e = SimVar.GetSimVarValue("ELECTRICAL MAIN BUS VOLTAGE", "Volts");
      if (_0x4b824e > 0x12) {
        return true;
      }
      return false;
    }
    ["Update"]() {
      super.Update();
      if (this.isMainBusAvailable()) {
        this.Display.classList.add('show');
        var _0x3f050e = SimVar.GetSimVarValue("A:TURB ENG ITT:1", 'celsius');
        if (_0x3f050e > 0x2d5) {
          this.textElemThousands.classList.add('blink');
          this.textElemHundreds.classList.add("blink");
          this.textElemTens.classList.add("blink");
          this.textElemOnes.classList.add('blink');
        } else {
          this.textElemThousands.classList.remove("blink");
          this.textElemHundreds.classList.remove("blink");
          this.textElemTens.classList.remove("blink");
          this.textElemOnes.classList.remove("blink");
        }
        var _0x33d029 = Math.trunc(_0x3f050e);
        var _0x4e5ef6 = Math.floor(_0x33d029 / 0x1 % 0xa);
        diffAndSetText(this.textElemOnes, _0x4e5ef6);
        if (_0x33d029 >= 0xa) {
          var _0x61c036 = Math.floor(_0x33d029 / 0xa % 0xa);
          diffAndSetText(this.textElemTens, _0x61c036);
        } else {
          diffAndSetText(this.textElemTens, '');
        }
        if (_0x33d029 >= 0x64) {
          var _0x1101e9 = Math.floor(_0x33d029 / 0x64 % 0xa);
          diffAndSetText(this.textElemHundreds, _0x1101e9);
        } else {
          diffAndSetText(this.textElemHundreds, '');
        }
        if (_0x33d029 >= 0x3e8) {
          var _0x5a95d3 = Math.floor(_0x33d029 / 0x3e8 % 0xa);
          diffAndSetText(this.textElemThousands, _0x5a95d3);
        } else {
          diffAndSetText(this.textElemThousands, '');
        }
      } else {
        this.Display.classList.remove("show");
      }
    }
  }
  registerInstrument("milviz-itt-element", MV_DigitalITT);
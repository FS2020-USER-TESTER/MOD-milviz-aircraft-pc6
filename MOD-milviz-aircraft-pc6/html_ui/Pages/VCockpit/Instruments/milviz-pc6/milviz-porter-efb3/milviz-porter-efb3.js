var cargoSliderMoving = false;
var pilotweightSliderMoving = false;
var copilotweightSliderMoving = false;
var passoneweightSliderMoving = false;
var passtwoweightSliderMoving = false;
var passthreeweightSliderMoving = false;
var passfourweightSliderMoving = false;
var passfiveweightSliderMoving = false;
var passsixweightSliderMoving = false;
var lm_fuelSliderMoving = false;
var rm_fuelSliderMoving = false;
var le_fuelSliderMoving = false;
var re_fuelSliderMoving = false;
var splash;
const jumperWeights = new Array();
this.jumpHeight;
class MVZ_GENERIC_EFB extends BaseInstrument {
  constructor() {
    super();
    this.initDuration = 0xfa0;
    this.activePage = "Waiting...";
    this.nIntervId = null;
    this._t = 0x0;
    this.cargoStoredValue = 0x0;
    this.cargoStoredFlag = false;
    this.pilotStoredValue = 0x0;
    this.pilotStoredFlag = false;
    this.copilotStoredValue = 0x0;
    this.copilotStoredFlag = false;
    this.p1StoredValue = 0x0;
    this.p1StoredFlag = false;
    this.p2StoredValue = 0x0;
    this.p2StoredFlag = false;
    this.p3StoredValue = 0x0;
    this.p3StoredFlag = false;
    this.p4StoredValue = 0x0;
    this.p4StoredFlag = false;
    this.p5StoredValue = 0x0;
    this.p5StoredFlag = false;
    this.p6StoredValue = 0x0;
    this.p6StoredFlag = false;
    this.leftmainStoredValue = 0x0;
    this.leftmainStoredFlag = false;
    this.rightmainStoredValue = 0x0;
    this.rightmainStoredFlag = false;
    this.leftextStoredValue = 0x0;
    this.leftextStoredFlag = false;
    this.rightextStoredValue = 0x0;
    this.rightextStoredFlag = false;
  }
  get ["templateID"]() {
    return "MV_EFB";
  }
  get ['isInteractive']() {
    return true;
  }
  get ["IsGlassCockpit"]() {
    return true;
  }
  ["connectedCallback"]() {
    super.connectedCallback();
    {
      const _0x52aebe = document.getElementById("MV_INJECT_SCRIPT").innerHTML;
      const _0x58235c = document.createElement("script");
      _0x58235c.innerHTML = _0x52aebe;
      document.body.prepend(_0x58235c);
    }
    this.mainDisplay = this.getChildById("MainDisplay");
    splash = this.getChildById("splash");
    setTimeout(function () {
      splash.classList.add('hidden');
    }, 0x1d4c0);
    splash.addEventListener("mouseup", this.optionClick.bind(this));
    this.ac_type = this.getChildById("ac_type");
    this.reg_nr_atc = this.getChildById('reg_nr_atc');
    this.timeValue = this.getChildById('test');
    this.uom = this.getChildById('uom');
    this.isMetric = SimVar.GetGameVarValue("GAME UNIT IS METRIC", "Boolean");
    this.lCargo = this.getChildById("input_cargo");
    this.jumpingActiveFlag = false;
    if (this.isMetric == 0x1) {
      diffAndSetAttribute(this.lCargo, "max", 0x3e8);
      this.uom.innerHTML = 'kg';
      this.uomLabel = 'kg';
    } else {
      diffAndSetAttribute(this.lCargo, 'max', 0x7d0);
      this.uom.innerHTML = 'lb';
      this.uomLabel = 'lb';
    }
    this.btnMenuConfig = this.getChildById("btnMenuConfig");
    this.btnMenuConfig.addEventListener("mouseup", this.menuPress.bind(this));
    this.btnMenuPassenger = this.getChildById("btnMenuPassenger");
    this.btnMenuPassenger.addEventListener("mouseup", this.menuPress.bind(this));
    this.btnMenuFuel = this.getChildById("btnMenuFuel");
    this.btnMenuFuel.addEventListener('mouseup', this.menuPress.bind(this));
    this.input_radar_pod = this.getChildById("input_radar_pod");
    this.input_radar_pod.addEventListener("change", this.optionClick.bind(this));
    this.option_exhaust_cover = this.getChildById("option_exhaust_cover");
    this.input_exhaust_cover = this.getChildById("input_exhaust_cover");
    this.input_exhaust_cover.addEventListener("change", this.optionClick.bind(this));
    this.option_intake_cover = this.getChildById("option_intake_cover");
    this.input_intake_cover = this.getChildById("input_intake_cover");
    this.input_intake_cover.addEventListener("change", this.optionClick.bind(this));
    this.option_prop_tiedown = this.getChildById("option_prop_tiedown");
    this.input_prop_tiedown = this.getChildById('input_prop_tiedown');
    this.input_prop_tiedown.addEventListener("change", this.optionClick.bind(this));
    this.option_pitot_cover = this.getChildById("option_pitot_cover");
    this.input_pitot_cover = this.getChildById('input_pitot_cover');
    this.input_pitot_cover.addEventListener("change", this.optionClick.bind(this));
    this.option_tiedown_blocks = this.getChildById("option_tiedown_blocks");
    this.input_tiedown_blocks = this.getChildById("input_tiedown_blocks");
    this.input_tiedown_blocks.addEventListener('change', this.optionClick.bind(this));
    this.option_chocks = this.getChildById('option_chocks');
    this.input_chocks = this.getChildById('input_chocks');
    this.input_chocks.addEventListener("change", this.optionClick.bind(this));
    this.option_skis = this.getChildById("option_skis");
    this.input_skis = this.getChildById("input_skis");
    this.input_skis.addEventListener("change", this.optionClick.bind(this));
    this.title_gpstypes = this.getChildById("title_gpstypes");
    this.option_gns = this.getChildById("option_radio_gns");
    this.option_blank = this.getChildById("option_radio_blank");
    this.input_radio_gns = this.getChildById("input_radio_gns");
    this.input_radio_gns.addEventListener('change', this.optionClick.bind(this));
    this.input_radio_blank = this.getChildById("input_radio_blank");
    this.input_radio_blank.addEventListener("change", this.optionClick.bind(this));
    this.option_drop_cargo = this.getChildById('option_drop_cargo');
    this.option_trapdoor_cover = this.getChildById("option_trapdoor_cover");
    this.input_trapdoor_cover = this.getChildById('input_trapdoor_cover');
    this.input_trapdoor_cover.addEventListener("change", this.optionClick.bind(this));
    this.option_drop_crate = this.getChildById("option_drop_crate");
    this.input_drop_crate = this.getChildById('input_drop_crate');
    this.input_drop_crate.addEventListener('change', this.optionClick.bind(this));
    this.input_empty_cargo = this.getChildById('input_empty_cargo');
    this.input_empty_cargo.addEventListener('mouseup', this.optionClick.bind(this));
    this.input_max_cargo = this.getChildById('input_max_cargo');
    this.input_max_cargo.addEventListener('mouseup', this.optionClick.bind(this));
    this.input_pilot_co = this.getChildById("input_pilot_co");
    this.input_pilot_co.addEventListener('change', this.optionClick.bind(this));
    this.button_left_front_door = this.getChildById("button_left_front_door");
    this.button_left_front_door.addEventListener('mouseup', this.optionClick.bind(this));
    this.button_right_front_door = this.getChildById("button_right_front_door");
    this.button_right_front_door.addEventListener('mouseup', this.optionClick.bind(this));
    this.button_left_rear_door = this.getChildById("button_left_rear_door");
    this.button_left_rear_door.addEventListener("mouseup", this.optionClick.bind(this));
    this.button_right_rear_door = this.getChildById("button_right_rear_door");
    this.button_right_rear_door.addEventListener("mouseup", this.optionClick.bind(this));
    this.button_doors_return = this.getChildById("button_doors_return");
    this.button_doors_return.addEventListener("mouseup", this.optionClick.bind(this));
    this.input_layout_cargo = this.getChildById("input_layout_cargo");
    this.input_layout_cargo.addEventListener("change", this.optionClick.bind(this));
    this.input_layout_passengers = this.getChildById('input_layout_passengers');
    this.input_layout_passengers.addEventListener("change", this.optionClick.bind(this));
    this.option_layout_skydiving = this.getChildById("option_layout_skydiving");
    this.input_layout_skydiving = this.getChildById('input_layout_skydiving');
    this.input_layout_skydiving.addEventListener("change", this.optionClick.bind(this));
    this.lCargoSetup = this.getChildById("cargo_setup");
    this.lPassengerSetup = this.getChildById('passenger_setup');
    this.lSkydivingSetup = this.getChildById('skydiving_setup');
    this.lCargo.addEventListener("mousedown", function () {
      cargoSliderMoving = true;
    });
    this.lCargo.addEventListener("mouseup", function () {
      cargoSliderMoving = false;
    });
    this.lCargo.addEventListener("change", this.optionClick.bind(this));
    this.lCargoLabel = this.getChildById('cargo_label');
    this.lPilotWeight = this.getChildById("input_pilot_weight");
    this.lPilotWeight.addEventListener('mousedown', function () {
      pilotweightSliderMoving = true;
    });
    this.lPilotWeight.addEventListener("mouseup", function () {
      pilotweightSliderMoving = false;
    });
    this.lPilotWeight.addEventListener("change", this.optionClick.bind(this));
    this.lPilotWeightLabel = this.getChildById('pilot_weight_label');
    this.lCopilotWeight = this.getChildById('input_copilot_weight');
    this.lCopilotWeight.addEventListener('mousedown', function () {
      copilotweightSliderMoving = true;
    });
    this.lCopilotWeight.addEventListener('mouseup', function () {
      copilotweightSliderMoving = false;
    });
    this.lCopilotWeight.addEventListener("change", this.optionClick.bind(this));
    this.lCopilotWeightLabel = this.getChildById("copilot_weight_label");
    this.lPassOneWeight = this.getChildById('input_passenger_1');
    this.lPassOneWeight.addEventListener('mousedown', function () {
      passoneweightSliderMoving = true;
    });
    this.lPassOneWeight.addEventListener('mouseup', function () {
      passoneweightSliderMoving = false;
    });
    this.lPassOneWeight.addEventListener("change", this.optionClick.bind(this));
    this.lPassTwoWeight = this.getChildById("input_passenger_2");
    this.lPassTwoWeight.addEventListener("mousedown", function () {
      passtwoweightSliderMoving = true;
    });
    this.lPassTwoWeight.addEventListener("mouseup", function () {
      passtwoweightSliderMoving = false;
    });
    this.lPassTwoWeight.addEventListener("change", this.optionClick.bind(this));
    this.lPassThreeWeight = this.getChildById("input_passenger_3");
    this.lPassThreeWeight.addEventListener("mousedown", function () {
      passthreeweightSliderMoving = true;
    });
    this.lPassThreeWeight.addEventListener("mouseup", function () {
      passthreeweightSliderMoving = false;
    });
    this.lPassThreeWeight.addEventListener("change", this.optionClick.bind(this));
    this.lPassFourWeight = this.getChildById("input_passenger_4");
    this.lPassFourWeight.addEventListener('mousedown', function () {
      passfourweightSliderMoving = true;
    });
    this.lPassFourWeight.addEventListener("mouseup", function () {
      passfourweightSliderMoving = false;
    });
    this.lPassFourWeight.addEventListener("change", this.optionClick.bind(this));
    this.lPassFiveWeight = this.getChildById("input_passenger_5");
    this.lPassFiveWeight.addEventListener("mousedown", function () {
      passfiveweightSliderMoving = true;
    });
    this.lPassFiveWeight.addEventListener("mouseup", function () {
      passfiveweightSliderMoving = false;
    });
    this.lPassFiveWeight.addEventListener("change", this.optionClick.bind(this));
    this.lPassSixWeight = this.getChildById("input_passenger_6");
    this.lPassSixWeight.addEventListener('mousedown', function () {
      passsixweightSliderMoving = true;
    });
    this.lPassSixWeight.addEventListener("mouseup", function () {
      passsixweightSliderMoving = false;
    });
    this.lPassSixWeight.addEventListener('change', this.optionClick.bind(this));
    this.inputPassengerOne = this.getChildById('passenger_one');
    this.inputPassengerOne.addEventListener('mouseup', this.passengerWeightClick.bind(this));
    this.inputPassengerTwo = this.getChildById("passenger_two");
    this.inputPassengerTwo.addEventListener("mouseup", this.passengerWeightClick.bind(this));
    this.inputPassengerThree = this.getChildById("passenger_three");
    this.inputPassengerThree.addEventListener("mouseup", this.passengerWeightClick.bind(this));
    this.inputPassengerFour = this.getChildById("passenger_four");
    this.inputPassengerFour.addEventListener("mouseup", this.passengerWeightClick.bind(this));
    this.inputPassengerFive = this.getChildById('passenger_five');
    this.inputPassengerFive.addEventListener("mouseup", this.passengerWeightClick.bind(this));
    this.inputPassengerSix = this.getChildById("passenger_six");
    this.inputPassengerSix.addEventListener('mouseup', this.passengerWeightClick.bind(this));
    this.passengerWeight1 = this.getChildById("passenger_1_label");
    this.passengerWeight2 = this.getChildById("passenger_2_label");
    this.passengerWeight3 = this.getChildById('passenger_3_label');
    this.passengerWeight4 = this.getChildById("passenger_4_label");
    this.passengerWeight5 = this.getChildById('passenger_5_label');
    this.passengerWeight6 = this.getChildById("passenger_6_label");
    this.mtow = this.getChildById("mtow");
    this.cw = this.getChildById("current_weight");
    this.lExternalTanks = this.getChildById("input_external_tanks");
    this.lExternalTanks.addEventListener("change", this.optionClick.bind(this));
    this.fuelLeftMain = this.getChildById('input_left_main');
    this.fuelRightMain = this.getChildById("input_right_main");
    this.fuelExtLeft = this.getChildById("input_external_tank_left");
    this.fuelExtRight = this.getChildById("input_external_tank_right");
    this.fuelLeftMain.addEventListener("mousedown", function () {
      lm_fuelSliderMoving = true;
    });
    this.fuelLeftMain.addEventListener("mouseup", function () {
      lm_fuelSliderMoving = false;
    });
    this.fuelLeftMain.addEventListener("change", this.optionClick.bind(this));
    this.fuelRightMain.addEventListener("mousedown", function () {
      rm_fuelSliderMoving = true;
    });
    this.fuelRightMain.addEventListener("mouseup", function () {
      rm_fuelSliderMoving = false;
    });
    this.fuelRightMain.addEventListener("change", this.optionClick.bind(this));
    this.fuelExtLeft.addEventListener("mousedown", function () {
      le_fuelSliderMoving = true;
    });
    this.fuelExtLeft.addEventListener("mouseup", function () {
      le_fuelSliderMoving = false;
    });
    this.fuelExtLeft.addEventListener("change", this.optionClick.bind(this));
    this.fuelExtRight.addEventListener("mousedown", function () {
      re_fuelSliderMoving = true;
    });
    this.fuelExtRight.addEventListener("mouseup", function () {
      re_fuelSliderMoving = false;
    });
    this.fuelExtRight.addEventListener("change", this.optionClick.bind(this));
    this.num_left_main = this.getChildById('num_left_main');
    this.num_right_main = this.getChildById("num_right_main");
    this.num_external_left = this.getChildById("num_external_left");
    this.num_external_right = this.getChildById("num_external_right");
    this.slider_gallon_lb = this.getChildById('gallon_lb');
    this.slider_kg_ltr = this.getChildById('kg_ltr');
    this.fuel_us_system = this.getChildById("fuel_us_system");
    this.fuel_metric = this.getChildById('fuel_metric');
    this.input_level_tanks_main = this.getChildById("input_level_tanks_main");
    this.input_level_tanks_main.addEventListener("mouseup", this.optionClick.bind(this));
    this.input_sync_tanks_main = this.getChildById("input_sync_tanks_main");
    this.input_sync_tanks_main.addEventListener("mouseup", this.optionClick.bind(this));
    this.input_full_tanks_main = this.getChildById("input_full_tanks_main");
    this.input_full_tanks_main.addEventListener("mouseup", this.optionClick.bind(this));
    this.input_level_tanks_ext = this.getChildById("input_level_tanks_ext");
    this.input_level_tanks_ext.addEventListener("mouseup", this.optionClick.bind(this));
    this.input_sync_tanks_ext = this.getChildById("input_sync_tanks_ext");
    this.input_sync_tanks_ext.addEventListener('mouseup', this.optionClick.bind(this));
    this.input_full_tanks_ext = this.getChildById("input_full_tanks_ext");
    this.input_full_tanks_ext.addEventListener('mouseup', this.optionClick.bind(this));
    if (this.isMetric == 0x1) {
      this.fuel_us_system.classList.add("hidden");
      this.fuel_metric.classList.remove("hidden");
    }
    this.input_skydiving_load = this.getChildById('input_skydiving_load');
    this.input_skydiving_load.addEventListener("mouseup", this.optionClick.bind(this));
    this.input_skydiving_jump = this.getChildById('input_skydiving_jump');
    this.input_skydiving_jump.addEventListener("mouseup", this.optionClick.bind(this));
    this.display_jump_number = this.getChildById("display_jump_number");
    this.display_jump_weight = this.getChildById("display_jump_weight");
    this.display_jump_altitude = this.getChildById("display_jump_altitude");
    this.display_jump_message = this.getChildById("display_jump_message");
  }
  ["parseXMLConfig"]() {
    super.parseXMLConfig();
  }
  ["disconnectedCallback"]() {
    super.disconnectedCallback();
  }
  ['Init']() {
    super.Init();
    let _0x340a35 = new URL(this.getAttribute("Url").toLowerCase());
    var _0x2c7a59 = _0x340a35.searchParams.get("config");
    if (_0x2c7a59) {
      this.AircraftVersion = parseInt(_0x2c7a59);
    }
    var _0xdec578 = _0x340a35.searchParams.get("panel");
    if (_0xdec578) {
      this.PanelVersion = parseInt(_0xdec578);
    }
    switch (this.AircraftVersion) {
      case 0x0:
        this.ac_type.innerHTML = '';
        break;
      case 0x1:
        this.ac_type.innerHTML = "- 'Tundra Edition'";
        SimVar.SetSimVarValue("L:PC6_Option_Skis", 'Boolean', 0x0);
        SimVar.SetSimVarValue("L:PC6_State_Chocks", "Boolean", 0x0);
        SimVar.SetSimVarValue("L:PC6_State_Blocks", "Boolean", 0x0);
        this.option_skis.classList.add("hidden");
        this.option_chocks.classList.add("hidden");
        this.option_tiedown_blocks.classList.add("hidden");
        break;
      case 0x2:
        this.ac_type.innerHTML = "- 'Floats Edition'";
        this.option_skis.classList.add("hidden");
        this.option_chocks.classList.add('hidden');
        this.option_tiedown_blocks.classList.add("hidden");
        this.option_layout_skydiving.classList.add('disabled');
        this.option_drop_cargo.classList.add("hidden");
        SimVar.SetSimVarValue("L:PC6_Option_Skis", "Boolean", 0x0);
        SimVar.SetSimVarValue('L:PC6_State_Chocks', "Boolean", 0x0);
        SimVar.SetSimVarValue("L:PC6_State_Blocks", "Boolean", 0x0);
        break;
    }
    switch (this.PanelVersion) {
      case 0x0:
        this.title_gpstypes.classList.add("hidden");
        this.option_gns.classList.add("hidden");
        this.option_blank.classList.add("hidden");
        SimVar.SetSimVarValue("L:PC6_PanelState", 'Boolean', 0x0);
        break;
      case 0x1:
        this.title_gpstypes.classList.remove('hidden');
        this.option_gns.classList.remove("hidden");
        this.option_blank.classList.remove("hidden");
        SimVar.SetSimVarValue("L:PC6_PanelState", "Boolean", 0x1);
        break;
    }
  }
  ["menuPress"](_0x5a81a3) {
    switch (_0x5a81a3.target.id) {
      case "btnMenuConfig":
        this.activePage = "Configuration button pressed";
        break;
      case "btnMenuPassenger":
        this.activePage = "Passengers/Cargo button pressed";
        break;
      case 'btnMenuFuel':
        this.activePage = "Fuel button pressed";
        break;
    }
  }
  ['passengerWeightClick'](_0xc888fa) {
    var _0x257ff8 = "Pounds";
    var _0x1dcf28 = Math.floor(Math.random() * 0xb5 + 0x5a);
    if (this.isMetric == 0x1) {
      _0x257ff8 = 'Kg';
      _0x1dcf28 = Math.floor(Math.random() * 0x51 + 0x28);
    }
    if (_0xc888fa.target.checked == false) {
      _0x1dcf28 = 0x0;
    }
    switch (_0xc888fa.target.id) {
      case "passenger_one":
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:4", _0x257ff8, _0x1dcf28);
        break;
      case "passenger_two":
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:5", _0x257ff8, _0x1dcf28);
        break;
      case 'passenger_three':
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:6", _0x257ff8, _0x1dcf28);
        break;
      case "passenger_four":
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:7", _0x257ff8, _0x1dcf28);
        break;
      case 'passenger_five':
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:8", _0x257ff8, _0x1dcf28);
        break;
      case "passenger_six":
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:9", _0x257ff8, _0x1dcf28);
        break;
    }
  }
  ['fuelChange'](_0x4e6f89) {
    var _0x51ee86 = "Pounds";
    if (this.isMetric == 0x1) {
      _0x51ee86 = 'Kg';
    }
    switch (_0x4e6f89.target.id) {
      case "num_left_main":
        SimVar.SetSimVarValue("A: FUEL TANK LEFT MAIN QUANTITY", 'Gallons', _0x4e6f89.target.value);
        break;
      case "num_right_main":
        SimVar.SetSimVarValue("A: FUEL TANK RIGHT MAIN QUANTITY", 'Gallons', _0x4e6f89.target.value);
        break;
      case "num_external_left":
        SimVar.SetSimVarValue("A: FUEL TANK EXTERNAL1 QUANTITY", "Gallons", _0x4e6f89.target.value);
        break;
      case "num_external_right":
        SimVar.SetSimVarValue("A: FUEL TANK EXTERNAL2 QUANTITY", 'Gallons', _0x4e6f89.target.value);
        break;
    }
  }
  ['getRandomInt'](_0x223b69, _0x47b18f) {
    _0x223b69 = Math.ceil(_0x223b69);
    _0x47b18f = Math.floor(_0x47b18f);
    return Math.floor(Math.random() * (_0x47b18f - _0x223b69) + _0x223b69);
  }
  ["cleanPayloadWeights"]() {
    SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:3", "Pounds", 0x0);
    SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:4", "Pounds", 0x0);
    SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:5", "Pounds", 0x0);
    SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:6", "Pounds", 0x0);
    SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:7", "Pounds", 0x0);
    SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:8", "Pounds", 0x0);
    SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:9", "Pounds", 0x0);
    SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:10", 'Pounds', 0x0);
  }
  ['optionClick'](_0x3dcd43) {
    var _0x12cff0 = "Pounds";
    if (this.isMetric == 0x1) {
      _0x12cff0 = 'Kg';
    }
    switch (_0x3dcd43.target.id) {
      case "splash":
        splash.classList.add("hidden");
        break;
      case "input_radio_gns":
        SimVar.SetSimVarValue("L:PC6_GPSState", "Enum", 0x0);
        break;
      case 'input_radio_blank':
        SimVar.SetSimVarValue("L:PC6_GPSState", "Enum", 0x1);
        break;
      case "input_skis":
        SimVar.SetSimVarValue("L:PC6_Option_Skis", "Boolean", _0x3dcd43.target.checked);
        if (_0x3dcd43.target.checked == true) {
          SimVar.SetSimVarValue('L:PC6_State_Chocks', "Boolean", 0x0);
        }
        break;
      case "input_radar_pod":
        SimVar.SetSimVarValue('L:PC6_Option_RadarPod', "Boolean", _0x3dcd43.target.checked);
        break;
      case 'input_exhaust_cover':
        SimVar.SetSimVarValue('L:PC6_State_ExhaustCovers', "Boolean", _0x3dcd43.target.checked);
        break;
      case "input_intake_cover":
        SimVar.SetSimVarValue("L:PC6_State_IntakeCovers", "Boolean", _0x3dcd43.target.checked);
        break;
      case "input_prop_tiedown":
        SimVar.SetSimVarValue('L:PC6_State_PropTieDown', "Boolean", _0x3dcd43.target.checked);
        this.setPropAngleToZero();
        break;
      case "input_pitot_cover":
        SimVar.SetSimVarValue("L:PC6_State_PitotCover", "Boolean", _0x3dcd43.target.checked);
        break;
      case "input_tiedown_blocks":
        SimVar.SetSimVarValue("L:PC6_State_Blocks", "Boolean", _0x3dcd43.target.checked);
        break;
      case "input_chocks":
        var _0x44a843 = SimVar.GetSimVarValue("L:PC6_Option_Skis", "Boolean");
        if (_0x44a843 == 0x0) {
          SimVar.SetSimVarValue('L:PC6_State_Chocks', 'Boolean', _0x3dcd43.target.checked);
        }
        break;
      case "input_pilot_co":
        SimVar.SetSimVarValue("L:PC6_Option_CopilotHidden", 'Boolean', _0x3dcd43.target.checked);
        break;
      case 'input_trapdoor_cover':
        SimVar.SetSimVarValue("L:PC6_Trapdoor_Cover_Removed", "Boolean", _0x3dcd43.target.checked);
        break;
      case "input_drop_crate":
        if (_0x3dcd43.target.checked) {
          SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:10", "Pounds", 0xbe);
        } else {
          SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:10", 'Pounds', 0x0);
        }
        break;
      case "input_empty_cargo":
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:3", 'Pounds', 0x0);
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:10", "Pounds", 0x0);
        break;
      case "input_max_cargo":
        var _0x16376f = SimVar.GetSimVarValue("A:MAX GROSS WEIGHT", "Pounds");
        var _0x378aff = SimVar.GetSimVarValue("A:TOTAL WEIGHT", 'Pounds');
        var _0x280c45 = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:3", "Pounds");
        var _0x4fee4f = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:10", "Pounds");
        var _0x3c45f9 = _0x378aff - _0x280c45 - _0x4fee4f;
        var _0x471108 = _0x16376f - _0x3c45f9;
        if (_0x471108 > 0x0) {
          SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:3", "Pounds", _0x471108);
        }
        break;
      case "button_left_front_door":
        SimVar.SetSimVarValue('K:TOGGLE_AIRCRAFT_EXIT_FAST', "number", 0x0);
        setInterval(() => this._t++, 0x3e8);
        break;
      case "button_right_front_door":
        SimVar.SetSimVarValue("K:TOGGLE_AIRCRAFT_EXIT_FAST", "number", 0x2);
        break;
      case "button_left_rear_door":
        SimVar.SetSimVarValue("K:TOGGLE_AIRCRAFT_EXIT_FAST", "number", 0x3);
        break;
      case "button_right_rear_door":
        SimVar.SetSimVarValue("K:TOGGLE_AIRCRAFT_EXIT_FAST", "number", 0x4);
        break;
      case "button_doors_return":
        SimVar.SetSimVarValue('L:PC6_DOORS_LeftFront_Jettisoned', "Boolean", false);
        SimVar.SetSimVarValue("L:PC6_DOORS_RightFront_Jettisoned", 'Boolean', false);
        SimVar.SetSimVarValue('L:PC6_DOORS_LeftFront_EmergHandle', "Boolean", false);
        SimVar.SetSimVarValue("L:PC6_DOORS_RightFront_EmergHandle", 'Boolean', false);
        break;
      case 'input_layout_cargo':
        SimVar.SetSimVarValue("L:PC6_CabinState", 'Enum', 0x0);
        this.cleanPayloadWeights();
        this.jumpCleanup();
        break;
      case "input_layout_passengers":
        SimVar.SetSimVarValue("L:PC6_CabinState", "Enum", 0x1);
        this.cleanPayloadWeights();
        this.jumpCleanup();
        break;
      case "input_layout_skydiving":
        SimVar.SetSimVarValue('L:PC6_CabinState', 'Enum', 0x2);
        this.cleanPayloadWeights();
        this.jumpCleanup();
        break;
      case "input_skydive_door_adjust":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        SimVar.SetSimVarValue("A:INTERACTIVE POINT GOAL:1", 'percent', _0x418a24);
        break;
      case "input_cargo":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.cargoStoredValue = _0x418a24;
        this.cargoStoredFlag = true;
        cargoSliderMoving = false;
        break;
      case 'input_pilot_weight':
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.pilotStoredValue = _0x418a24;
        this.pilotStoredFlag = true;
        pilotweightSliderMoving = false;
        break;
      case "input_copilot_weight":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.copilotStoredValue = _0x418a24;
        this.copilotStoredFlag = true;
        copilotweightSliderMoving = false;
        break;
      case "input_passenger_1":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.p1StoredValue = _0x418a24;
        this.p1StoredFlag = true;
        passoneweightSliderMoving = false;
        break;
      case "input_passenger_2":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.p2StoredValue = _0x418a24;
        this.p2StoredFlag = true;
        passtwoweightSliderMoving = false;
        break;
      case "input_passenger_3":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.p3StoredValue = _0x418a24;
        this.p3StoredFlag = true;
        passthreeweightSliderMoving = false;
        break;
      case "input_passenger_4":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.p4StoredValue = _0x418a24;
        this.p4StoredFlag = true;
        passfourweightSliderMoving = false;
        break;
      case "input_passenger_5":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.p5StoredValue = _0x418a24;
        this.p5StoredFlag = true;
        passfiveweightSliderMoving = false;
        break;
      case "input_passenger_6":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.p6StoredValue = _0x418a24;
        this.p6StoredFlag = true;
        passsixweightSliderMoving = false;
        break;
      case 'input_external_tanks':
        if (_0x3dcd43.target.checked == true) {
          SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL1 QUANTITY", "gallons", 0x20);
          SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL2 QUANTITY", 'gallons', 0x20);
          SimVar.SetSimVarValue('L:PC6_ExternalTanks', "Boolean", 0x1);
        } else {
          SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL1 QUANTITY", 'gallons', 0x0);
          SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL2 QUANTITY", "gallons", 0x0);
          SimVar.SetSimVarValue('L:PC6_ExternalTanks', "Boolean", 0x0);
        }
        break;
      case "input_left_main":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.leftmainStoredValue = _0x418a24;
        this.leftmainStoredFlag = true;
        lm_fuelSliderMoving = false;
        break;
      case "input_right_main":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.rightmainStoredValue = _0x418a24;
        this.rightmainStoredFlag = true;
        rm_fuelSliderMoving = false;
        break;
      case "input_external_tank_left":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.leftextStoredValue = _0x418a24;
        this.leftextStoredFlag = true;
        le_fuelSliderMoving = false;
        break;
      case "input_external_tank_right":
        var _0x418a24 = parseInt(_0x3dcd43.target.value);
        this.rightextStoredValue = _0x418a24;
        this.rightextStoredFlag = true;
        re_fuelSliderMoving = false;
        break;
      case "input_level_tanks_main":
        var _0x560fb2 = SimVar.GetSimVarValue("A:FUEL TANK LEFT MAIN QUANTITY", "gallons");
        var _0x483c51 = SimVar.GetSimVarValue("A:FUEL TANK RIGHT MAIN QUANTITY", "gallons");
        var _0x19101d = _0x560fb2 + _0x483c51;
        var _0x610c60 = _0x19101d / 0x2;
        SimVar.SetSimVarValue("A:FUEL TANK LEFT MAIN QUANTITY", "gallons", _0x610c60);
        SimVar.SetSimVarValue("A:FUEL TANK RIGHT MAIN QUANTITY", 'gallons', _0x610c60);
        break;
      case "input_sync_tanks_main":
        var _0x560fb2 = SimVar.GetSimVarValue("A:FUEL TANK LEFT MAIN QUANTITY", 'gallons');
        var _0x483c51 = SimVar.GetSimVarValue("A:FUEL TANK RIGHT MAIN QUANTITY", "gallons");
        if (_0x560fb2 > _0x483c51) {
          SimVar.SetSimVarValue("A:FUEL TANK RIGHT MAIN QUANTITY", "gallons", _0x560fb2);
        } else {
          SimVar.SetSimVarValue("A:FUEL TANK LEFT MAIN QUANTITY", 'gallons', _0x483c51);
        }
        break;
      case "input_full_tanks_main":
        var _0x418a24 = 0x64;
        SimVar.SetSimVarValue("A:FUEL TANK LEFT MAIN LEVEL", "percent", _0x418a24);
        SimVar.SetSimVarValue("A:FUEL TANK RIGHT MAIN LEVEL", "percent", _0x418a24);
        break;
      case "input_level_tanks_ext":
        var _0x560fb2 = SimVar.GetSimVarValue("A:FUEL TANK EXTERNAL1 QUANTITY", "gallons");
        var _0x483c51 = SimVar.GetSimVarValue("A:FUEL TANK EXTERNAL2 QUANTITY", 'gallons');
        var _0x19101d = _0x560fb2 + _0x483c51;
        var _0x610c60 = _0x19101d / 0x2;
        SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL1 QUANTITY", "gallons", _0x610c60);
        SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL2 QUANTITY", 'gallons', _0x610c60);
        break;
      case "input_sync_tanks_ext":
        var _0x560fb2 = SimVar.GetSimVarValue("A:FUEL TANK EXTERNAL1 QUANTITY", "gallons");
        var _0x483c51 = SimVar.GetSimVarValue("A:FUEL TANK EXTERNAL2 QUANTITY", 'gallons');
        if (_0x560fb2 > _0x483c51) {
          SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL2 QUANTITY", 'gallons', _0x560fb2);
        } else {
          SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL1 QUANTITY", 'gallons', _0x483c51);
        }
        break;
      case "input_full_tanks_ext":
        var _0x418a24 = 0x64;
        SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL1 LEVEL", "percent", _0x418a24);
        SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL2 LEVEL", "percent", _0x418a24);
        break;
      case "input_skydiving_load":
        this.jumpCleanup();
        var _0x5e29b4 = 0x0;
        _0x5e29b4 = this.getRandomInt(0x3, 0x7);
        this.jumpHeight = this.jumpHeight_calc();
        for (let _0x545c38 = 0x1; _0x545c38 <= 0x6; _0x545c38++) {
          var _0x418a24 = 0x0;
          var _0x4b3ae7 = _0x545c38 + 0x3;
          if (_0x545c38 <= _0x5e29b4) {
            if (this.isMetric == 0x1) {
              _0x418a24 = this.getRandomInt(0x4b, 0x6e);
            } else {
              _0x418a24 = this.getRandomInt(0xa5, 0xf0);
            }
            jumperWeights[_0x545c38] = _0x418a24;
            SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:" + _0x4b3ae7, _0x12cff0, _0x418a24);
          } else {
            SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:" + _0x4b3ae7, _0x12cff0, _0x418a24);
          }
        }
        break;
      case "input_skydiving_jump":
        this.jumpingActiveFlag = true;
        var _0x3475d9 = SimVar.GetSimVarValue("A:INTERACTIVE POINT OPEN:4", "Percent");
        if (_0x3475d9 == 0x0) {
          SimVar.SetSimVarValue("K:TOGGLE_AIRCRAFT_EXIT_FAST", "number", 0x4);
        }
        for (let _0xe566b9 = 0x1; _0xe566b9 <= jumperWeights.length - 0x1; _0xe566b9++) {
          this.jumpAction(_0xe566b9);
        }
        break;
    }
  }
  ["jumpHeight_calc"]() {
    var _0xbd2fde = Math.ceil(SimVar.GetSimVarValue("A:PLANE ALTITUDE", "feet") / 0x1f4) * 0x1f4;
    var _0x2870af = _0xbd2fde + 0xbb8;
    var _0xdeea35 = 0x2710 - _0x2870af;
    var _0xfe73ec = _0x2870af + _0xdeea35 - 0x7d0;
    if (_0xfe73ec < _0x2870af) {
      _0xfe73ec = _0x2870af;
    }
    var _0x45c42f = _0x2870af + _0xdeea35 + 0xbb8;
    if (_0x45c42f > 0x32c8) {
      _0x45c42f = 0x32c8;
    }
    var _0x186d12 = Math.round(this.getRandomInt(_0xfe73ec, _0x45c42f) / 0x1f4) * 0x1f4;
    return _0x186d12;
  }
  ['jumpHeight_eval']() {
    var _0x4270ef = SimVar.GetSimVarValue("A:PLANE ALTITUDE", 'feet');
    var _0x512805 = this.jumpHeight - 0xfa;
    var _0xe3f7c4 = this.jumpHeight + 0xfa;
    return !!(_0x4270ef >= _0x512805 && _0x4270ef <= _0xe3f7c4);
  }
  ["jumpWeight_calc"]() {
    let _0x21a6da = 0x0;
    for (const _0x4592a9 of jumperWeights) {
      if (_0x4592a9 != null) {
        _0x21a6da = _0x21a6da + parseInt(_0x4592a9);
      }
    }
    return _0x21a6da;
  }
  ["jumpAction"](_0x186a13) {
    var _0xd2af8c = 0xbb8;
    _0xd2af8c = _0xd2af8c * (jumperWeights.length - 0x1 - _0x186a13 + 0x1);
    var _0x34e90b = _0x186a13 + 0x3;
    setTimeout(function () {
      SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:" + _0x34e90b, "Pounds", 0x0);
      jumperWeights.splice(_0x186a13, 0x1);
    }, _0xd2af8c);
  }
  ["jumpCleanup"]() {
    this.jumpingActiveFlag = false;
    this.jumpHeight = 0x0;
    jumperWeights.splice(0x0, jumperWeights.length);
  }
  ['isEngineRunning']() {
    var _0x401d88 = Simplane.getEngineActive(0x0);
    if (_0x401d88 == 0x1) {
      return true;
    }
    return false;
  }
  ['isPropTurning']() {
    var _0x1b49e1 = Simplane.getEngineRPMProp(0x0);
    if (_0x1b49e1 > 0x0) {
      return true;
    }
    return false;
  }
  ["isPropAngleNotZero"]() {
    var _0x27ae68 = SimVar.GetGameVarValue("PROP ROTATION ANGLE:1", 'Radians');
    if (_0x27ae68 > 0x0) {
      return true;
    }
    return false;
  }
  ["setPropAngleToZero"]() {
    if (this.isPropAngleNotZero) {
      SimVar.SetSimVarValue("PROP ROTATION ANGLE:1", "Degrees", 0x0);
    }
  }
  ['isPlaneMoving']() {
    var _0x4efb71 = Simplane.getGroundVelocity();
    if (_0x4efb71 > 1.0) {
      return true;
    }
    return false;
  }
  ["onInteractionEvent"](_0x3ccf78) {}
  ['reboot']() {
    super.reboot();
    if (this.warnings) {
      this.warnings.reset();
    }
  }
  ["Update"]() {
    super.Update();
    var _0x9453c9 = SimVar.GetGameVarValue("GAME UNIT IS METRIC", "Boolean");
    var _0x1b7671 = 'gal';
    var _0x4b4ec9 = "Pounds";
    if (this.slider_gallon_lb) {
      if (this.slider_gallon_lb.checked) {
        _0x1b7671 = 'lb';
      }
    }
    if (this.isMetric == 0x1) {
      _0x4b4ec9 = 'Kg';
      _0x1b7671 = 'kg';
      if (this.slider_kg_ltr.checked) {
        _0x1b7671 = "ltr";
      }
    }
    if (this.isMetric !== _0x9453c9) {
      this.isMetric = _0x9453c9;
      if (this.isMetric == 0x1) {
        _0x4b4ec9 = 'Kg';
        diffAndSetAttribute(this.lCargo, "max", 0x3e8);
        this.uom.innerHTML = 'kg';
        this.uomLabel = 'kg';
        this.fuel_us_system.classList.add("hidden");
        this.fuel_metric.classList.remove("hidden");
      } else {
        diffAndSetAttribute(this.lCargo, "max", 0x7d0);
        this.uom.innerHTML = 'lb';
        this.uomLabel = 'lb';
        this.fuel_us_system.classList.remove('hidden');
        this.fuel_metric.classList.add("hidden");
      }
    }
    this.reg_nr_atc.innerHTML = SimVar.GetSimVarValue("A:ATC ID", "String");
    var _0x271f79 = SimVar.GetSimVarValue("L:PC6_Option_RadarPod", "Boolean");
    this.input_radar_pod.checked = _0x271f79 == 0x1;
    var _0x55a933 = SimVar.GetSimVarValue("L:PC6_Option_Skis", "Boolean");
    this.input_skis.checked = _0x55a933 == 0x1;
    var _0x3ac274 = SimVar.GetSimVarValue("L:PC6_State_Chocks", "Boolean");
    this.input_chocks.checked = _0x3ac274 == 0x1;
    var _0x5f22a4 = SimVar.GetSimVarValue('L:PC6_State_Blocks', "Boolean");
    this.input_tiedown_blocks.checked = _0x5f22a4 == 0x1;
    if (_0x55a933 == 0x1) {
      if (_0x3ac274 == 0x1) {
        SimVar.SetSimVarValue("L:PC6_State_Chocks", "Boolean", 0x0);
      }
      this.option_chocks.classList.add("disabled");
    } else {
      this.option_chocks.classList.remove('disabled');
    }
    var _0xe81fa4 = SimVar.GetSimVarValue("L:PC6_State_ExhaustCovers", "Boolean");
    this.input_exhaust_cover.checked = _0xe81fa4 == 0x1;
    var _0x27fe07 = SimVar.GetSimVarValue('L:PC6_State_IntakeCovers', "Boolean");
    this.input_intake_cover.checked = _0x27fe07 == 0x1;
    var _0x30fbd4 = SimVar.GetSimVarValue('L:PC6_State_PropTieDown', "Boolean");
    this.input_prop_tiedown.checked = _0x30fbd4 == 0x1;
    var _0x57b4cd = SimVar.GetSimVarValue("L:PC6_State_PitotCover", "Boolean");
    this.input_pitot_cover.checked = _0x57b4cd == 0x1;
    if (this.isEngineRunning()) {
      this.option_exhaust_cover.classList.add('disabled');
      this.option_intake_cover.classList.add("disabled");
      this.option_pitot_cover.classList.add("disabled");
      if (_0xe81fa4 == 0x1) {
        SimVar.SetSimVarValue("L:PC6_State_ExhaustCovers", "Boolean", 0x0);
      }
      if (_0x27fe07 == 0x1) {
        SimVar.SetSimVarValue('L:PC6_State_IntakeCovers', "Boolean", 0x0);
      }
      if (_0x57b4cd == 0x1) {
        SimVar.SetSimVarValue("L:PC6_State_PitotCover", 'Boolean', 0x0);
      }
    } else {
      this.option_exhaust_cover.classList.remove("disabled");
      this.option_intake_cover.classList.remove('disabled');
      this.option_pitot_cover.classList.remove("disabled");
    }
    if (this.isPropTurning()) {
      this.option_prop_tiedown.classList.add('disabled');
      if (_0x30fbd4 == 0x1) {
        SimVar.SetSimVarValue("L:PC6_State_PropTieDown", "Boolean", 0x0);
      }
    } else {
      this.option_prop_tiedown.classList.remove('disabled');
    }
    if (this.isPlaneMoving() && this.AircraftVersion == 0x0) {
      this.option_chocks.classList.add("disabled");
      this.option_tiedown_blocks.classList.add("disabled");
      if (_0x3ac274 == 0x1) {
        SimVar.SetSimVarValue('L:PC6_State_Chocks', "Boolean", 0x0);
      }
      if (_0x5f22a4 == 0x1) {
        SimVar.SetSimVarValue("L:PC6_State_Blocks", "Boolean", 0x0);
      }
    } else {
      this.option_chocks.classList.remove("disabled");
      this.option_tiedown_blocks.classList.remove("disabled");
    }
    switch (this.PanelVersion) {
      case 0x0:
        this.title_gpstypes.classList.add('hidden');
        this.option_gns.classList.add("hidden");
        this.option_blank.classList.add("hidden");
        break;
      case 0x1:
        this.title_gpstypes.classList.remove("hidden");
        this.option_gns.classList.remove("hidden");
        this.option_blank.classList.remove("hidden");
        break;
    }
    var _0x4f56c2 = SimVar.GetSimVarValue("L:PC6_GPSState", "Enum");
    switch (_0x4f56c2) {
      case 0x0:
        this.input_radio_gns.checked = true;
        break;
      case 0x1:
        this.input_radio_blank.checked = true;
        break;
    }
    var _0x5a6192 = SimVar.GetSimVarValue('L:PC6_DOORS_LeftFront_Jettisoned', "Boolean");
    var _0x2fb90c = SimVar.GetSimVarValue("L:PC6_DOORS_RightFront_Jettisoned", 'Boolean');
    if (_0x5a6192 == true || _0x2fb90c == true) {
      this.button_doors_return.classList.remove('disabled');
    } else {
      this.button_doors_return.classList.add("disabled");
    }
    var _0x4275a7 = SimVar.GetSimVarValue("L:PC6_CabinState", 'Number');
    var _0xc8929b = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:1", _0x4b4ec9);
    var _0x3e96a2 = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:2", _0x4b4ec9);
    var _0x387115 = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:3", _0x4b4ec9);
    var _0x338e8f = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:4", _0x4b4ec9);
    var _0x1e0c5f = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:5", _0x4b4ec9);
    var _0x363877 = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:6", _0x4b4ec9);
    var _0x439981 = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:7", _0x4b4ec9);
    var _0x54b1ce = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:8", _0x4b4ec9);
    var _0x1438ad = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:9", _0x4b4ec9);
    var _0xd08132 = SimVar.GetSimVarValue("A:PAYLOAD STATION WEIGHT:10", "Pounds");
    var _0x52e105 = SimVar.GetSimVarValue("A:INTERACTIVE POINT OPEN:5", "Percent");
    var _0x21ad39 = SimVar.GetSimVarValue("L:PC6_Trapdoor_Cover_Removed", "Boolean");
    switch (_0x4275a7) {
      case 0x0:
        this.input_layout_cargo.checked = true;
        this.lCargoSetup.classList.remove("hidden");
        this.lPassengerSetup.classList.add("hidden");
        this.lSkydivingSetup.classList.add("hidden");
        if (_0x387115 > 0x0) {
          if (_0xd08132 > 0x0) {
            SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:10", "Pounds", 0x0);
          }
          if (_0x21ad39 == 0x1) {
            SimVar.SetSimVarValue("L:PC6_Trapdoor_Cover_Removed", "Boolean", 0x0);
          }
          this.option_trapdoor_cover.classList.add('disabled');
          this.option_drop_crate.classList.add('disabled');
        } else if (_0xd08132 == 0xbe) {
          if (_0x21ad39 == 0x0) {
            SimVar.SetSimVarValue('L:PC6_Trapdoor_Cover_Removed', "Boolean", 0x1);
          }
          this.option_trapdoor_cover.classList.add('disabled');
          this.option_drop_crate.classList.remove('disabled');
        } else {
          this.option_trapdoor_cover.classList.remove("disabled");
          this.option_drop_crate.classList.remove("disabled");
        }
        break;
      case 0x1:
        this.input_layout_passengers.checked = true;
        this.lCargoSetup.classList.add("hidden");
        this.lPassengerSetup.classList.remove('hidden');
        this.lSkydivingSetup.classList.add("hidden");
        if (_0x21ad39 == 0x1) {
          SimVar.SetSimVarValue("L:PC6_Trapdoor_Cover_Removed", "Boolean", 0x0);
        }
        break;
      case 0x2:
        this.input_layout_skydiving.checked = true;
        this.lCargoSetup.classList.add("hidden");
        this.lPassengerSetup.classList.add('hidden');
        this.lSkydivingSetup.classList.remove("hidden");
        if (_0x21ad39 == 0x1) {
          SimVar.SetSimVarValue('L:PC6_Trapdoor_Cover_Removed', "Boolean", 0x0);
        }
        if (this.isPlaneMoving() != true) {
          this.input_skydiving_load.classList.remove('disabled');
        } else {
          this.input_skydiving_load.classList.add("disabled");
        }
        if (this.jumpHeight > 0x0) {
          this.display_jump_altitude.innerHTML = this.jumpHeight + " ft";
          this.display_jump_altitude.classList.add('bold');
        } else {
          this.display_jump_altitude.innerHTML = "None";
          this.display_jump_altitude.classList.remove("bold");
        }
        if (this.jumpHeight_eval() != true || jumperWeights.length <= 0x1) {
          this.input_skydiving_jump.classList.add('disabled');
          this.input_skydiving_jump.classList.remove('green');
        } else {
          this.input_skydiving_jump.classList.remove("disabled");
          this.input_skydiving_jump.classList.add("green");
        }
        if (jumperWeights.length > 0x1) {
          this.display_jump_number.innerHTML = jumperWeights.length - 0x1;
          this.display_jump_number.classList.add("bold");
          if (this.jumpingActiveFlag == true) {
            this.display_jump_message.classList.add("blink");
            this.display_jump_message.innerHTML = "//////////////////////// Jump in progress ////////////////////////";
          } else {
            this.display_jump_message.innerHTML = '';
            this.display_jump_message.classList.remove("blink");
          }
        } else {
          this.display_jump_number.innerHTML = 'None';
          this.display_jump_number.classList.remove("bold");
          if (this.jumpingActiveFlag == true) {
            this.display_jump_message.innerHTML = "Jump complete. Return to base to pick up another load.";
            this.display_jump_message.classList.remove('blink');
          } else {
            this.display_jump_message.innerHTML = '';
            this.display_jump_message.classList.remove("blink");
          }
        }
        var _0x11f9f1 = 0x0;
        _0x11f9f1 = this.jumpWeight_calc();
        if (_0x11f9f1 > 0x0) {
          this.display_jump_weight.innerHTML = _0x11f9f1 + " " + this.uomLabel;
          this.display_jump_weight.classList.add('bold');
        } else {
          this.display_jump_weight.innerHTML = "Empty";
          this.display_jump_weight.classList.remove('bold');
        }
        break;
    }
    if (_0xd08132 == 0xbe && _0x52e105 > 0x5a) {
      SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:10", "Pounds", 0x0);
    }
    this.input_drop_crate.checked = _0xd08132 > 0x0;
    this.input_trapdoor_cover.checked = _0x21ad39 == 0x1;
    var _0x4123e7 = SimVar.GetSimVarValue("L:PC6_Option_CopilotHidden", 'Boolean');
    this.input_pilot_co.checked = _0x4123e7 == 0x1;
    this.passengerWeight1.innerHTML = parseInt(_0x338e8f) + " " + this.uomLabel;
    this.passengerWeight2.innerHTML = parseInt(_0x1e0c5f) + " " + this.uomLabel;
    this.passengerWeight3.innerHTML = parseInt(_0x363877) + " " + this.uomLabel;
    this.passengerWeight4.innerHTML = parseInt(_0x439981) + " " + this.uomLabel;
    this.passengerWeight5.innerHTML = parseInt(_0x54b1ce) + " " + this.uomLabel;
    this.passengerWeight6.innerHTML = parseInt(_0x1438ad) + " " + this.uomLabel;
    this.lCargoLabel.innerHTML = this.lCargo.value + " " + this.uomLabel;
    if (cargoSliderMoving == false) {
      if (this.cargoStoredFlag == false) {
        var _0x492c9b = Math.round(_0x387115);
        this.lCargo.value = _0x492c9b;
      } else {
        this.lCargo.value = this.cargoStoredValue;
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:3", _0x4b4ec9, this.cargoStoredValue);
        if (Math.round(_0x387115) == this.cargoStoredValue) {
          this.cargoStoredFlag = false;
        }
      }
    }
    this.lPilotWeightLabel.innerHTML = this.lPilotWeight.value + " " + this.uomLabel;
    if (pilotweightSliderMoving == false) {
      if (this.pilotStoredFlag == false) {
        var _0x492c9b = Math.round(_0xc8929b);
        this.lPilotWeight.value = _0x492c9b;
      } else {
        this.lPilotWeight.value = this.pilotStoredValue;
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:1", _0x4b4ec9, this.pilotStoredValue);
        if (Math.round(_0xc8929b) == this.pilotStoredValue) {
          this.pilotStoredFlag = false;
        }
      }
    }
    this.lCopilotWeightLabel.innerHTML = this.lCopilotWeight.value + " " + this.uomLabel;
    if (copilotweightSliderMoving == false) {
      if (this.copilotStoredFlag == false) {
        var _0x492c9b = Math.round(_0x3e96a2);
        this.lCopilotWeight.value = _0x492c9b;
      } else {
        this.lCopilotWeight.value = this.copilotStoredValue;
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:2", _0x4b4ec9, this.copilotStoredValue);
        if (Math.round(_0x3e96a2) == this.copilotStoredValue) {
          this.copilotStoredFlag = false;
        }
      }
    }
    this.passengerWeight1.innerHTML = this.lPassOneWeight.value + " " + this.uomLabel;
    if (passoneweightSliderMoving == false) {
      if (this.p1StoredFlag == false) {
        var _0x492c9b = Math.round(_0x338e8f);
        this.lPassOneWeight.value = _0x492c9b;
      } else {
        this.lPassOneWeight.value = this.p1StoredValue;
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:4", _0x4b4ec9, this.p1StoredValue);
        if (Math.round(_0x338e8f) == this.p1StoredValue) {
          this.p1StoredFlag = false;
        }
      }
    }
    this.passengerWeight2.innerHTML = this.lPassTwoWeight.value + " " + this.uomLabel;
    if (passtwoweightSliderMoving == false) {
      if (this.p2StoredFlag == false) {
        var _0x492c9b = Math.round(_0x1e0c5f);
        this.lPassTwoWeight.value = _0x492c9b;
      } else {
        this.lPassTwoWeight.value = this.p2StoredValue;
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:5", _0x4b4ec9, this.p2StoredValue);
        if (Math.round(_0x1e0c5f) == this.p2StoredValue) {
          this.p2StoredFlag = false;
        }
      }
    }
    this.passengerWeight3.innerHTML = this.lPassThreeWeight.value + " " + this.uomLabel;
    if (passthreeweightSliderMoving == false) {
      if (this.p3StoredFlag == false) {
        var _0x492c9b = Math.round(_0x363877);
        this.lPassThreeWeight.value = _0x492c9b;
      } else {
        this.lPassThreeWeight.value = this.p3StoredValue;
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:6", _0x4b4ec9, this.p3StoredValue);
        if (Math.round(_0x363877) == this.p3StoredValue) {
          this.p3StoredFlag = false;
        }
      }
    }
    this.passengerWeight4.innerHTML = this.lPassFourWeight.value + " " + this.uomLabel;
    if (passfourweightSliderMoving == false) {
      if (this.p4StoredFlag == false) {
        var _0x492c9b = Math.round(_0x439981);
        this.lPassFourWeight.value = _0x492c9b;
      } else {
        this.lPassFourWeight.value = this.p4StoredValue;
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:7", _0x4b4ec9, this.p4StoredValue);
        if (Math.round(_0x439981) == this.p4StoredValue) {
          this.p4StoredFlag = false;
        }
      }
    }
    this.passengerWeight5.innerHTML = this.lPassFiveWeight.value + " " + this.uomLabel;
    if (passfiveweightSliderMoving == false) {
      if (this.p5StoredFlag == false) {
        var _0x492c9b = Math.round(_0x54b1ce);
        this.lPassFiveWeight.value = _0x492c9b;
      } else {
        this.lPassFiveWeight.value = this.p5StoredValue;
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:8", _0x4b4ec9, this.p5StoredValue);
        if (Math.round(_0x54b1ce) == this.p5StoredValue) {
          this.p5StoredFlag = false;
        }
      }
    }
    this.passengerWeight6.innerHTML = this.lPassSixWeight.value + " " + this.uomLabel;
    if (passsixweightSliderMoving == false) {
      if (this.p6StoredFlag == false) {
        var _0x492c9b = Math.round(_0x1438ad);
        this.lPassSixWeight.value = _0x492c9b;
      } else {
        this.lPassSixWeight.value = this.p6StoredValue;
        SimVar.SetSimVarValue("A:PAYLOAD STATION WEIGHT:9", _0x4b4ec9, this.p6StoredValue);
        if (Math.round(_0x1438ad) == this.p6StoredValue) {
          this.p6StoredFlag = false;
        }
      }
    }
    this.maxWeight = SimVar.GetSimVarValue("A:MAX GROSS WEIGHT", _0x4b4ec9);
    this.currentWeight = SimVar.GetSimVarValue("A:TOTAL WEIGHT", _0x4b4ec9);
    if (parseInt(this.currentWeight) > parseInt(this.maxWeight)) {
      this.cw.classList.add("red");
      this.lCargoLabel.classList.add("red");
    } else {
      this.cw.classList.remove("red");
      this.lCargoLabel.classList.remove('red');
    }
    this.mtow.innerHTML = parseInt(this.maxWeight) + " " + this.uomLabel;
    this.cw.innerHTML = parseInt(this.currentWeight) + " " + this.uomLabel;
    var _0x17ed79 = SimVar.GetSimVarValue("A:FUEL TANK LEFT MAIN LEVEL", "percent");
    var _0x401908 = SimVar.GetSimVarValue("A:FUEL TANK RIGHT MAIN LEVEL", 'percent');
    var _0x3d305e = SimVar.GetSimVarValue("A:FUEL TANK EXTERNAL1 LEVEL", "percent");
    var _0x5d960b = SimVar.GetSimVarValue("A:FUEL TANK EXTERNAL2 LEVEL", "percent");
    if (_0x3d305e == 0x0 && _0x5d960b == 0x0) {
      this.lExternalTanks.checked = false;
      SimVar.SetSimVarValue("L:PC6_ExternalTanks", 'Boolean', 0x0);
    } else {
      this.lExternalTanks.checked = true;
      SimVar.SetSimVarValue("L:PC6_ExternalTanks", 'Boolean', 0x1);
    }
    if (lm_fuelSliderMoving == false) {
      if (this.leftmainStoredFlag == false) {
        var _0x492c9b = Math.round(_0x17ed79);
        this.fuelLeftMain.value = _0x492c9b;
      } else {
        this.fuelLeftMain.value = this.leftmainStoredValue;
        SimVar.SetSimVarValue("A:FUEL TANK LEFT MAIN LEVEL", 'percent', this.leftmainStoredValue);
        if (Math.round(_0x17ed79) == this.leftmainStoredValue) {
          this.leftmainStoredFlag = false;
        }
      }
    }
    if (rm_fuelSliderMoving == false) {
      if (this.rightmainStoredFlag == false) {
        var _0x492c9b = Math.round(_0x401908);
        this.fuelRightMain.value = _0x492c9b;
      } else {
        this.fuelRightMain.value = this.rightmainStoredValue;
        SimVar.SetSimVarValue("A:FUEL TANK RIGHT MAIN LEVEL", "percent", this.rightmainStoredValue);
        if (Math.round(_0x401908) == this.rightmainStoredValue) {
          this.rightmainStoredFlag = false;
        }
      }
    }
    if (le_fuelSliderMoving == false) {
      if (this.leftextStoredFlag == false) {
        var _0x492c9b = Math.round(_0x3d305e);
        this.fuelExtLeft.value = _0x492c9b;
      } else {
        this.fuelExtLeft.value = this.leftextStoredValue;
        SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL1 LEVEL", "percent", this.leftextStoredValue);
        if (Math.round(_0x3d305e) == this.leftextStoredValue) {
          this.leftextStoredFlag = false;
        }
      }
    }
    if (re_fuelSliderMoving == false) {
      if (this.rightextStoredFlag == false) {
        var _0x492c9b = Math.round(_0x5d960b);
        this.fuelExtRight.value = _0x492c9b;
      } else {
        this.fuelExtRight.value = this.rightextStoredValue;
        SimVar.SetSimVarValue("A:FUEL TANK EXTERNAL2 LEVEL", "percent", this.rightextStoredValue);
        if (Math.round(_0x5d960b) == this.rightextStoredValue) {
          this.rightextStoredFlag = false;
        }
      }
    }
    var _0xebea78 = this.fuelLeftMain.value * 0.86;
    var _0x214bde = this.fuelRightMain.value * 0.86;
    var _0x283e6c = this.fuelExtLeft.value * 0.64;
    var _0x598ec2 = this.fuelExtRight.value * 0.64;
    if (_0x1b7671 == 'lb') {
      _0xebea78 = _0xebea78 * 6.699999809;
      _0x214bde = _0x214bde * 6.699999809;
      _0x283e6c = _0x283e6c * 6.699999809;
      _0x598ec2 = _0x598ec2 * 6.699999809;
    }
    if (_0x1b7671 == 'kg') {
      _0xebea78 = _0xebea78 * 3.039075693;
      _0x214bde = _0x214bde * 3.039075693;
      _0x283e6c = _0x283e6c * 3.039075693;
      _0x598ec2 = _0x598ec2 * 3.039075693;
    }
    if (_0x1b7671 == "ltr") {
      _0xebea78 = _0xebea78 * 3.78541;
      _0x214bde = _0x214bde * 3.78541;
      _0x283e6c = _0x283e6c * 3.78541;
      _0x598ec2 = _0x598ec2 * 3.78541;
    }
    this.num_left_main.innerHTML = parseFloat(_0xebea78).toFixed(0x1) + " " + _0x1b7671;
    this.num_right_main.innerHTML = parseFloat(_0x214bde).toFixed(0x1) + " " + _0x1b7671;
    this.num_external_left.innerHTML = parseFloat(_0x283e6c).toFixed(0x1) + " " + _0x1b7671;
    this.num_external_right.innerHTML = parseFloat(_0x598ec2).toFixed(0x1) + " " + _0x1b7671;
  }
}
registerInstrument('milviz-generic-efb', MVZ_GENERIC_EFB);
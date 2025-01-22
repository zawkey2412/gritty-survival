import { MODULE_ID } from "./main.js";

export function registerSettings() {
  const settings = [
    {
      key: "enableMassiveDamageCheck",
      options: {
        name: game.i18n.localize(`${MODULE_ID}.settings.enableMassiveDamageCheck.name`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.enableMassiveDamageCheck.hint`),
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        restricted: true
      }
    },
    {
      key: "enableHealingFromZeroHP",
      options: {
        name: game.i18n.localize(`${MODULE_ID}.settings.enableHealingFromZeroHP.name`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.enableHealingFromZeroHP.hint`),
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        restricted: true
      }
    },
    {
      key: "enableMassiveDamageAtZeroHP",
      options: {
        name: game.i18n.localize(`${MODULE_ID}.settings.enableMassiveDamageAtZeroHP.name`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.enableMassiveDamageAtZeroHP.hint`),
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        restricted: true
      }
    },
    {
      key: "baseSaveDC",
      options: {
        name: game.i18n.localize(`${MODULE_ID}.settings.baseSaveDC.name`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.baseSaveDC.hint`),
        scope: "world",
        config: true,
        type: Number,
        default: 10,
        restricted: true
      }
    },
    {
      key: "saveAbility",
      options: {
        name: game.i18n.localize(`${MODULE_ID}.settings.saveAbility.name`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.saveAbility.hint`),
        scope: "world",
        config: true,
        type: String,
        choices: {
          "con": "Constitution",
          "str": "Strength",
          "dex": "Dexterity",
          "int": "Intelligence",
          "wis": "Wisdom",
          "cha": "Charisma"
        },
        default: "con",
        restricted: true
      }
    },
    {
      key: "enableFlanking",
      options: {
        name: game.i18n.localize(`${MODULE_ID}.settings.enableFlanking.name`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.enableFlanking.hint`),
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        restricted: true
      }
    },
    {
      key: "flankingBonusType",
      options: {
        name: game.i18n.localize(`${MODULE_ID}.settings.flankingBonusType.name`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.flankingBonusType.hint`),
        scope: "world",
        config: true,
        type: String,
        choices: {
          "flat": game.i18n.localize(`${MODULE_ID}.settings.flankingBonusType.choices.flat`),
          "advantage": game.i18n.localize(`${MODULE_ID}.settings.flankingBonusType.choices.advantage`)
        },
        default: "flat",
        restricted: true
      }
    },
    {
      key: "flankingFlatBonus",
      options: {
        name: game.i18n.localize(`${MODULE_ID}.settings.flankingFlatBonus.name`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.flankingFlatBonus.hint`),
        scope: "world",
        config: true,
        type: Number,
        default: 2,
        restricted: true
      }
    },
    {
      key: "enableFlankingExtraCheck",
      options: {
        name: game.i18n.localize(`${MODULE_ID}.settings.enableFlankingExtraCheck.name`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.enableFlankingExtraCheck.hint`),
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        restricted: true
      }
    }
  ];

  settings.forEach(setting => game.settings.register(MODULE_ID, setting.key, setting.options));
}
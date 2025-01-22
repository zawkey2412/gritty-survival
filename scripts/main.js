export const MODULE_ID = "gritty-survival";
export const DEBUG_MODE = false; // Set to true for debugging, false to disable

import { isActorInCombat, updateExhaustion, promptSave, logDebug, isFlanked } from "./helpers.js";
import { registerSettings } from "./config.js";

Hooks.once("init", registerSettings);

Hooks.on("ready", () => {
  console.log("Combat Exhaustion module loaded.");
});

// Track when a player actor's HP changes
Hooks.on("updateActor", async (actor, updateData) => {
  if (!actor.hasPlayerOwner && !game.user.isGM) return;

  const hpValue = foundry.utils.getProperty(updateData, "system.attributes.hp.value");
  if (hpValue === undefined) return; // Exit if HP value is not updated

  const prevHpValue = actor.getFlag(MODULE_ID, "previousHp") ?? foundry.utils.getProperty(actor, "system.attributes.hp.value");
  const maxHp = foundry.utils.getProperty(actor, "system.attributes.hp.max");
  const damageTaken = prevHpValue - hpValue;
  const baseSaveDC = game.settings.get(MODULE_ID, "baseSaveDC");
  const inCombat = isActorInCombat(actor);

  const enableMassiveDamageCheck = game.settings.get(MODULE_ID, "enableMassiveDamageCheck");
  const enableHealingFromZeroHP = game.settings.get(MODULE_ID, "enableHealingFromZeroHP");
  const enableMassiveDamageAtZeroHP = game.settings.get(MODULE_ID, "enableMassiveDamageAtZeroHP");

  logDebug(`Actor updated: ${actor.name}, HP: ${hpValue}, Previous HP: ${prevHpValue}, Damage Taken: ${damageTaken}, Max HP: ${maxHp}, In Combat: ${inCombat}`);

  // Massive Damage Check
  if (enableMassiveDamageCheck && damageTaken >= maxHp / 2) {
    const success = await promptSave(actor, baseSaveDC);
    if (!success) {
      await updateExhaustion(actor, 1);
    }
  }

  // Healing from 0 HP
  if (enableHealingFromZeroHP && hpValue > 0 && prevHpValue === 0) {
    await updateExhaustion(actor, 1);
  }

  // Massive Damage at 0 HP
  if (enableMassiveDamageAtZeroHP && hpValue === 0 && damageTaken >= maxHp / 2) {
    await actor.update({ "system.attributes.death.failure": actor.system.attributes.death.failure + 1 });
    const success = await promptSave(actor, baseSaveDC);
    if (!success) {
      await updateExhaustion(actor, 1);
    }
    await updateExhaustion(actor, 1);
  }

  // Update the previous HP value flag only if it has changed
  if (prevHpValue !== hpValue) {
    await actor.setFlag(MODULE_ID, "previousHp", hpValue);
  }
});

// Track the last attacker for flanking rules
Hooks.on("preAttackRoll", (attacker, target) => {
  target.setFlag(MODULE_ID, "lastAttacker", attacker.id);
});

// Apply flanking rules
Hooks.on("preAttackRoll", (actor, target, roll) => {
  const flankingBonus = isFlanked(target, actor);
  if (flankingBonus) {
    if (flankingBonus === "advantage") {
      roll.advantage = true;
    } else {
      roll.total += flankingBonus;
    }
  }
});
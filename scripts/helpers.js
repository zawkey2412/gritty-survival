import { DEBUG_MODE, MODULE_ID } from "./main.js";

// Helper function to check if actor is in combat
export function isActorInCombat(actor) {
  return game.combats.some(combat => combat.combatants.some(combatant => combatant.actorId === actor.id && combat.started));
}

// Helper function to update actor's exhaustion
export async function updateExhaustion(actor, amount) {
  let exhaustion = foundry.utils.getProperty(actor, "system.attributes.exhaustion");
  logDebug(`Current exhaustion value: ${exhaustion} (type: ${typeof exhaustion})`);

  exhaustion = parseInt(exhaustion ?? 0, 10);
  logDebug(`Parsed exhaustion value: ${exhaustion} (type: ${typeof exhaustion})`);

  exhaustion = Math.clamp(exhaustion + amount, 0, CONFIG.DND5E.conditionTypes.exhaustion.levels);
  logDebug(`Updating exhaustion for ${actor.name} to ${exhaustion} (type: ${typeof exhaustion})`);

  // Ensure exhaustion is an integer before updating
  if (Number.isInteger(exhaustion)) {
    try {
      await actor.update({ "system.attributes.exhaustion": exhaustion });
    } catch (error) {
      logDebug(`Error updating exhaustion for ${actor.name}: ${error.message}`);
      console.error(error);
    }
  } else {
    logDebug(`Failed to update exhaustion for ${actor.name}: value is not an integer`);
  }
}

export async function promptSave(actor, dc) {
  const ability = game.settings.get(MODULE_ID, "saveAbility");
  const result = await actor.rollAbilitySave(ability, { chatMessage: false });
  const success = result.total >= dc;

  // Render the roll and include it in the custom message
  const rollHTML = await result.render();
  const messageContent = `
    <i>${game.i18n.localize(`DND5E.AbilitySave${ability.capitalize()}`)}</i> (DC ${dc}).
    <br><b>${success ? "Passed the Roll" : "Failed Roll.<br>Gains a level of Exhaustion"}</b>
  `;

  // Create the custom chat message
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: `${messageContent} ${rollHTML}`,
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    whisper: [game.user.id]
  });

  return success;
}

// Helper function for debug logging
export function logDebug(message) {
  if (DEBUG_MODE) {
    console.log(`Combat Exhaustion | ${message}`);
  }
}

// Helper function to check if an enemy is flanked
export function isFlanked(target, attacker) {
  if (!game.settings.get(MODULE_ID, "enableFlanking")) return false;

  const flankingBonusType = game.settings.get(MODULE_ID, "flankingBonusType");
  const flankingFlatBonus = game.settings.get(MODULE_ID, "flankingFlatBonus");
  const enableFlankingExtraCheck = game.settings.get(MODULE_ID, "enableFlankingExtraCheck");

  const attackers = game.combats.active.combatants.filter(combatant => {
    const actor = combatant.actor;
    if (!actor || actor.id === attacker.id || actor.id === target.id) return false;
    if (actor.effects.some(e => e.disabled || e.label === "Incapacitated")) return false;
    if (!actor.hasPlayerOwner) return false;
    if (actor.system.attributes.senses.blindsight || actor.system.attributes.senses.truesight) return false;
    if (enableFlankingExtraCheck && target.getFlag(MODULE_ID, "lastAttacker") === actor.id) return false;
    return true;
  });

  for (let other of attackers) {
    const otherToken = canvas.tokens.get(other.token.id);
    const targetToken = canvas.tokens.get(target.token.id);
    const attackerToken = canvas.tokens.get(attacker.token.id);

    const line = new Ray(attackerToken.center, otherToken.center);
    if (line.intersects(targetToken) && canvas.grid.measureDistance(attackerToken, targetToken) <= 5) {
      if (flankingBonusType === "flat") {
        return flankingFlatBonus;
      } else if (flankingBonusType === "advantage") {
        return "advantage";
      }
    }
  }

  return false;
}
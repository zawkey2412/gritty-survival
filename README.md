# Gritty Survival
This module is designed for D&D5e to add exhaustion and flanking rules, enhancing the survival aspect of the game.

## Features
### Exhaustion Rules
1. **Massive Damage Check**: Triggered when damage is greater than or equal to half the creature's max HP in a single hit. Failing a Constitution saving throw results in gaining 1 level of exhaustion.
2. **Healing from 0 HP**: When healed from 0 HP, the creature gains 1 level of exhaustion.
3. **Massive Damage at 0 HP**: Fails 1 death saving throw immediately, rolls a Constitution saving throw for exhaustion; failure adds 1 exhaustion level, gains 1 exhaustion level regardless of the saving throw result.

### Flanking Rules
- A creature can't flank an enemy it can't see.
- A creature can't flank while it's incapacitated.
- Both creatures must be conscious.
- Flanking is determined by drawing an imaginary line between the centers of the creatures' spaces within 5 feet. If the line passes through opposite sides or corners of the enemy's space, the enemy is flanked.
- Flanking does not apply to creatures with blindsight or truesight.
- Optional extra check to ensure flanking is not applied if the target was just attacked by the flanking attacker.

## Settings
- **Enable Massive Damage Check**: Toggle the feature for massive damage checks.
- **Enable Healing from 0 HP**: Toggle the feature for gaining exhaustion when healed from 0 HP.
- **Enable Massive Damage at 0 HP**: Toggle the feature for massive damage at 0 HP.
- **Base Save DC**: Define the base save DC for the saving throw.
- **Saving Throw Ability**: Select the ability used for the saving throw.
- **Enable Flanking**: Toggle the flanking rules.
- **Flanking Bonus Type**: Choose whether flanking provides a flat bonus or advantage.
- **Flanking Flat Bonus**: Define the flat bonus for flanking if the flat bonus type is selected.
- **Enable Flanking Extra Check**: Toggle the extra check to ensure flanking is not applied if the target was just attacked by the flanking attacker.

## License
Gritty Survival is released under the [MIT License](./LICENSE).

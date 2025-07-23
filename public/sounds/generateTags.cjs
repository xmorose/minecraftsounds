const fs = require('fs');
const path = require('path');

const tagsFilePath = path.join(__dirname, 'sound_tags.json');

let tagsData = {};

if (fs.existsSync(tagsFilePath)) {
    tagsData = JSON.parse(fs.readFileSync(tagsFilePath, 'utf8'));
} else {
    tagsData = {};
}

function addSoundsToTag(tag, sounds) {
    if (!tagsData[tag]) {
        tagsData[tag] = [];
    }
    sounds.forEach(sound => {
        if (!tagsData[tag].includes(sound)) {
            tagsData[tag].push(sound);
        }
    });
}

function getTagsForSound(sound) {
    return Object.keys(tagsData).filter(tag => tagsData[tag].includes(sound));
}

function getSoundsByTag(tag) {
    return tagsData[tag] || [];
}

function saveTags() {
    fs.writeFileSync(tagsFilePath, JSON.stringify(tagsData, null, 2), 'utf8');
    console.log('Updated sound_tags.json');
}

function findDuplicateSounds() {
    const tags = [
        '1_21', '1_20_5', '1_20_3', '1_20_2', '1_20', '1_19_4',
        '1_19', '1_18', '1_17', '1_16_2', '1_16', '1_15',
        '1_14', '1_13', '1_12', '1_11', '1_10', '1_9_1',
        '1_9', '1_8', '1_7_2', '1_6_1'
    ];

    const soundOccurrences = {};

    tags.forEach(tag => {
        const sounds = getSoundsByTag(tag);
        sounds.forEach(sound => {
            if (soundOccurrences[sound]) {
                soundOccurrences[sound].push(tag);
            } else {
                soundOccurrences[sound] = [tag];
            }
        });
    });

    const duplicates = Object.entries(soundOccurrences).filter(([sound, tagList]) => tagList.length > 1);

    if (duplicates.length > 0) {
        console.log('Sounds in multiple tags:', duplicates);
    } else {
        console.log('No sounds found in multiple tags.');
    }
}

addSoundsToTag('metal', [
    'block.anvil.land',
    'block.anvil.use',
    'block.anvil.place',
    'item.armor.equip_iron',
    'item.armor.equip_gold',
    'block.iron_trapdoor.close',
    'block.iron_trapdoor.open',
    'entity.zombie.attack_iron_door',
    'block.copper.break',
    'block.copper.fall',
    'block.copper.hit',
    'block.copper.place',
    'block.copper_bulb.hit',
    'block.copper.step',
    'block.copper_grate.fall',
    'block.copper_door.open',
    'block.copper_door.close',
    'block.heavy_core.break',
    'block.heavy_core.place',
    'block.heavy_core.step',
    'block.chain.fall',
    'block.chain.break',
    'block.chain.hit',
    'block.chain.place',
    'block.chain.step',
    'block.lantern.break',
    'block.lantern.fall',
    'block.lantern.hit',
    'block.lantern.place',
    'block.lantern.step',
    'item.mace.smash_air'
]);

addSoundsToTag('impact', [
    'block.anvil.land',
    'entity.generic.explode',
    'entity.generic.big_fall',
    'item.mace.smash_air',
    'item.mace.smash_ground',
    'entity.dragon_fireball.explode',
    'entity.warden.sonic_boom',
    'item.mace.smash_ground_heavy',
    'entity.player.attack.strong',
    'entity.iron_golem.damage',
    'entity.zombie.attack_iron_door',
    'block.anvil.place',
    'item.trident.thunder'
]);

addSoundsToTag('liquid', [
    'block.lava.ambient',
    'block.pointed_dripstone.drip_lava',
    'item.bucket.fill_lava',
    'item.bucket.empty_lava',
    'entity.strider.step_lava',
    'block.pointed_dripstone.drip_lava_into_cauldron',
    'block.pointed_dripstone.drip_water_into_cauldron',
    'ambient.underwater.enter',
    'ambient.underwater.exit',
    'ambient.underwater.loop',
    'ambient.underwater.loop.additions',
    'ambient.underwater.loop.additions.rare',
    'block.water.ambient',
    'entity.axolotl.idle_water',
    'entity.boat.paddle_water',
    'entity.minecart.inside.underwater',
    'entity.fish.swim',
    'entity.fishing_bobber.splash',
    'item.bucket.empty',
    'item.bucket.empty_fish',
    'item.bucket.fill_axolotl',
    'item.bucket.fill',
    'item.bucket.fill_fish'
]);

addSoundsToTag('version_1_21', [
    'block.cactus_flower.break',
    'block.cactus_flower.place',
    'block.creaking_heart.break',
    'block.creaking_heart.fall',
    'block.creaking_heart.hit',
    'block.creaking_heart.hurt',
    'block.creaking_heart.idle',
    'block.creaking_heart.place',
    'block.creaking_heart.spawn',
    'block.creaking_heart.step',
    'block.deadbush.idle',
    'block.dried_ghast.ambient',
    'block.dried_ghast.ambient_water',
    'block.dried_ghast.break',
    'block.dried_ghast.fall',
    'block.dried_ghast.place',
    'block.dried_ghast.place_in_water',
    'block.dried_ghast.step',
    'block.dried_ghast.transition',
    'block.dry_grass.ambient',
    'block.eyeblossom.close',
    'block.eyeblossom.close_long',
    'block.eyeblossom.idle',
    'block.eyeblossom.open',
    'block.eyeblossom.open_long',
    'block.firefly_bush.idle',
    'block.iron.break',
    'block.iron.fall',
    'block.iron.hit',
    'block.iron.place',
    'block.iron.step',
    'block.leaf_litter.break',
    'block.leaf_litter.fall',
    'block.leaf_litter.hit',
    'block.leaf_litter.place',
    'block.leaf_litter.step',
    'block.pale_hanging_moss.idle',
    'block.resin.break',
    'block.resin.fall',
    'block.resin.hit',
    'block.resin.place',
    'block.resin.step',
    'block.resin_bricks.break',
    'block.resin_bricks.fall',
    'block.resin_bricks.hit',
    'block.resin_bricks.place',
    'block.resin_bricks.step',
    'block.sand.idle',
    'block.spawner.break',
    'block.spawner.fall',
    'block.spawner.hit',
    'block.spawner.place',
    'block.spawner.step',
    'block.trial_spawner.ambient_ominous',
    'block.trial_spawner.ominous_activate',
    'block.vault.reject_rewarded_player',
    'entity.creaking.activate',
    'entity.creaking.ambient',
    'entity.creaking.attack',
    'entity.creaking.deactivate',
    'entity.creaking.death',
    'entity.creaking.freeze',
    'entity.creaking.spawn',
    'entity.creaking.step',
    'entity.creaking.sway',
    'entity.creaking.twitch',
    'entity.creaking.unfreeze',
    'entity.ghastling.ambient',
    'entity.ghastling.death',
    'entity.ghastling.hurt',
    'entity.ghastling.spawn',
    'entity.goat.screaming.horn_break',
    'entity.happy_ghast.ambient',
    'entity.happy_ghast.death',
    'entity.happy_ghast.equip',
    'entity.happy_ghast.harness_goggles_down',
    'entity.happy_ghast.harness_goggles_up',
    'entity.happy_ghast.hurt',
    'entity.happy_ghast.riding',
    'entity.happy_ghast.unequip',
    'entity.parrot.imitate.creaking',
    'entity.wolf_angry.ambient',
    'entity.wolf_angry.death',
    'entity.wolf_angry.growl',
    'entity.wolf_angry.hurt',
    'entity.wolf_angry.pant',
    'entity.wolf_angry.whine',
    'entity.wolf_big.ambient',
    'entity.wolf_big.death',
    'entity.wolf_big.growl',
    'entity.wolf_big.hurt',
    'entity.wolf_big.pant',
    'entity.wolf_big.whine',
    'entity.wolf_cute.ambient',
    'entity.wolf_cute.death',
    'entity.wolf_cute.growl',
    'entity.wolf_cute.hurt',
    'entity.wolf_cute.pant',
    'entity.wolf_cute.whine',
    'entity.wolf_grumpy.ambient',
    'entity.wolf_grumpy.death',
    'entity.wolf_grumpy.growl',
    'entity.wolf_grumpy.hurt',
    'entity.wolf_grumpy.pant',
    'entity.wolf_grumpy.whine',
    'entity.wolf_puglin.ambient',
    'entity.wolf_puglin.death',
    'entity.wolf_puglin.growl',
    'entity.wolf_puglin.hurt',
    'entity.wolf_puglin.pant',
    'entity.wolf_puglin.whine',
    'entity.wolf_sad.ambient',
    'entity.wolf_sad.death',
    'entity.wolf_sad.growl',
    'entity.wolf_sad.hurt',
    'entity.wolf_sad.pant',
    'entity.wolf_sad.whine',
    'intentionally_empty',
    'item.bundle.insert_fail',
    'item.goat_horn.play',
    'item.horse_armor.unequip',
    'item.lead.break',
    'item.lead.tied',
    'item.lead.untied',
    'item.llama_carpet.unequip',
    'item.saddle.unequip',
    'item.shears.snip',
    'music_disc.creator',
    'music_disc.creator_music_box',
    'music_disc.lava_chicken',
    'music_disc.precipice',
    'music_disc.tears',
    'ui.hud.bubble_pop'
]);

addSoundsToTag('version_1_20', [
    // Main 1.20.5 release
    'entity.armadillo.ambient', 'entity.armadillo.brush', 'entity.armadillo.death',
    'entity.armadillo.eat', 'entity.armadillo.hurt', 'entity.armadillo.land',
    'entity.armadillo.roll', 'entity.armadillo.scute_drop', 'entity.armadillo.step',
    'entity.armadillo.unroll', 'item.armor.equip_wolf', 'item.armor.unequip_wolf',
    'entity.breeze.charge', 'entity.breeze.deflect', 'entity.breeze.whirl',

    // 24w04a
    'entity.armadillo.hurt_reduced',

    // 24w05a
    'block.vault.activate', 'block.vault.ambient', 'block.vault.break',
    'block.vault.close_shutter', 'block.vault.deactivate', 'block.vault.eject_item',
    'block.vault.fall', 'block.vault.hit', 'block.vault.insert_item',
    'block.vault.insert_item_fail', 'block.vault.open_shutter', 'block.vault.place',
    'block.vault.step',

    // 24w06a
    'entity.armadillo.peek', 'entity.armadillo.unroll_finish', 'entity.armadillo.unroll_start',
    'entity.breeze.wind_burst', 'entity.wind_charge.throw', 'entity.wind_charge.wind_burst',

    // 24w07a
    'entity.bogged.ambient', 'entity.bogged.death', 'entity.bogged.hurt', 'entity.bogged.step',
    'entity.parrot.imitate.bogged',

    // 24w09a
    'entity.donkey.jump', 'entity.mule.jump', 'block.wet_sponge.dries',
    'entity.bogged.shear', 'item.wolf_armor.break', 'item.wolf_armor.crack',
    'item.wolf_armor.damage', 'item.wolf_armor.repair',

    // 24w11a
    'block.heavy_core.break', 'block.heavy_core.fall', 'block.heavy_core.hit',
    'block.heavy_core.place', 'block.heavy_core.step', 'item.mace.smash_air',
    'item.mace.smash_ground',

    // 24w12a
    'item.mace.smash_ground_heavy',

    // 24w13a
    'event.mob_effect.bad_omen', 'event.mob_effect.raid_omen', 'event.mob_effect.trial_omen',
    'block.cobweb.break', 'block.cobweb.fall', 'block.cobweb.hit', 'block.cobweb.place',
    'block.cobweb.step', 'item.ominous_bottle.dispose', 'block.trial_spawner.about_to_spawn_item',
    'block.trial_spawner.ambient_charged', 'block.trial_spawner.charge_activate',
    'block.trial_spawner.spawn_item', 'block.trial_spawner.spawn_item_begin',

    // Main 1.20.3 release
    'block.decorated_pot.insert', 'block.decorated_pot.insert_fail',
    'block.hanging_sign.waxed_interact_fail',

    // 23w42a
    'block.crafter.craft', 'block.crafter.fail',

    // 23w43a
    'block.copper_bulb.break', 'block.copper_bulb.fall', 'block.copper_bulb.hit',
    'block.copper_bulb.place', 'block.copper_bulb.step',
    'block.copper_grate.break', 'block.copper_grate.fall', 'block.copper_grate.hit',
    'block.copper_grate.place', 'block.copper_grate.step',
    'block.polished_tuff.break', 'block.polished_tuff.fall', 'block.polished_tuff.hit',
    'block.polished_tuff.place', 'block.polished_tuff.step',
    'block.tuff_bricks.break', 'block.tuff_bricks.fall', 'block.tuff_bricks.hit',
    'block.tuff_bricks.place', 'block.tuff_bricks.step',
    'block.copper_bulb.turn_off', 'block.copper_bulb.turn_on',
    'block.copper_door.close', 'block.copper_door.open',
    'block.copper_trapdoor.close', 'block.copper_trapdoor.open',
    'entity.player.teleport',

    // 23w45a
    'entity.breeze.death', 'entity.breeze.hurt', 'entity.breeze.idle_air',
    'entity.breeze.idle_ground', 'entity.breeze.inhale', 'entity.breeze.jump',
    'entity.breeze.land', 'entity.breeze.shoot', 'entity.breeze.slide',
    'entity.parrot.imitate.breeze', 'entity.generic.wind_burst',
    'block.trial_spawner.ambient', 'block.trial_spawner.break',
    'block.trial_spawner.close_shutter', 'block.trial_spawner.detect_player',
    'block.trial_spawner.eject_item', 'block.trial_spawner.fall',
    'block.trial_spawner.hit', 'block.trial_spawner.open_shutter',
    'block.trial_spawner.place', 'block.trial_spawner.spawn_mob',
    'block.trial_spawner.step',

    // Main 1.20.2 release
    'block.sponge.absorb',

    // 23w33a
    'block.sponge.break',
    'block.sponge.fall',
    'block.sponge.hit',
    'block.sponge.place',
    'block.sponge.step',
    'block.wet_sponge.break',
    'block.wet_sponge.fall',
    'block.wet_sponge.hit',
    'block.wet_sponge.place',
    'block.wet_sponge.step',


    // Main 1.20 release
    'block.amethyst_block.resonate',
    'item.brush.brushing.gravel',
    'item.brush.brushing.gravel.complete',
    'item.brush.brushing.sand',
    'block.suspicious_gravel.break',
    'block.suspicious_gravel.fall',
    'block.suspicious_gravel.hit',
    'block.suspicious_gravel.place',
    'block.suspicious_gravel.step',
    'block.sign.waxed_interact_fail',
    'item.brush.brushing.generic',  // Renamed from item.brush.brushing
    'item.brush.brushing.sand.completed',  // Renamed from item.brush.brush_sand_completed

    // 23w14a
    'block.sniffer_egg.crack',
    'block.sniffer_egg.hatch',

    // 23w16a
    'block.sniffer_egg.plop',

    // 23w17a
    'music_disc.relic',
    'music.overworld.forest',
    'music.overworld.flower_forest',
    'music.overworld.desert',
    'music.overworld.badlands',
    'music.overworld.jungle',
    'music.overworld.sparse_jungle',
    'music.overworld.bamboo_jungle',

    // Bamboo wood interactions
    'block.bamboo_wood.break',
    'block.bamboo_wood.fall',
    'block.bamboo_wood.hit',
    'block.bamboo_wood.place',
    'block.bamboo_wood.step',
    'block.bamboo_wood_button.click_off',
    'block.bamboo_wood_button.click_on',
    'block.bamboo_wood_door.close',
    'block.bamboo_wood_door.open',
    'block.bamboo_wood_fence_gate.close',
    'block.bamboo_wood_fence_gate.open',
    'block.bamboo_wood_pressure_plate.click_off',
    'block.bamboo_wood_pressure_plate.click_on',
    'block.bamboo_wood_trapdoor.close',
    'block.bamboo_wood_trapdoor.open',

    // Camel-related sounds
    'entity.camel.ambient',
    'entity.camel.dash',
    'entity.camel.dash_ready',
    'entity.camel.death',
    'entity.camel.eat',
    'entity.camel.hurt',
    'entity.camel.saddle',
    'entity.camel.sit',
    'entity.camel.stand',
    'entity.camel.step',
    'entity.camel.step_sand',

    // 22w45a - Hanging signs and chiseled bookshelf
    'block.bamboo_wood_hanging_sign.break',
    'block.bamboo_wood_hanging_sign.fall',
    'block.bamboo_wood_hanging_sign.hit',
    'block.bamboo_wood_hanging_sign.place',
    'block.bamboo_wood_hanging_sign.step',
    'block.nether_wood_hanging_sign.break',
    'block.nether_wood_hanging_sign.fall',
    'block.nether_wood_hanging_sign.hit',
    'block.nether_wood_hanging_sign.place',
    'block.nether_wood_hanging_sign.step',
    'block.chiseled_bookshelf.break',
    'block.chiseled_bookshelf.fall',
    'block.chiseled_bookshelf.hit',
    'block.chiseled_bookshelf.place',
    'block.chiseled_bookshelf.step',
    'block.chiseled_bookshelf.insert',
    'block.chiseled_bookshelf.insert.enchanted',
    'block.chiseled_bookshelf.pickup',
    'block.chiseled_bookshelf.pickup.enchanted',

    // pre3 - Mob imitations with note blocks
    'block.note_block.imitate.creeper',
    'block.note_block.imitate.ender_dragon',
    'block.note_block.imitate.piglin',
    'block.note_block.imitate.skeleton',
    'block.note_block.imitate.wither_skeleton',
    'block.note_block.imitate.zombie'
]);


addSoundsToTag('version_1_19', [
    //added in 1.19.4
    'item.brush.brushing',
    'item.brush.brush_sand_completed',

    // Cherry-related sounds
    'block.cherry_leaves.break',
    'block.cherry_leaves.fall',
    'block.cherry_leaves.hit',
    'block.cherry_leaves.place',
    'block.cherry_leaves.step',
    'block.cherry_sapling.break',
    'block.cherry_sapling.fall',
    'block.cherry_sapling.hit',
    'block.cherry_sapling.place',
    'block.cherry_sapling.step',
    'block.cherry_wood.break',
    'block.cherry_wood.fall',
    'block.cherry_wood.hit',
    'block.cherry_wood.place',
    'block.cherry_wood.step',
    'block.cherry_wood_hanging_sign.break',
    'block.cherry_wood_hanging_sign.fall',
    'block.cherry_wood_hanging_sign.hit',
    'block.cherry_wood_hanging_sign.place',
    'block.cherry_wood_hanging_sign.step',
    'block.decorated_pot.break',
    'block.decorated_pot.fall',
    'block.decorated_pot.hit',
    'block.decorated_pot.place',
    'block.decorated_pot.step',
    'block.suspicious_sand.break',
    'block.suspicious_sand.fall',
    'block.suspicious_sand.hit',
    'block.suspicious_sand.place',
    'block.suspicious_sand.step',
    'block.pink_petals.break',
    'block.pink_petals.fall',
    'block.pink_petals.hit',
    'block.pink_petals.place',
    'block.pink_petals.step',

    // Cherry wood-specific interactions
    'block.cherry_wood_button.click_off',
    'block.cherry_wood_button.click_on',
    'block.cherry_wood_door.close',
    'block.cherry_wood_door.open',
    'block.cherry_wood_fence_gate.close',
    'block.cherry_wood_fence_gate.open',
    'block.cherry_wood_pressure_plate.click_off',
    'block.cherry_wood_pressure_plate.click_on',
    'block.cherry_wood_trapdoor.close',
    'block.cherry_wood_trapdoor.open',

    // Decorated pot interaction
    'block.decorated_pot.shatter',

    // Sniffer-related sounds
    'entity.sniffer.death',
    'entity.sniffer.digging',
    'entity.sniffer.digging_stop',
    'entity.sniffer.drop_seed',
    'entity.sniffer.eat',
    'entity.sniffer.happy',
    'entity.sniffer.hurt',
    'entity.sniffer.idle',
    'entity.sniffer.scenting',
    'entity.sniffer.searching',
    'entity.sniffer.sniffing',
    'entity.sniffer.step',

    // Overworld music
    'music.overworld.cherry_grove',

    'minecraft:intentionally_empty',

    //added in 1.19.3
    'block.nether_wood.break',
    'block.nether_wood.fall',
    'block.nether_wood.hit',
    'block.nether_wood.place',
    'block.nether_wood.step',
    'block.nether_wood_button.click_off',
    'block.nether_wood_button.click_on',
    'block.nether_wood_door.close',
    'block.nether_wood_door.open',
    'block.nether_wood_fence_gate.close',
    'block.nether_wood_fence_gate.open',
    'block.nether_wood_pressure_plate.click_off',
    'block.nether_wood_pressure_plate.click_on',
    'block.nether_wood_trapdoor.close',
    'block.nether_wood_trapdoor.open',

    // Frog and tadpole related sounds
    'block.frogspawn.break',
    'block.frogspawn.fall',
    'block.frogspawn.hit',
    'block.frogspawn.place',
    'block.frogspawn.step',
    'item.bucket.empty_tadpole',
    'item.bucket.fill_tadpole',
    'block.frogspawn.hatch',
    'entity.frog.ambient',
    'entity.frog.death',
    'entity.frog.eat',
    'entity.frog.hurt',
    'entity.frog.lay_spawn',
    'entity.frog.long_jump',
    'entity.frog.step',
    'entity.frog.tongue',  // Renamed from 'tounge' in pre1
    'entity.tadpole.death',
    'entity.tadpole.flop',
    'entity.tadpole.grow_up',
    'entity.tadpole.hurt',

    // Froglight and sculk-related sounds
    'block.froglight.break',
    'block.froglight.fall',
    'block.froglight.hit',
    'block.froglight.place',
    'block.froglight.step',
    'block.sculk.break',
    'block.sculk.fall',
    'block.sculk.hit',
    'block.sculk.place',
    'block.sculk.step',
    'block.sculk.charge',
    'block.sculk.spread',
    'block.sculk_catalyst.break',
    'block.sculk_catalyst.fall',
    'block.sculk_catalyst.hit',
    'block.sculk_catalyst.place',
    'block.sculk_catalyst.step',
    'block.sculk_catalyst.bloom',
    'block.sculk_shrieker.break',
    'block.sculk_shrieker.fall',
    'block.sculk_shrieker.hit',
    'block.sculk_shrieker.place',
    'block.sculk_shrieker.step',
    'block.sculk_shrieker.shriek',
    'block.sculk_vein.break',
    'block.sculk_vein.fall',
    'block.sculk_vein.hit',
    'block.sculk_vein.place',
    'block.sculk_vein.step',

    // Warden sounds (22w12a - 22w17a)
    'entity.warden.agitated',
    'entity.warden.ambient',
    'entity.warden.angry',
    'entity.warden.attack_impact',
    'entity.warden.death',
    'entity.warden.dig',
    'entity.warden.emerge',
    'entity.warden.heartbeat',
    'entity.warden.hurt',
    'entity.warden.listening',
    'entity.warden.listening_angry',
    'entity.warden.nearby_close',
    'entity.warden.nearby_closer',
    'entity.warden.nearby_closest',
    'entity.warden.roar',
    'entity.warden.sniff',
    'entity.warden.step',
    'entity.warden.tendril_clicks',
    'entity.warden.sonic_boom',
    'entity.warden.sonic_charge',
    'entity.parrot.imitate.warden',

    // Allay sounds (22w13a - 22w16b)
    'entity.allay.ambient_without_item',
    'entity.allay.ambient_with_item',
    'entity.allay.death',
    'entity.allay.hurt',
    'entity.allay.item_given',
    'entity.allay.item_taken',
    'entity.allay.item_thrown',

    // Goat and goat horn sounds
    'entity.goat.horn_break',
    'entity.goat.screaming.horn_break',
    'item.goat_horn.play',
    'item.goat_horn.sound.0',
    'item.goat_horn.sound.1',
    'item.goat_horn.sound.2',
    'item.goat_horn.sound.3',
    'item.goat_horn.sound.4',
    'item.goat_horn.sound.5',
    'item.goat_horn.sound.6',
    'item.goat_horn.sound.7',

    // Music
    'music.overworld.deep_dark',
    'music.overworld.jungle_and_forest',
    'music.overworld.old_growth_taiga',
    'music.overworld.swamp',
    'music_disc.5'
]);

addSoundsToTag('version_1_18', [
    // Bundle interactions
    'item.bundle.drop_contents',
    'item.bundle.insert',
    'item.bundle.remove_one',

    // Growing plant sound
    'block.growing_plant.crop',

    // Overworld music
    'music.overworld.dripstone_caves',
    'music.overworld.frozen_peaks',
    'music.overworld.grove',
    'music.overworld.jagged_peaks',
    'music.overworld.lush_caves',
    'music.overworld.meadow',
    'music.overworld.snowy_slopes',
    'music.overworld.stony_peaks',

    // Music disc
    'music_disc.otherside'
]);

// addSoundsToTag('version_1_17', [
//     // Amethyst, copper, tuff, and candle interactions
//     'block.amethyst_block.break',
//     'block.amethyst_block.fall',
//     'block.amethyst_block.hit',
//     'block.amethyst_block.place',
//     'block.amethyst_block.step',
//     'block.amethyst_block.chime',
//     'block.amethyst_cluster.break',
//     'block.amethyst_cluster.fall',
//     'block.amethyst_cluster.hit',
//     'block.amethyst_cluster.place',
//     'block.amethyst_cluster.step',
//     'block.calcite.break',
//     'block.calcite.fall',
//     'block.calcite.hit',
//     'block.calcite.place',
//     'block.calcite.step',
//     'block.candle.break',
//     'block.candle.fall',
//     'block.candle.hit',
//     'block.candle.place',
//     'block.candle.step',
//     'block.candle.ambient',
//     'block.candle.extinguish',
//     'block.cake.add_candle',
//     'block.large_amethyst_bud.break',
//     'block.large_amethyst_bud.place',
//     'block.medium_amethyst_bud.break',
//     'block.medium_amethyst_bud.place',
//     'block.small_amethyst_bud.break',
//     'block.small_amethyst_bud.place',
//     'block.copper.break',
//     'block.copper.fall',
//     'block.copper.hit',
//     'block.copper.place',
//     'block.copper.step',
//     'block.tuff.break',
//     'block.tuff.fall',
//     'block.tuff.hit',
//     'block.tuff.place',
//     'block.tuff.step',
//
//     // Spyglass and minecart interactions
//     'entity.minecart.inside.underwater',
//     'item.spyglass.stop_using',
//     'item.spyglass.use',
//
//     // Powder snow interactions
//     'item.bucket.empty_powder_snow',
//     'item.bucket.fill_powder_snow',
//     'entity.player.hurt_freeze',
//     'block.powder_snow.break',
//     'block.powder_snow.fall',
//     'block.powder_snow.hit',
//     'block.powder_snow.place',
//     'block.powder_snow.step',
//
//     // Dripstone interactions
//     'block.dripstone_block.break',
//     'block.dripstone_block.fall',
//     'block.dripstone_block.hit',
//     'block.dripstone_block.place',
//     'block.dripstone_block.step',
//     'block.pointed_dripstone.break',
//     'block.pointed_dripstone.fall',
//     'block.pointed_dripstone.hit',
//     'block.pointed_dripstone.place',
//     'block.pointed_dripstone.step',
//     'block.pointed_dripstone.drip_lava',
//     'block.pointed_dripstone.drip_lava_into_cauldron',
//     'block.pointed_dripstone.drip_water',
//     'block.pointed_dripstone.drip_water_into_cauldron',
//
//     // Sculk sensor sounds
//     'block.sculk_sensor.clicking',
//     'block.sculk_sensor.clicking_stop',
//     'block.sculk_sensor.break',
//     'block.sculk_sensor.fall',
//     'block.sculk_sensor.hit',
//     'block.sculk_sensor.place',
//     'block.sculk_sensor.step',
//
//     // Axolotl sounds
//     'entity.axolotl.attack',
//     'entity.axolotl.death',
//     'entity.axolotl.hurt',
//     'entity.axolotl.idle_air',
//     'entity.axolotl.idle_water',
//     'entity.axolotl.splash',
//     'entity.axolotl.swim',
//     'item.bucket.empty_axolotl',
//     'item.bucket.fill_axolotl',
//
//     // Glow squid and glow item frame sounds
//     'entity.glow_squid.ambient',
//     'entity.glow_squid.death',
//     'entity.glow_squid.hurt',
//     'entity.glow_squid.squirt',
//     'item.dye.use',
//     'item.glow_ink_sac.use',
//     'item.ink_sac.use',
//     'entity.glow_item_frame.add_item',
//     'entity.glow_item_frame.break',
//     'entity.glow_item_frame.place',
//     'entity.glow_item_frame.remove_item',
//     'entity.glow_item_frame.rotate_item',
//
//     // Azalea, moss, and dripleaf interactions
//     'block.azalea.break',
//     'block.azalea.fall',
//     'block.azalea.hit',
//     'block.azalea.place',
//     'block.azalea.step',
//     'block.azalea_leaves.break',
//     'block.azalea_leaves.fall',
//     'block.azalea_leaves.hit',
//     'block.azalea_leaves.place',
//     'block.azalea_leaves.step',
//     'block.big_dripleaf.break',
//     'block.big_dripleaf.fall',
//     'block.big_dripleaf.hit',
//     'block.big_dripleaf.place',
//     'block.big_dripleaf.step',
//     'block.big_dripleaf.tilt_down',
//     'block.big_dripleaf.tilt_up',
//     'block.cave_vines.break',
//     'block.cave_vines.fall',
//     'block.cave_vines.hit',
//     'block.cave_vines.place',
//     'block.cave_vines.step',
//     'block.cave_vines.pick_berries',
//     'block.flowering_azalea.break',
//     'block.flowering_azalea.fall',
//     'block.flowering_azalea.hit',
//     'block.flowering_azalea.place',
//     'block.flowering_azalea.step',
//     'block.hanging_roots.break',
//     'block.hanging_roots.fall',
//     'block.hanging_roots.hit',
//     'block.hanging_roots.place',
//     'block.hanging_roots.step',
//     'block.moss.break',
//     'block.moss.fall',
//     'block.moss.hit',
//     'block.moss.place',
//     'block.moss.step',
//     'block.moss_carpet.break',
//     'block.moss_carpet.fall',
//     'block.moss_carpet.hit',
//     'block.moss_carpet.place',
//     'block.moss_carpet.step',
//     'block.rooted_dirt.break',
//     'block.rooted_dirt.fall',
//     'block.rooted_dirt.hit',
//     'block.rooted_dirt.place',
//     'block.rooted_dirt.step',
//     'block.small_dripleaf.break',
//     'block.small_dripleaf.fall',
//     'block.small_dripleaf.hit',
//     'block.small_dripleaf.place',
//     'block.small_dripleaf.step',
//     'block.spore_blossom.break',
//     'block.spore_blossom.fall',
//     'block.spore_blossom.hit',
//     'block.spore_blossom.place',
//     'block.spore_blossom.step',
//     'block.vine.break',
//     'block.vine.fall',
//     'block.vine.hit',
//     'block.vine.place',
//
//     // Deepslate interactions
//     'block.deepslate.break',
//     'block.deepslate.fall',
//     'block.deepslate.hit',
//     'block.deepslate.place',
//     'block.deepslate.step',
//     'block.deepslate_bricks.break',
//     'block.deepslate_bricks.fall',
//     'block.deepslate_bricks.hit',
//     'block.deepslate_bricks.place',
//     'block.deepslate_bricks.step',
//     'block.deepslate_tiles.break',
//     'block.deepslate_tiles.fall',
//     'block.deepslate_tiles.hit',
//     'block.deepslate_tiles.place',
//     'block.deepslate_tiles.step',
//     'block.polished_deepslate.break',
//     'block.polished_deepslate.fall',
//     'block.polished_deepslate.hit',
//     'block.polished_deepslate.place',
//     'block.polished_deepslate.step',
//
//     // Axe interactions
//     'item.axe.scrape',
//     'item.axe.wax_off',
//     'item.honeycomb.wax_on',
//
//     // Goat interactions
//     'entity.goat.ambient',
//     'entity.goat.death',
//     'entity.goat.hurt',
//     'entity.goat.milk',
//     'entity.goat.prepare_ram',
//     'entity.goat.step',
//     'entity.goat.eat',
//     'entity.goat.long_jump',
//     'entity.goat.ram_impact',
//     'entity.goat.screaming.ambient',
//     'entity.goat.screaming.death',
//     'entity.goat.screaming.hurt',
//     'entity.goat.screaming.milk',
//     'entity.goat.screaming.prepare_ram',
//     'entity.goat.screaming.eat',
//     'entity.goat.screaming.long_jump',
//     'entity.goat.screaming.ram_impact',
//
//     // Miscellaneous
//     'item.bone_meal.use',
//     'block.sweet_berry_bush.pick_berries',
//     'entity.skeleton.converted_to_stray'
// ]);
//
// addSoundsToTag('version_1_16_2', [
//     // Piglin Brute sounds
//     'entity.piglin_brute.ambient',
//     'entity.piglin_brute.angry',
//     'entity.piglin_brute.death',
//     'entity.piglin_brute.hurt',
//     'entity.piglin_brute.step',
//     'entity.piglin_brute.converted_to_zombified',
//
//     // Parrot imitation
//     'entity.parrot.imitate.piglin_brute'
// ]);
//
// addSoundsToTag('version_1_16', [
//     // Netherite and armor interactions
//     'item.armor.equip_netherite',
//
//     // Block interactions
//     'block.ancient_debris.break',
//     'block.ancient_debris.fall',
//     'block.ancient_debris.hit',
//     'block.ancient_debris.place',
//     'block.ancient_debris.step',
//     'block.basalt.break',
//     'block.basalt.fall',
//     'block.basalt.hit',
//     'block.basalt.place',
//     'block.basalt.step',
//     'block.bone_block.break',
//     'block.bone_block.fall',
//     'block.bone_block.hit',
//     'block.bone_block.place',
//     'block.bone_block.step',
//     'block.fungus.break',
//     'block.fungus.fall',
//     'block.fungus.hit',
//     'block.fungus.place',
//     'block.fungus.step',
//     'block.netherrack.break',
//     'block.netherrack.fall',
//     'block.netherrack.hit',
//     'block.netherrack.place',
//     'block.netherrack.step',
//     'block.nether_bricks.break',
//     'block.nether_bricks.fall',
//     'block.nether_bricks.hit',
//     'block.nether_bricks.place',
//     'block.nether_bricks.step',
//     'block.nether_ore.break',
//     'block.nether_ore.fall',
//     'block.nether_ore.hit',
//     'block.nether_ore.place',
//     'block.nether_ore.step',
//     'block.nether_sprouts.break',
//     'block.nether_sprouts.fall',
//     'block.nether_sprouts.hit',
//     'block.nether_sprouts.place',
//     'block.nether_sprouts.step',
//     'block.nylium.break',
//     'block.nylium.fall',
//     'block.nylium.hit',
//     'block.nylium.place',
//     'block.nylium.step',
//     'block.roots.break',
//     'block.roots.fall',
//     'block.roots.hit',
//     'block.roots.place',
//     'block.roots.step',
//     'block.shroomlight.break',
//     'block.shroomlight.fall',
//     'block.shroomlight.hit',
//     'block.shroomlight.place',
//     'block.shroomlight.step',
//     'block.soul_sand.break',
//     'block.soul_sand.fall',
//     'block.soul_sand.hit',
//     'block.soul_sand.place',
//     'block.soul_sand.step',
//     'block.soul_soil.break',
//     'block.soul_soil.fall',
//     'block.soul_soil.hit',
//     'block.soul_soil.place',
//     'block.soul_soil.step',
//     'block.stem.break',
//     'block.stem.fall',
//     'block.stem.hit',
//     'block.stem.place',
//     'block.stem.step',
//     'block.wart_block.break',
//     'block.wart_block.fall',
//     'block.wart_block.hit',
//     'block.wart_block.place',
//     'block.wart_block.step',
//     'block.weeping_vines.break',
//     'block.weeping_vines.fall',
//     'block.weeping_vines.hit',
//     'block.weeping_vines.place',
//     'block.weeping_vines.step',
//     'block.smithing_table.use',
//     'block.respawn_anchor.ambient',
//     'block.respawn_anchor.charge',
//     'block.respawn_anchor.deplete',
//     'block.respawn_anchor.set_spawn',
//     'block.lodestone.break',
//     'block.lodestone.fall',
//     'block.lodestone.hit',
//     'block.lodestone.place',
//     'block.lodestone.step',
//     'item.lodestone_compass.lock',
//     'block.chain.break',
//     'block.chain.fall',
//     'block.chain.hit',
//     'block.chain.place',
//     'block.chain.step',
//     'block.gilded_blackstone.break',
//     'block.gilded_blackstone.fall',
//     'block.gilded_blackstone.hit',
//     'block.gilded_blackstone.place',
//     'block.gilded_blackstone.step',
//     'block.nether_gold_ore.break',
//     'block.nether_gold_ore.fall',
//     'block.nether_gold_ore.hit',
//     'block.nether_gold_ore.place',
//     'block.nether_gold_ore.step',
//
//     // Ambient sounds
//     'ambient.crimson_forest.additions',
//     'ambient.crimson_forest.loop',
//     'ambient.crimson_forest.mood',
//     'ambient.nether_wastes.additions',
//     'ambient.nether_wastes.loop',
//     'ambient.nether_wastes.mood',
//     'ambient.soul_sand_valley.additions',
//     'ambient.soul_sand_valley.loop',
//     'ambient.soul_sand_valley.mood',
//     'ambient.warped_forest.additions',
//     'ambient.warped_forest.loop',
//     'ambient.warped_forest.mood',
//     'ambient.basalt_deltas.additions',
//     'ambient.basalt_deltas.loop',
//     'ambient.basalt_deltas.mood',
//
//     // Hoglin and Piglin sounds
//     'entity.hoglin.ambient',
//     'entity.hoglin.angry',
//     'entity.hoglin.attack',
//     'entity.hoglin.death',
//     'entity.hoglin.hurt',
//     'entity.hoglin.retreat',
//     'entity.hoglin.step',
//     'entity.hoglin.converted_to_zombified',
//     'entity.piglin.admiring_item',
//     'entity.piglin.ambient',
//     'entity.piglin.angry',
//     'entity.piglin.celebrate',
//     'entity.piglin.converted_to_zombified',
//     'entity.piglin.death',
//     'entity.piglin.hurt',
//     'entity.piglin.jealous',
//     'entity.piglin.retreat',
//     'entity.piglin.step',
//
//     // Strider sounds
//     'entity.strider.ambient',
//     'entity.strider.death',
//     'entity.strider.eat',
//     'entity.strider.happy',
//     'entity.strider.hurt',
//     'entity.strider.retreat',
//     'entity.strider.step',
//     'entity.strider.step_lava',
//     'entity.strider.saddle',
//
//     // Zoglin sounds
//     'entity.zoglin.ambient',
//     'entity.zoglin.angry',
//     'entity.zoglin.attack',
//     'entity.zoglin.death',
//     'entity.zoglin.hurt',
//     'entity.zoglin.step',
//
//     // Miscellaneous
//     'entity.snow_golem.shear',
//     'entity.donkey.eat',
//     'entity.mule.eat',
//     'entity.mule.angry',
//     'entity.fox.teleport',
//     'entity.parrot.imitate.hoglin',
//     'entity.parrot.imitate.piglin',
//     'entity.parrot.imitate.zoglin',
//     'particle.soul_escape',
//
//     // Music
//     'music.nether.basalt_deltas',
//     'music.nether.crimson_forest',
//     'music.nether.nether_wastes',
//     'music.nether.soul_sand_valley',
//     'music.nether.warped_forest',
//     'music_disc.pigstep'
// ]);
//
// addSoundsToTag('version_1_15', [
//     // Beehive and bee sounds
//     'block.beehive.drip',
//     'block.beehive.enter',
//     'block.beehive.exit',
//     'block.beehive.shear',
//     'block.beehive.work',
//     'entity.bee.death',
//     'entity.bee.hurt',
//     'entity.bee.loop',
//     'entity.bee.loop_aggressive',
//     'entity.bee.pollinate',
//     'entity.bee.sting',
//     'item.honey_bottle.drink',
//
//     // Honey block interactions
//     'block.honey_block.break',
//     'block.honey_block.fall',
//     'block.honey_block.hit',
//     'block.honey_block.place',
//     'block.honey_block.step',
//     'block.honey_block.slide',
//
//     // Iron Golem sounds
//     'entity.iron_golem.damage',
//     'entity.iron_golem.repair',
//
//     // Removed parrot imitations
//     // 'entity.parrot.imitate.panda' (removed in 19w41a),
//     // 'entity.parrot.imitate.polar_bear' (removed in 19w44a),
//     // 'entity.parrot.imitate.wolf' (removed in 19w44a),
//     // 'entity.parrot.imitate.zombie_pigman' (removed in 19w44a),
//     // 'entity.parrot.imitate.enderman' (removed in 19w45a)
// ]);
//
// addSoundsToTag('version_1_14', [
//     // Bamboo and bamboo sapling interactions
//     'block.bamboo.break',
//     'block.bamboo.fall',
//     'block.bamboo.hit',
//     'block.bamboo.place',
//     'block.bamboo.step',
//     'block.bamboo_sapling.break',
//     'block.bamboo_sapling.hit',
//     'block.bamboo_sapling.place',
//
//     // Illager Beast and Pillager sounds (now Ravager)
//     'entity.ravager.ambient',
//     'entity.ravager.attack',
//     'entity.ravager.death',
//     'entity.ravager.hurt',
//     'entity.ravager.roar',
//     'entity.ravager.step',
//     'entity.ravager.stunned',
//     'entity.pillager.ambient',
//     'entity.pillager.death',
//     'entity.pillager.hurt',
//
//     // Panda sounds
//     'entity.panda.aggressive_ambient',
//     'entity.panda.ambient',
//     'entity.panda.bite',
//     'entity.panda.cant_breed',
//     'entity.panda.death',
//     'entity.panda.eat',
//     'entity.panda.hurt',
//     'entity.panda.pre_sneeze',
//     'entity.panda.sneeze',
//     'entity.panda.step',
//     'entity.panda.worried_ambient',
//
//     // Crossbow sounds
//     'item.crossbow.hit',
//     'item.crossbow.loading_end',
//     'item.crossbow.loading_middle',
//     'item.crossbow.loading_start',
//     'item.crossbow.quick_charge_1',
//     'item.crossbow.quick_charge_2',
//     'item.crossbow.quick_charge_3',
//     'item.crossbow.shoot',
//
//     // UI and Loom sounds
//     'ui.loom.select_pattern',
//     'ui.loom.take_result',
//     'ui.cartography_table.take_result',
//     'ui.stonecutter.select_recipe',
//     'ui.stonecutter.take_result',
//
//     // Cat and Ocelot sounds
//     'entity.cat.beg_for_food',
//     'entity.cat.eat',
//     'entity.cat.stray_ambient',
//     'entity.ocelot.ambient',
//     'entity.ocelot.death',
//     'entity.ocelot.hurt',
//
//     // Scaffolding interactions
//     'block.scaffolding.break',
//     'block.scaffolding.fall',
//     'block.scaffolding.hit',
//     'block.scaffolding.place',
//     'block.scaffolding.step',
//
//     // Raid horn and bell sounds
//     'event.raid.horn',
//     'block.bell.use',
//     'block.bell.resonate',
//
//     // Campfire, book, and barrel sounds
//     'block.campfire.crackle',
//     'item.book.page_turn',
//     'item.book.put',
//     'block.barrel.close',
//     'block.barrel.open',
//
//     // Blast furnace, smoker, and composter sounds
//     'block.blastfurnace.fire_crackle',
//     'block.smoker.smoke',
//     'block.composter.empty',
//     'block.composter.fill',
//     'block.composter.fill_success',
//     'block.composter.ready',
//
//     // Crop, nether wart, and sweet berry bush sounds
//     'block.crop.break',
//     'item.crop.plant',
//     'block.nether_wart.break',
//     'item.nether_wart.plant',
//     'block.sweet_berry_bush.break',
//     'block.sweet_berry_bush.place',
//     'item.sweet_berries.pick_from_bush',
//
//     // Lantern interactions
//     'block.lantern.break',
//     'block.lantern.fall',
//     'block.lantern.hit',
//     'block.lantern.place',
//     'block.lantern.step',
//
//     // Wandering trader and fox sounds
//     'entity.wandering_trader.ambient',
//     'entity.wandering_trader.death',
//     'entity.wandering_trader.hurt',
//     'entity.wandering_trader.no',
//     'entity.wandering_trader.trade',
//     'entity.wandering_trader.yes',
//     'entity.fox.aggro',
//     'entity.fox.ambient',
//     'entity.fox.bark',
//     'entity.fox.bite',
//     'entity.fox.death',
//     'entity.fox.eat',
//     'entity.fox.hurt',
//     'entity.fox.sleep',
//     'entity.fox.sniff',
//     'entity.fox.spit',
//
//     // Mooshroom sounds
//     'entity.mooshroom.convert',
//     'entity.mooshroom.eat',
//     'entity.mooshroom.milk',
//     'entity.mooshroom.suspicious_milk',
//
//     // Note block sounds
//     'block.note_block.banjo',
//     'block.note_block.bit',
//     'block.note_block.cow_bell',
//     'block.note_block.didgeridoo',
//     'block.note_block.iron_xylophone',
//
//     // Imitations by parrot
//     'entity.parrot.imitate.guardian',
//     'entity.parrot.imitate.panda',
//     'entity.parrot.imitate.pillager',
//     'entity.parrot.imitate.ravager',
//
//     // Villager work sounds
//     'entity.villager.work_armorer',
//     'entity.villager.work_butcher',
//     'entity.villager.work_cartographer',
//     'entity.villager.work_cleric',
//     'entity.villager.work_farmer',
//     'entity.villager.work_fisherman',
//     'entity.villager.work_fletcher',
//     'entity.villager.work_leatherworker',
//     'entity.villager.work_librarian',
//     'entity.villager.work_mason',
//     'entity.villager.work_shepherd',
//     'entity.villager.work_toolsmith',
//     'entity.villager.work_weaponsmith',
//
//     // Celebration sounds
//     'entity.evoker.celebrate',
//     'entity.pillager.celebrate',
//     'entity.ravager.celebrate',
//     'entity.villager.celebrate',
//     'entity.vindicator.celebrate',
//     'entity.witch.celebrate'
// ]);
//
// addSoundsToTag('version_1_13', [
//     // Pumpkin carving
//     'block.pumpkin.carve',
//
//     // Bubble column sounds
//     'block.bubble_column.bubble_column_upwards_ambient',
//     'block.bubble_column.bubble_pop',
//     'block.bubble_column.upwards_inside',
//     'block.bubble_column.whirlpool_ambient',
//     'block.bubble_column.whirlpool_inside',
//
//     // Phantom sounds
//     'entity.phantom.ambient',
//     'entity.phantom.bite',
//     'entity.phantom.death',
//     'entity.phantom.hurt',
//     'entity.phantom.swoop',
//     'entity.phantom.flap',
//
//     // Turtle sounds
//     'entity.turtle.ambient_land',
//     'entity.turtle.death',
//     'entity.turtle.death_baby',
//     'entity.turtle.egg_break',
//     'entity.turtle.egg_crack',
//     'entity.turtle.egg_hatch',
//     'entity.turtle.hurt',
//     'entity.turtle.hurt_baby',
//     'entity.turtle.lay_egg',
//     'entity.turtle.shamble',
//     'entity.turtle.shamble_baby',
//     'entity.turtle.swim',
//
//     // Egg destruction
//     'entity.zombie.destroy_egg',
//
//     // Turtle armor and axe stripping
//     'item.armor.equip_turtle',
//     'item.axe.strip',
//
//     // Trident sounds
//     'item.trident.hit',
//     'item.trident.hit_ground',
//     'item.trident.return',
//     'item.trident.riptide_1',
//     'item.trident.riptide_2',
//     'item.trident.riptide_3',
//     'item.trident.throw',
//     'item.trident.thunder',
//
//     // Squid and fish sounds
//     'entity.squid.squirt',
//     'entity.fish.swim',
//     'entity.cod.ambient',
//     'entity.cod.death',
//     'entity.cod.flop',
//     'entity.cod.hurt',
//     'entity.puffer_fish.ambient',
//     'entity.puffer_fish.blow_out',
//     'entity.puffer_fish.blow_up',
//     'entity.puffer_fish.death',
//     'entity.puffer_fish.flop',
//     'entity.puffer_fish.hurt',
//     'entity.puffer_fish.sting',
//     'entity.salmon.ambient',
//     'entity.salmon.death',
//     'entity.salmon.flop',
//     'entity.salmon.hurt',
//     'item.bucket.empty_fish',
//     'item.bucket.fill_fish',
//
//     // Underwater and player sounds
//     'ambient.underwater.enter',
//     'ambient.underwater.exit',
//     'ambient.underwater.loop',
//     'ambient.underwater.loop.additions',
//     'ambient.underwater.loop.additions.rare',
//     'ambient.underwater.loop.additions.ultra_rare',
//     'entity.player.splash.high_speed',
//
//     // Tropical fish sounds
//     'entity.tropical_fish.ambient',
//     'entity.tropical_fish.death',
//     'entity.tropical_fish.flop',
//     'entity.tropical_fish.hurt',
//
//     // Drowned sounds
//     'entity.drowned.ambient',
//     'entity.drowned.ambient_water',
//     'entity.drowned.death',
//     'entity.drowned.death_water',
//     'entity.drowned.hurt',
//     'entity.drowned.hurt_water',
//     'entity.drowned.shoot',
//     'entity.drowned.step',
//     'entity.drowned.swim',
//     'entity.zombie.converted_to_drowned',
//
//     // Dolphin sounds
//     'entity.dolphin.ambient',
//     'entity.dolphin.ambient_water',
//     'entity.dolphin.attack',
//     'entity.dolphin.death',
//     'entity.dolphin.eat',
//     'entity.dolphin.hurt',
//     'entity.dolphin.jump',
//     'entity.dolphin.play',
//     'entity.dolphin.splash',
//     'entity.dolphin.swim',
//
//     // Beacon and conduit sounds
//     'block.beacon.activate',
//     'block.beacon.ambient',
//     'block.beacon.deactivate',
//     'block.beacon.power_select',
//     'block.conduit.activate',
//     'block.conduit.ambient',
//     'block.conduit.ambient.short',
//     'block.conduit.attack.target',
//     'block.conduit.deactivate',
//
//     // Parrot imitations
//     'entity.parrot.imitate.drowned',
//     'entity.parrot.imitate.phantom',
//
//     // Skeleton horse sounds
//     'entity.skeleton_horse.swim',
//     'entity.skeleton_horse.ambient_water',
//     'entity.skeleton_horse.gallop_water',
//     'entity.skeleton_horse.jump_water',
//     'entity.skeleton_horse.step_water',
//
//     // Husk to zombie conversion
//     'entity.husk.converted_to_zombie',
//
//     // Music
//     'music.under_water',
//
//     // Coral block and wet grass interactions
//     'block.coral_block.break',
//     'block.coral_block.fall',
//     'block.coral_block.hit',
//     'block.coral_block.place',
//     'block.coral_block.step',
//     'block.wet_grass.break',
//     'block.wet_grass.fall',
//     'block.wet_grass.hit',
//     'block.wet_grass.place',
//     'block.wet_grass.step'
// ]);
//
// addSoundsToTag('version_1_12', [
//     // Parrot sounds
//     'entity.parrot.ambient',
//     'entity.parrot.death',
//     'entity.parrot.eat',
//     'entity.parrot.fly',
//     'entity.parrot.hurt',
//     'entity.parrot.step',
//
//     // End portal sounds
//     'block.end_portal.spawn',
//     'block.end_portal_frame.fill',
//
//     // Note block sounds
//     'block.note.bell',
//     'block.note.chime',
//     'block.note.flute',
//     'block.note.guitar',
//     'block.note.xylophone',
//
//     // Boat and fishing bobber sounds
//     'entity.boat.paddle_land',
//     'entity.boat.paddle_water',
//     'entity.bobber.retrieve',
//
//     // Ender eye and illusion illager sounds
//     'entity.endereye.death',
//     'entity.illusion_illager.ambient',
//     'entity.illusion_illager.death',
//     'entity.illusion_illager.hurt',
//     'entity.illusion_illager.cast_spell',
//     'entity.illusion_illager.mirror_move',
//     'entity.illusion_illager.prepare_blindness',
//     'entity.illusion_illager.prepare_mirror',
//
//     // Player hurt sounds
//     'entity.player.hurt_drown',
//     'entity.player.hurt_on_fire',
//
//     // Parrot imitation sounds for various mobs
//     'entity.parrot.imitate.blaze',
//     'entity.parrot.imitate.creeper',
//     'entity.parrot.imitate.elder_guardian',
//     'entity.parrot.imitate.ender_dragon',
//     'entity.parrot.imitate.enderman',
//     'entity.parrot.imitate.endermite',
//     'entity.parrot.imitate.evoker',
//     'entity.parrot.imitate.ghast',
//     'entity.parrot.imitate.husk',
//     'entity.parrot.imitate.illusioner',
//     'entity.parrot.imitate.magma_cube',
//     'entity.parrot.imitate.polar_bear',
//     'entity.parrot.imitate.shulker',
//     'entity.parrot.imitate.silverfish',
//     'entity.parrot.imitate.skeleton',
//     'entity.parrot.imitate.slime',
//     'entity.parrot.imitate.spider',
//     'entity.parrot.imitate.stray',
//     'entity.parrot.imitate.vex',
//     'entity.parrot.imitate.vindicator',
//     'entity.parrot.imitate.witch',
//     'entity.parrot.imitate.wither',
//     'entity.parrot.imitate.wither_skeleton',
//     'entity.parrot.imitate.wolf',
//     'entity.parrot.imitate.zombie',
//     'entity.parrot.imitate.zombie_pigman',
//     'entity.parrot.imitate.zombie_villager',
//
//     // UI toast sounds
//     'ui.toast.challenge_complete',
//     'ui.toast.in',
//     'ui.toast.out'
// ]);
//
// addSoundsToTag('version_1_11', [
//     // Bottle empty sound
//     'item.bottle.empty',
//
//     // Evoker and vex sounds
//     'entity.evoker.ambient',
//     'entity.evoker.cast_spell',
//     'entity.evoker.death',
//     'entity.evoker.hurt',
//     'entity.evoker.prepare_attack',
//     'entity.evoker.prepare_summon',
//     'entity.evoker.prepare_wololo',
//     'entity.evoker_fangs.attack',
//     'entity.vex.ambient',
//     'entity.vex.charge',
//     'entity.vex.death',
//     'entity.vex.hurt',
//
//     // Vindicator sounds
//     'entity.vindicator.ambient',
//     'entity.vindicator.death',
//     'entity.vindicator.hurt',
//
//     // Llama sounds
//     'entity.llama.ambient',
//     'entity.llama.angry',
//     'entity.llama.death',
//     'entity.llama.eat',
//     'entity.llama.hurt',
//     'entity.llama.spit',
//     'entity.llama.step',
//     'entity.llama.swag',
//     'entity.llama.chest',
//
//     // Shulker box sounds
//     'block.shulker_box.close',
//     'block.shulker_box.open',
//
//     // Totem use sound
//     'item.totem.use',
//
//     // Other entity sounds
//     'entity.elder_guardian.flop',
//     'entity.mule.chest',
//
//     // Elytra sound
//     'item.armor.equip_elytra'
// ]);
//
// addSoundsToTag('version_1_10', [
//     // Enchantment table use sound
//     'block.enchantment_table.use',
//
//     // Polar bear sounds
//     'entity.polar_bear.ambient',
//     'entity.polar_bear.baby_ambient',
//     'entity.polar_bear.death',
//     'entity.polar_bear.hurt',
//     'entity.polar_bear.step',
//     'entity.polar_bear.warning',
//
//     // Husk sounds
//     'entity.husk.ambient',
//     'entity.husk.death',
//     'entity.husk.hurt',
//     'entity.husk.step',
//
//     // Stray sounds
//     'entity.stray.ambient',
//     'entity.stray.death',
//     'entity.stray.hurt',
//     'entity.stray.step',
//
//     // Wither skeleton sounds
//     'entity.wither_skeleton.ambient',
//     'entity.wither_skeleton.death',
//     'entity.wither_skeleton.hurt',
//     'entity.wither_skeleton.step'
// ]);
//
// addSoundsToTag('version_1_9_1', [
//     // Elytra flying sound
//     'item.elytra.flying'
// ]);
//
// addSoundsToTag('version_1_9', [
//     // Block sounds
//     'block.anvil.break',
//     'block.anvil.fall',
//     'block.anvil.hit',
//     'block.anvil.place',
//     'block.anvil.step',
//     'block.chest.locked',
//     'block.comparator.click',
//     'block.dispenser.dispense',
//     'block.dispenser.fail',
//     'block.dispenser.launch',
//     'block.end_gateway.spawn',
//     'block.enderchest.close',
//     'block.enderchest.open',
//     'block.fence_gate.close',
//     'block.fence_gate.open',
//     'block.fire.extinguish',
//     'block.glass.fall',
//     'block.glass.hit',
//     'block.glass.step',
//     'block.iron_door.close',
//     'block.iron_door.open',
//     'block.ladder.break',
//     'block.ladder.place',
//     'block.lava.extinguish',
//     'block.lever.click',
//     'block.metal.break',
//     'block.metal.fall',
//     'block.metal.hit',
//     'block.metal.place',
//     'block.metal.step',
//     'block.metal_pressureplate.click_off',
//     'block.metal_pressureplate.click_on',
//     'block.redstone_torch.burnout',
//     'block.slime.break',
//     'block.slime.fall',
//     'block.slime.hit',
//     'block.slime.place',
//     'block.slime.step',
//     'block.stone_button.click_off',
//     'block.stone_button.click_on',
//     'block.stone_pressureplate.click_off',
//     'block.stone_pressureplate.click_on',
//     'block.trapdoor.close',
//     'block.trapdoor.open',
//     'block.tripwire.attach',
//     'block.tripwire.detach',
//     'block.tripwire.click_off',
//     'block.tripwire.click_on',
//     'block.wood_button.click_off',
//     'block.wood_button.click_on',
//     'block.wood_pressureplate.click_off',
//     'block.wood_pressureplate.click_on',
//
//     // Entity sounds
//     'entity.blaze.ambient',
//     'entity.blaze.burn',
//     'entity.blaze.shoot',
//     'entity.bobber.splash',
//     'entity.bobber.throw',
//     'entity.cat.ambient',
//     'entity.cat.death',
//     'entity.cat.hurt',
//     'entity.chicken.egg',
//     'entity.chicken.death',
//     'entity.cow.death',
//     'entity.creeper.hurt',
//     'entity.donkey.chest',
//     'entity.elder_guardian.ambient_land',
//     'entity.elder_guardian.death_land',
//     'entity.elder_guardian.hurt_land',
//     'entity.enderdragon.ambient',
//     'entity.enderdragon.death',
//     'entity.enderdragon.flap',
//     'entity.enderdragon.shoot',
//     'entity.enderdragon_fireball.explode',
//     'entity.endermite.ambient',
//     'entity.endermite.death',
//     'entity.endermite.hurt',
//     'entity.endermite.step',
//     'entity.experience_orb.pickup',
//     'entity.experience_orb.touch',
//     'entity.firework.large_blast',
//     'entity.firework.large_blast_far',
//     'entity.firework.shoot',
//     'entity.generic.burn',
//     'entity.generic.drink',
//     'entity.generic.eat',
//     'entity.generic.explode',
//     'entity.generic.extinguish_fire',
//     'entity.guardian.hurt_land',
//     'entity.guardian.thorns',
//     'entity.horse.saddle',
//     'entity.horse.step',
//     'entity.horse.step_wood',
//     'entity.item.break',
//     'entity.item.pickup',
//     'entity.irongolem.attack',
//     'entity.irongolem.step',
//     'entity.lightning.impact',
//     'entity.lightning.thunder',
//     'entity.mooshroom.shear',
//     'entity.mule.ambient',
//     'entity.mule.death',
//     'entity.mule.hurt',
//     'entity.pig.hurt',
//     'entity.pig.saddle',
//     'entity.rabbit.attack',
//     'entity.rabbit.jump',
//     'entity.sheep.death',
//     'entity.sheep.hurt',
//     'entity.shield.break',
//     'entity.shulker.hit',
//     'entity.shulker.hurt',
//     'entity.shulker.shoot',
//     'entity.shulker.teleport',
//     'entity.slime.death',
//     'entity.slime.hurt',
//     'entity.slime.jump',
//     'entity.slime.squish',
//     'entity.skeleton.shoot',
//     'entity.small_magmacube.hurt',
//     'entity.small_magmacube.squish',
//     'entity.small_magmacube.death',
//     'entity.small_slime.hurt',
//     'entity.small_slime.squish',
//     'entity.small_slime.death',
//     'entity.snowman.shoot',
//     'entity.spider.hurt',
//     'entity.tnt.primed',
//     'entity.villager.trading',
//     'entity.wither.break_block',
//     'entity.wolf.ambient',
//     'entity.wolf.hurt',
//     'entity.wolf.pant',
//     'entity.zombie.attack_door_wood',
//     'entity.zombie.attack_iron_door',
//     'entity.zombie.break_door_wood',
//     'entity.zombie.cure',
//     'entity.zombie_pig.ambient',
//     'entity.zombie_pig.angry',
//     'entity.zombie_pig.death',
//     'entity.zombie_pig.hurt',
//
//     // UI sounds
//     'ui.button.click'
// ]);
//
// addSoundsToTag('version_1_8', [
//     // Guardian sounds
//     'entity.guardian.hurt',
//     'entity.guardian.ambient',
//     'entity.guardian.death',
//     'entity.elder_guardian.hurt',
//     'entity.elder_guardian.ambient',
//     'entity.elder_guardian.death',
//     'entity.guardian.hurt_land',
//     'entity.guardian.ambient_land',
//     'entity.guardian.death_land',
//     'entity.elder_guardian.curse',
//     'entity.guardian.attack',
//     'entity.guardian.flop',
//
//     // Fire charge usage
//     'item.firecharge.use',
//
//     // Rabbit sounds
//     'entity.rabbit.hurt',
//     'entity.rabbit.ambient',
//     'entity.rabbit.jump',
//     'entity.rabbit.death'
// ]);
//
// addSoundsToTag('version_1_7_2', [
//     // Replaced sounds
//     'entity.creeper.primed',
//     'entity.tnt.primed',
//     'block.glass.break', // Added dig.glass.[4] (glass breaking sound)
//
//     // Replaced liquid and swim sounds
//     'entity.hostile.swim',
//     'entity.neutral.swim',
//     'entity.player.swim',
//     'entity.hostile.swim.splash',
//     'entity.neutral.swim.splash',
//     'entity.player.swim.splash',
//
//     // Added death sounds
//     'entity.hostile.death',
//     'entity.neutral.death',
//     'entity.player.death',
//
//     // Replaced hurt sounds
//     'entity.hostile.hurt',
//     'entity.neutral.hurt',
//     'entity.player.hurt',
//     'entity.hostile.hurt.fall.big',
//     'entity.neutral.hurt.fall.big',
//     'entity.player.hurt.fall.big',
//     'entity.hostile.hurt.fall.small',
//     'entity.neutral.hurt.fall.small',
//     'entity.player.hurt.fall.small',
//
//     // Button press
//     'ui.button.press',
//
//     // Music sounds
//     'music.game',
//     'music.game.creative',
//     'music.game.end',
//     'music.game.end.credits',
//     'music.dragon', // Replaced music.game.end.dragon with music.dragon
//     'music.game.nether',
//     'music.menu',
//
//     // Potion smash sound
//     'entity.splash_potion.break', // Replaced random.glass with game.potion.smash
//
//     // Additional sounds
//     'entity.magmacube.jump',
//     'block.note.bass',
//     'ui.button.click' // Replaced random.wood_click
// ]);
//
// addSoundsToTag('version_1_6_1', [
//     // Horse sounds
//     'entity.horse.angry',
//     'entity.horse.armor',
//     'entity.horse.breathe',
//     'entity.horse.death',
//     'entity.horse.gallop',
//     'entity.horse.hurt',
//     'entity.horse.ambient', // Replaced mob.horse.idle with entity.horse.ambient
//     'entity.horse.jump',
//     'entity.horse.land',
//     'entity.horse.saddle',
//     'entity.horse.step',
//     'entity.horse.step_wood',
//
//     // Donkey sounds
//     'entity.donkey.angry',
//     'entity.donkey.death',
//     'entity.donkey.hurt',
//     'entity.donkey.ambient',
//
//     // Skeleton horse sounds
//     'entity.skeleton_horse.death',
//     'entity.skeleton_horse.hurt',
//     'entity.skeleton_horse.ambient',
//
//     // Zombie horse sounds
//     'entity.zombie_horse.death',
//     'entity.zombie_horse.hurt',
//     'entity.zombie_horse.ambient',
//
//     // Villager sounds
//     'entity.villager.ambient', // Replaced mob.villager.default with entity.villager.ambient
//     'entity.villager.death',   // Replaced mob.villager.defaultdeath with entity.villager.death
//     'entity.villager.hurt',    // Replaced mob.villager.defaulthurt with entity.villager.hurt
//     'entity.villager.trading',
//     'entity.villager.no',
//     'entity.villager.yes'
// ]);

saveTags();

console.log('Checking for duplicate sounds...');
findDuplicateSounds();

console.log('Script execution completed.');
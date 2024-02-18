import {
  applyHeightMapAsLayer,
  applyHeightMapToTerrain,
  createWorldFromHeightMap,
  FilterArgs,
  getFileLayer,
  getHeightMap,
  getLayer,
  getMapFormat,
  getTerrain,
  HeightmapAsLayerLevel,
  HeightmapAsTerrainLevel,
  installCustomTerrain,
  saveWorld,
} from './highLevelApi'
import { Terrain } from './constants'

// @ts-expect-error WP global
const { extent, resolution, wmOutput } = params as {
  extent: string
  resolution: number
  wmOutput: string
}

print(wmOutput)

interface StepBase {
  output: string
  channel?: 'red' | 'green' | 'blue'
  name: string
}

interface StepTerrain extends StepBase {
  terrainLevels: HeightmapAsTerrainLevel[]
  filterArgs?: FilterArgs
}

interface StepLayer extends StepBase {
  layerLevels: HeightmapAsLayerLevel[]
  layer: wp.Layer
  filterArgs?: FilterArgs
}

type Step = StepTerrain | StepLayer

function outputFile(outputType: string): string {
  return `${wmOutput}/${extent}/${resolution}/${outputType} out.png`
}

const heightmapCache: { [file: string]: wp.HeightMap } = {}

function getHeightmapCached(file: string, channel?: 'red' | 'green' | 'blue') {
  const key = channel ? `${file}[${channel}]` : file
  if (heightmapCache[key]) {
    return heightmapCache[key]
  } else {
    const heightmap = getHeightMap(file, channel)
    heightmapCache[key] = heightmap
    return heightmap
  }
}

function runSteps(world: wp.World, steps: Step[]) {
  for (const step of steps) {
    print(`Running "${step.name}"`)
    try {
      const heightmap = getHeightmapCached(outputFile(step.output), step.channel)
      if ('terrainLevels' in step) {
        if (step.terrainLevels.length == 0) {
          print('Empty terrainLevels')
        }
        applyHeightMapToTerrain(heightmap, world, step.terrainLevels, {
          filterArgs: step.filterArgs,
        })
      } else {
        if (step.layerLevels.length == 0) {
          print('Empty layerLevels')
        }
        applyHeightMapAsLayer(heightmap, world, step.layer, step.layerLevels, {
          filterArgs: step.filterArgs,
        })
      }
    } catch (e) {
      print(`Skipping "${step.name}" as output file missing`)
      print(e)
    }
  }
}

//// @ts-expect-error WP global
//const scriptDirLoc = scriptDir

declare function print(value: any): void

const heightmap = getHeightmapCached(outputFile('Heightmap'))

print('Got heightmap')

const I2_MAX = 65535

const world = createWorldFromHeightMap(heightmap, {
  levels: {
    from: {
      lower: 0,
      upper: I2_MAX,
    },
    to: {
      lower: 0,
      upper: 512,
    },
  },
  waterLevel: -64,
  mapFormat: getMapFormat('org.pepsoft.anvil.1.18'),
  lowerBuildLimit: -64,
  upperBuildLimit: 512,
})

print('Created world')

function leveli2(blocks: number) {
  return blocks * 256
}

function anglei2(angle: number) {
  const ratio = angle / 90
  return ratio * I2_MAX
}

function biomeLevels(color: 'red' | 'blue' | 'green', oneBit?: boolean): HeightmapAsLayerLevel[] {
  const res = []
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      res.push({ fromColor: {...{ red: 0, blue: 0, green: 0 }, [color]: i * 16 + j}, toLevel: oneBit ? Math.min(1, i): i })
    }
  }
  return res
}

const snowTerrain = getTerrain('terrains/Snow_Ice.terrain')
const snowTerrainId = installCustomTerrain(snowTerrain, world)

runSteps(world, [
  {
    output: 'Heightmap',
    name: 'apply heightmap terrain',
    terrainLevels: [
      {
        fromLevels: { lower: 0, upper: leveli2(180) - 1 },
        toTerrain: Terrain.grass,
      },
      {
        fromLevels: { lower: leveli2(180), upper: leveli2(200) - 1 },
        toTerrain: Terrain.andesite,
      },
      {
        fromLevels: { lower: leveli2(200), upper: I2_MAX },
        toTerrain: Terrain.stone,
      },
    ],
  },
  {
    output: 'Slope',
    name: 'apply slope terrain',
    terrainLevels: [
      {
        fromLevels: { lower: anglei2(45), upper: anglei2(48) - 1 },
        toTerrain: Terrain.mossyCobblestone,
      },
      {
        fromLevels: { lower: anglei2(48), upper: anglei2(51) - 1 },
        toTerrain: Terrain.cobblestone,
      },
      {
        fromLevels: { lower: anglei2(51), upper: anglei2(54) - 1 },
        toTerrain: Terrain.andesite,
      },
      {
        fromLevels: { lower: anglei2(54), upper: I2_MAX },
        toTerrain: Terrain.stone,
      },
    ],
  },
  {
    output: 'Erosion deposit',
    name: 'apply erosion deposit terrain',
    terrainLevels: [
      {
        fromLevel: I2_MAX,
        toTerrain: Terrain.tuff,
      },
    ],
  },
  {
    output: 'Talus',
    name: 'apply talus terrain',
    terrainLevels: [
      {
        fromLevel: I2_MAX,
        toTerrain: Terrain.gravel,
      },
    ],
  },
  {
    output: 'Riverbank',
    name: 'apply riverbank terrain',
    terrainLevels: [
      {
        fromLevels: {
          lower: I2_MAX * 0.8,
          upper: I2_MAX,
        },
        toTerrain: Terrain.sand,
      },
    ],
    filterArgs: {
      on: {
        set: 'onlyOnTerrain',
        terrain: Terrain.grass,
      },
    },
  },
  {
    output: 'River',
    name: 'apply river terrain 1',
    terrainLevels: [
      {
        fromLevel: I2_MAX,
        toTerrain: Terrain.coarseDirt,
      },
    ],
    filterArgs: {
      on: {
        set: 'onlyOnTerrain',
        terrain: Terrain.grass,
      },
    },
  },
  {
    output: 'River',
    name: 'apply river terrain 2',
    terrainLevels: [
      {
        fromLevel: I2_MAX,
        toTerrain: Terrain.coarseDirt,
      },
    ],
    filterArgs: {
      on: {
        set: 'onlyOnTerrain',
        terrain: Terrain.sand,
      },
    },
  },
  {
    output: 'Snow',
    name: 'apply snow terrain',
    terrainLevels: [
      {
        fromLevel: I2_MAX,
        toTerrain: snowTerrainId,
      },
    ],
  },
  {
    output: 'Snow',
    name: 'apply frost layer',
    layer: getLayer('Frost'),
    layerLevels: [
      {
        fromLevels: { lower: 0, upper: I2_MAX - 1 },
        toLevel: 0,
      },
      {
        fromLevel: I2_MAX,
        toLevel: 1,
      },
    ],
  },
  {
    output: 'Biome1',
    name: 'apply biomes FoM',
    layer: getFileLayer('layers/Forest of Magic Combined.layer'),
    layerLevels: biomeLevels('red'),
  },
  {
    output: 'Biome1',
    name: 'apply biomes YF',
    layer: getFileLayer('layers/Youkai Forest Combined.layer'),
    layerLevels: biomeLevels('blue'),
  },
  {
    output: 'Biome1',
    name: 'apply biomes sunflowers',
    layer: getFileLayer('layers/Sunflowers.layer'),
    layerLevels: biomeLevels('green', true),
  },
  {
    output: 'Biome2',
    name: 'apply biomes BF',
    layer: getFileLayer('layers/Bamboo Forest.layer'),
    layerLevels: biomeLevels('red', true),
  },
  {
    output: 'Biome2',
    name: 'apply biomes random trees',
    layer: getFileLayer('layers/RandomTrees.layer'),
    layerLevels: biomeLevels('green'),
  },
])

world.setAllowCheats(true)
world.setCreateGoodiesChest(false)
//world.setGameType('CREATIVE')

saveWorld(world, `${extent}-${resolution}.world`)

print('Saved world')

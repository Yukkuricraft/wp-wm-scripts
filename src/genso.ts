import {
  applyHeightMapAsLayer,
  applyHeightMapToTerrain,
  createWorldFromHeightMap,
  getHeightMap,
  getLayer,
  getMapFormat,
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

type OutputType = 'Erosion deposit' | 'Erosion wear' | 'Heightmap' | 'Slope' | 'River' | 'Riverbank' | 'Snow' | 'Talus'

//// @ts-expect-error WP global
//const scriptDirLoc = scriptDir

function outputFile(outputType: OutputType): string {
  return `${wmOutput}/${extent}/${resolution}/${outputType} out.png`
}

declare function print(value: any): void

const heightmap = getHeightMap(outputFile('Heightmap'))

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

applyHeightMapToTerrain(heightmap, world, [
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
])

print('Applied heightmap terrain')

const slope = getHeightMap(outputFile('Slope'))

applyHeightMapToTerrain(slope, world, [
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
])

print('Applied slope terrain')

applyHeightMapToTerrain(getHeightMap(outputFile('Erosion deposit')), world, [
  {
    fromLevel: I2_MAX,
    toTerrain: Terrain.tuff,
  },
])

print('Applied erosion deposit terrain')

applyHeightMapToTerrain(getHeightMap(outputFile('Talus')), world, [
  {
    fromLevel: I2_MAX,
    toTerrain: Terrain.gravel,
  },
])

print('Applied talus terrain')

applyHeightMapToTerrain(
  getHeightMap(outputFile('Riverbank')),
  world,
  [
    {
      fromLevels: {
        lower: I2_MAX * 0.8,
        upper: I2_MAX,
      },
      toTerrain: Terrain.sand,
    },
  ],
  {
    filterArgs: {
      on: {
        set: 'onlyOnTerrain',
        terrain: Terrain.grass,
      },
    },
  },
)

print('Applied riverbank terrain')

const river = getHeightMap(outputFile('River'))

applyHeightMapToTerrain(
  river,
  world,
  [
    {
      fromLevel: I2_MAX,
      toTerrain: Terrain.coarseDirt,
    },
  ],
  {
    filterArgs: {
      on: {
        set: 'onlyOnTerrain',
        terrain: Terrain.grass,
      },
    },
  },
)

applyHeightMapToTerrain(
  river,
  world,
  [
    {
      fromLevel: I2_MAX,
      toTerrain: Terrain.coarseDirt,
    },
  ],
  {
    filterArgs: {
      on: {
        set: 'onlyOnTerrain',
        terrain: Terrain.sand,
      },
    },
  },
)

print('Applied river terrain')

const snow = getHeightMap(outputFile('Snow'))

applyHeightMapToTerrain(snow, world, [
  {
    fromLevel: I2_MAX,
    toTerrain: Terrain.deepSnow, // TODO: Make a custom terrain for snow eventually
  },
])

applyHeightMapAsLayer(snow, world, getLayer('Frost'), [
  {
    fromLevels: { lower: 0, upper: I2_MAX - 1 },
    toLevel: 0,
  },
  {
    fromLevel: I2_MAX,
    toLevel: 1,
  },
])

print('Applied snow terrain')

saveWorld(world, `${extent}-${resolution}.world`)

world.setAllowCheats(true)
world.setCreateGoodiesChest(false)
//world.setGameType('CREATIVE')

print('Saved world')

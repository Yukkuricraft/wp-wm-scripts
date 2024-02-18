// noinspection JSUnusedGlobalSymbols

import type { Terrain } from './constants'
import MapFormat = wp.MapFormat
import ApplyBaseWp = wp.ApplyBaseWp

export function loadWorld(file: string): wp.World {
  return wp.getWorld().fromFile(file).go()
}

export function saveWorld(world: wp.World, file: string) {
  wp.saveWorld(world).toFile(file).go()
}

export function exportWorld(world: wp.World, directory: string) {
  wp.exportWorld(world).toDirectory(directory).go()
}

export function getLayer(name: wp.StandardLayer): wp.Layer {
  return wp.getLayer().withName(name).go()
}

export function getFileLayer(file: string): wp.Layer {
  return wp.getLayer().fromFile(file).go()
}

export function getWorldLayer(world: wp.World, name: string): wp.Layer {
  return wp.getLayer().fromWorld(world).withName(name).go()
}

export function getTerrain(file: string): wp.Terrain {
  return wp.getTerrain().fromFile(file).go()
}

export function installCustomTerrain(terrain: wp.Terrain, world: wp.World, slot?: Terrain.Range<1, 97>): number {
  const t = wp.installCustomTerrain(terrain).toWorld(world)
  if (slot) {
    return t.inSlot(slot).go()
  } else {
    return t.go()
  }
}

export function getHeightMap(file: string, channel?: 'red' | 'green' | 'blue'): wp.HeightMap {
  const t = wp.getHeightMap().fromFile(file)
  switch (channel) {
    case 'red':
      return t.selectRedChannel().go()
    case 'green':
      return t.selectGreenChannel().go()
    case 'blue':
      return t.selectBlueChannel().go()
    case undefined:
      return t.go()
  }
}

export function getMapFormat(id: wp.MapFormatId): wp.MapFormat {
  return wp.getMapFormat().withId(id).go()
}

export function createWorldFromHeightMap(
  heightMap: wp.HeightMap,
  args?: {
    scale?: number
    shift?: {
      x: number
      y: number
    }
    levels?: {
      from: { lower: number; upper: number }
      to: { lower: number; upper: number }
    }
    waterLevel?: number
    mapFormat?: MapFormat
    lowerBuildLimit?: number
    upperBuildLimit?: number
  },
): wp.World {
  let t = wp.createWorld().fromHeightMap(heightMap)

  if (args?.scale) {
    t = t.scale(args.scale)
  }
  if (args?.shift) {
    t = t.shift(args.shift.x, args.shift.y)
  }
  if (args?.levels) {
    const { from, to } = args.levels
    t = t.fromLevels(from.lower, from.upper).toLevels(to.lower, to.upper)
  }
  if (args?.waterLevel) {
    t = t.withWaterLevel(args.waterLevel)
  }
  if (args?.mapFormat) {
    t = t.withMapFormat(args.mapFormat)
  }
  if (args?.lowerBuildLimit) {
    t = t.withLowerBuildLimit(args.lowerBuildLimit)
  }
  if (args?.upperBuildLimit) {
    t = t.withUpperBuildLimit(args.upperBuildLimit)
  }

  return t.go()
}

export interface HeightFilterArgs {
  height: {
    set: 'above' | 'below'
    level: number
    feather: boolean
  }
}

export interface DegreesFilterArgs {
  slope: {
    set: 'above' | 'below'
    degrees: number
  }
}

export interface OnlyExceptOnTerrain {
  set: 'exceptOnTerrain' | 'onlyOnTerrain'
  terrain: number
}

export interface OnlyExceptOnLayer {
  set: 'exceptOnLayer' | 'onlyOnLayer'
  layer: wp.Layer
}

export interface OnlyExceptOnBiome {
  set: 'exceptOnBiome' | 'onlyOnBiome'
  biome: number
}

export interface OnlyExceptOnAutoBiome {
  set: 'exceptOnAutoBiome' | 'onlyOnAutoBiome'
  autoBiome?: number
}

export interface OnlyExceptOnWater {
  set: 'exceptOnWater' | 'onlyOnWater'
}

export interface OnlyExceptOnLand {
  set: 'exceptOnLand' | 'onlyOnLand'
}

export interface OnlyExceptOnFilterArgs {
  on:
    | OnlyExceptOnTerrain
    | OnlyExceptOnLayer
    | OnlyExceptOnBiome
    | OnlyExceptOnAutoBiome
    | OnlyExceptOnWater
    | OnlyExceptOnLand
}

export type FilterArgs = HeightFilterArgs | DegreesFilterArgs | OnlyExceptOnFilterArgs

export interface Range {
  lower: number
  upper: number
}

export interface FromSingleLayerLevel {
  fromLevel: number
  toLevel: number
}

export interface FromRangeLayerLevelBase {
  fromLevels: Range
}

export interface FromRangeToSingleLayerLevel extends FromRangeLayerLevelBase {
  toLevel: number
}

export interface FromRangeToRangeLayerLevel extends FromRangeLayerLevelBase {
  toLevels: Range
}

export interface FromColorToSingleLayerLevel {
  fromColor: {
    red: number
    green: number
    blue: number
    alpha?: number
  }
  toLevel: number
}

export type HeightmapAsLayerLevel =
  | FromSingleLayerLevel
  | FromRangeToSingleLayerLevel
  | FromRangeToRangeLayerLevel
  | FromColorToSingleLayerLevel

export type ApplyTo = 'surface' | 'nether' | 'end' | 'surfaceCeiling' | 'netherCeiling' | 'endCeiling'

function applyCommon<Res extends ApplyBaseWp<Res>>(
  makeWp: () => Res & wp.ApplyBaseWp<Res>,
  args?: {
    filter?: wp.Filter
    filterArgs?: FilterArgs
    applyTo?: ApplyTo
  },
) {
  let filter: wp.Filter | null = null
  if (args?.filter && !args.filterArgs) {
    filter = args.filter
  }
  if (args?.filterArgs) {
    filter = createFilter(args.filterArgs)
  }
  let t = makeWp()

  if (filter) {
    t = t.withFilter(filter)
  }

  if (args?.applyTo) {
    switch (args.applyTo) {
      case 'surface':
        t = t.applyToSurface()
        break
      case 'nether':
        t = t.applyToNether()
        break
      case 'end':
        t = t.applyToEnd()
        break
      case 'surfaceCeiling':
        t = t.applyToSurfaceCeiling()
        break
      case 'netherCeiling':
        t = t.applyToNetherCeiling()
        break
      case 'endCeiling':
        t = t.applyToEndCeiling()
        break
    }
  }

  return t
}

function applyHeightMapCommon(
  heightMap: wp.HeightMap,
  world: wp.World,
  args?: {
    filter?: wp.Filter
    filterArgs?: FilterArgs
    applyTo?: ApplyTo
    scale?: number
    shift?: {
      x: number
      y: number
    }
    set?: 'always' | 'whenLower' | 'whenHigher'
  },
): wp.ApplyHeightMap2Wp {
  let t = applyCommon(() => wp.applyHeightMap(heightMap).toWorld(world), args)

  if (args?.scale) {
    t = t.scale(args.scale)
  }
  if (args?.shift) {
    t = t.shift(args.shift.x, args.shift.y)
  }

  return t
}

export function applyHeightMapAsLayer(
  heightMap: wp.HeightMap,
  world: wp.World,
  layer: wp.Layer,
  levels: HeightmapAsLayerLevel[],
  args?: {
    filter?: wp.Filter
    filterArgs?: FilterArgs
    applyTo?: ApplyTo
    scale?: number
    shift?: {
      x: number
      y: number
    }
    set?: 'always' | 'whenLower' | 'whenHigher'
  },
) {
  function applyLevel(t: wp.ApplyHeightMapLayersLevelsWp, level: HeightmapAsLayerLevel): wp.ApplyHeightMapLayers2Wp {
    if ('fromLevel' in level) {
      return t.fromLevel(level.fromLevel).toLevel(level.toLevel)
    } else if ('fromLevels' in level) {
      const from = level.fromLevels
      if ('toLevels' in level) {
        return t.fromLevels(from.lower, from.upper).toLevels(level.toLevels.lower, level.toLevels.upper)
      } else {
        return t.fromLevels(from.lower, from.upper).toLevel(level.toLevel)
      }
    } else {
      const { red, green, blue } = level.fromColor
      if (level.fromColor.alpha) {
        return t.fromColour(level.fromColor.alpha, red, green, blue).toLevel(level.toLevel)
      } else {
        return t.fromColour(red, green, blue).toLevel(level.toLevel)
      }
    }
  }

  const levelsArr = [...levels]
  const t1 = applyHeightMapCommon(heightMap, world, args)
  const t2 = applyLevel(t1.applyToLayer(layer), levelsArr.shift() as HeightmapAsLayerLevel)
  const t3 = levelsArr.reduce((acc, level) => applyLevel(acc, level), t2)

  if (args?.set) {
    switch (args.set) {
      case 'always':
        return t3.setAlways().go()
      case 'whenLower':
        return t3.setWhenLower().go()
      case 'whenHigher':
        return t3.setWhenHigher().go()
    }
  }

  return t3.go()
}

export interface FromSingleTerrainLevel {
  fromLevel: number
  toTerrain: number
}

export interface FromRangeTerrainLevel {
  fromLevels: Range
  toTerrain: number
}

export interface FromColorTerrainLevel {
  fromColor: {
    red: number
    green: number
    blue: number
    alpha?: number
  }
  toTerrain: number
}

export type HeightmapAsTerrainLevel = FromSingleTerrainLevel | FromRangeTerrainLevel | FromColorTerrainLevel

export function applyHeightMapToTerrain(
  heightMap: wp.HeightMap,
  world: wp.World,
  levels: HeightmapAsTerrainLevel[],
  args?: {
    filter?: wp.Filter
    filterArgs?: FilterArgs
    applyTo?: ApplyTo
    scale?: number
    shift?: {
      x: number
      y: number
    }
  },
) {
  function applyLevel(
    t: wp.ApplyHeightMapTerrainLevelsWp,
    level: HeightmapAsTerrainLevel,
  ): wp.ApplyHeightMapTerrainLevelsWp & wp.WpGo<void> {
    if ('fromLevel' in level) {
      return t.fromLevel(level.fromLevel).toTerrain(level.toTerrain)
    } else if ('fromLevels' in level) {
      const from = level.fromLevels
      return t.fromLevels(from.lower, from.upper).toTerrain(level.toTerrain)
    } else {
      const { red, green, blue } = level.fromColor
      if (level.fromColor.alpha) {
        return t.fromColour(level.fromColor.alpha, red, green, blue).toTerrain(level.toTerrain)
      } else {
        return t.fromColour(red, green, blue).toTerrain(level.toTerrain)
      }
    }
  }

  const levelsArr = [...levels]
  const t1 = applyHeightMapCommon(heightMap, world, args).applyToTerrain()
  const t2 = applyLevel(t1, levelsArr.shift() as HeightmapAsTerrainLevel)
  const t3 = levelsArr.reduce((acc, level) => applyLevel(acc, level), t2)

  return t3.go()
}

export function applyLayer(
  world: wp.World,
  layer: wp.Layer,
  args?: {
    level: number
    filter?: wp.Filter
    filterArgs?: FilterArgs
    applyTo?: ApplyTo
    set?: 'always' | 'whenLower' | 'whenHigher'
  },
) {
  let t = applyCommon(() => wp.applyLayer(layer).toWorld(world), args)
  if (args?.level) {
    t = t.toLevel(args.level)
  }

  if (args?.set) {
    switch (args.set) {
      case 'always':
        return t.setAlways().go()
      case 'whenLower':
        return t.setWhenLower().go()
      case 'whenHigher':
        return t.setWhenHigher().go()
    }
  }

  return t.go()
}

export function applyTerrain(
  world: wp.World,
  terrain: number,
  args?: {
    filter?: wp.Filter
    filterArgs?: FilterArgs
    applyTo?: ApplyTo
  },
) {
  return applyCommon(() => wp.applyTerrain(terrain).toWorld(world), args).go()
}

export function createFilter(args: FilterArgs): wp.Filter {
  let t = wp.createFilter()

  if ('height' in args) {
    switch (args.height.set) {
      case 'above':
        t = t.aboveLevel(args.height.level)
        break
      case 'below':
        t = t.belowLevel(args.height.level)
        break
    }
    if (args.height.feather) {
      t = t.feather()
    }
  }

  if ('slope' in args) {
    switch (args.slope.set) {
      case 'above':
        t = t.aboveDegrees(args.slope.degrees)
        break
      case 'below':
        t = t.belowDegrees(args.slope.degrees)
        break
    }
  }

  if ('on' in args) {
    switch (args.on.set) {
      case 'exceptOnTerrain':
        t = t.exceptOnTerrain(args.on.terrain)
        break
      case 'onlyOnTerrain':
        t = t.onlyOnTerrain(args.on.terrain)
        break
      case 'exceptOnLayer':
        t = t.exceptOnLayer(args.on.layer)
        break
      case 'onlyOnLayer':
        t = t.onlyOnLayer(args.on.layer)
        break
      case 'exceptOnBiome':
        t = t.exceptOnBiome(args.on.biome)
        break
      case 'onlyOnBiome':
        t = t.onlyOnBiome(args.on.biome)
        break
      case 'exceptOnAutoBiome':
        if (args.on.autoBiome) {
          t = t.exceptOnAutoBiome(args.on.autoBiome)
        } else {
          t = t.exceptOnAutoBiomes()
        }
        break
      case 'onlyOnAutoBiome':
        if (args.on.autoBiome) {
          t = t.onlyOnAutoBiome(args.on.autoBiome)
        } else {
          t = t.onlyOnAutoBiomes()
        }
        break
      case 'exceptOnWater':
        t = t.exceptOnWater()
        break
      case 'onlyOnWater':
        t = t.onlyOnWater()
        break
      case 'exceptOnLand':
        t = t.exceptOnLand()
        break
      case 'onlyOnLand':
        t = t.onlyOnLand()
        break
    }
  }

  return t.go()
}

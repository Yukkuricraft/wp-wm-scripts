declare namespace wp {
  // TODO
  type StandardLayer = 'Frost' | 'Void'
  type MapFormatId =
    | 'org.pepsoft.mcregion'
    | 'org.pepsoft.anvil'
    | 'org.pepsoft.anvil.1.13'
    | 'org.pepsoft.anvil.1.17'
    | 'org.pepsoft.anvil.1.18'
    | 'org.pepsoft.anvil.1.19'

  interface Point {
    x: number
    y: number
  }

  interface Rectangle {}

  // org.pepsoft.worldpainter.layers.Layer
  interface Layer {
    getName(): string
    setName(name: string): void

    getDescription(): string
    setDescription(description: string): void

    getId(): string
  }

  // org.pepsoft.worldpainter.Tile
  // eslint-disable-next-line no-use-before-define
  interface Tile extends TileProvider {
    getX(): number
    getY(): number
    getMinHeight(): number
    getMaxHeight(): number

    getSlope(x: number, y: number): number
    getWaterLevel(x: number, y: number): number
    setWaterLevel(x: number, y: number, level: number): void

    getLayers(): Layer[]
    hasLayer(layer: Layer): boolean
    getActiveLayers(x: number, y: number): Layer[]

    getLayers(additionalLayers: Layer[]): Layer[]

    getBitLayerValue(layer: Layer, x: number, y: number): boolean
    getBitLayerCount(layer: Layer, x: number, y: number, r: number): number

    getLayersAt(x: number, y: number): any

    getFloodedCount(x: number, y: number, r: number, lava: boolean): number

    getDistanceToEdge(layer: Layer, x: number, y: number, maxDistance: number): number

    setBitLayerValue(layer: Layer, x: number, y: number, value: boolean)

    getLayerValueAt(layer: Layer, x: number, y: number): number
    setLayerValueAt(layer: Layer, x: number, y: number, value: number): void
  }

  // org.pepsoft.worldpainter.TileProvider
  interface TileProvider {
    getExtent(): Rectangle
    isTilePresent(x: number, y: number): boolean
    getTile(x: number, y: number): Tile
  }

  // org.pepsoft.worldpainter.Dimension.Anchor
  interface Anchor {
    dim: number
    role: any
    invert: boolean
    id: number
  }

  // org.pepsoft.worldpainter.Dimension.Border
  interface Border {
    isEndless(): boolean
  }

  interface WallType {}

  // org.pepsoft.worldpainter.Dimension
  interface Dimension extends TileProvider {
    // eslint-disable-next-line no-use-before-define
    getWorld(): World
    // eslint-disable-next-line no-use-before-define
    setWorld(world: World): void

    getAnchor(): Anchor
    setAnchor(anchor: Anchor): void

    getId(): any

    getName(): string
    setName(name: string): void

    getSeed(): number

    isPopulate(): boolean
    setPopulate(populate: boolean): void

    getBorder(): Border
    setBorder(border: Border): void

    getBorderLevel(): number
    setBorderLevel(level: number): void

    getBorderSize(): number
    setBorderSize(size: number): void

    isBorderTile(x: number, y: number): boolean
    getTile(coords: Point): Tile

    getTileForEditing(x: number, y: number): Tile
    getTileForEditing(coords: Point): Tile

    getTileCount(): number

    getTiles(): Tile[]
    getTileCoords(): Point[]

    getHighestX(): number
    getHighestY(): number
    getLowestX(): number
    getLowestY(): number

    getWidth(): number
    getHeight(): number

    getSlope(x: number, y: number): number

    getWaterLevelAt(coords: Point): number
    getWaterLevelAt(x: number, y: number): number
    setWaterLevelAt(x: number, y: number, waterLevel: number): void

    getLayerValueAt(layer: Layer, coords: Point): number
    getLayerValueAt(layer: Layer, x: number, y: number): number
    setLayerValueAt(layer: Layer, x: number, y: number, value: number): void

    getBitLayerValueAt(layer: Layer, x: number, y: number): boolean

    getBitLayerCount(layer: Layer, x: number, y: number, r: number): number

    getLayersAt(x: number, y: number): any

    getFloodedCount(x: number, y: number, r: number, lava: boolean): number

    getDistanceToEdge(layer: Layer, x: number, y: number, maxDistance: number): number

    setBitLayerValueAt(layer: Layer, x: number, y: number, value: boolean)

    clearLayerData(layer: Layer)
    clearLayerData(x: number, y: number, excludedLayers: Layer[])

    getMinecraftSeed(): number
    setMinecraftSeed(seed: number): void

    getMinHeight(): number
    setMinHeight(height: number): void

    getMaxHeight(): number
    getMaxHeight(height: number): void

    isBottomless(): boolean
    setBottomless(bottomless: boolean): void

    isCoverSteepTerrain(): boolean
    setCoverSteepTerrain(cover: boolean): void

    getCustomLayers(applyCombinedLayers?: boolean): Layer[]
    setCustomLayers(layers: Layer[]): void

    getAllLayers(applyCombinedLayers: boolean): Layer[]

    getCeilingHeight(): number
    setCeilingHeight(height: number): void

    getWallType(): WallType
    setWallType(wall: WallType): void

    getRoofType(): WallType
    setRoofType(roof: WallType): void

    getScale(): number
    setScale(scale: number): void

    getAutoBiome(x: number, y: number, defaultBiome?: number): number
    getAutoBiome(tile: Tile, x: number, y: number, defaultBiome?: number): number

    getTopLayerDepth(x: number, y: number)

    containsOfOf(...layer: Layer): boolean

    getMostPrevelantBiome(x: number, y: number, defaultBiome: number): number
  }

  interface File {}

  // org.pepsoft.worldpainter.MixedMaterial
  interface Terrain {
    getId(): any
    getName(): string
    getBiome(): number
    getScale(): number
    getColour(): any
    getVariation(): any
    isRepeated(): boolean
    getLayerXSlope(): number
    getLayerYSlope(): number
    getPatternHeight(): number
  }

  // org.pepsoft.worldpainter.Platform
  interface MapFormat {
    displayName: string

    minMaxHeight: number
    maxMaxHeight: number
    standardMaxHeight: number

    minMinHeight: number
    maxMinHeight: number
    standardMinHeight: number

    minX: number
    maxX: number
    minY: number
    maxY: number
    minZ: number
    maxZ: number

    supportedGameTypes: any[]
    supportedGenerators: any[]
    supportedDimensions: any[]
    capabilities: any[]
    maxHeights: number[]
    minHeights: number[]
  }

  // org.pepsoft.worldpainter.World2
  interface World {
    getName(): string
    setName(name: string): void

    isCreateGoodiesChest(): boolean
    setCreateGoodiesChest(create: boolean): void

    getTileCoordinates(worldX: number, worldY: number): Point
    getTileCoordinates(worldCoords: Point): Point

    getSpawnPoint(): Point
    setSpawnPoint(spawn: Point): void

    getImportedFrom(): File
    setImportedFrom(file: File): void

    isMapFeatures(): boolean
    setMapFeatures(features: boolean): void

    getGameType(): any
    setGameType(tpe: any): void

    isDimensionPresent(anchor: Anchor): boolean
    getDimension(anchor: Anchor): Dimension
    getDimensions(): Dimension[]
    addDimension(dim: Dimension): void
    removeDimension(anchor: Anchor): void

    getMixedMaterial(idx: number): Terrain
    setMixedMaterial(idx: number, terrain: Terrain): void

    getMinHeight(): number
    setMinHeight(height: number): void

    getMaxHeight(): number
    setMaxHeight(height: number): void

    getPlatform(): MapFormat
    setPlatform(format: MapFormat): void

    isAllowCheats(): boolean
    setAllowCheats(cheats: boolean): void

    getDifficulty(): number
    setDifficulty(diff: number): void
  }

  interface HeightMap extends World {}

  // org.pepsoft.worldpainter.operations.Filter
  interface Filter {
    and(filter: Filter): Filter
  }

  interface WpGo<T> {
    go(): T
  }

  interface WpLoadable<T> {
    fromFile(file: string): WpGo<T>
  }

  interface LoadWorldWp extends WpLoadable<World> {}

  interface SaveWorldWp {
    toFile(file: string): WpGo<void>
  }

  interface ExportWorldWp {
    toDirectory(directory: string): WpGo<void>
  }

  interface GetLayerWp<AllowAnyLayer> extends WpLoadable<Layer> {
    withName(name: AllowAnyLayer extends true ? string : StandardLayer): WpGo<Layer>

    fromWorld(world: World): GetLayerWp<true>
  }

  interface GetTerrainWp extends WpLoadable<Terrain> {}

  interface InstallCustomTerrainWp {
    toWorld(world: World): InstallCustomTerrainWp & WpGo<number>

    inSlot(idx: number): InstallCustomTerrainWp & WpGo<number>
  }

  interface GetHeightMapWp<HasFile> {
    fromFile(file: string): GetHeightMapWp<true> & WpGo<HeightMap>
    selectRedChannel(): HasFile extends true ? WpGo<HeightMap> : GetHeightMapWp<false>
    selectGreenChannel(): HasFile extends true ? WpGo<HeightMap> : GetHeightMapWp<false>
    selectBlueChannel(): HasFile extends true ? WpGo<HeightMap> : GetHeightMapWp<false>
  }

  interface GetMapFormatWp {
    withId(id: MapFormatId): WpGo<MapFormat>
  }

  interface CreateWorldWp extends WpGo<World> {
    fromHeightMap(heightMap: HeightMap): CreateWorldWp
    scale(scale: number): CreateWorldWp
    shift(x: number, y: number): CreateWorldWp
    fromLevels(
      lower: number,
      upper: number,
    ): {
      toLevels(lower: number, upper: number): CreateWorldWp
    }
    withWaterLevel(height: number): CreateWorldWp
    withMapFormat(mapFormat: MapFormat): CreateWorldWp
    withLowerBuildLimit(limit: number): CreateWorldWp
    withUpperBuildLimit(limit: number): CreateWorldWp
  }

  // eslint-disable-next-line no-use-before-define
  interface ApplyHeightMapLayers2Wp extends ApplyHeightMapLayersLevelsWp, WpGo<void> {
    setAlways(): WpGo<void>
    setWhenLower(): WpGo<void>
    setWhenHigher(): WpGo<void>
  }

  interface ApplyHeightMapLayersLevelsWp {
    fromLevel(value: number): {
      toLevel(value: number): ApplyHeightMapLayers2Wp
    }
    fromLevels(
      lower: number,
      upper: number,
    ): {
      toLevel(value: number): ApplyHeightMapLayers2Wp
      toLevels(lower: number, upper: number): ApplyHeightMapLayers2Wp
    }
    fromColour(
      red: number,
      green: number,
      blue: number,
    ): {
      toLevel(value: number): ApplyHeightMapLayers2Wp
    }
    fromColour(
      alpha: number,
      red: number,
      green: number,
      blue: number,
    ): {
      toLevel(value: number): ApplyHeightMapLayers2Wp
    }
  }

  interface ApplyHeightMapTerrainLevelsWp {
    fromLevel(value: number): {
      toTerrain(value: number): ApplyHeightMapTerrainLevelsWp & WpGo<void>
    }
    fromLevels(
      lower: number,
      upper: number,
    ): {
      toTerrain(value: number): ApplyHeightMapTerrainLevelsWp & WpGo<void>
    }
    fromColour(
      red: number,
      green: number,
      blue: number,
    ): {
      toTerrain(value: number): ApplyHeightMapTerrainLevelsWp & WpGo<void>
    }
    fromColour(
      alpha: number,
      red: number,
      green: number,
      blue: number,
    ): {
      toTerrain(value: number): ApplyHeightMapTerrainLevelsWp & WpGo<void>
    }
  }

  interface ApplyBaseWp<Res extends ApplyBaseWp<Res>> {
    withFilter(filter: Filter): Res

    applyToSurface(): Res
    applyToNether(): Res
    applyToEnd(): Res

    applyToSurfaceCeiling(): Res
    applyToNetherCeiling(): Res
    applyToEndCeiling(): Res
  }

  interface ApplyHeightMap2Wp extends ApplyBaseWp<ApplyHeightMap2Wp> {
    scale(scale: number): ApplyHeightMap2Wp
    shift(x: number, y: number): ApplyHeightMap2Wp

    applyToLayer(layer: Layer): ApplyHeightMapLayersLevelsWp
    applyToTerrain(): ApplyHeightMapTerrainLevelsWp

    setAlways(): WpGo<void>
    setWhenLower(): WpGo<void>
    setWhenHigher(): WpGo<void>
  }

  interface ApplyHeightMap1Wp {
    toWorld(world: World): ApplyHeightMap2Wp
  }

  interface ApplyLayer2Wp extends WpGo<void>, ApplyBaseWp<ApplyLayer2Wp> {
    toLevel(level: number): ApplyLayer2Wp

    scale(scale: number): ApplyLayer2Wp
    shift(x: number, y: number): ApplyLayer2Wp

    setAlways(): WpGo<void>
    setWhenLower(): WpGo<void>
    setWhenHigher(): WpGo<void>
  }

  interface ApplyLayer1Wp {
    toWorld(world: World): ApplyLayer2Wp
  }

  interface ApplyTerrain2Wp extends WpGo<void>, ApplyBaseWp<ApplyTerrain2Wp> {}

  interface ApplyTerrain1Wp {
    toWorld(world: World): WpGo<void> & ApplyBaseWp<ApplyTerrain2Wp>
  }

  interface CreateFilterWp extends WpGo<Filter> {
    aboveLevel(level: number): CreateFilterWp
    belowLevel(level: number): CreateFilterWp
    feather(): CreateFilterWp

    aboveDegrees(degrees: number): CreateFilterWp
    belowDegrees(degrees: number): CreateFilterWp

    onlyOnTerrain(terrain: number): CreateFilterWp
    onlyOnLayer(layer: Layer): CreateFilterWp
    onlyOnBiome(biome: number): CreateFilterWp
    onlyOnAutoBiome(biome: number): CreateFilterWp
    onlyOnAutoBiomes(): CreateFilterWp
    onlyOnWater(): CreateFilterWp
    onlyOnLand(): CreateFilterWp

    exceptOnTerrain(terrain: number): CreateFilterWp
    exceptOnLayer(layer: Layer): CreateFilterWp
    exceptOnBiome(biome: number): CreateFilterWp
    exceptOnAutoBiome(biome: number): CreateFilterWp
    exceptOnAutoBiomes(): CreateFilterWp
    exceptOnWater(): CreateFilterWp
    exceptOnLand(): CreateFilterWp
  }

  function getWorld(): LoadWorldWp

  function saveWorld(world: World): SaveWorldWp

  function exportWorld(world: World): ExportWorldWp

  function getLayer(): GetLayerWp<false>

  function getTerrain(): GetTerrainWp

  function installCustomTerrain(terrain: Terrain): InstallCustomTerrainWp

  function getHeightMap(): GetHeightMapWp<false>

  function getMapFormat(): GetMapFormatWp

  function createWorld(): CreateWorldWp

  function applyHeightMap(heightMap: HeightMap): ApplyHeightMap1Wp

  function applyLayer(layer: Layer): ApplyLayer1Wp

  function applyTerrain(terrain: number): ApplyTerrain1Wp

  function createFilter(): CreateFilterWp
}

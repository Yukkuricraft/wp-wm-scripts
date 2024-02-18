// noinspection JSUnusedGlobalSymbols

export namespace Annotation {
  export const none = 0
  export const white = 1
  export const orange = 2
  export const magenta = 3
  export const lightBlue = 4
  export const yellow = 5
  export const lime = 6
  export const pink = 7
  export const lightGray = 8
  export const cyan = 9
  export const purple = 10
  export const blue = 11
  export const brown = 12
  export const green = 13
  export const red = 14
  export const black = 15
}

export namespace Terrain {
  /** grass with flowers, tall grass and ferns here and there, and seagrass and kelp under water */
  export const grass = 0

  /** no vegetation */
  export const bareGrass = 1
  export const dirt = 2

  /** dirt on which no grass will grow */
  export const coarseDirt = 3
  export const podzol = 4
  export const sand = 5
  export const RedSand = 6

  /** dead shrubs and cacti */
  export const desert = 7

  /** dead shrubs and cacti */
  export const redDesert = 8

  /** layers of hardened and stained clay */
  export const mesa = 9
  export const terracotta = 10

  export namespace StainedTerracotta {
    export const white = 11
    export const orange = 12
    export const magenta = 13
    export const lightBlue = 14
    export const yellow = 15
    export const lime = 16
    export const pink = 17
    export const grey = 18
    export const lightGrey = 19
    export const cyan = 20
    export const purple = 21
    export const blue = 22
    export const brown = 23
    export const green = 24
    export const red = 25
    export const black = 26
  }

  export const sandstone = 27
  export const stone = 28

  /** stone and cobblestone */
  export const Rock = 29
  export const cobblestone = 30
  export const mossyCobblestone = 31
  export const obsidian = 32
  export const bedrock = 33
  export const gravel = 34
  export const clay = 35

  /** grass, sand, gravel and clay with sugar cane here and there, and seagrass and kelp under water */
  export const beaches = 36
  export const water = 37
  export const lava = 38
  export const deepSnow = 40
  export const netherrack = 41
  export const soulSand = 42

  /** netherrack with pockets of soul sand and glowstone and patches of fire */
  export const netherlike = 43
  export const mycelium = 44
  export const endStone = 45
  export const redSandstone = 71
  export const granite = 72
  export const diorite = 73
  export const andesite = 74

  /** stone or deepslate with patches of granite, diorite, andesite and tuff */
  export const StoneMix = 75

  export const dirtPath = 100
  export const magma = 101

  export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

  export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

  export function custom(slot: Range<1, 97>): number {
    switch (slot) {
      case 1:
        return 47
      case 2:
        return 48
      case 3:
        return 49
      case 4:
        return 50
      case 5:
        return 51
      case 6:
        return 52
      case 7:
        return 53
      case 8:
        return 54
      case 9:
        return 55
      case 10:
        return 56
      case 11:
        return 57
      case 12:
        return 58
      case 13:
        return 59
      case 14:
        return 60
      case 15:
        return 61
      case 16:
        return 62
      case 17:
        return 63
      case 18:
        return 64
      case 19:
        return 65
      case 20:
        return 66
      case 21:
        return 67
      case 22:
        return 68
      case 23:
        return 69
      case 24:
        return 70
      case 25:
        return 76
      case 26:
        return 77
      case 27:
        return 78
      case 28:
        return 79
      case 29:
        return 80
      case 30:
        return 81
      case 31:
        return 82
      case 32:
        return 83
      case 33:
        return 84
      case 34:
        return 85
      case 35:
        return 86
      case 36:
        return 87
      case 37:
        return 88
      case 38:
        return 89
      case 39:
        return 90
      case 40:
        return 91
      case 41:
        return 92
      case 42:
        return 93
      case 43:
        return 94
      case 44:
        return 95
      case 45:
        return 96
      case 46:
        return 97
      case 47:
        return 98
      case 48:
        return 99
      case 49:
        return 102
      case 50:
        return 103
      case 51:
        return 104
      case 52:
        return 105
      case 53:
        return 106
      case 54:
        return 107
      case 55:
        return 108
      case 56:
        return 109
      case 57:
        return 110
      case 58:
        return 111
      case 59:
        return 112
      case 60:
        return 113
      case 61:
        return 114
      case 62:
        return 115
      case 63:
        return 116
      case 64:
        return 117
      case 65:
        return 118
      case 66:
        return 119
      case 67:
        return 120
      case 68:
        return 121
      case 69:
        return 122
      case 70:
        return 123
      case 71:
        return 124
      case 72:
        return 125
      case 73:
        return 126
      case 74:
        return 127
      case 75:
        return 128
      case 76:
        return 129
      case 77:
        return 130
      case 78:
        return 131
      case 79:
        return 132
      case 80:
        return 133
      case 81:
        return 134
      case 82:
        return 135
      case 83:
        return 136
      case 84:
        return 137
      case 85:
        return 138
      case 86:
        return 139
      case 87:
        return 140
      case 88:
        return 141
      case 89:
        return 142
      case 90:
        return 143
      case 91:
        return 144
      case 92:
        return 145
      case 93:
        return 146
      case 94:
        return 147
      case 95:
        return 148
      case 96:
        return 149
    }
  }

  export const deepslate = 150
  export const tuff = 151
  export const basalt = 152
  export const blackstone = 153
  export const soulSoil = 154
  export const warpedNylium = 155
  export const crimsonNylium = 156
  export const calcite = 157
  export const mud = 158

  /** same as Beaches but without any other plants above or below the water */
  export const bareBeaches = 159
  export const moss = 160
}

import { Config } from './types'

export type Vars = {
  relayToken: string
}

export default {
  polkadot: {
    name: 'astar' as const,
    endpoint: 'wss://astar-rpc.dwellir.com',
    relayToken: '340282366920938463463374607431768211455',
  },
  kusama: {
    name: 'shiden' as const,
    endpoint: 'wss://shiden-rpc.dwellir.com',
    relayToken: '340282366920938463463374607431768211455',
  },
  config: (opt) => ({
    storages: {
      System: {
        account: [[[opt.alice.address], { data: { free: 10 * 1e12 } }]],
      },
      Assets: {
        account: [[[opt.relayToken, opt.alice.address], { balance: 10 * 1e12 }]],
      },
      Sudo: {
        key: opt.alice.address,
      },
      PolkadotXcm: {
        // avoid sending xcm version change notifications to makes things faster
        $removePrefix: ['versionNotifyTargets', 'versionNotifiers', 'supportedVersion'],
      },
    },
    options: {
      wasmOverride: {
        polkadot: './wasm/astar-55.wasm',
        kusama: './wasm/shiden-93.wasm',
      }[opt.network],
    },
  }),
} satisfies Config<Vars>

export const astar = {
  paraId: 2006,
  paraAccount: '13YMK2eZzuFY1WZGagpYtTgbWBWGdoUD2CtrPj1mQPjY8Ldc',
  dot: 340282366920938463463374607431768211455n,
  astr: { Concrete: { parents: 0, interior: 'Here' } },
  aca: { parents: 1, interior: { X2: [{ Parachain: 2000 }, { GeneralKey: 0x0000 }] } },
  usdt: { parents: 1, interior: { X3: [{ Parachain: 1000 }, { PalletInstance: 50 }, { GeneralIndex: 1984 }] } },
} as const

export const shiden = {
  paraId: 2007,
  paraAccount: 'F7fq1jNy74AqkJ1DP4KqSrWtnTGtXfNVoDwFhTvvPxUvJaq',
  ksm: 340282366920938463463374607431768211455n,
  sdn: { Concrete: { parents: 0, interior: 'Here' } },
  kar: { parents: 1, interior: { X2: [{ Parachain: 2000 }, { GeneralKey: 0x0000 }] } },
  usdt: { parents: 1, interior: { X3: [{ Parachain: 1000 }, { PalletInstance: 50 }, { GeneralIndex: 1984 }] } },
} as const

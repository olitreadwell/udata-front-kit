import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import { ResolvedFactor } from '@/model/topic'
import {
  NO_GROUP,
  isOnlyNoGroup,
  useFactorsFilter,
  useGroups
} from '@/utils/topicGroups'

const siteId = 'siteId'

const makeFactor = (
  id: string,
  title: string,
  group?: string,
  description: string | null = null
): ResolvedFactor =>
  new ResolvedFactor(
    {
      id,
      title,
      description,
      tags: [],
      extras: {
        [siteId]: { uri: null, availability: 'available', group }
      },
      element: { class: 'Dataset', id: `el-${id}` }
    },
    siteId
  )

describe('isOnlyNoGroup', () => {
  it('is true only when the "no group" group is the only one', () => {
    expect(isOnlyNoGroup(new Map([[NO_GROUP, []]]))).toBe(true)
    expect(isOnlyNoGroup(new Map([['A', []]]))).toBe(false)
    expect(
      isOnlyNoGroup(
        new Map([
          ['A', []],
          [NO_GROUP, []]
        ])
      )
    ).toBe(false)
  })
})

describe('useGroups', () => {
  it('groups factors by siteExtras.group, ungrouped last, sorted', () => {
    const factors = ref([
      makeFactor('b', 'B', 'gamma'),
      makeFactor('a', 'A', 'alpha'),
      makeFactor('m', 'M', 'alpha'),
      makeFactor('c', 'C')
    ])
    const grouped = useGroups(factors).groupedFactors.value
    expect(Array.from(grouped.keys())).toEqual(['alpha', 'gamma', NO_GROUP])
    expect(grouped.get('alpha')?.map((f) => f.title)).toEqual(['A', 'M'])
    expect(grouped.get('gamma')?.map((f) => f.title)).toEqual(['B'])
    expect(grouped.get(NO_GROUP)?.map((f) => f.title)).toEqual(['C'])
  })

  it('treats an empty group string as the "no group" group', () => {
    const { groupedFactors } = useGroups(ref([makeFactor('1', 'A', '')]))
    expect(groupedFactors.value.get(NO_GROUP)?.map((f) => f.id)).toEqual(['1'])
  })

  it('renameGroup moves factors and clearing means "no group"', () => {
    const factors = ref([
      makeFactor('a', 'A', 'alpha'),
      makeFactor('c', 'C', 'beta')
    ])
    const renamed = useGroups(factors).renameGroup('alpha', 'gamma')
    expect(renamed.factors.map((f) => f.siteExtras.group)).toEqual([
      'gamma',
      'beta'
    ])
    expect(renamed.changedFactors.map((f) => f.id)).toEqual(['a'])

    const cleared = useGroups(factors).renameGroup('gamma', NO_GROUP)
    expect(cleared.factors[0].siteExtras.group).toBeUndefined()
  })

  it('deleteGroup removes every factor of the group', () => {
    const factors = ref([
      makeFactor('a', 'A', 'alpha'),
      makeFactor('b', 'B', 'alpha'),
      makeFactor('c', 'C', 'beta')
    ])
    const res = useGroups(factors).deleteGroup('alpha')
    expect(res.kept ?? res.factors.map((f) => f.id)).toEqual(['c'])
    expect(res.deletedFactors.map((f) => f.id)).toEqual(['a', 'b'])
  })
})

describe('useFactorsFilter', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  const setup = (factors: ResolvedFactor[]) => {
    const { filteredFactors, filterFactors, isGroupOnlyHidden } =
      useFactorsFilter(ref(factors))
    return { filteredFactors, filterFactors, isGroupOnlyHidden }
  }

  it('keeps every factor visible with no query', () => {
    const { filteredFactors } = setup([
      makeFactor('a', 'Alpha', 'alpha'),
      makeFactor('b', 'Beta', 'beta')
    ])
    expect(filteredFactors.value.every((f) => !f.isHidden)).toBe(true)
  })

  it('filters by title and description and restores on clear', async () => {
    const withDesc = makeFactor('a', 'Alpha', 'alpha')
    withDesc.description = 'searchable data here'
    const { filteredFactors, filterFactors } = setup([
      withDesc,
      makeFactor('b', 'Beta', 'beta')
    ])
    filterFactors('searchable')
    await vi.advanceTimersByTimeAsync(700)
    expect(filteredFactors.value[0].isHidden).toBe(false)
    expect(filteredFactors.value[1].isHidden).toBe(true)
    filterFactors('')
    await vi.advanceTimersByTimeAsync(700)
    expect(filteredFactors.value[1].isHidden).toBe(false)
  })

  it('isGroupOnlyHidden reports groups whose factors are all hidden', async () => {
    const { isGroupOnlyHidden, filterFactors } = setup([
      makeFactor('a', 'Alpha', 'alpha'),
      makeFactor('b', 'Beta', 'beta')
    ])
    filterFactors('beta')
    await vi.advanceTimersByTimeAsync(700)
    expect(isGroupOnlyHidden('alpha')).toBe(true)
    expect(isGroupOnlyHidden('beta')).toBe(false)
  })

  it('does not crash searching a legacy factor without a title', async () => {
    const legacy = makeFactor('a', 'A')
    legacy.title = undefined as unknown as string
    const { filteredFactors, filterFactors } = setup([legacy])
    filterFactors('foo')
    await vi.advanceTimersByTimeAsync(700)
    expect(filteredFactors.value[0].isHidden).toBe(true)
  })
})

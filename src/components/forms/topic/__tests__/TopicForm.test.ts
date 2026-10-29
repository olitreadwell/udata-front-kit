import { render, screen } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'

const { pageConf, filtersState } = vi.hoisted(() => {
  const filters = [
    {
      id: 'saison',
      name: 'Saison',
      type: 'select',
      use_filter_prefix: true,
      form: { required: true },
      values: [
        { id: 'saison-1', name: 'Saison 1' },
        { id: 'saison-2', name: 'Saison 2' }
      ]
    },
    {
      id: 'category',
      name: 'Catégorie',
      type: 'select',
      use_filter_prefix: false,
      form: { required: true },
      values: [
        { id: 'alimentaire', name: 'Données alimentaires' },
        { id: 'climat', name: 'Données climatiques' }
      ]
    }
  ]
  const pageConf = {
    filter_prefix: 'test',
    labels: {
      singular: 'jeu de données',
      plural: 'jeux de données',
      extended: 'jeu de données'
    },
    filters
  }
  const filtersState = Object.fromEntries(
    filters.map((filter) => [
      filter.id,
      {
        id: filter.id,
        selectedValue: null,
        options: filter.values,
        childId: undefined
      }
    ])
  )
  return { pageConf, filtersState }
})

vi.mock('@/router/utils', () => ({
  useCurrentPageConf: () => ({ pageKey: 'bouquets', meta: {}, pageConf })
}))

vi.mock('@/utils/filters', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/utils/filters')>()
  return { ...actual, useFiltersState: () => ({ filtersState }) }
})

vi.mock('@/components/forms/SelectSpatialCoverage.vue', () => ({
  default: { name: 'SelectSpatialCoverage', template: '<div />' }
}))

import TopicForm from '../TopicForm.vue'

describe('TopicForm filter selects', () => {
  it('associates every filter label with its own select', () => {
    render(TopicForm, {
      props: {
        modelValue: {
          name: 'Un bouquet',
          description: 'Description',
          tags: [],
          extras: {}
        },
        formErrorMessagesMap: new Map()
      }
    })

    const [saison, category] = screen.getAllByRole('combobox')
    expect(screen.getByLabelText('Saison (obligatoire)')).toBe(saison)
    expect(screen.getByLabelText('Catégorie (obligatoire)')).toBe(category)
  })
})

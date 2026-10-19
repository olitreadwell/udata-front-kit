import { render, screen } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('@/config', () => ({
  default: {
    datagouvfr: {
      base_url: 'https://www.data.gouv.fr',
      tabular_api_url: null
    },
    website: {
      homepage: { title: 'Accueil', subtitle: '', sections: [] },
      home_banner_colors: ['#000091', '#000091', '#000091'],
      search_bar: { display: true, placeholder: 'Rechercher' },
      secondary_search: {
        display: true,
        name: 'Recherche guidée',
        link: '/form'
      }
    }
  }
}))

import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('renders the secondary search control as a keyboard-focusable link', () => {
    render(HomeView, { global: { stubs: { DsfrSearchBar: true } } })

    const link = screen.getByRole('link', { name: 'Recherche guidée' })
    expect(link.getAttribute('href')).toBe('/form')
  })
})

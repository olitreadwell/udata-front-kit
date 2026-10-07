import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import SubSectionTiles from '../SubSectionTiles.vue'

const subsection = {
  title: 'Ressources',
  class: 'fr-col-md-4',
  tiles: [
    {
      id: 'find',
      name: 'Trouver des données',
      description: 'Où rechercher des jeux de données',
      url: 'https://guides.data.gouv.fr/reutiliser-des-donnees/guide-traitement-et-analyse-de-donnees/trouver-des-donnees'
    },
    {
      id: 'guide',
      name: 'Consulter le guide',
      description: 'Parcourez le guide',
      url: '/hackathons/hackathon-le-climat-en-donnees/'
    }
  ]
}

describe('SubSectionTiles', () => {
  it.each(subsection.tiles)('renders "$name" as a link to its URL', (tile) => {
    render(SubSectionTiles, { props: { subsection } })
    const name = screen.getByText(tile.name)
    const link = name.closest('a')
    expect(link).not.toBeNull()
    expect(link?.getAttribute('href')).toBe(tile.url)
  })

  it('renders a link for every tile', () => {
    render(SubSectionTiles, { props: { subsection } })
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(subsection.tiles.length)
  })

  it('renders each tile description', () => {
    render(SubSectionTiles, { props: { subsection } })
    expect(screen.getByText('Où rechercher des jeux de données')).toBeDefined()
    expect(screen.getByText('Parcourez le guide')).toBeDefined()
  })
})

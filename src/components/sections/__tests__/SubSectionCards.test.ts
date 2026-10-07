import { DsfrCard } from '@gouvminint/vue-dsfr'
import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import SubSectionCards from '../SubSectionCards.vue'

const subsection = {
  title: 'Titre',
  cards: [
    {
      name: 'Immobilier logistique',
      description: 'Description',
      url: 'bouquets?theme=immobilier-logistique',
      image_url: '/static/logistique/assets/immobilier.jpg'
    }
  ]
}

describe('SubSectionCards', () => {
  it('renders card images as decorative (empty alt)', () => {
    const { container } = render(SubSectionCards, {
      props: { subsection },
      global: { components: { DsfrCard } }
    })
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.getAttribute('alt')).toBe('')
  })
})

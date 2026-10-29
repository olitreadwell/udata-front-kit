import { datagouv } from '@datagouv/components-next'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  createMemoryHistory,
  createRouter,
  type RouteRecordRaw,
  type Router
} from 'vue-router'

import SidebarOwner from '../SidebarOwner.vue'

const organization = {
  id: 'org-1',
  name: 'Région Nouvelle-Aquitaine',
  acronym: null,
  page: 'https://example.org/organizations/org-1',
  logo: '',
  logo_thumbnail: '',
  badges: []
}

const createTestRouter = async (
  withOrganizationRoute: boolean
): Promise<Router> => {
  const routes: RouteRecordRaw[] = [
    { path: '/', component: { template: '<div />' } }
  ]
  if (withOrganizationRoute) {
    routes.push({
      path: '/organizations/:oid',
      name: 'organization_detail',
      component: { template: '<div />' }
    })
  }
  const router = createRouter({ history: createMemoryHistory(), routes })
  await router.push('/')
  await router.isReady()
  return router
}

const mountSidebarOwner = async (withOrganizationRoute: boolean) => {
  const router = await createTestRouter(withOrganizationRoute)
  const wrapper = mount(SidebarOwner, {
    attachTo: document.body,
    props: { object: { organization } },
    global: {
      plugins: [
        router,
        [
          datagouv,
          {
            name: 'test',
            baseUrl: 'https://example.org',
            apiBase: 'https://example.org/api/1',
            textClamp: { name: 'TextClamp', template: '<span><slot /></span>' }
          }
        ]
      ]
    }
  })
  return wrapper
}

describe('SidebarOwner', () => {
  it('renders the organization link without the inline-box collapse (PR #1254)', async () => {
    const wrapper = await mountSidebarOwner(true)
    const link = wrapper.get('a.sidebar-owner-link')
    expect(link.classes()).toContain('fr-link')
    expect(getComputedStyle(link.element as Element).display).toBe(
      'inline-block'
    )
  })

  it('applies the same link styling to the fallback external link', async () => {
    const wrapper = await mountSidebarOwner(false)
    const link = wrapper.get('a.sidebar-owner-link')
    expect(link.attributes('href')).toBe(organization.page)
    expect(getComputedStyle(link.element as Element).display).toBe(
      'inline-block'
    )
  })
})

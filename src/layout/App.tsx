import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../app/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from './core'
import {MasterInit} from './MasterInit'

const Layout = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <Outlet />
          <MasterInit />
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {Layout}

import {createRoot} from 'react-dom/client'
// Axios
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
// Apps
import './app/assets/sass/style.scss'
import './app/assets/sass/plugins.scss'
import './app/assets/sass/style.react.scss'
import {AppRoutes} from './routes/AppRoutes'
import {Provider} from 'react-redux'
import {store} from './app/saga/store'
import {BrowserRouter} from 'react-router-dom'
import history from './routes/history'

const queryClient = new QueryClient()
const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HistoryRouter>
    </Provider>
  )
}

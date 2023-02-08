import {createRoot} from 'react-dom/client'
// Axios
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
// Apps
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './app/assets/sass/plugins.scss'
import './app/assets/sass/style.react.scss'
import './app/assets/sass/style.scss'
import {store} from './app/saga/store'
import {AppRoutes} from './routes/AppRoutes'
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
          <ToastContainer />
        </QueryClientProvider>
      </HistoryRouter>
    </Provider>
  )
}

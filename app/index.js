import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Loading from './components/Loading'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'
import './index.css'

const Stories = React.lazy(() => import('./components/Stories'))
const User = React.lazy(() => import('./components/User'))
const Post = React.lazy(() => import('./components/Post'))

function App() {
  const [theme, setTheme] = React.useState('light')
  const toggleTheme = () => setTheme(theme => theme === 'light' ? 'dark' : 'light')

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme}/>
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/(|new)" component={Stories} />
                <Route path="/user" component={User} />
                <Route path="/post" component={Post} />
                <Route render={() => <h1>404</h1>}/>
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
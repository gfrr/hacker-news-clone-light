import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Loading from './components/Loading'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'
import './index.css'

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
                <Route exact path="/" render={() => <h1>top</h1>}/>
                <Route exact path="/new" render={() => <h1>new</h1>}/>
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
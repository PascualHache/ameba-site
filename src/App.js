import React, { useState, useMemo } from 'react';
import './App.css';
import Home from './pages/Home';
import Activitats from './pages/Activitats';
import Botiga from './pages/Botiga';
import Entrevista from './components/supportyourlocals/Entrevista';
import SupportYourLocals from './pages/SupportYourLocals';
import Sessio from './sessio/SessioGeneral';
import NotFound from './pages/NotFound';
import { Switch, Route } from 'react-router-dom';
import Contacte from './contacte/Contacte';
import Menu from './components/Navbar'
import LogSession from './pages/LogSession';
import Checkout from './pages/Checkout';
import MemberRegistration from './pages/MemberRegistration';
import CheckoutFinished from './pages/CheckoutFinished';
import LogMailConfirmation from './pages/LogMailConfirmation';
import PasswordRecovery from './pages/PasswordRecovery';
import ValidateEmail from './pages/ValidateEmail';
import Register from './redux/components/Register';
import { UserContext } from './UserContext';

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <Menu />
      {/* Switch evita que mas de un componente se renderice a la vez */}
      <UserContext.Provider value={value}>
        <Switch>
          <Route path='/activitats' component={Activitats} />
          <Route path='/botiga' component={Botiga} />
          <Route exact path='/support/:id' component={Entrevista} />
          <Route path='/support' component={SupportYourLocals} />
          <Route path='/sessio' component={Sessio} />
          <Route path='/login' component={LogSession} />
          <Route path='/membership-registration' component={MemberRegistration} />
          <Route path='/password-recovery' component={PasswordRecovery} />
          <Route path='/validate-email' component={ValidateEmail} />
          <Route path='/registration' component={Register} />
          <Route path='/activate' component={LogMailConfirmation} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/summary-checkout' component={CheckoutFinished} />
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
      <Contacte />
    </div>
  );
}

export default App;
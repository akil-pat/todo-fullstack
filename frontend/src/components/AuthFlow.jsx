import { useState } from 'react'
import LandingPage from './LandingPage'
import LoginForm from './LoginForm'
import Modal from './Modal'
import SignupForm from './SignupForm'

export default function AuthFlow() {
  const [modal, setModal] = useState(null)

  return (
    <>
      <LandingPage onLogin={() => setModal('login')} onSignup={() => setModal('signup')} />
      {modal === 'login' && (
        <Modal onClose={() => setModal(null)}>
          <LoginForm onSwitchToSignup={() => setModal('signup')} />
        </Modal>
      )}
      {modal === 'signup' && (
        <Modal onClose={() => setModal(null)}>
          <SignupForm onSwitchToLogin={() => setModal('login')} />
        </Modal>
      )}
    </>
  )
}

import { useEffect, useState } from 'react';
import { MisRutas } from './routes/routes';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from './firebase/config';
import { useAppStore } from './store/app-store';
import userService from './services/user-service';
import ChatBubble from './components/contenido/Contenido';

function App() {
  const [status, setStatus] = useState('in progress');
  const store = useAppStore();

  useEffect(() => {
    let authState = null;

    if (authState) authState();

    authState = onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) {
        setStatus('not authenticated');
        return;
      }

      const userDB = await userService.getById(user.uid);
      console.log(userDB);
      store.setUserAuth(userDB);

      setStatus('authenticated');
    });

    return () => {
      authState();
    };
  }, []);

  if (status === 'in progress') {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <MisRutas />
      <ChatBubble/>
      
    </>
  );
}

export default App;

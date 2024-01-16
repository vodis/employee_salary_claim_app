import { createContext, useContext, useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';

export const NotificationsContext = createContext({
  error: '',
  success: ''
});
export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }

  const alert = (msg) => {
    context.setProvider({ success: '', error: msg });
  };
  const success = (msg) => {
    context.setProvider({ error: '', success: msg });
  };

  return {
    alert,
    success
  };
};

const NotificationsProvider = ({ children }) => {
  const [provider, setProvider] = useState({});

  useEffect(() => {
    const id = setTimeout(
      () =>
        setProvider({
          error: '',
          success: ''
        }),
      3000
    );
    return () => {
      clearTimeout(id);
    };
  }, [provider]);

  return (
    <NotificationsContext.Provider value={{ provider, setProvider }}>
      {children}
      {provider.error || provider.success ? (
        <Toast
          autohide={true}
          animation={true}
          bg={provider.error ? 'danger' : 'success'}
          className="fixed-bottom"
        >
          <Toast.Body>
            <span className="text-white">{provider.error || provider.success}</span>
          </Toast.Body>
        </Toast>
      ) : null}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;

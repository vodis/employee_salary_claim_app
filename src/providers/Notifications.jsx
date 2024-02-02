import { createContext, useContext, useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';

const DELAY = 30000; // 30sec

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
    let error;
    if (msg.code === 'ACTION_REJECTED') {
      error = 'Пользователь откланил транзакцию';
    }
    if (msg.code === 'INVALID_ARGUMENT') {
      error = 'Введены не корректные данные';
    }
    context.setProvider({ success: '', error });
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
      DELAY
    );
    return () => {
      clearTimeout(id);
    };
  }, [provider]);

  return (
    <NotificationsContext.Provider value={{ provider, setProvider }}>
      {children}
      {provider.error || provider.success ? (
        <div className="fixed-top m-3" style={{ zIndex: 9999 }}>
          <Toast
            autohide={true}
            animation={true}
            bg={provider.error ? 'danger' : 'success'}
            className="position-absolute top-0 end-0 mb-4 z-3"
          >
            <Toast.Body>
              <div className="d-flex justify-content-between gap-2">
                <span className="text-white">{provider.error || provider.success}</span>
                <button
                  onClick={() => setProvider({})}
                  type="button"
                  className="btn-close bg-light"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </Toast.Body>
          </Toast>
        </div>
      ) : null}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;

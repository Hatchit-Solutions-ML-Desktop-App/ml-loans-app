interface Window {
  electronAPI: {
    sendNotification: (title: string, body: string) => void;
  };
}

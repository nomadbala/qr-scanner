import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type Log = {
  text: any;
  date: number;
};

type LogContextType = {
  logs: Log[];
  addLog: (text: string) => void;
};

const LogContext = createContext<LogContextType>({} as LogContextType);

export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const savedLogs = await AsyncStorage.getItem("logs");

        if (savedLogs) setLogs(JSON.parse(savedLogs));
      } catch (error) {
        console.error(error);
      }
    };

    loadLogs();
  }, []);

  useEffect(() => {
    const saveLogs = async () => {
      await AsyncStorage.setItem("logs", JSON.stringify(logs));
    };

    saveLogs();
  }, [logs]);

  const addLog = (text: string) => {
    setLogs([
      ...logs,
      {
        text,
        date: Date.now(),
      },
    ]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};

export function useLogs() {
  const context = useContext(LogContext);

  if (context === undefined) {
    throw new Error("");
  }

  return context;
}

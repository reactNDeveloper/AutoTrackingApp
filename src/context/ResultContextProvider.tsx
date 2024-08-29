import {ReactNode, createContext, useState} from 'react';

export interface ResultContextType {
  resultData: any;
  saveResult: (data: any) => void;
}

const ResultContext = createContext<ResultContextType>({
  resultData: [],
  saveResult: (data: any) => data,
});

interface FormProps {
  children: ReactNode;
}
type TrackResult = {
  startCoordinates: Coordinate;
  duration: number;
  distance: number;
  activityType: string;
};

type Coordinate = {
  latitude: number;
  longitude: number;
};

const ResultProvider = ({children}: FormProps) => {
  const [resultData, setResultData] = useState<TrackResult[]>([]);

  const saveResult = (data: TrackResult) => {
    setResultData(prevResults => [...prevResults, data]);
  };
  return (
    <ResultContext.Provider
      value={{
        resultData,
        saveResult,
      }}>
      {children}
    </ResultContext.Provider>
  );
};
export {ResultProvider, ResultContext};

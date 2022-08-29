import { useEffect, useState } from 'react';

/**
 * Custom React Hook to read a file with FileReader
 * @param {string} frMethod File read method for FileReader
 * @returns Hook state as [{ frResult, frError, frLoading, frLoaded }, setFrFile]
 */
function useFileReader(frMethod) {
  const [frFile, setFrFile] = useState(null);
  const [frError, setFrError] = useState('');
  const [frResult, setFrResult] = useState('');
  const [frLoading, setFrLoading] = useState(false);
  const [frLoaded, setFrLoaded] = useState(false);

  useEffect(() => {
    if (!frFile) return;

    const reader = new FileReader(frFile);

    reader.onloadstart = () => {
      setFrLoading(true);
    }

    reader.onloadend = () => {
      setFrLoading(false);
    }

    reader.onload = e => {
      setFrResult(e.target.result);
      setFrLoaded(true);
    }

    reader.onError = e => {
      setFrError(e);
    }

    try {
      reader[frMethod](frFile)
    } catch (error) {
      setFrError(error);
    }

    return () => true;

  }, [frFile, frMethod]);

  return [{ frResult, frError, frLoading, frLoaded }, setFrFile];
}

export default useFileReader;
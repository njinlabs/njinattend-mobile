import { useState } from "react";

type FetcherParams<T, P> = {
  api: ({ ...props }: T) => Promise<P | null>;
  onSuccess?: ({ ...data }: Awaited<P> | null, { ...props }: T) => void;
  onFail?: (e: unknown, { ...data }: T) => void;
  initial?: P | null;
};

type ProcessParams = {
  reset: boolean;
  remember: boolean;
};

export const useApi = <T, P>({
  api,
  onSuccess = () => {},
  onFail = () => {},
  initial,
}: FetcherParams<T, P>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initial);
  const [savedProps, setSavedProps] = useState<T>();

  const withoutReset = (init: ProcessParams) => {
    return (before: ProcessParams = init) => {
      before.reset = false;
      const getProcess = process(before);

      return {
        process: getProcess.process,
        remember: remember(before),
      };
    };
  };

  const remember = (init: ProcessParams) => {
    return (before: ProcessParams = init) => {
      before.remember = true;
      const getProcess = process(before);

      return {
        process: getProcess.process,
        withoutReset: withoutReset(before),
      };
    };
  };

  const process = ({ reset, remember }: ProcessParams) => {
    return {
      process: (...props: Parameters<typeof api>): Promise<void> =>
        new Promise((resolve) => {
          (async () => {
            if (reset) {
              setData(null);
            }
            if (remember) {
              setSavedProps(...props);
            }
            setIsLoading(true);
            try {
              const data = await api(...props);
              setData(data);
              onSuccess(data, ...props);
            } catch (e) {
              setIsLoading(false);
              onFail(e, ...props);
              resolve();
              return;
            }

            setIsLoading(false);
            resolve();
          })();
        }),
      params: { reset, remember },
    };
  };

  return {
    data,
    withoutReset: withoutReset({ reset: true, remember: false }),
    remember: remember({ reset: true, remember: false }),
    process: process({ remember: false, reset: true }).process,
    isLoading,
    savedProps,
  };
};

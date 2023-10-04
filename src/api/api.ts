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
  concat: boolean | string;
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
        concat: concat(before),
      };
    };
  };

  const concat = (init: ProcessParams) => {
    return (
      keyToConcat: keyof P | null = null,
      before: ProcessParams = init
    ) => {
      before.concat = keyToConcat ? (keyToConcat as string) : "";
      const getProcess = process(before);

      return {
        process: getProcess.process,
        withoutReset: withoutReset(before),
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
        concat: concat(before),
      };
    };
  };

  const process = ({ reset, remember, concat }: ProcessParams) => {
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
              setData((value) => {
                if (concat && value) {
                  if (
                    value[concat as keyof P] &&
                    Array.isArray(value[concat as keyof P])
                  ) {
                    return {
                      ...value,
                      [concat as keyof P]: (
                        value[concat as keyof P] as Array<unknown>
                      ).concat(data![concat as keyof P]),
                    };
                  }
                } else if (typeof concat === "string" && value) {
                  if (Array.isArray(value)) {
                    return value.concat(data) as P;
                  }
                }

                return data;
              });
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
    withoutReset: withoutReset({ reset: true, remember: false, concat: false }),
    remember: remember({ reset: true, remember: false, concat: false }),
    concat: concat({ reset: true, remember: false, concat: false }),
    process: process({ remember: false, reset: true, concat: false }).process,
    isLoading,
    savedProps,
  };
};

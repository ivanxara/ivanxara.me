"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export class QueryClient {}

const QueryClientContext = createContext<QueryClient | null>(null);

export function QueryClientProvider({
  children,
  client,
}: {
  children: ReactNode;
  client: QueryClient;
}) {
  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
}

type MutationStatus = "idle" | "pending" | "success" | "error";

export function useMutation<TData, TError = Error, TVariables = void>({
  mutationFn,
  onSuccess,
  onError,
}: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
}) {
  const client = useContext(QueryClientContext);
  const [status, setStatus] = useState<MutationStatus>("idle");
  const [data, setData] = useState<TData | undefined>();
  const [error, setError] = useState<TError | null>(null);

  const mutateAsync = useCallback(
    async (variables: TVariables) => {
      void client;
      setStatus("pending");
      setError(null);

      try {
        const result = await mutationFn(variables);
        setData(result);
        setStatus("success");
        onSuccess?.(result, variables);
        return result;
      } catch (caughtError) {
        const nextError = caughtError as TError;
        setError(nextError);
        setStatus("error");
        onError?.(nextError, variables);
        throw nextError;
      }
    },
    [client, mutationFn, onError, onSuccess],
  );

  const mutate = useCallback(
    (variables: TVariables) => {
      void mutateAsync(variables);
    },
    [mutateAsync],
  );

  const reset = useCallback(() => {
    setData(undefined);
    setError(null);
    setStatus("idle");
  }, []);

  return useMemo(
    () => ({
      data,
      error,
      status,
      isIdle: status === "idle",
      isPending: status === "pending",
      isSuccess: status === "success",
      isError: status === "error",
      mutate,
      mutateAsync,
      reset,
    }),
    [data, error, mutate, mutateAsync, reset, status],
  );
}

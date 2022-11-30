import { useCallback, useState } from "react";

type IUseFormReturnValues<InititalState> = [
  form: InititalState,
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleReset: () => void
];

export const useForm = <InititalState>(
  inititalState: InititalState
): IUseFormReturnValues<InititalState> => {
  const [form, setForm] = useState<InititalState>(inititalState);

  const handleFormChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value, name } = event.target;

      setForm((state) => ({
        ...state,
        [name]: value,
      }));
    },
    []
  );

  const handleReset = useCallback((): void => {
    setForm(inititalState);
  }, [inititalState]);

  return [form, handleFormChange, handleReset];
};

import { AxiosError } from 'axios';
import rootReducer from './reducer';

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadData<T> = {
  data: T;
};

export type PayloadQuery<T> = {
  query: T;
};

export type DefaultStateProps = {
  error: AxiosError | null;
  loading: boolean;
};
export type PromiseReturnType<T> = T extends PromiseLike<infer U> ? U : T;

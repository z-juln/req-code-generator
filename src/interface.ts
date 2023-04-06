import type { Input } from "stable-ts-type";

export interface PropItem {
  name: string;
  desc?: string;
  required?: boolean;
  type?: 'any' | 'unknown' | 'object' | 'number' | 'string';
  properties?: PropItem[];
}

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK';

export interface ApiOpts {
  apiName?: string;
  apiDesc?: string;
  method?: Method;
  url: string;
  query?: Omit<PropItem, 'properties'>[];
  body?: PropItem[];
  /** 用于确定响应体的ts类型, <https://www.npmjs.com/package/stable-ts-type> */
  stableTsTypeInputs: Input[];
}

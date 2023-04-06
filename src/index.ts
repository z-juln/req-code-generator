import { Generator } from 'stable-ts-type';
import changeCase from '@juln/change-case';
import type { ApiOpts, PropItem, Method } from './interface';

const reqCodeGenerator = (apiOpts: ApiOpts) => new Promise<string>((resolve, reject) => {
  // console.log('apiOpts', apiOpts);

  const { apiDesc, url, query, body, stableTsTypeInputs } = apiOpts;
  const apiName = changeCase(apiOpts.apiName ?? 'request', 'camel-case') || 'request';
  const method = apiOpts.method?.toLowerCase() ?? 'get';

  /** @example { functionArgsCode: '({ p1, p2 }: { p1?: any; p2?: any })', objArgsCode: '{ p1, p2 }', innerType: '{ p1?: any; p2?: any }' } */
  const getArgsCode = (args: PropItem[]) => {
    if (args.length === 0) return { functionArgsCode: '()', objArgsCode: '{}', innerType: '{}' };
    const argNames = args.map(arg => arg.name);
    const getInnerType = (args: PropItem[]): string => {
      return args.map(arg => `${arg.name}${arg.required ? '' : '?'}: ${
        arg.properties ? `{ ${getInnerType(arg.properties)} }` : (arg.type ?? 'unknown')
      }`).join('; ');
    };
    const innerType = getInnerType(args);
    const objArgsCode = `{ ${argNames.join(', ')} }`;
    const functionArgsCode = `(${objArgsCode}: { ${innerType} })`;
    return {
      objArgsCode,
      functionArgsCode,
      innerType,
    };
  };

  const getCode = (typeCode: string) => {
    const typeName = typeCode.match(/interface\s+([a-zA-Z\d_$]+)\s*?{/)?.[1] ?? typeCode.match(/type\s+([a-zA-Z\d_$]+)\s*?=\s*?{/)?.[1];
    let axiosCode: string;
    const { functionArgsCode } = getArgsCode([...query ?? [], ...body ?? []]);
    const paramsCode = getArgsCode(query ?? []).objArgsCode;
    const bodyCode = getArgsCode(body ?? []).objArgsCode;
    if (method === 'get') {
      // example1: export const getList = () => axios.get<any, Response>('https://api.baidu.com');
      // example2: export const getList = ({ page }: { page?: number }) => axios.get<any, Response>('https://api.baidu.com', { page });
      axiosCode = `export const ${apiName} = ${functionArgsCode} => axios.get<any, ${typeName}>('${url}'${query?.length ? ', ' + paramsCode : ''});`;
    } else if (method === 'post') {
      // example1: export const getList = () => axios.post<any, Response>('https://api.baidu.com', {});
      // example2: export const getList = ({ page, query1 }: { page?: number; query1?: any; }) => axios.post<any, Response>('https://api.baidu.com', { page }, { params: { query1 } });
      axiosCode = `export const ${apiName} = ${functionArgsCode} => axios.post<any, ${typeName}>('${url}', ${bodyCode}${query?.length ? `, { params: ${paramsCode} }` : ''});`;
    } else {
      axiosCode = `export const ${apiName} = ${functionArgsCode} => axios.request<any, ${typeName}>({
  url: '${url}',
  method: '${method}',
  params: ${paramsCode},
  body: ${bodyCode},
});`;
    }
    const code = typeCode + '\n' + (apiDesc ? `/** ${apiDesc} */` : '')  + '\n' + axiosCode + '\n';
    return code;
  };

  const generator = new Generator(stableTsTypeInputs, {
    on(event, codeOrError) {
      switch (event) {
        case 'CHUNK_DONE':
          break;
        case 'DONE':
          const code = getCode(codeOrError as string);
          resolve(code);
          break;
        case 'ERROR':
          reject(codeOrError);
          break;
      }
    },
  });
  generator.generate();
});

export type {
  ApiOpts,
  PropItem,
  Method,
};

export default reqCodeGenerator;

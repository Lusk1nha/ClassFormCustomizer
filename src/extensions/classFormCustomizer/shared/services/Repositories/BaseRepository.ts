export interface IBaseRepository<T> {
  get?: (select: string, filter: string, order?: string, top?: number) => Promise<T[]>;
}

/**
 * Classe que representa um Repositório genérico
 */
export default class BaseRepository<T = any> implements IBaseRepository<T> {
}

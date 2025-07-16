import { STORAGE_KEY } from '../constants';

interface QueryStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

class StorageService {
  private static instance: StorageService | null = null;
  private storage: QueryStorage;

  private constructor(storage: QueryStorage = window.localStorage) {
    this.storage = storage;
  }

  public static getInstance(storage?: QueryStorage): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService(storage);
    } else if (storage && StorageService.instance.storage !== storage) {
      StorageService.instance.setStorage(storage);
    }
    return StorageService.instance;
  }

  public static clearInstance(): void {
    StorageService.instance = null;
  }

  public getQuery(): string | null {
    return this.storage.getItem(STORAGE_KEY);
  }

  public setQuery(value: string): void {
    this.storage.setItem(STORAGE_KEY, value);
  }

  public removeQuery(): void {
    this.storage.removeItem(STORAGE_KEY);
  }

  private setStorage(storage: QueryStorage): void {
    this.storage = storage;
  }
}

export default StorageService;

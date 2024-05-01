import { Repo } from '../_store/features/repositories/repositories.model';

export function toRepoObject(json: string): Repo {
  return JSON.parse(json);
}

import { get, setMany, keys, getMany, clear } from 'idb-keyval';

const PAYLOAD = 'payload-'
const METADATA = 'metadata-'

export function writeSavefile(metadata: SavefileMetadata, payload: string) {
  return setMany([
    [PAYLOAD + metadata.id, payload],
    [METADATA + metadata.id, metadata]  
  ])
}

export function retriveSavefile(id: string) {
  return get(PAYLOAD + id);
}

export function retriveAllMetadata() {
  return keys().then(returnedKeys => {
    return returnedKeys.filter(key => String(key).startsWith(METADATA))
  }).then(filteredKeys => {
    return getMany(filteredKeys);
  }).then(allMetadata => { 
    return allMetadata.sort( (a, b) => {
      return b.datetimeParsed - a.datetimeParsed; //desc
    })
  });
}

export function nukeSavefiles() {
  clear();
}
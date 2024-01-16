export * from './converters';

export function injector(key, injection = '', value) {
  const matchKeyLength = key?.length;
  const matchKeyIndex = value.match(key)?.index;
  if (!matchKeyIndex || !matchKeyLength) {
    return value;
  }
  const matchPersentAhead = value.slice(0, matchKeyIndex);
  const matchPersentBehind = value.slice(matchKeyIndex + matchKeyLength);
  return matchPersentAhead + injection + matchPersentBehind;
}

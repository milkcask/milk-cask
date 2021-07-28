//import { writeSavefile, retriveSavefile, retriveAllMetadata} from './Persistence'

const patternLibrary = {
  xmlFileSignature: /^<\?xml /,
  uniqueIDForThisGame: /<uniqueIDForThisGame>(\d+?)<\/uniqueIDForThisGame>/,
  player: /<player>(.+?)<\/player>/,
  playerName: /<name>(.+?)<\/name>/,
  farmName: /<farmName>(.+?)<\/farmName>/,
  money: /<money>(\d+?)<\/money>/,
  dsy: /<dayOfMonthForSaveGame>(\d+?)<\/dayOfMonthForSaveGame>.*?<seasonForSaveGame>(\d+?)<\/seasonForSaveGame>.*?<yearForSaveGame>(\d+?)<\/yearForSaveGame>/,
  millisecondsPlayed: /<millisecondsPlayed>(\d+?)<\/millisecondsPlayed>/
}

export function validateSavefile(text: string): boolean {
  const xmlFileSignaturePresent = patternLibrary.xmlFileSignature.test(text)
  const uniqueIDForThisGamePresent = patternLibrary.uniqueIDForThisGame.test(text)
  const playerPresent = patternLibrary.player.test(text)

  console.log ({xmlFileSignaturePresent, uniqueIDForThisGamePresent, playerPresent})

  if (xmlFileSignaturePresent && uniqueIDForThisGamePresent && playerPresent) {
    return true
  }
  return false
}

export function parseSavefileMetadata(text: string): SavefileMetadata {
  const [, firstPlayerMatched=''] = text.match(patternLibrary.player) || []

  const [, uniqueIDForThisGame='0'] = text.match(patternLibrary.uniqueIDForThisGame) || []

  const [, playerName='unknown'] = firstPlayerMatched.match(patternLibrary.playerName) || []
  const [, farmName='unknown'] = firstPlayerMatched.match(patternLibrary.farmName) || []
  const [, money='0'] = firstPlayerMatched.match(patternLibrary.money) || []
  const [, d='0', s='0', y='0'] = firstPlayerMatched.match(patternLibrary.dsy) || []
  const [, millisecondsPlayed='0'] = firstPlayerMatched.match(patternLibrary.millisecondsPlayed) || []
  
  const now = Date.now()
  
  const metadata: SavefileMetadata = {
    id: farmName+'_'+uniqueIDForThisGame+'_'+now,
    playerName: playerName,
    farmName: farmName,
    datetimeParsed: now,
    uniqueIDForThisGame: Number(uniqueIDForThisGame),
    money: Number(money),
    inGameDSY: [Number(d), Number(s), Number(y)],
    millisecondsPlayed: Number(millisecondsPlayed)
  };
  console.log(metadata);

  return metadata;
}

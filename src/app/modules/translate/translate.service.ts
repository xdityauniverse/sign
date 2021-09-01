import {Injectable} from '@angular/core';
import {LanguageIdentifier, loadModule} from 'cld3-asm';

const OBSOLETE_LANGUAGE_CODES = {
  iw: 'he'
};
const DEFAULT_SPOKEN_LANGUAGE = 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private cld: LanguageIdentifier;

  signedLanguages = ['us', 'gb', 'fr', 'es', 'sy', 'by', 'bg', 'cn', 'hr', 'cz', 'dk', 'in', 'nz', 'ee', 'fi', 'at', 'de', 'cy', 'gr', 'is',
    'isl', 'it', 'jp', 'lv', 'lt', 'ir', 'pl', 'br', 'pt', 'ro', 'ru', 'sk', 'ar', 'cl', 'cu', 'mx', 'se', 'tr', 'ua', 'pk'];

  spokenLanguages = ['en', 'fr', 'es', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'co',
    'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'he', 'hi', 'hmn', 'hu', 'is',
    'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml',
    'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si',
    'sk', 'sl', 'so', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'
  ];

  async initCld(): Promise<void> {
    if (this.cld) {
      return;
    }
    const cldFactory = await loadModule();
    this.cld = cldFactory.create(1, 500);
  }

  detectSpokenLanguage(text: string): string {
    if (!this.cld) {
      return DEFAULT_SPOKEN_LANGUAGE;
    }

    const language = this.cld.findLanguage(text);
    const languageCode = language.is_reliable ? language.language : DEFAULT_SPOKEN_LANGUAGE;
    const correctedCode = OBSOLETE_LANGUAGE_CODES[languageCode] ?? languageCode;
    return this.spokenLanguages.includes(correctedCode) ? correctedCode : DEFAULT_SPOKEN_LANGUAGE;
  }

  translateSpokenToSigned(text: string, spokenLanguage: string, signedLanguage: string): string {
    const api = 'https://nlp.biu.ac.il/~ccohenya8/sign/sentence/';
    return `${api}?slang=${spokenLanguage}&dlang=${signedLanguage}&sentence=${encodeURIComponent(text)}`;
  }

}

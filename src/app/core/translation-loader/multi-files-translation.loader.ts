import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin, map, tap } from 'rxjs';
export type TranslationFileInfo = {
    prefix: string;
    suffix: string;
    extension: string;
};

//credit to https://medium.com/@redin.gaetan/angular-multi-translation-files-7116239d915b
export class MultiFilesTranslationLoader implements TranslateLoader {
    translationFiles: TranslationFileInfo[];
    includeCommonFile: boolean;
    constructor(
        private _http: HttpClient,
        {
            transfiles,
            includeCommonFile = true
        }: { transfiles: TranslationFileInfo[]; includeCommonFile: boolean }
    ) {
        this.translationFiles = transfiles;
        this.includeCommonFile = includeCommonFile;
    }

    //Record<string, unknown> is equivalent to {[key: string]: unknown}: 
    //it is one big object with multiple key as string, the value is objects / unknown
    getTranslation(lang: string): Observable<Record<string, unknown>> {
        let returnTranslationObject: Record<string, unknown> = {};
        let transFiles: TranslationFileInfo[] = [...this.translationFiles];
        if (this.includeCommonFile) {
            transFiles = this.translationFiles.concat({
                prefix: 'assets/i18n',
                suffix: 'common',
                extension: 'json'
            });
        }

        //forkJoin to get all translation files then return as an object
        return forkJoin(
            transFiles.map((transFile) => {
                return this._http.get<Record<string, unknown>>(
                    `${transFile.prefix}/${transFile.suffix}/${lang}.${transFile.extension}`,
                    {
                        responseType: 'json'
                    }
                );
            })
        ).pipe(
            //for each translation file object, merge it to the returnTranslationObject
            tap((translationFileObj) => {
                returnTranslationObject = Object.assign(
                    { ...returnTranslationObject },
                    ...translationFileObj
                );
            }),
            map((_) => {
                console.log('returnTranslationObject', returnTranslationObject);
                return returnTranslationObject;
            })
        );
    }
}

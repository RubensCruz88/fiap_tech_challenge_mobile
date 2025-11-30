import * as dateFns from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function jsonToDate(dateAsString: string) {
    return dateFns.parseJSON(dateAsString)
}

export function dateToString(currentDate: Date, mask: string) {
    return dateFns.format(currentDate,mask, {locale: ptBR})
}
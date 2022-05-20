import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';


export function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1, word.length);
}

export function formatToDate(date) {
    const generatedDate = new Date(date);

    return format(generatedDate, 'dd/MM/yy');
}

export function formatToWeekDay(date) {
    const generatedDate = new Date(date);


    const weekDay = format(generatedDate, 'EEE', { locale: ptBR });

    return capitalizeWord(weekDay);
}

export function formatToMoney(value) {
    return value.toLocaleString('pt-br', {
        style: 'currency', currency: 'BRL'
    });
}
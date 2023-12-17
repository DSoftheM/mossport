import { SportsCategory } from "./types";

export function getSportsCategory(sportsCategory: SportsCategory) {
    switch (sportsCategory) {
        case SportsCategory._1:
            return "1";
        case SportsCategory._2:
            return "2";
        case SportsCategory._3:
            return "3";
        case SportsCategory.GR:
            return "ГР";
        case SportsCategory.MS:
            return "МС";
        case SportsCategory.KMS:
            return "КМС";
        case SportsCategory.MSMK:
            return "МСМК";
        case SportsCategory.Un1:
            return "1 юн";
        case SportsCategory.Un2:
            return "2 юн";
        case SportsCategory.Un3:
            return "3 юн";
        case SportsCategory.ZMS:
            return "ЗМС";
    }

    const _x: never = sportsCategory;
}

export function getDate(date: Date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}

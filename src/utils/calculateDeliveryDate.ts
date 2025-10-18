export const calculateDeliveryDay = () : string => {

    const estimatedDate = new Date(); 
    const dayOfWeek = estimatedDate.getDay(); 
    let daysToAdd: number;

    const deliveryDay : Record<number,string> = {
        0 : "Niedziela",
        1 : "Poniedziałek",
        2 : "Wtorek",
        3 : "Środa",
        4 : "Czwartek",
        5 : "Piątek",
        6 : "Sobota"
    }

    switch (dayOfWeek) {
        case 0:
            daysToAdd = 3;
            break;
        case 6: 
            daysToAdd = 4;
            break;
        case 1 : 
            daysToAdd = 3;
            break;
        case 2: 
            daysToAdd = 3; 
            break;
        case 3: 
            daysToAdd = 5;
            break;
        case 4: 
            daysToAdd = 5;
            break;
        case 5:
            daysToAdd = 5;
            break;
        default:
             daysToAdd = 3; 
             break;
    }

    estimatedDate.setDate(estimatedDate.getDate() + daysToAdd);
    const finalDayNumber = estimatedDate.getDay();

    return deliveryDay[finalDayNumber];
};
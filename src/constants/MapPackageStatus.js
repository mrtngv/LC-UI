export function mapPackageStatus(status) {
    switch (status) {
        case 'REGISTERED':
            return 'РЕГИСТРИРАНА';
        case 'REQUESTED':
            return 'ЗАЯВЕНА';
        case 'COLLECTED':
            return 'ВЗЕТА ОТ ЛОКАЦИЯ';
        case 'IN_PROCESS_OF_DELIVERING':
            return 'В ПРОЦЕС НА ДОСТАВКА';
        case 'RETURNED':
            return 'ВЪРНАТА';
        case 'DELIVERED':
            return 'ДОСТАВЕНА';
        case 'DECLINED':
            return 'ОТКАЗАНА';
        case 'ANULLED':
            return 'АНУЛИРАНА';
        case 'AWAITING_PICK_UP':
            return 'ПОЛУЧАВАНЕ В ОФИС';
        case 'LOADING_PACKAGE_TO_TRUCK':
            return 'В ПРОЦЕС НА ДОСТАВЯНЕ ДО АДРЕС';
        default:
            break;
    }
}
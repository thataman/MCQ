export const timer = (time) => {
    switch (time) {
        case "15":
            return 15;
            break;
        case "30":
            return 30;
            break;
        case "45":
            return 45;
            break;
        case "60":
            return 60;
            break;
        default:
            break;
    }
    return 0;
};

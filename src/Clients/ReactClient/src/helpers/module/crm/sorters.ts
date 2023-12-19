export function personSort(
    a: { firstName: string; lastName: string | null },
    b: { firstName: string; lastName: string | null }
) {
    if (
        `${a.firstName} ${a.lastName}`.toLocaleLowerCase() >
        `${b.firstName} ${b.lastName}`.toLocaleLowerCase()
    ) {
        return 1;
    }

    if (
        `${a.firstName} ${a.lastName}`.toLocaleLowerCase() <
        `${b.firstName} ${b.lastName}`.toLocaleLowerCase()
    ) {
        return -1;
    }

    return 0;
}

export function activityDateTimeDescSort(
    a: { date: string; time: string | null },
    b: { date: string; time: string | null }
) {
    const aTime = a.time ? a.time : '00:00:00';
    const bTime = b.time ? b.time : '00:00:00';
    if (a.date + aTime > b.date + bTime) {
        return -1;
    }
    if (a.date + aTime < b.date + bTime) {
        return 1;
    }

    return 0;
}

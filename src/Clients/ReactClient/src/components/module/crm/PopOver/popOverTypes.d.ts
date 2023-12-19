export interface IPopOver {
    children: any,
    placement: 'left' | 'right' | 'bottom' | 'top',
    isOpen: boolean,
    target: string,
    toggle: any
}

export interface IPopOverBody {
    children: any
}
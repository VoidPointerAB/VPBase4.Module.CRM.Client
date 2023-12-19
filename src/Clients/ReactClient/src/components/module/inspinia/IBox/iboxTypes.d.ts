export interface IBox {
    className?: string,
    children: any
}

export interface IBoxTitle {
    className?: string,
    text: string,
    tools?: any // TODO: Update to use some form of "IBoxTools"?
}

export interface IBoxContent {
    className?: string,
    children: any
}

export interface IBoxFooter {
    className?: string,
    children: any
}